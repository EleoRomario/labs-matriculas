import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthContext } from "../auth/AuthContext";

export default function Home() {
	const router = useRouter();
	const { user, logoutUser, alumno } = useAuthContext();

	useEffect(() => {
		console.log("🚀 ~ file: index.js ~ line 12 ~ useEffect ~ user", user)
		console.log("🚀 ~ file: index.js ~ line 11 ~ useEffect ~ alumno", alumno)
		if (user === null && alumno === null) {
      router.replace("/auth/alumno");
    }else{
			if (user !== null && alumno === null) {
				router.push("/admin");
			}else if (alumno !== null && user === null) {
				router.replace("/alumno");
			}
    }
	}, [user, alumno, router]);
	return <></>;
}
