import { Link, useParams } from 'react-router-dom'
import useApi from '../hooks/useApi'
import { ErrorState, Loading } from '../components/Feedback'
import Icon from '../components/Icon'
export default function CourseDetail() {
  const { id } = useParams()
  const course = useApi(`/cursos/${encodeURIComponent(id)}`)
  const item = course.result?.data
  return (
    <>
      <Link className="text-link back-link" to="/cursos">
        <Icon name="arrow-left" /> Volver a cursos
      </Link>
      {course.loading ? (
        <Loading />
      ) : course.error ? (
        <ErrorState error={course.error} retry={course.retry} />
      ) : !item || typeof item !== 'object' || Array.isArray(item) ? (
        <p className="feedback">
          La API no devolvió información válida del curso.
        </p>
      ) : (
        <>
          <div className="detail-hero">
            <span className="eyebrow">{item.categoria?.nombre}</span>
            <h1>{item.nombre}</h1>
            <div className="d-flex flex-wrap gap-3">
              <span className="level">{item.nivel}</span>
              <span>
                <Icon name="clock" /> {item.duracion_horas} horas
              </span>
              <span>Curso #{item.id}</span>
            </div>
          </div>
          <div className="row g-4 mt-2">
            <div className="col-lg-8">
              <section className="detail-panel">
                <h2>Acerca de este curso</h2>
                <p>{item.descripcion}</p>
                <hr />
                <h2>Área de aprendizaje</h2>
                <h3 className="h5">
                  {item.categoria?.nombre || 'Sin categoría'}
                </h3>
                <p>{item.categoria?.descripcion}</p>
                {item.categoria && (
                  <Link
                    className="text-link"
                    to={`/cursos?categoria_id=${encodeURIComponent(item.categoria.id)}`}
                  >
                    Más cursos de esta categoría <Icon name="arrow-right" />
                  </Link>
                )}
              </section>
            </div>
            <div className="col-lg-4">
              <aside className="detail-panel">
                <h2>Información del curso</h2>
                <dl className="detail-list">
                  <dt>Identificador</dt>
                  <dd>{item.id}</dd>
                  <dt>Duración</dt>
                  <dd>{item.duracion_horas} horas</dd>
                  <dt>Nivel</dt>
                  <dd>{item.nivel}</dd>
                  <dt>Categoría</dt>
                  <dd>{item.categoria?.nombre}</dd>
                  <dt>ID de categoría</dt>
                  <dd>{item.categoria_id}</dd>
                  {item.categoria && (
                    <>
                      <dt>ID de categoría relacionada</dt>
                      <dd>{item.categoria.id}</dd>
                    </>
                  )}
                </dl>
              </aside>
            </div>
          </div>
        </>
      )}
    </>
  )
}
