import { API_URL, API_TIMEOUT } from '../config/api.js'

export class ApiError extends Error {
  constructor(message, status = null) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

// La señal externa cancela la consulta al cambiar de página o filtro.
export async function getApi(path, { signal } = {}) {
  const controller = new AbortController()
  let timedOut = false
  let status = null
  const cancel = () => controller.abort()
  if (signal?.aborted) cancel()
  signal?.addEventListener('abort', cancel, { once: true })
  const timeout = setTimeout(() => {
    timedOut = true
    controller.abort()
  }, API_TIMEOUT)
  const start = performance.now()
  try {
    const response = await fetch(`${API_URL}${path}`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    })
    status = response.status
    let body
    try {
      body = await response.json()
    } catch (error) {
      if (controller.signal.aborted) throw error
      throw new ApiError(
        'El servidor devolvió una respuesta que no es JSON. Intenta nuevamente.',
        status,
      )
    }
    if (!response.ok || body?.success !== true)
      throw new ApiError(body?.message || `Error HTTP ${status}.`, status)
    if (!Object.hasOwn(body, 'data'))
      throw new ApiError('La respuesta no contiene el campo data.', status)
    return {
      data: body.data,
      message: body.message,
      status,
      duration: Math.round(performance.now() - start),
      checkedAt: new Date(),
    }
  } catch (error) {
    if (signal?.aborted) throw error
    if (timedOut)
      throw new ApiError(
        'La API superó los 120 segundos de espera. Render puede estar iniciando; vuelve a intentarlo.',
        status,
      )
    if (error instanceof ApiError) throw error
    throw new ApiError(
      'No se pudo conectar con la API. Revisa tu conexión; también puede tratarse de un bloqueo CORS o de Render.',
      status,
    )
  } finally {
    clearTimeout(timeout)
    signal?.removeEventListener('abort', cancel)
  }
}

export async function getList(path, options) {
  const result = await getApi(path, options)
  if (!Array.isArray(result.data))
    throw new ApiError('La API no devolvió una lista válida.', result.status)
  return result
}
