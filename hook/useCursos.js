import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore'
import { useRouter } from 'next/router'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { db } from '../firebase/firebase-config'

export const useCursos = () => {
  const router = useRouter()
  const año = router.query.año

  const [formData, setFormData] = useState({
    nombre: '',
    grupos: [
      {
        grupo: '',
        docente: '',
        horario: [
          {
            dia: '',
            horaInicio: '',
            horaFin: ''
          }
        ]
      }
    ],
    año: -1
  })
  const [loadingSaveCurso, setLoadingSaveCurso] = useState(false)
  const [loadingDeleteCurso, setLoadingDeleteCurso] = useState(false)

  const handleInputChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value
    })
  }
  const addCurso = async (curso) => {
    setLoadingSaveCurso(true)
    await addDoc(collection(db, 'cursos'), curso).then(() => {
      toast.success('Curso agregado correctamente')
      setLoadingSaveCurso(false)
      router.push(`/admin/cursos/${año}`)
    })
  }

  const deleteCurso = async (id) => {
    setLoadingDeleteCurso(true)
    await deleteDoc(doc(db, 'cursos', id)).then(() => {
      toast.success('Curso eliminado correctamente')
      setLoadingDeleteCurso(false)
      router.push(`/admin/cursos/${año}`)
    })
  }

  const updateCurso = async (id, curso) => {
    setLoadingSaveCurso(true)
    await updateDoc(doc(db, 'cursos', id), curso).then(() => {
      toast.success('Curso actualizado correctamente')
      setLoadingSaveCurso(false)
      router.push(`/admin/cursos/${año}`)
    })
  }

  return {
    ...formData,
    addCurso,
    handleInputChange,
    loadingSaveCurso,
    deleteCurso,
    loadingDeleteCurso,
    setFormData,
    updateCurso
  }
}
