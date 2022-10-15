import { firestore } from "../../../firebase/firebase-admin";

export default function handler(req, res) {
	firestore
		.collection("matriculas")
		.get()
		.then((querySnapshot) => {
			const matriculas = [];
			querySnapshot.forEach((doc) => {
				matriculas.push({
					id: doc.id,
					...doc.data(),
				});
			});
			res.status(200).json(matriculas);
		});
}
