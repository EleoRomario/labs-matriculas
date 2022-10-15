import {
	Alert,
	Button,
	Dialog,
	Popover,
	PopoverContent,
	PopoverHandler,
} from "@material-tailwind/react";
import {
	BookmarkBook,
	PasteClipboard,
	Trash,
	WarningTriangleOutline,
} from "iconoir-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../auth/AuthContext";
import { AlumnoLayout } from "../../components/Layout/alumno/AlumnoLayout";
import { WeekView } from "../../components/Week/WeekView";
import { useMatricula } from "../../hook/alumno/useMatricula";

export default function Alumno() {
	const { alumno } = useAuthContext();
	const { getMatricula, matricula, deleteMatricula } = useMatricula();

	useEffect(() => {
		getMatricula(alumno.uid);
	}, [matricula]);
	const [open, setOpen] = useState(false);
	const [idUser, setIdMatricula] = useState(null);

	const onDelete = async (id) => {
		await deleteMatricula(id);
	};

	return (
		<AlumnoLayout>
			<Dialog
				open={open}
				handler={() => {
					setOpen(!open);
					setIdMatricula(null);
				}}
				animate={{
					mount: { scale: 1, y: 0 },
					unmount: { scale: 0.9, y: -100 },
				}}
				className="p-4 flex flex-col gap-3 items-center"
			>
				<div className="flex gap-2 flex-row items-center">
					<WarningTriangleOutline color="red" className="" />
					<p>¿Estás seguro de eliminar este curso?</p>
				</div>
				<div className="flex justify-end gap-2 mt-4">
					<Button
						variant="outlined"
						color="gray"
						size="sm"
						onClick={() => {
							setOpen(!open);
							setIdMatricula(null);
						}}
					>
						Cancelar
					</Button>
					<Button
						color="red"
						size="sm"
						onClick={() => {
							onDelete(idUser);
							setOpen(!open);
							setIdMatricula(null);
						}}
					>
						Eliminar
					</Button>
				</div>
			</Dialog>
			{matricula !== undefined ? (
				<div className="border border-gray-200 rounded-lg w-full p-2 overflow-y-scroll flex flex-col gap-4">
					<div className="flex flex-col gap-2">
						<div className="flex flex-row gap-2 justify-between">
							<h1 className="text-gray-800 font-medium text-[1.3rem]">
								Datos personales:
							</h1>
							<Button
								variant="outlined"
								color="red"
								type="button"
								className="flex gap-2 items-center"
								onClick={() => {
									setOpen(!open);
									setIdMatricula(alumno.uid);
								}}
							>
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
						Aun no estas matriculado en ningun curso
					</p>
				</div>
			)}
		</AlumnoLayout>
	);
}
