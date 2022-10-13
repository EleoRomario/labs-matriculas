import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAuthContext } from '../auth/AuthContext'

export default function Home () {
  const router = useRouter()
  const { user, alumno } = useAuthContext()

  useEffect(() => {
    if (user === null && alumno === null) {
      router.replace('/auth/alumno')
    } else {
      if (user !== null && alumno === null) {
        router.push('/admin')
      } else if (alumno !== null && user === null) {
        router.replace('/alumno')
      }
    }
  }, [user, alumno, router])
  return <></>
}
