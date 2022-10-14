import { doc, getDoc } from "firebase/firestore";
import randomColor from "randomcolor";
import { useState } from "react";
import { db } from "../../firebase/firebase-config";

export const useMatricula = () => {

  const [cursos, setCursos] = useState([])
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


	return { cursos, getCursos };
};
