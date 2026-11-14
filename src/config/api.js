export const API_URL = (
  import.meta.env?.VITE_API_URL ||
  'https://api-examen-final-ofvn.onrender.com/api'
).replace(/\/+$/, '')
export const API_TIMEOUT = 120_000
