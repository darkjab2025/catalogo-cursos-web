import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Courses from './pages/Courses'
import Categories from './pages/Categories'
import CourseDetail from './pages/CourseDetail'
import ApiStatus from './pages/ApiStatus'
import NotFound from './pages/NotFound'
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="cursos" element={<Courses />} />
          <Route path="cursos/:id" element={<CourseDetail />} />
          <Route path="categorias" element={<Categories />} />
          <Route path="estado-api" element={<ApiStatus />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
