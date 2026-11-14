export default function PageHeading({ eyebrow, title, children }) {
  return (
    <div className="page-heading">
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      <p>{children}</p>
    </div>
  )
}
