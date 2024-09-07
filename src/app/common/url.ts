const trailingSlash = (string: string) => {
  return string.endsWith('/') ? string : string + '/';
};

export const getSourceUrl = () => trailingSlash(process.env.SOURCE_URL);
