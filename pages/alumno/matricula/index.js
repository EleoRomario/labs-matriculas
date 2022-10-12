import { Button } from "@material-tailwind/react";
import { NavArrowLeft } from "iconoir-react";
import Link from "next/link";
import { AlumnoLayout } from "../../../components/Layout/alumno/AlumnoLayout";

export default function Matricula() {
	return (
		<AlumnoLayout>
    <Link href="/alumno">
			<Button
      as="a"
				variant="outlined"
				className="bg-transparent text-gray-700 font-extralight flex flex-row p-1 border border-gray-500 _focus:outline-none _focus:border-1"
			>
				<NavArrowLeft /> Atras
			</Button>
      </Link>
		</AlumnoLayout>
	);
}
