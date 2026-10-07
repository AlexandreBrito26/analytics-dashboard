import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { Layout } from '@/components/Layout'

const Dashboard = lazy(() => import('@/pages/Dashboard'))
const Orders = lazy(() => import('@/pages/Orders'))
const NotFound = lazy(() => import('@/pages/NotFound'))
const wrap = (el: JSX.Element) => <Suspense fallback={<p role="status">Carregando...</p>}>{el}</Suspense>

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: wrap(<Dashboard />) },
      { path: '/pedidos', element: wrap(<Orders />) },
      { path: '*', element: wrap(<NotFound />) },
    ],
  },
])
