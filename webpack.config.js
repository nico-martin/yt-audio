const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const app = require('./app.json');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const SitemapPlugin = require('sitemap-webpack-plugin').default;
const RobotstxtPlugin = require('robotstxt-webpack-plugin');

require('dotenv').config();

module.exports = (env) => {
  const dirDist = path.resolve(__dirname, 'dist');
  const dirSrc = path.resolve(__dirname, 'src');
  const dev = (process.env.NODE_ENV || '').trim() === 'development';
  const port = process.env.PORT || 8080;

  let serveHttps = false;
  if (process.env.SSL_KEY && process.env.SSL_CRT && process.env.SSL_PEM) {
    serveHttps = {
      key: fs.readFileSync(process.env.SSL_KEY),
      cert: fs.readFileSync(process.env.SSL_CRT),
      ca: fs.readFileSync(process.env.SSL_PEM),
    };
  }

  if (dev) {
    console.log('+ DEV SERVER ++++++++++++++');
    console.log(`${serveHttps ? 'https://' : 'http://'}localhost:${port}`);
    console.log('+ /DEV SERVER +++++++++++++');
  }

  return {
    entry: {
      app: `${dirSrc}/index.ts`,
    },
    performance: {
      hints: false,
    },
    output: {
      path: dirDist,
      filename: dev ? 'assets/[name].js' : 'assets/[name]-[fullhash].js',
      publicPath: '/',
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          exclude: [/node_modules/],
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            'css-loader',
            'postcss-loader',
          ],
        },
        {
          test: /\.svg$/,
          use: ['@svgr/webpack'],
        },
      ],
    },
    mode: dev ? 'development' : 'production',
    devServer: {
      //contentBase: dirDist,
      compress: true,
      port,
      https: serveHttps,
      historyApiFallback: true,
      hot: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: app.title,
        description: app.description,
        template: 'src/index.html',
        filename: './index.html',
        chunksSortMode: 'none',
        minify: dev
          ? false
          : {
              collapseWhitespace: true,
              removeComments: true,
              removeRedundantAttributes: true,
              removeScriptTypeAttributes: true,
              removeStyleLinkTypeAttributes: true,
              useShortDoctype: true,
            },
      }),
      new MiniCssExtractPlugin({
        filename: dev ? 'assets/[name].css' : 'assets/[name].[hash].css',
        chunkFilename: dev
          ? 'assets/[name].[id].css'
          : 'assets/[name].[id].[hash].css',
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: 'src/static',
            to: 'assets/static',
          },
        ],
      }),
      ...(dev ? [new webpack.SourceMapDevToolPlugin({})] : []),
      new CleanWebpackPlugin(),
      ...(!dev
        ? [
            new WebpackPwaManifest({
              name: app.title,
              short_name: app.short,
              description: app.description,
              theme_color: app.color,
              background_color: app.colorbkg,
              display: 'standalone',
              crossorigin: 'use-credentials',
              icons: [
                {
                  src: path.resolve('./src/assets/favicon.png'),
                  sizes: [96, 128, 192, 256, 384, 512],
                  destination: path.join('assets', 'icon'),
                  ios: true,
                },
              ],
              share_target: {
                action: '/',
                method: 'GET',
                params: {
                  text: 'videolink',
                },
              },
            }),
            new GenerateSW({
              include: [/\.html$/, /\.js$/, /\.css$/],
              exclude: [/app\.css$/],
              runtimeCaching: [
                {
                  urlPattern: new RegExp(/\.(?:png|gif|jpg|svg|ico|webp)$/),
                  handler: 'CacheFirst',
                  options: {
                    cacheName: 'image-cache',
                  },
                },
                {
                  urlPattern: new RegExp(/\.html$/),
                  handler: 'NetworkFirst',
                  options: {
                    cacheName: 'index-cache',
                  },
                },
              ],
              navigateFallback: 'index.html',
              skipWaiting: true,
            }),
            new RobotstxtPlugin({
              sitemap: 'https://ytaud.io/sitemap.xml',
              host: 'https://ytaud.io',
            }),
            new SitemapPlugin({
              base: 'https://ytaud.io',
              paths: ['/', '/about/'],
            }),
          ]
        : []),
    ],
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
      plugins: [new TsconfigPathsPlugin()],
    },
  };
};
