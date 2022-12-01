import { useAuthRouters } from 'react-router-auth-plus'
import NotAuth from './pages/403'
import { useEffect, useLayoutEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useCurrentUserQuery } from './hooks/query'

function App() {
  // const navigate = useNavigate()
  // const location = useLocation()

  // const { data, isFetching } = useCurrentUserQuery()

  // useEffect(() => {
  //   if (!localStorage.getItem('token') && location.pathname !== '/login') {
  //     navigate('/login')
  //   }
  // }, [])

  // useLayoutEffect(() => {
  //   if (location.pathname === '/login' && data?.data.code === 0) {
  //     navigate('/home')
  //   }
  // }, [data?.code])

  return <div>app</div>
}

export default App
