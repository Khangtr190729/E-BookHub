import { useRoutes } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes.jsx'

function App() {
  const routes = useRoutes(AppRoutes)
  return routes
}

export default App
