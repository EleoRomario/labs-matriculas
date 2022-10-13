import { firestore } from '../../../../firebase/firebase-admin'

export default function handler (req, res) {
  const { query } = req
  const { año } = query
  firestore
    .collection('cursos')
    .where('año', '==', año)
    .get()
    .then((querySnapshot) => {
      const cursos = []
      querySnapshot.forEach((doc) => {
        cursos.push({
          id: doc.id,
          ...doc.data()
        })
      })
      res.status(200).json(cursos)
    })
}
