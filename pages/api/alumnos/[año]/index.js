import { firestore } from '../../../../firebase/firebase-admin'

export default function handler (req, res) {
  const { query } = req
  const { año } = query
  firestore
    .collection('alumnos')
    .where('año', '==', año)
    .get()
    .then((querySnapshot) => {
      const alumnos = []
      querySnapshot.forEach((doc) => {
        alumnos.push({
          id: doc.id,
          ...doc.data()
        })
      })
      res.status(200).json(alumnos)
    })
}
