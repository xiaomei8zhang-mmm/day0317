import { ApiResponse } from '../types/api';

const API_BASE = (import.meta.env.VITE_API_BASE as string | undefined) || '/api/v1';

export async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
    ...init,
  });

  const text = await res.text();
  let parsed: unknown = null;
  try {
    parsed = text ? JSON.parse(text) : null;
  } catch {
    parsed = null;
  }

  if (!res.ok) {
    const message =
      typeof parsed === 'object' && parsed && 'message' in parsed
        ? Array.isArray((parsed as { message?: unknown }).message)
          ? ((parsed as { message?: string[] }).message || []).join('; ')
          : String((parsed as { message?: string }).message || `HTTP ${res.status}`)
        : `HTTP ${res.status}`;
    throw new Error(message);
  }

  if (!parsed || typeof parsed !== 'object') {
    throw new Error('接口返回格式错误，请检查前端代理配置');
  }

  const json = parsed as ApiResponse<T>;
  if (json.code !== 0) {
    throw new Error(json.message || 'API failed');
  }

  return json.data;
}
