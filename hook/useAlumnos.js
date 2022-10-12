import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import { db } from "../firebase/firebase-config";

export const useAlumnos = () => {

  const router = useRouter();
  const año = router.query.año;

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    cui: '',
    correo: '',
    año: -1
  })
  const [loadingSaveAlumno, setLoadingSaveAlumno] = useState(false)
  const [loadingDeleteAlumno, setLoadingDeleteAlumno] = useState(false)

  const handleInputChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value
    })
  }
  const addAlumno = async (alumno) => {
    setLoadingSaveAlumno(true);
    await addDoc(collection(db, "alumnos"), alumno).then(() => {
      toast.success("Alumno agregado correctamente");
      setLoadingSaveAlumno(false);
      router.push(`/admin/alumnos/${año}`);
    });
  };

  const deleteAlumno = async (id) => {
    setLoadingDeleteAlumno(true);
    await deleteDoc(doc(db, "alumnos", id)).then(() => {
      toast.success("Alumno eliminado correctamente");
      setLoadingDeleteAlumno(false);
      router.push(`/admin/alumnos/${año}`);
    });
  };

  return {
		...formData,
		addAlumno,
		handleInputChange,
		loadingSaveAlumno,
		deleteAlumno,
    loadingDeleteAlumno
  };
}