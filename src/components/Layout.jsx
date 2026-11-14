import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import Icon from './Icon'
const links = [
  ['/', 'Inicio', 'house'],
  ['/cursos', 'Cursos', 'collection'],
  ['/categorias', 'Categorías', 'grid'],
  ['/estado-api', 'Estado API', 'activity'],
]
export default function Layout() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return (
    <div className="app-shell">
      <a href="#contenido" className="visually-hidden-focusable skip-link">
        Saltar al contenido
      </a>
      <header className="site-header">
        <nav
          className="container navbar navbar-expand-md"
          aria-label="Navegación principal"
        >
          <Link className="brand" to="/" onClick={() => setOpen(false)}>
            <span className="brand-mark">
              <Icon name="book-half" />
            </span>
            <span>
              Catálogo<span className="brand-light">Académico</span>
            </span>
          </Link>
          <button
            className="navbar-toggler"
            aria-label="Abrir navegación"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <Icon name="list" />
          </button>
          <div className={`collapse navbar-collapse ${open ? 'show' : ''}`}>
            <div className="navbar-nav ms-auto gap-md-2">
              {links.map(([to, label, icon]) => (
                <NavLink
                  key={to}
                  end={to === '/'}
                  to={to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `nav-link ${isActive ? 'active' : ''}`
                  }
                >
                  <Icon name={icon} /> {label}
                </NavLink>
              ))}
            </div>
            <span className="header-label d-none d-lg-inline">
              ESPACIO DE APRENDIZAJE
            </span>
          </div>
        </nav>
      </header>
      <main id="contenido" className="container main-content">
        <Outlet />
      </main>
      <footer className="site-footer">
        <div className="container d-flex flex-column flex-md-row justify-content-between gap-2">
          <span>
            <Icon name="book-half" /> Catálogo Académico{' '}
            <span className="footer-divider">/</span> Aprende. Explora. Crece.
          </span>
          <span>
            Proyecto académico · React + Laravel API{' '}
            <Icon name="arrow-up-right" />
          </span>
        </div>
      </footer>
    </div>
  )
}
