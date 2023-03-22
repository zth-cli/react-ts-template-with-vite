import lazyLoad from '@/router/utils/lazyLoad'
import Layout from '@/layout/index'
import NotFound from '@/pages/404'
import { RouteObject } from 'react-router-dom'

const router: RouteObject[] = [
  { path: '/login', element: lazyLoad(lazy(() => import('@/pages/login'))) },
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/home', element: lazyLoad(lazy(() => import('@/pages/index'))) },
      { path: '/about', element: lazyLoad(lazy(() => import('@/pages/about'))) },
      { path: '*', element: <NotFound /> },
    ],
  },
]
export { router }
