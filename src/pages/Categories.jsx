import { Link } from 'react-router-dom'
import useApi from '../hooks/useApi'
import PageHeading from '../components/PageHeading'
import Icon from '../components/Icon'
import categoryIcon from '../components/categoryIcon'
import { ErrorState, Loading } from '../components/Feedback'
export default function Categories() {
  const categories = useApi('/categorias', true)
  return (
    <>
      <PageHeading
        eyebrow="SIGUE TU CURIOSIDAD"
        title="Un mundo de posibilidades"
      >
        Explora las áreas del catálogo y elige por dónde empezar.
      </PageHeading>
      {categories.loading ? (
        <Loading />
      ) : categories.error ? (
        <ErrorState error={categories.error} retry={categories.retry} />
      ) : categories.result.data.length === 0 ? (
        <p className="feedback">Aún no hay categorías disponibles.</p>
      ) : (
        <div className="row g-4">
          {categories.result.data.map((category) => (
            <div key={category.id} className="col-md-6 col-xl-4">
              <article className="card category-card h-100">
                <div className="card-body">
                  <span className="course-icon mb-4">
                    <Icon name={categoryIcon(category.nombre)} />
                  </span>
                  <h2>{category.nombre}</h2>
                  <p>{category.descripcion}</p>
                  <Link
                    className="text-link stretched-link"
                    to={`/cursos?categoria_id=${encodeURIComponent(category.id)}`}
                  >
                    Explorar cursos <Icon name="arrow-right" />
                  </Link>
                </div>
              </article>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
