import CourseCard from './CourseCard'
import { EmptyState } from './Feedback'
export default function CourseGrid({ courses }) {
  if (!courses.length) return <EmptyState />
  return (
    <div className="row g-4">
      {courses.map((course) => (
        <div className="col-md-6 col-xl-4" key={course.id}>
          <CourseCard course={course} />
        </div>
      ))}
    </div>
  )
}
