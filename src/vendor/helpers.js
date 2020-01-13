// @flow

export const isDev: boolean = window.location.href.indexOf('localhost') !== -1;

export const youtubeParser: string = (url: string) => {
  let id = '';
  url = url
    .replace(/(>|<)/gi, '')
    .split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  if (url[2] !== undefined) {
    id = url[2].split(/[^0-9a-z_\-]/i);
    id = id[0];
  } else {
    id = url;
  }
  return typeof id === 'string' ? id : '';
};
