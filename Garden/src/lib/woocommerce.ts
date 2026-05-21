import { AppError } from '@/utils/errors';

const WOO_API_URL = process.env.NEXT_PUBLIC_WOOCOMMERCE_URL || 'https://demo.wp-api.org';
const WOO_CK = process.env.WOOCOMMERCE_CONSUMER_KEY || 'ck_dummy';
const WOO_CS = process.env.WOOCOMMERCE_CONSUMER_SECRET || 'cs_dummy';

export async function fetchFromWooCommerce<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  // Configuración de Basic Auth (solo disponible en el servidor por seguridad)
  const auth = typeof window === 'undefined'
    ? Buffer.from(`${WOO_CK}:${WOO_CS}`).toString('base64')
    : '';

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (auth) {
    headers['Authorization'] = `Basic ${auth}`;
  }

  const url = `${WOO_API_URL}/wp-json/wc/v3/${endpoint}`;

  try {
    const res = await fetch(url, {
      ...options,
      headers,
    });

    if (!res.ok) {
      throw new AppError('WOO_API_ERROR', `Error al consultar WooCommerce: ${res.statusText}`, res.status);
    }

    return await res.json() as T;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('WOO_NETWORK_ERROR', `Fallo de conexión con WooCommerce: ${(error as Error).message}`, 500);
  }
}
