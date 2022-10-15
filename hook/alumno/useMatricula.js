import { addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useRouter } from "next/router";
import randomColor from "randomcolor";
import { useState } from "react";
import toast from "react-hot-toast";
import { db } from "../../firebase/firebase-config";

export const useMatricula = () => {

  const [cursos, setCursos] = useState([])
	const [loading, setLoading] = useState(false)

	const getCursos = (laboratorios) => {
    setCursos([])
		laboratorios.map(async(lab) => {
      const color = randomColor()
			const docRef = doc(db, "cursos", lab.id);
			const docSnap = await getDoc(docRef);
      const data = docSnap.data()
      setCursos((cursos) => [...cursos,{...data,color}])
		});
	};

	const router = useRouter();

	const addMatricula = async (matricula) => {
		setLoading(true);
		await addDoc(collection(db, "matriculas"), matricula).then(() => {
			toast.success("Alumno agregado correctamente");
			setLoading(false);
			router.push(`/alumno`);
		});
	}

	const [matricula, setMatricula] = useState()

	const getMatricula = async (id) => {
		const docSnap = await getDocs(collection(db, "matriculas"));

		docSnap.forEach(async (docLab) => {
			if (docLab.data().id === id) {
				const docSnap = await getDoc(doc(db, "matriculas", docLab.id));
				setMatricula(docSnap.data());
			}
		});
	}

	return { cursos, getCursos, addMatricula, loading, getMatricula, matricula };
};
