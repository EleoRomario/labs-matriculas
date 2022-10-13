import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAuthContext } from '../auth/AuthContext'

export const RouteProtected = ({ children }) => {
  const router = useRouter()

  const { user, alumno } = useAuthContext()

  useEffect(() => {
    if (user === null && alumno === null) {
      router.replace('/')
    }
  }, [user, alumno, router])

  return <>{user || alumno ? children : null}</>
}
