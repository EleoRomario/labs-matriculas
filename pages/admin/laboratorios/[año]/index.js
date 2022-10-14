import {
	Breadcrumbs,
	Button,
	Dialog,
	Popover,
	PopoverContent,
	PopoverHandler,
	Tooltip,
} from "@material-tailwind/react";
import {
	Check,
	HomeSimpleDoor,
	MultiplePagesDelete,
	PasteClipboard,
	User,
	WarningTriangleOutline,
} from "iconoir-react";
import Link from "next/link";
import { useState } from "react";
import { AdminLayout } from "../../../../components/Layout/admin/AdminLayout";
import { useLaboratorio } from "../../../../hook/useLaboratorio";

export default function Año({ año, laboratorios }) {
	const añoString =
		año === "1"
			? "Primer año"
			: año === "2"
			? "Segundo año"
			: año === "3"
			? "Tercer año"
			: año === "4"
			? "Cuarto año"
			: "Quinto año";

	const { deleteLaboratorio } = useLaboratorio();
	const [open, setOpen] = useState(false);
	const [idUser, setIdLaboratorio] = useState(null);

	const onDelete = async (id) => {
		await deleteLaboratorio(id);
	}

	return (
		<AdminLayout>
			<Dialog
				open={open}
				handler={() => {
					setOpen(!open);
					setIdLaboratorio(null);
				}}
				animate={{
					mount: { scale: 1, y: 0 },
					unmount: { scale: 0.9, y: -100 },
				}}
				className="p-4 flex flex-col gap-3 items-center"
			>
				<div className="flex gap-2 flex-row items-center">
					<WarningTriangleOutline color="red" className="" />
					<p>
						¿Estás seguro de eliminar esta asignacion de
						laboratorio?
					</p>
				</div>
				<div className="flex justify-end gap-2 mt-4">
					<Button
						variant="outlined"
						color="gray"
						size="sm"
						onClick={() => {
							setOpen(!open);
							setIdLaboratorio(null);
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
							setIdLaboratorio(null);
						}}
					>
						Eliminar
					</Button>
				</div>
			</Dialog>
			<Breadcrumbs fullWidth>
				<Link href="/admin">
					<a className="opacity-60">
						<HomeSimpleDoor />{" "}
					</a>
				</Link>
				<Link href="/admin/laboratorios">
					<a className="opacity-60">Años</a>
				</Link>
				<a>Alumnos ({año}) </a>
			</Breadcrumbs>
			<div className="w-full flex flex-col gap-3 border border-gray-100 p-4 rounded overflow-y-scroll">
				<div className="w-full flex justify-between items-center">
					<h1 className="flex flex-row gap-2 text-green-600">
						<Check /> Alumnos de {añoString.toLowerCase()} con
						laboratorios asignados
					</h1>
					<Link href={`/admin/laboratorios/${año}/alumnos`}>
						<a className="flex items-center gap-2 border border-green-400 p-1 rounded text-green-400 hover:bg-green-400 hover:text-white">
							<PasteClipboard /> Asignar nuevo
						</a>
					</Link>
				</div>
				<div className="w-full h-[1px] bg-blue-gray-100" />
				<div className="w-full flex flex-col gap-3">
					{laboratorios.length > 0 ? (
						laboratorios.map((alumno) => (
							<div
								key={alumno.id}
								className="border border-gray-100 py-2 px-4 rounded cursor-pointer hover:bg-gray-50 capitalize flex justify-between items-center"
							>
								{" "}
								<div>
									<Popover placement="top-start">
										<PopoverHandler>
											<div className="w-full">
												<div className="text-gray-600 flex gap-2 hover:text-cyan-800">
													<User />
													{alumno.nombre}{" "}
													{alumno.apellido}
												</div>
											</div>
										</PopoverHandler>
										<PopoverContent className="bg-cyan-100">
											<p className="flex gap-2 capitalize text-cyan-800">
												<span className="font-medium">
													Nombre:
												</span>
												{alumno.nombre}
											</p>
											<p className="flex gap-2 capitalize text-cyan-800">
												<span className="font-medium">
													Apellido:
												</span>
												{alumno.apellido}
											</p>
											<p className="flex gap-2 capitalize text-cyan-800">
												<span className="font-medium">
													CUI:
												</span>
												{alumno.cui}
											</p>
											<p className="flex gap-2 text-cyan-800">
												<span className="font-medium">
													Email:
												</span>
												{alumno.correo}
											</p>
										</PopoverContent>
									</Popover>
								</div>
								<div className="flex flex-raw items-center gap-2 text-green-700">
									<Check />
									<h1>Asignado</h1>
									<Tooltip content="Eliminar">
										<a
											className="flex gap-2 border border-red-200 p-1 rounded hover:bg-red-400 hover:text-white text-red-200"
											onClick={() => {setOpen(!open);
												setIdLaboratorio(alumno.id);}}
										>
											<MultiplePagesDelete />
										</a>
									</Tooltip>
								</div>
							</div>
						))
					) : (
						<div className="text-center text-gray-500">
							<p>No hay alumnos registrados en este año</p>
						</div>
					)}
				</div>
			</div>
		</AdminLayout>
	);
}

export const getServerSideProps = async (context) => {
	const { params } = context;
	const { año } = params;

	const res = await fetch(`${process.env.API_URL}/api/laboratorios/${año}`);
	const laboratorios = await res.json();

	return {
		props: {
			año,
			laboratorios,
		},
	};
};
