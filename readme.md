# YTAudio

An audio player for YouTube videos: https://ytaud.io/

YTAudio is a progressive web app that allows you to listen to YouTube videos in the background. It runs in the browser and uses modern browser-interfaces (like the [MediaSession API](https://dev.to/nicomartin/media-session-api-c1j), the Web Share API and the Share Target API) in combination with a ServiceWorker and a Web App Manifest to deliver an App-Like User Experience.

[more on dev.to](https://dev.to/nicomartin/how-to-create-a-progressive-audio-player-with-react-hooks-31l1)

## Development
YTAudio is a React SPA. You can clone the repository, install the dependencies and then run a production build that creates the production ready bundles or start the development server
  
  ```bash
  git clone https://github.com/nico-martin/yt-audio.git
  npm install
  # production bundle
  npm run prod
  # development server
  npm run dev
```
## Self-Hosting
YTAudio is a static SPA and can be hosted on any server that supports static file hosting.  
Just make sure that while you bundle the application, you defined the correct `SOURCE_URL` in you env variables.

The "YTAudio Source" is a separate nodeJS application that can be found here:  
[https://github.com/nico-martin/yt-audio-source](https://github.com/nico-martin/yt-audio-source)

Please make sure the Source-App is running and define the correct `SOURCE_URL` in your env variables before you compile the application.
