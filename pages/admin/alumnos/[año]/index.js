import {
	Breadcrumbs,
	Button,
	Dialog,
	Popover,
	PopoverContent,
	PopoverHandler,
} from "@material-tailwind/react";
import {
	AddUser,
	HomeSimpleDoor,
	Trash,
	User,
	WarningTriangleOutline,
} from "iconoir-react";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AdminLayout } from "../../../../components/Layout/admin/AdminLayout";
import { useAlumnos } from "../../../../hook/useAlumnos";

export default function Año({ año, alumnos }) {
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

	const [open, setOpen] = useState(false);
	const [idUser, setIdUser] = useState(null);

  const {deleteAlumno, loadingDeleteAlumno} = useAlumnos();

	const onDelete = async (id) => {
    await deleteAlumno(id);
	};

	return (
		<AdminLayout>
			<Dialog
				open={open}
				handler={() => {
					setOpen(!open);
					setIdUser(null);
				}}
				animate={{
					mount: { scale: 1, y: 0 },
					unmount: { scale: 0.9, y: -100 },
				}}
				className="p-4 flex flex-col gap-3 items-center"
			>
				<div className="flex gap-2 flex-row items-center">
					<WarningTriangleOutline color="red" className="" />
					<p>¿Estás seguro de eliminar este alumno?</p>
				</div>
				<div className="flex justify-end gap-2 mt-4">
					<Button
						variant="outlined"
						color="gray"
						size="sm"
						ripple="dark"
						onClick={() => {
							setOpen(!open);
							setIdUser(null);
						}}
					>
						Cancelar
					</Button>
					<Button
						color="red"
						size="sm"
						ripple="dark"
						onClick={() => {
							onDelete(idUser);
							setOpen(!open);
							setIdUser(null);
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
				<Link href="/admin/alumnos">
					<a className="opacity-60">Alumnos </a>
				</Link>
				<a>{añoString} </a>
			</Breadcrumbs>
			<div className="w-full flex flex-col gap-3 border border-gray-100 p-4 rounded">
				<div className="w-full flex justify-between items-center">
					<p>Alumnos del {añoString}</p>
					<Link href={`/admin/alumnos/${año}/nuevo`}>
						<Button
							as="a"
							variant="outlined"
							className="flex gap-2"
						>
							<AddUser />
							Agregar nuevo alumno
						</Button>
					</Link>
				</div>
				<div className="w-full h-[1px] bg-blue-gray-100" />
				<div className="w-full flex flex-col gap-3">
					{alumnos.map((alumno) => (
						<div
							key={alumno.id}
							className="border border-gray-100 py-2 px-4 rounded cursor-pointer hover:bg-cyan-50 capitalize flex justify-between items-center"
						>
							{" "}
							<div>
								<Popover placement="top-start">
									<PopoverHandler>
										<div className="w-full">
											<div className="text-gray-600 flex gap-2 hover:text-cyan-800">
												<User />
												{alumno.nombre}
											</div>
										</div>
									</PopoverHandler>
									<PopoverContent>
										<p className="flex gap-2 capitalize text-cyan-800">
											<span className="font-medium">
												Nombre:
											</span>
											{alumno.nombre}
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
							<Button
								variant="outlined"
								className="flex p-1 gap-1 font-thin items-center border-red-100 text-red-100 hover:bg-red-400 hover:border-red-400 hover:text-white"
								onClick={() => {
									setOpen(!open);
									setIdUser(alumno.id);
								}}
							>
								<Trash /> Eliminar
							</Button>
						</div>
					))}
				</div>
			</div>
		</AdminLayout>
	);
}

export const getServerSideProps = async (context) => {
	const { params } = context;
	const { año } = params;

	const res = await fetch(`http://localhost:3000/api/alumnos/${año}`);
	const alumnos = await res.json();

	return {
		props: {
			año,
			alumnos,
		},
	};
};
