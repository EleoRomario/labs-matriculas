import {
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { auth, db } from "../firebase/firebase-config";

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [alumno, setAlumno] = useState(null);
	const [loading, setLoading] = useState();
	const [error, setError] = useState("");
	const router = useRouter();

  useEffect(() => {
		const userCurrent = Cookies.get("user") === undefined ? null : JSON.parse(Cookies.get("user"));
		const alumnoCurrent =	Cookies.get("alumno") === undefined ? null : JSON.parse(Cookies.get("alumno"));
		setUser(userCurrent);
		setAlumno(alumnoCurrent);
  }, []);

	const signInUser = (email, password) => {
		setLoading(true);
		signInWithEmailAndPassword(auth, email, password)
			.then(() => {
				setUser(auth.currentUser);
				Cookies.set("user", JSON.stringify(user));
			})
			.catch(() => toast.error("Correo o contraseña incorrectos"))
			.finally(() => setLoading(false));
	};

	const logoutUser = () => {
		signOut(auth);
    Cookies.remove("user");
    setUser(null);
		router.replace("/");
	};

	const signInAlumno = async (cui) => {
		const q = query(collection(db, "alumnos"), where("cui", "==", cui));
		const docs = await getDocs(q);

		docs.empty && toast.error("El alumno no existe.");
		docs.forEach((doc) => {
			const alumno = {
				...doc.data(),
				uid: doc.id,
			};
			if (doc.exists()) {
        Cookies.set("alumno", JSON.stringify(alumno));				
				setAlumno(alumno);
				router.replace("/alumno");
			}
		});
	};

	const logoutAlumno = () => {
		Cookies.remove("alumno");
		setAlumno(null);
		router.replace("/");
	};

	const contextValue = {
		user,
		alumno,
		loading,
		error,
		signInUser,
		logoutUser,
		signInAlumno,
		logoutAlumno,
	};

	return (
		<AuthContext.Provider value={contextValue}>
			{children}
		</AuthContext.Provider>
	);
};
