import { Link } from 'react-router-dom'
export default function NotFound() {
  return (
    <div className="feedback">
      <span className="eyebrow">404</span>
      <h1>Esta página no está en el catálogo</h1>
      <p>Vuelve al inicio para seguir explorando.</p>
      <Link className="btn btn-primary" to="/">
        Ir al inicio
      </Link>
    </div>
  )
}
