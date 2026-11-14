import { Link } from 'react-router-dom'
import Icon from './Icon'
import categoryIcon from './categoryIcon'
export default function CourseCard({ course }) {
  return (
    <article className="card course-card h-100">
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-4">
          <span className="course-icon">
            <Icon name={categoryIcon(course.categoria?.nombre)} />
          </span>
          <span className={`level level-${course.nivel?.toLowerCase()}`}>
            {course.nivel}
          </span>
        </div>
        <span className="eyebrow category-label">
          {course.categoria?.nombre || 'Sin categoría'}
        </span>
        <h3>{course.nombre}</h3>
        <p className="course-description">{course.descripcion}</p>
        <div className="course-bottom mt-auto">
          <span>
            <Icon name="clock" /> {course.duracion_horas} horas
          </span>
          <Link
            to={`/cursos/${course.id}`}
            aria-label={`Ver curso: ${course.nombre}`}
          >
            Ver curso <Icon name="arrow-up-right" />
          </Link>
        </div>
      </div>
    </article>
  )
}
