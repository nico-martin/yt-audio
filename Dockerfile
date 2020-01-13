FROM node:10 as build
RUN mkdir -p /usr/src/yt-nico-dev/node_modules && chown -R node:node /usr/src/yt-nico-dev
WORKDIR /usr/src/yt-nico-dev
COPY package*.json ./
RUN yarn install
COPY . .
RUN yarn build:prod

FROM nginx:1.16.0-alpine
COPY --from=build /usr/src/yt-nico-dev/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
