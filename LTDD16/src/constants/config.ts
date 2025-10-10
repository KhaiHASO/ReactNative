export function getBaseUrl(): string {
  const defaultUrl = 'http://localhost:3000';
  // Android emulator forwards localhost to 10.0.2.2
  if (typeof navigator !== 'undefined' && /Android/i.test(navigator.userAgent || '')) {
    const url = 'http://10.0.2.2:3000';
    console.log('[config.getBaseUrl] Android detected ->', url);
    return url;
  }
  console.log('[config.getBaseUrl] default ->', defaultUrl);
  return defaultUrl;
}

export const API = {
  PRODUCTS: '/api/products',
};


