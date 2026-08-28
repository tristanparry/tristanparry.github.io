const URL_REGEX = /^(?:(?:[a-z]+:)?\/\/)?(?:mailto:)?(?:www\.)?/;

export const prettifyUrl = (url: string) => {
  if (!URL_REGEX.test(url)) {
    return url;
  }
  return url.replace(URL_REGEX, '');
};

export const openUrl = (url: string) => window.open(url, '_blank');
