import { getBaseUrl } from '../constants/config';

export async function httpGet<T = any>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${getBaseUrl()}${path}`, {
    headers: { Accept: 'application/json' },
    ...init,
  });
  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || `Request failed with ${res.status}`);
  }
  return res.json();
}


