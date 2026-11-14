# Catálogo Académico

Proyecto universitario con React, Vite, JavaScript/JSX, Bootstrap 5 y React Router. Consume exclusivamente endpoints GET de la API Laravel en Render. No necesita backend local, token ni cuenta. No incluye registros simulados ni datos de respaldo.

## Ejecutar en Windows

Requisitos: Node.js 22.12 o superior (también compatible con Node 20.19+) y npm. Usa PowerShell, CMD o la terminal de VS Code. Laragon no es necesario para Vite.

```powershell
cd C:\laragon\www\catalogo-cursos-web
npm install
npm run dev
```

Abre la dirección `Local` impresa por Vite, normalmente http://localhost:5173. Si está ocupado, Vite elige otro puerto. Mantén la terminal abierta y usa Ctrl+C para detenerlo. No abras `index.html` directamente ni lo sirvas como PHP desde Apache.

## Configuración

La URL está centralizada en `src/config/api.js`: `https://api-examen-final-ofvn.onrender.com/api`. Opcionalmente copia `.env.example` como `.env.local` y cambia `VITE_API_URL`. Debe incluir `/api`, sin repetirlo en las rutas. Reinicia Vite después del cambio. Las variables `VITE_` son públicas: nunca agregues secretos del backend.

## Páginas

- `/`: bienvenida, cantidades reales de cursos y categorías, comprobación de `/health` y primeros cursos del catálogo.
- `/cursos`: tarjetas, búsqueda local por nombre y filtro remoto por categoría.
- `/cursos/:id`: todos los campos documentados del curso y la categoría relacionada.
- `/categorias`: categorías reales, con enlaces que abren cursos con `?categoria_id=` y ejecutan el filtro en la API.
- `/estado-api`: conexión, código HTTP, estado reportado, duración, fecha de respuesta y botón para probar nuevamente.
- Las rutas desconocidas muestran una página 404. Los errores de la API muestran su mensaje y permiten reintentar.

## Organización

```text
src/
  components/   Navegación, tarjetas, grilla, títulos, iconos y estados de consulta
  pages/        Inicio, cursos, detalle, categorías, estado y página 404
  services/     fetch GET, interpretación de success/message/data y errores
  config/       URL base y límite de espera
  hooks/        useApi: carga, cancelación, resultados y reintento
scripts/
  test-api.mjs  Integración contra la API real
```

`useApi` utiliza `useState` y `useEffect`; las listas se representan con `map()`. `getApi` utiliza `fetch()` con `async/await`, y devuelve datos junto al código HTTP y el tiempo medido. Bootstrap y Bootstrap Icons se instalan localmente con npm. Las fuentes de Google son opcionales, con respaldo sans-serif.

## Consultas y errores

Se consumen `/health`, `/cursos`, `/cursos/{id}`, `/categorias` y `/cursos?categoria_id={id}`. Los IDs se obtienen de los registros reales. Se comprueban HTTP, `success` y `data`; las listas se validan como arreglos.

Cada consulta usa `AbortController` y un límite de **120 segundos**, incluyendo la lectura del cuerpo. Render puede tardar en arrancar. Las consultas anteriores se cancelan al cambiar de ruta/filtro o desmontar el componente, sin mostrar errores de cancelación. En desarrollo, StrictMode puede iniciar y cancelar una primera petición; es esperado.

Las respuestas no JSON, errores HTTP o fallos de red muestran un mensaje y permiten reintentar. Las listas vacías tienen un estado sin resultados. Los contadores muestran “—” mientras no hay respuesta, en lugar de inventar un cero.

`/health` comprueba el proceso de la API **sin consultar la base de datos**; cursos y categorías pueden fallar aunque health funcione. Se conserva el código HTTP incluso si el cuerpo recibido no es JSON. Sin una respuesta accesible, se muestra “Sin respuesta HTTP”.

## CORS y Render

Durante la verificación, la API respondió `Access-Control-Allow-Origin: *` a GET con `Origin: http://localhost:5173`. La aplicación no envía cookies ni credenciales; utiliza `Accept: application/json` y no necesita proxy CORS.

Si falla en otro entorno, revisa Red y Consola del navegador, confirma la URL y prueba el endpoint directamente. Desde `fetch` no es posible distinguir con certeza CORS de otros errores de red; el mensaje contempla ambas posibilidades. No uses `mode: no-cors`, que impediría leer el JSON. Este proyecto no modifica el backend.

## Verificar y compilar

```powershell
npm run lint
npm run build
npm run test:api
```

Para aplicar el formato legible al código, usa `npm run format` (Prettier).

`test:api` requiere Internet y ejecuta únicamente GET reales: health, listas, detalle, filtro, 404, 422 y cabecera CORS. Usa los IDs recibidos, no exige cantidades fijas ni modifica registros. Su resultado depende de la disponibilidad de Render y la conexión.

Para revisar la compilación:

```powershell
npm run preview
```

Abre la URL que imprime Vite. Para publicar `dist/` en alojamiento estático, configura que las rutas de React Router redirijan internamente a `index.html`; de lo contrario, recargar `/cursos/1` puede devolver 404 del alojamiento.

Prueba manual: revisa contadores de Inicio; abre Cursos, busca un nombre, selecciona una categoría y abre un detalle. Desde Categorías verifica el filtro. En Estado API pulsa “Probar nuevamente”. Revisa el menú en pantalla estrecha. Busca un nombre inexistente para ver el estado vacío y abre `/cursos/no-es-un-id` para probar un error 404 de la API.

## Referencia

[Documentación de la API](https://github.com/darkjab2025/api-examen-final/blob/main/docs/API.md). Los cursos almacenados en el backend son ficticios según su documentación; esta aplicación siempre consulta las respuestas reales del servidor.
