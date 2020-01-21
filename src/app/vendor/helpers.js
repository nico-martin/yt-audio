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

export const nl2br = (str: string) => {
  if (typeof str === 'undefined' || str === null) {
    return '';
  }

  return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1<br />$2');
};

export const readableTime = seconds => {
  const hours = Math.floor(seconds / (60 * 60));
  seconds -= hours * 60 * 60;
  const minutes = Math.floor(seconds / 60);
  seconds -= minutes * 60;
  if (hours !== 0) {
    return `${hours}:${leadingZero(minutes)}:${leadingZero(seconds)}`;
  }
  if (minutes !== 0) {
    return `${minutes}:${leadingZero(seconds)}`;
  }
  return seconds;
};

const leadingZero = val => {
  val = String(val);
  if (val.length < 2) {
    return '0' + val;
  }
  return val;
};
