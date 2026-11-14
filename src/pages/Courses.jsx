import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import useApi from '../hooks/useApi'
import CourseGrid from '../components/CourseGrid'
import PageHeading from '../components/PageHeading'
import { ErrorState, Loading } from '../components/Feedback'
import Icon from '../components/Icon'

export default function Courses() {
  const [params, setParams] = useSearchParams()
  const category = params.get('categoria_id') || ''
  const courses = useApi(
    `/cursos${category ? `?categoria_id=${encodeURIComponent(category)}` : ''}`,
    true,
  )
  const categories = useApi('/categorias', true)
  const [search, setSearch] = useState('')
  const visible =
    courses.result?.data.filter((course) =>
      course.nombre
        .toLocaleLowerCase('es')
        .includes(search.toLocaleLowerCase('es')),
    ) || []
  return (
    <>
      <PageHeading
        eyebrow="EXPLORA Y APRENDE"
        title="Encuentra tu próximo curso"
      >
        Cada nueva habilidad comienza con un primer paso.
      </PageHeading>
      <div className="filter-bar">
        <div className="search-field">
          <Icon name="search" />
          <input
            aria-label="Buscar cursos por nombre"
            className="form-control"
            placeholder="¿Qué quieres aprender?"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
        <div>
          <label className="visually-hidden" htmlFor="category">
            Filtrar por categoría
          </label>
          <select
            id="category"
            className="form-select"
            value={category}
            onChange={(event) =>
              setParams(
                event.target.value ? { categoria_id: event.target.value } : {},
              )
            }
          >
            <option value="">Todas las categorías</option>
            {categories.result?.data.map((item) => (
              <option key={item.id} value={item.id}>
                {item.nombre}
              </option>
            ))}
            {category &&
              !categories.result?.data.some(
                (item) => String(item.id) === category,
              ) && <option value={category}>Categoría {category}</option>}
          </select>
        </div>
      </div>
      {categories.error && (
        <ErrorState error={categories.error} retry={categories.retry} />
      )}
      {courses.loading ? (
        <Loading />
      ) : courses.error ? (
        <ErrorState error={courses.error} retry={courses.retry} />
      ) : (
        <>
          <p className="results-count">
            {visible.length} cursos para explorar{' '}
            <span>· Datos del catálogo en tiempo real</span>
          </p>
          <CourseGrid courses={visible} />
        </>
      )}
    </>
  )
}
