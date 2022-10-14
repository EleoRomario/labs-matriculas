import { Breadcrumbs, Radio } from "@material-tailwind/react";
import { HomeSimpleDoor } from "iconoir-react";
import Link from "next/link";
import { AlumnoLayout } from "../../../components/Layout/alumno/AlumnoLayout";
import { Week } from "../../../components/Week/Week";
// import { useMatricula } from "../../../hook/alumno/useMatricula";

export default function Matricula({ alumno }) {
	// const { laboratorios } = alumno[0];

	// const { getCursos } = useMatricula();

	// const cursos = getCursos(laboratorios);

	return (
		<AlumnoLayout>
			<Breadcrumbs fullWidth>
				<Link href="/alumno">
					<a className="opacity-60">
						<HomeSimpleDoor />{" "}
					</a>
				</Link>
				<a>Cursos </a>
			</Breadcrumbs>
			<div className="border border-gray-200 rounded-lg w-full p-2 overflow-y-scroll">
				<div className="p-2">
					<h1 className="text-gray-700">Selecciona los grupos en los que quieres matricularte:</h1>
					<div className="flex flex-col gap-2">
						<div className="rounded border border-teal-500 p-2 border-l-4">
							<h1>Curso 1</h1>
							<div>
								<Radio id="radio-1" name="radio" label="A"/>
								<Radio id="radio-1" name="radio" label="B"/>
								<Radio id="radio-1" name="radio" label="C"/>
							</div>
						</div>
					</div>
				</div>
				<Week />
			</div>
		</AlumnoLayout>
	);
}

export const getServerSideProps = async (context) => {
	const { params } = context;
	const { idUser } = params;

	const res = await fetch(
		`${process.env.API_URL}/api/laboratorios/alumno/${idUser}`
	);
	const alumno = await res.json();

	return {
		props: {
			idUser,
			alumno,
		},
	};
};
