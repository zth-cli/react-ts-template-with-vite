import { createBrowserRouter } from 'react-router-dom'
import lazyLoad from '@/router/utils/lazyLoad'
const router = createBrowserRouter([
  {
    path: '/',
    element: lazyLoad(lazy(() => import('@/pages/index'))),
  },
])
export { router }
