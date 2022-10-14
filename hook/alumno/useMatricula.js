import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../firebase/firebase-config";

export const useMatricula = () => {

  const [cursos, setCursos] = useState([])
  
	const getCursos = (laboratorios) => {
    const gFinal = []
    laboratorios.map(async (lab) => {
      const docRef = doc(db, "cursos", lab.id)
      const docSnap = await getDoc(docRef)
      gFinal.push(docSnap.data())
    })
    console.log("🚀 ~ file: useMatricula.js ~ line 17 ~ getCursos ~ gFinal", gFinal)
    return gFinal;
	};

	return { getCursos, cursos, setCursos };
};
