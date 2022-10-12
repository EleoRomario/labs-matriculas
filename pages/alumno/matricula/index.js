import { Button } from "@material-tailwind/react";
import { NavArrowLeft } from "iconoir-react";
import Link from "next/link";
import { CardLayout } from "../../../components/Layout/alumno/CardLayout";

export default function Matricula() {
	return (
		<CardLayout>
    <Link href="/alumno">
			<Button
      as="a"
				variant="outlined"
				className="bg-transparent text-gray-700 font-extralight flex flex-row p-1 border border-gray-500 _focus:outline-none _focus:border-1"
			>
				<NavArrowLeft /> Atras
			</Button>
      </Link>
		</CardLayout>
	);
}
