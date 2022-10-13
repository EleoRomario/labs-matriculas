import { firestore } from "../../../../../firebase/firebase-admin";

export default function handler(req, res) {
	const { query } = req;
	const { año, idCurso } = query;

	firestore
		.collection("cursos")
		.doc(idCurso)
		.get()
		.then((doc) => {
			if (doc.exists) {
				res.status(200).json({
					id: doc.id,
					...doc.data(),
				});
			} else {
				res.status(404).json({ message: "Curso no encontrado" });
			}
		});
}
