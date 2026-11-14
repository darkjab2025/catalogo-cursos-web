import Icon from './Icon'
export function Loading() {
  return (
    <div className="feedback" role="status">
      <span className="spinner-border text-success mb-3" />
      <h3>Consultando el catálogo…</h3>
      <p>Render puede tardar en iniciar. Esperaremos hasta 120 segundos.</p>
    </div>
  )
}
export function ErrorState({ error, retry }) {
  return (
    <div className="feedback error-state" role="alert">
      <Icon name="exclamation-circle" className="fs-2" />
      <h3 className="mt-3">No pudimos completar la consulta</h3>
      <p>{error.message}</p>
      {error.status && <p>HTTP {error.status}</p>}
      <button className="btn btn-dark" onClick={retry}>
        <Icon name="arrow-clockwise" /> Reintentar
      </button>
    </div>
  )
}
export function EmptyState() {
  return (
    <div className="feedback">
      <Icon name="search" className="fs-2" />
      <h3 className="mt-3">No hay cursos para mostrar</h3>
      <p>Prueba con otra categoría o cambia tu búsqueda.</p>
    </div>
  )
}
