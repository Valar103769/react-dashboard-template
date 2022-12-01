import React, { lazy } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import {
  createBrowserRouter,
  json,
  redirect,
  RouterProvider,
} from 'react-router-dom'
import { LoadingOverlay, MantineProvider } from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'

import { apiGetCurrentUser } from './api'

const Dashboard = lazy(() => import('@/pages/dashboard/index'))
const Home = lazy(() => import('@/pages/home/index'))
const Setting = lazy(() => import('@/pages/account/setting/index'))
const Center = lazy(() => import('@/pages/account/center/index'))
const Page404 = lazy(() => import('@/pages/Page404'))
const Login = lazy(() => import('@/pages/login/index'))

const authLoader = async () => {
  const isLogin = localStorage.getItem('token')

  if (!isLogin) {
    console.log('!isLogin')

    return redirect('/login')
  } else {
    return
  }
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    loader: authLoader,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'account',
        children: [
          {
            path: 'center',
            element: <Center />,
          },
          {
            path: 'setting',
            element: <Setting />,
          },
        ],
      },
    ],
  },
  {
    // 需要写在 / 外面, 否则redirect会卡死
    path: '/login',
    loader: () => (localStorage.getItem('token') ? redirect('/') : null),
    element: <Login />,
  },
  { path: '*', element: <Page404 /> },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider withGlobalStyles withCSSVariables withNormalizeCSS>
      <NotificationsProvider>
        <RouterProvider
          router={router}
          fallbackElement={<LoadingOverlay visible overlayBlur={2} />}
        ></RouterProvider>
      </NotificationsProvider>
    </MantineProvider>
  </React.StrictMode>
)
