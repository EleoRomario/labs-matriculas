import {
	Breadcrumbs,
	Button,
	Dialog,
	IconButton,
	Tooltip,
} from "@material-tailwind/react";
import {
	DoubleCheck,
	HomeSimpleDoor,
	Trash,
  WarningTriangleOutline,
} from "iconoir-react";
import Link from "next/link";
import { useState } from "react";
import { AdminLayout } from "../../../../components/Layout/admin/AdminLayout";
import { useMatriculas } from "../../../../hook/useMatriculas";


export default function Año({ año, matriculas }) {
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
		const [idMatricula, setIdMatricula] = useState(null);

      const { deleteMatricula } = useMatriculas()

      const onDelete = async (id) => {
        await deleteMatricula(id)
      }

	return (
		<AdminLayout>
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
					<p>¿Estás seguro de eliminar esta matricula?</p>
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
							onDelete(idMatricula);
							setOpen(!open);
							setIdMatricula(null);
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
				<Link href="/admin/matriculas">
					<a className="opacity-60">Matriculas </a>
				</Link>
				<a>{añoString} </a>
			</Breadcrumbs>
			<div className="w-full flex flex-col gap-3 border border-gray-100 p-4 rounded overflow-y-scroll">
				<div className="w-full flex justify-between items-center">
					<p>Matriculas de alumnos de {añoString}</p>
				</div>
				<div className="w-full h-[1px] bg-blue-gray-100" />
				<div className="w-full flex flex-col gap-3">
					{matriculas.length > 0 ? (
						matriculas.map((matricula) => (
							<div
								key={matricula.id}
								className="border border-gray-100 py-2 px-4 rounded cursor-pointer hover:bg-cyan-50 capitalize flex justify-between items-center"
							>
								<div className="w-full">
									<div className="text-gray-600 flex gap-2 hover:text-cyan-800">
										<DoubleCheck />
										{matricula.nombre} {matricula.apellido}
									</div>
								</div>
								<div className="flex gap-2">
									<Tooltip
										content="Eliminar curso"
										placement="top"
										className="bg-red-200"
									>
										<IconButton
											variant="outlined"
											className="flex p-1 gap-1 font-thin items-center border-red-100 text-red-100 hover:bg-red-400 hover:border-red-400 hover:text-white"
											onClick={() => {
												setOpen(!open);
												setIdMatricula(matricula.id);
											}}
										>
											<Trash />
										</IconButton>
									</Tooltip>
								</div>
							</div>
						))
					) : (
						<div className="text-center text-gray-500">
							<p>No hay matriculas registrados en este año</p>
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

	const res = await fetch(`${process.env.API_URL}/api/matriculas/${año}`);
	const matriculas = await res.json();

	return {
		props: {
			año,
			matriculas,
		},
	};
};
