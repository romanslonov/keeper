export const ENV = process.env.NODE_ENV
export const ENV_PRODUCTION = ENV === 'production'
export const HOSTNAME = ENV_PRODUCTION ? '173.232.234.18' : 'localhost'
export const DOMAIN = ENV_PRODUCTION ? `http://${HOSTNAME}` : `http://${HOSTNAME}:3000`
export const API_DOMAIN = `http://${HOSTNAME}:3000`
export const API_ROOT = `${API_DOMAIN}/api/v1`
