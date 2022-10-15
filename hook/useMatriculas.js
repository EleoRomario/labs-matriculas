import { collection, deleteDoc, doc, getDocs } from "firebase/firestore"
import { useRouter } from "next/router"
import toast from "react-hot-toast"
import { db } from "../firebase/firebase-config"

export const useMatriculas = () => {

  const router = useRouter()

  const {año} = router.query

  const deleteMatricula = async (id) => {
    const docSnap = await getDocs(collection(db, "matriculas"));

	docSnap.forEach(async (docLab) => {
		if (docLab.data().id === id) {
			await deleteDoc(doc(db, "matriculas", docLab.id));
			toast.success("Matricula eliminada correctamente");
			router.push(`/admin/matriculas/${año}`);
		}
	});
  }
  return {deleteMatricula}
}