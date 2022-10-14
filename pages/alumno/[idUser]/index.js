import { Breadcrumbs, Button, Radio } from "@material-tailwind/react";
import { BookmarkBook, Check, HomeSimpleDoor } from "iconoir-react";
import Link from "next/link";
import { AlumnoLayout } from "../../../components/Layout/alumno/AlumnoLayout";
import { Week } from "../../../components/Week/Week";
import { useMatricula } from "../../../hook/alumno/useMatricula";

export default function Matricula({ alumno }) {
	const { laboratorios } = alumno[0];

	const { cursos, getCursos } = useMatricula();

	console.log("🚀 ~ file: index.js ~ line 17 ~ Matricula ~ cursos", cursos)


	return (
		<AlumnoLayout>
			<Breadcrumbs fullWidth>
				<Link href="/alumno">
					<a className="opacity-60">
						<HomeSimpleDoor />{" "}
					</a>
				</Link>
				<a>Cursos</a>
			</Breadcrumbs>
			<div className="border border-gray-200 rounded-lg w-full p-2 overflow-y-scroll">
				<div className="p-2 flex flex-col gap-4 justify-start">
					<h1 className="text-gray-700">
						Selecciona los grupos en los que quieres matricularte:
					</h1>
					<Button
						className="flex items-center bg-light-blue-600 max-w-fit font-extralight gap-2"
						onClick={() => getCursos(laboratorios)}
					>
						<BookmarkBook />
						Ver mis cursos
					</Button>
					<div className="flex flex-col gap-2 ">
						{cursos.length > 0 ? (
							cursos.map(({ nombre, grupos, color }, indexC) => (
								<div
									style={{ borderLeftColor: color }}
									className={`rounded border p-2 border-l-8 border-gray-300 text-gray-600`}
									key={indexC}
								>
									<h1>{nombre}</h1>
									<div>
										{grupos.map(({ nombre }, index) => (
											<Radio
												color="light-blue"
												key={index}
												id="radio-1"
												name={indexC}
												label={nombre}
												icon ={
													<Check />
												}
											/>
										))}
									</div>
								</div>
							))
						) : (
							<></>
						)}
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
