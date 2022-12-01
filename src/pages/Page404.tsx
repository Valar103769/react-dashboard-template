import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mantine/core'

const Page404: FC = () => {
  const navigate = useNavigate()

  return (
    <div className="flex items-center justify-center h-full">
      Page404
      <Button onClick={() => navigate(-1)}>Back</Button>
    </div>
  )
}

export default Page404
