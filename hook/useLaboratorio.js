import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import { db } from "../firebase/firebase-config";

export const useLaboratorio = () => {
	const [cursos, setCursos] = useState([]);
	const [loading, setLoading] = useState(false);

	const router = useRouter();
	const año = router.query.año;

	const addCurso = (curso) => {
		setCursos([...cursos, curso]);
	};

	const deleteCurso = (id) => {
		setCursos(cursos.filter((curso) => curso.id !== id));
	};

	const addLaboratorio = async (laboratorio) => {
		setLoading(true);
		await addDoc(collection(db, "laboratorios"), laboratorio).then(() => {
			toast.success("Laboratorio agregado correctamente");
			setLoading(false);
			router.push(`/admin/laboratorios/${año}/alumnos`);
		});
	};

	const deleteLaboratorio = async (id) => {
		const docSnap = await getDocs(collection(db,"laboratorios"))
		
		docSnap.forEach(async (docLab) => {
			if (docLab.data().id === id) {
				await deleteDoc(doc(db, "laboratorios", docLab.id));
				toast.success("Laboratorio eliminado correctamente");
				router.push(`/admin/laboratorios/${año}`);
			}
		});
	};


	// 	setLoading(true);
	// 	await deleteDoc(doc(db, "laboratorios", id)).then(() => {
	// 		toast.success("Alumno eliminado correctamente");
	// 		setLoading(false);
	// 		router.push(`/admin/matriculas/${año}`);
	// 	});
	// };

	return {
		addCurso,
		cursos,
		deleteCurso,
		addLaboratorio,
		loading,
		deleteLaboratorio,
	};
};
