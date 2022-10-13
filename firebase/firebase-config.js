import { getApp, getApps, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDBZbLeBkGgsslyxM423-26kkTaSWU6WhI',
  authDomain: 'matriculaslaboratorios.firebaseapp.com',
  projectId: 'matriculaslaboratorios',
  storageBucket: 'matriculaslaboratorios.appspot.com',
  messagingSenderId: '899016065366',
  appId: '1:899016065366:web:8be18cf76b89c810d016f7'
}

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
export const auth = getAuth(app)

const db = getFirestore()
export { db }
