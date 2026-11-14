import { Link } from 'react-router-dom'
import useApi from '../hooks/useApi'
import Icon from '../components/Icon'
import CourseGrid from '../components/CourseGrid'
import { ErrorState, Loading } from '../components/Feedback'

export default function Home() {
  const courses = useApi('/cursos', true)
  const categories = useApi('/categorias', true)
  const health = useApi('/health')
  const available = health.result?.data?.status === 'ok'
  return (
    <>
      <div className="home-topline">
        <span>
          <span className="tiny-square" /> TU PRÓXIMO PASO EMPIEZA AQUÍ
        </span>
        <Link to="/estado-api">
          <span className={`status-dot ${available ? 'online' : ''}`} />
          {health.loading
            ? 'Comprobando API'
            : available
              ? 'API conectada'
              : 'Revisar conexión'}{' '}
          <Icon name="arrow-up-right" />
        </Link>
      </div>
      <section className="hero-panel">
        <div className="hero-copy">
          <span className="hero-tag">
            <Icon name="stars" /> CONOCIMIENTO QUE TE IMPULSA
          </span>
          <h1>
            Tu curiosidad.
            <br />
            Tu próximo <span>gran paso.</span>
          </h1>
          <p>
            Explora nuestro catálogo académico y encuentra nuevas formas de
            aprender, crear y desarrollar tus habilidades.
          </p>
          <div className="d-flex flex-wrap gap-3">
            <Link className="btn btn-primary" to="/cursos">
              Explorar cursos <Icon name="arrow-right" />
            </Link>
            <Link className="btn btn-outline-light" to="/categorias">
              Ver categorías
            </Link>
          </div>
          <div className="hero-caption">
            <span className="short-line" /> Un espacio para seguir creciendo.
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="art-grid" />
          <div className="floating-label label-code">
            <Icon name="code-slash" /> Aprende haciendo
          </div>
          <div className="book book-back">
            <span />
          </div>
          <div className="book book-front">
            <div className="book-cover">
              <Icon name="asterisk" />
              <span>
                EL SIGUIENTE
                <br />
                CAPÍTULO
                <br />
                <b>LO ESCRIBES TÚ.</b>
              </span>
              <small>EXPLORA · APRENDE · CONSTRUYE</small>
            </div>
          </div>
          <div className="floating-label label-growth">
            <span className="growth-icon">
              <Icon name="graph-up-arrow" />
            </span>
            <span>
              Ideas que se convierten
              <br />
              <b>en nuevas habilidades</b>
            </span>
          </div>
          <span className="art-spark spark-one">✦</span>
          <span className="art-spark spark-two">✦</span>
        </div>
      </section>
      <section className="stats-row row g-0" aria-label="Resumen del catálogo">
        <div className="col-md-4 stat">
          <span className="stat-icon">
            <Icon name="collection" />
          </span>
          <div>
            <strong>
              {courses.result ? courses.result.data.length : '—'}{' '}
              <small>cursos disponibles</small>
            </strong>
            <p>Conocimiento a tu alcance</p>
          </div>
        </div>
        <div className="col-md-4 stat">
          <span className="stat-icon">
            <Icon name="grid" />
          </span>
          <div>
            <strong>
              {categories.result ? categories.result.data.length : '—'}{' '}
              <small>categorías para explorar</small>
            </strong>
            <p>Encuentra tu área de interés</p>
            {categories.error && (
              <button className="text-button" onClick={categories.retry}>
                Reintentar categorías
              </button>
            )}
          </div>
        </div>
        <div className="col-md-4 stat">
          <span className="stat-icon">
            <Icon name="activity" />
          </span>
          <div>
            <strong className="status-stat">
              {health.loading
                ? 'Consultando…'
                : available
                  ? 'API en línea'
                  : 'API no disponible'}
            </strong>
            <p>
              {health.error
                ? 'No se pudo comprobar la conexión'
                : health.result
                  ? `HTTP ${health.result.status} · Estado del proceso`
                  : 'Conectando con Render'}
            </p>
            {(health.error || (health.result && !available)) && (
              <button className="text-button" onClick={health.retry}>
                Reintentar conexión
              </button>
            )}
          </div>
        </div>
      </section>
      <section className="section-block">
        <div className="section-heading">
          <div>
            <span className="eyebrow">DESCUBRE EL CATÁLOGO</span>
            <h2>Un nuevo aprendizaje te espera</h2>
            <p>Empieza por estos cursos y encuentra lo que te mueve.</p>
          </div>
          <Link className="text-link" to="/cursos">
            Ver todos los cursos <Icon name="arrow-right" />
          </Link>
        </div>
        {courses.loading ? (
          <Loading />
        ) : courses.error ? (
          <ErrorState error={courses.error} retry={courses.retry} />
        ) : (
          <CourseGrid courses={courses.result.data.slice(0, 3)} />
        )}
      </section>
      <section className="explore-banner">
        <span className="banner-icon">
          <Icon name="compass" />
        </span>
        <div>
          <h2>Hay mucho más por descubrir.</h2>
          <p>
            Programación, desarrollo web, bases de datos y nuevas posibilidades.
          </p>
        </div>
        <Link className="btn btn-light" to="/categorias">
          Encuentra tu categoría <Icon name="arrow-up-right" />
        </Link>
      </section>
    </>
  )
}
