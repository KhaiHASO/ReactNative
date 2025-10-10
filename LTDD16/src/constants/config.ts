export function getBaseUrl(): string {
  const defaultUrl = 'http://localhost:3000';
  // Android emulator forwards localhost to 10.0.2.2
  if (typeof navigator !== 'undefined' && /Android/i.test(navigator.userAgent || '')) {
    return 'http://10.0.2.2:3000';
  }
  return defaultUrl;
}

export const API = {
  PRODUCTS: '/api/products',
};


