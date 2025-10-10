import { getBaseUrl } from '../constants/config';

export async function httpGet<T = any>(path: string, init?: RequestInit): Promise<T> {
  const url = `${getBaseUrl()}${path}`;
  console.log('[httpGet] GET', url);
  const res = await fetch(url, {
    headers: { Accept: 'application/json' },
    ...init,
  });
  console.log('[httpGet] status', res.status, res.ok);
  if (!res.ok) {
    const message = await res.text();
    console.log('[httpGet] error body', message);
    throw new Error(message || `Request failed with ${res.status}`);
  }
  return res.json();
}


