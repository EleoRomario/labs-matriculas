import {firestore} from "../../../../../firebase/firebase-admin"

export default function handler(req, res) {
	const { query } = req;
	const { idUser } = query;
	firestore
		.collection("laboratorios")
		.where("id", "==", idUser)
		.get()
		.then((querySnapshot) => {
			const laboratorios = [];
			querySnapshot.forEach((doc) => {
				laboratorios.push({
					id: doc.id,
					...doc.data(),
				});
			});
			res.status(200).json(laboratorios);
		});
}
