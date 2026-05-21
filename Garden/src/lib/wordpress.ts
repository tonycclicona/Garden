import { AppError } from '@/utils/errors';

const WP_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://demo.wp-api.org';

export async function fetchFromWordPress<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${WP_API_URL}/wp-json/wp/v2/${endpoint}`;
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!res.ok) {
      throw new AppError('WP_API_ERROR', `Error al consultar WordPress: ${res.statusText}`, res.status);
    }

    return await res.json() as T;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('WP_NETWORK_ERROR', `Fallo de conexión con WordPress: ${(error as Error).message}`, 500);
  }
}
