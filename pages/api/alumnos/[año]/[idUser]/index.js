import { firestore } from '../../../../../firebase/firebase-admin'

export default function handler (req, res) {
  const { query } = req
  const { idUser } = query

  firestore
    .collection('alumnos')
    .doc(idUser)
    .get()
    .then((doc) => {
      if (doc.exists) {
        res.status(200).json({
          id: doc.id,
          ...doc.data()
        })
      } else {
        res.status(404).json({ message: 'Alumno no encontrado' })
      }
    })
}
