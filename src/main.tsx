import React, { lazy } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import {
  createBrowserRouter,
  json,
  redirect,
  RouteObject,
  RouterProvider,
} from 'react-router-dom'
import { LoadingOverlay, MantineProvider } from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'

import apiFetch, { apiGetCurrentUser } from './api'

const Dashboard = lazy(() => import('@/pages/dashboard'))
const Home = lazy(() => import('@/pages/home/index'))
const Setting = lazy(() => import('@/pages/account/setting/index'))
const Center = lazy(() => import('@/pages/account/center/index'))
const Page404 = lazy(() => import('@/pages/Page404'))
const Login = lazy(() => import('@/pages/login/index'))

const render = async () => {
  const user = await apiFetch('/profile')

  const roles = ['admin']
  const hasAuth = (auth: string, route: any) => {
    if (roles.includes(auth)) {
      return route
    } else {
      null
    }
  }
  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      children: [
        hasAuth('admin', {
          index: true,
          element: <Home />,
        }),
        hasAuth('admin', {
          path: 'home',
          element: <Home />,
        }),
        hasAuth('admin', {
          path: 'dashboard',
          element: <Dashboard />,
        }),
        hasAuth('root', {
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
        }),
      ].filter(Boolean),
    },
    {
      // 需要写在 / 外面, 否则redirect会卡死
      path: '/login',
      loader: () => (localStorage.getItem('token') ? redirect('/') : null),
      element: <Login />,
    },
    { path: '*', element: <Page404 /> },
  ])

  console.log('router', router)

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

  return router
}

console.log('main.js')

const bootStrap = async () => {
  const isLogin = !!JSON.parse(localStorage.getItem('token') || '""')

  console.log('isLogin', isLogin)

  if (isLogin && location.pathname === '/login') {
    location.href = '/'
    console.log('-+++')
    // eslint-disable-next-line no-debugger
    debugger
    console.log('----')
  }

  if (!isLogin && location.pathname !== '/login') location.href = '/login'
  await render()
}

bootStrap()
