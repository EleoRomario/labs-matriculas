import { Alert, Button, Popover, PopoverContent, PopoverHandler } from "@material-tailwind/react";
import { BookmarkBook, PasteClipboard, Trash } from "iconoir-react";
import Link from "next/link";
import { useEffect } from "react";
import { useAuthContext } from "../../auth/AuthContext";
import { AlumnoLayout } from "../../components/Layout/alumno/AlumnoLayout";
import { WeekView } from "../../components/Week/WeekView";
import { useMatricula } from "../../hook/alumno/useMatricula";

export default function Alumno() {
	const { alumno } = useAuthContext();
	console.log("🚀 ~ file: index.js ~ line 11 ~ Alumno ~ alumno", alumno);
	const { getMatricula, matricula } = useMatricula();
	console.log(
		"🚀 ~ file: index.js ~ line 12 ~ Alumno ~ matricula",
		matricula
	);

	useEffect(() => {
		getMatricula(alumno.uid);
	}, []);

	return (
		<AlumnoLayout>
			{matricula !== undefined ? (
				<div className="border border-gray-200 rounded-lg w-full p-2 overflow-y-scroll flex flex-col gap-4">
					<div className="flex flex-col gap-2">
						<div className="flex flex-row gap-2 justify-between">
							<h1 className="text-gray-800 font-medium text-[1.3rem]">
								Datos personales:
							</h1>
							<Button variant="outlined" color="red" className="flex gap-2 items-center">
								Eliminar matricula <Trash />
							</Button>
						</div>
						<div className="flex flex-col gap-2">
							<span className="text-gray-700 capitalize">
								<strong>Nombre:</strong> {matricula.nombre}
							</span>
							<span className="text-gray-700 capitalize">
								<strong>Apellido:</strong> {matricula.apellido}
							</span>
							<span className="text-gray-700 ">
								<strong>Correo:</strong> {matricula.correo}
							</span>
							<span className="text-gray-700 capitalize">
								<strong>CUI:</strong> {matricula.cui}
							</span>
						</div>
					</div>
					<div className="w-full h-[3px] bg-gray-300" />
					<div className="flex flex-col gap-2">
						<h1 className="text-gray-800 font-medium text-[1.3rem]">
							Matricula:
						</h1>
						<div className="flex flex-col gap-2">
							{matricula.laboratorios.map(
								(laboratorio, index) => (
									<Popover key={index}>
										<PopoverHandler>
											<Alert
												icon={<BookmarkBook />}
												className="border border-gray-300 bg-white text-gray-600 border-l-8"
												style={{
													borderLeftColor:
														laboratorio.color,
												}}
											>
												{laboratorio.curso}
											</Alert>
										</PopoverHandler>
										<PopoverContent className="bg-teal-50">
											<div className="flex flex-col gap-2">
												<span className="text-gray-700 capitalize">
													<strong>Curso:</strong>{" "}
													{laboratorio.curso}
												</span>
												<span className="text-gray-700 capitalize">
													<strong>Docente:</strong>{" "}
													{laboratorio.docente}
												</span>
												<span className="text-gray-700 ">
													<strong>Grupo:</strong>{" "}
													{laboratorio.nombre}
												</span>
											</div>
										</PopoverContent>
									</Popover>
								)
							)}
						</div>
					</div>
					<div className="flex flex-col gap-2">
						<h1 className="text-gray-800 font-medium text-[1.3rem]">
							Horario:
						</h1>
						<div className="flex flex-col gap-2">
							<WeekView cursos={matricula.laboratorios} />
						</div>
					</div>
				</div>
			) : (
				<div>
					<Link href={`/alumno/${alumno.uid}`}>
						<Button
							as="a"
							color="blue"
							className="flex justify-center items-center gap-2"
						>
							<PasteClipboard />
							<span className="font-light">Matricularme</span>
						</Button>
					</Link>
					<p className="text-gray-500 text-lg font-light">
						Laboratorios Matriculados
					</p>
				</div>
			)}
		</AlumnoLayout>
	);
}
