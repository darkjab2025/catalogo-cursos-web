import assert from 'node:assert/strict'
import { getApi, getList, ApiError } from '../src/services/api.js'
import { API_URL } from '../src/config/api.js'

// Integración real: únicamente GET, usando los IDs recibidos.
const health = await getApi('/health')
assert.equal(health.status, 200)
assert.equal(health.data.status, 'ok')
console.log('OK: health, HTTP 200 y status ok')
const courses = await getList('/cursos')
const categories = await getList('/categorias')
console.log(
  `OK: ${courses.data.length} cursos y ${categories.data.length} categorías`,
)
if (courses.data.length) {
  const first = courses.data[0]
  const detail = await getApi(`/cursos/${encodeURIComponent(first.id)}`)
  assert.deepEqual(detail.data, first)
  for (const field of [
    'id',
    'categoria_id',
    'nombre',
    'descripcion',
    'duracion_horas',
    'nivel',
    'categoria',
  ])
    assert.ok(Object.hasOwn(detail.data, field), field)
  console.log('OK: detalle y campos reales del curso')
}
if (categories.data.length) {
  const category = categories.data[0]
  const filtered = await getList(
    `/cursos?categoria_id=${encodeURIComponent(category.id)}`,
  )
  assert.ok(
    filtered.data.every((course) => course.categoria_id === category.id),
  )
  assert.deepEqual(
    filtered.data,
    courses.data.filter((course) => course.categoria_id === category.id),
  )
  console.log('OK: filtro por categoría coincide con los cursos reales')
}
await assert.rejects(
  getApi('/cursos/no-es-un-id'),
  (error) => error instanceof ApiError && error.status === 404,
)
await assert.rejects(
  getList('/cursos?categoria_id=texto'),
  (error) => error instanceof ApiError && error.status === 422,
)
console.log('OK: errores 404 y 422 conservan el código HTTP')
const cors = await fetch(`${API_URL}/health`, {
  headers: { Accept: 'application/json', Origin: 'http://localhost:5173' },
  signal: AbortSignal.timeout(120_000),
})
assert.ok(
  ['*', 'http://localhost:5173'].includes(
    cors.headers.get('access-control-allow-origin'),
  ),
)
console.log('OK: CORS permite el origen local (sin credenciales)')
