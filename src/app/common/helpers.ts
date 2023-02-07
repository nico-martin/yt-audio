export const isDev: boolean = window.location.href.indexOf('localhost') !== -1;

export const youtubeParser = (url: string = ''): string => {
  if (!url) return '';

  try {
    const re =
      /(https?:\/\/)?(((m|www)\.)?(youtube(-nocookie)?|youtube.googleapis)\.com.*(v\/|v=|vi=|vi\/|e\/|embed\/|user\/.*\/u\/\d+\/)|youtu\.be\/)([_0-9a-z-]+)/i;
    const id = url.match(re)[8];
    return typeof id === 'string' ? id : '';
  } catch (e) {
    return '';
  }
};

export const nl2br = (str: string) => {
  if (typeof str === 'undefined' || str === null) {
    return '';
  }

  return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1<br />$2');
};

export const readableTime = (seconds) => {
  seconds = Math.floor(seconds);
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

const leadingZero = (val) => {
  val = String(val);
  if (val.length < 2) {
    return '0' + val;
  }
  return val;
};
