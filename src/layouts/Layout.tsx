import { MetaRouterObject } from '@/router'
import { FC, useEffect } from 'react'

interface LayoutProps {
  routers?: MetaRouterObject[]
}
const Layout: FC<LayoutProps> = ({ routers }) => {
  useEffect(() => {
    console.log('Layout', routers)
  }, [])
  return <>DefaultLayout</>
}

export default Layout
