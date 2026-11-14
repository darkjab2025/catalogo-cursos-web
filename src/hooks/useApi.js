import { useEffect, useState } from 'react'
import { getApi, getList } from '../services/api'

export default function useApi(path, list = false) {
  const [attempt, setAttempt] = useState(0)
  const [state, setState] = useState({
    key: null,
    result: null,
    loading: true,
    error: null,
  })
  const key = JSON.stringify([path, list, attempt])
  useEffect(() => {
    const controller = new AbortController()
    async function load() {
      try {
        const result = await (list ? getList : getApi)(path, {
          signal: controller.signal,
        })
        if (!controller.signal.aborted)
          setState({ key, result, loading: false, error: null })
      } catch (error) {
        if (!controller.signal.aborted)
          setState({ key, result: null, loading: false, error })
      }
    }
    load()
    return () => controller.abort()
  }, [path, list, key])
  // Al cambiar la consulta, no mostramos los datos de la anterior mientras carga.
  const current =
    state.key === key ? state : { result: null, loading: true, error: null }
  return { ...current, retry: () => setAttempt((value) => value + 1) }
}
