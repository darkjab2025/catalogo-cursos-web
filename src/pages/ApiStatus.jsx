import useApi from '../hooks/useApi'
import { API_URL } from '../config/api'
import Icon from '../components/Icon'
import PageHeading from '../components/PageHeading'
export default function ApiStatus() {
  const health = useApi('/health')
  const available = health.result?.data?.status === 'ok'
  return (
    <>
      <PageHeading eyebrow="CONEXIÓN EN TIEMPO REAL" title="Estado de la API">
        Consulta la disponibilidad del servicio que conecta nuestro catálogo.
      </PageHeading>
      <section
        className="api-panel"
        aria-live="polite"
        aria-busy={health.loading}
      >
        <div className="d-flex align-items-center gap-3 mb-4">
          <span className={`api-status-icon ${available ? 'connected' : ''}`}>
            <Icon
              name={
                health.loading
                  ? 'hourglass-split'
                  : available
                    ? 'check2-circle'
                    : 'exclamation-circle'
              }
            />
          </span>
          <div>
            <h2>
              {health.loading
                ? 'Comprobando conexión…'
                : available
                  ? 'La API está disponible'
                  : 'No se confirmó la disponibilidad'}
            </h2>
            <p className="mb-0">
              {health.error
                ? health.error.message
                : health.result?.message ||
                  'Render puede tardar en iniciar. Tiempo máximo: 120 segundos.'}
            </p>
          </div>
        </div>
        <dl className="api-facts">
          <div>
            <dt>Endpoint consultado</dt>
            <dd className="endpoint">{API_URL}/health</dd>
          </div>
          <div>
            <dt>Código HTTP</dt>
            <dd>
              {health.result?.status ??
                health.error?.status ??
                'Sin respuesta HTTP'}
            </dd>
          </div>
          <div>
            <dt>Estado reportado</dt>
            <dd>{health.result?.data?.status || 'Sin confirmar'}</dd>
          </div>
          <div>
            <dt>Tiempo de respuesta</dt>
            <dd>{health.result ? `${health.result.duration} ms` : '—'}</dd>
          </div>
          <div>
            <dt>Última respuesta correcta</dt>
            <dd>
              {health.result
                ? health.result.checkedAt.toLocaleString('es-NI')
                : '—'}
            </dd>
          </div>
        </dl>
        <button
          className="btn btn-primary"
          disabled={health.loading}
          onClick={health.retry}
        >
          <Icon name="arrow-clockwise" />{' '}
          {health.loading ? 'Consultando…' : 'Probar nuevamente'}
        </button>
      </section>
      <div className="info-note">
        <Icon name="info-circle" />
        <p>
          Esta comprobación consulta el proceso de la API. La disponibilidad de
          la base de datos se verifica al cargar cursos o categorías. Un fallo
          de red no permite distinguir automáticamente entre falta de conexión,
          CORS y un servicio temporalmente inaccesible.
        </p>
      </div>
    </>
  )
}
