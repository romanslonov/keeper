export const ENV = process.env.NODE_ENV;
export const ENV_PRODUCTION = ENV === 'production';
export const DOMAIN = ENV_PRODUCTION ? 'http://173.232.234.189': 'http://localhost:3000';
export const HOST = ENV_PRODUCTION ? `${DOMAIN}:3000` : 'http://localhost:3000';
export const API_ROOT = `${HOST}/api/v1`;
