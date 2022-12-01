import { Button } from '@mantine/core'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

const Home: FC = () => {
  const logout = () => {
    localStorage.clear()
    location.reload()
  }

  return (
    <>
      Home
      <Button onClick={logout}>logout</Button>
    </>
  )
}

export default Home
