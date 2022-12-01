import { FC } from 'react'
import { Link, Outlet } from 'react-router-dom'

const App: FC = () => {
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

  return (
    <>
      app
      <Link to="/home" className="mx-4">
        home
      </Link>
      <Link to="/dashboard" className="mx-4">
        dashboard
      </Link>
      <Link to="/account/center" className="mx-4">
        account-center
      </Link>
      <Link to="/login" className="mx-4">
        login
      </Link>
      <Outlet></Outlet>
    </>
  )
}

export default App
