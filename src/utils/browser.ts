import i18n from 'i18next';

type BrowserName =
  | 'Chrome'
  | 'Firefox'
  | 'Safari'
  | 'Edge'
  | 'Opera'
  | undefined;

interface NavigatorUAData {
  mobile: boolean;
  brands: Array<{ brand: string; version: string }>;
}

export const getBrowserName = (): string | undefined => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return undefined;
  }

  const userAgent = navigator.userAgent;
  let isMobile = false;

  // Modern client hints
  if ('userAgentData' in navigator) {
    const uaData = navigator.userAgentData as NavigatorUAData;
    isMobile = uaData.mobile;
  } else {
    // Fallback: user agent regex
    isMobile = /Mobi|Android|iPhone|iPad|iPod|Windows Phone/i.test(userAgent);
  }

  let name: BrowserName = undefined;

  if (userAgent.includes('Firefox')) {
    name = 'Firefox';
  } else if (userAgent.includes('Edg/')) {
    name = 'Edge';
  } else if (userAgent.includes('OPR/') || userAgent.includes('Opera')) {
    name = 'Opera';
  } else if (userAgent.includes('Chrome')) {
    name = 'Chrome'; // Checked before Safari
  } else if (userAgent.includes('Safari')) {
    name = 'Safari';
  }

  return name && isMobile
    ? `${name} (${i18n.t('contact.terminal.mobile')})`
    : name || undefined;
};
