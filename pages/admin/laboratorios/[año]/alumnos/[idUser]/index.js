import {
	Breadcrumbs,
	Checkbox,
	Tab,
	TabPanel,
	Tabs,
	TabsBody,
	TabsHeader,
} from "@material-tailwind/react";
import { ClipboardCheck, HomeSimpleDoor, SaveFloppyDisk } from "iconoir-react";
import Link from "next/link";
import { AdminLayout } from "../../../../../../components/Layout/admin/AdminLayout";
import { Loading } from "../../../../../../components/Loading/Loading";
import { useLaboratorio } from "../../../../../../hook/useLaboratorio";

export default function Alumno({ año, alumno, cursos }) {
	const { nombre, apellido, cui, correo } = alumno;
	const {
		cursosPrimero,
		cursosSegundo,
		cursosTercero,
		cursosCuarto,
		cursosQuinto,
	} = cursos;

	const años = [
		{ value: "1" },
		{ value: "2" },
		{ value: "3" },
		{ value: "4" },
		{ value: "5" },
	];

	const {
		addCurso,
		cursos: cursosMatriculados,
		deleteCurso,
		addLaboratorio,
		loading,
	} = useLaboratorio();

	const checkCurso = (curso, e) => {
		if (e.target.checked) {
			const { id, nombre, año } = curso;
			addCurso({ id, nombre, año });
		} else {
			deleteCurso(curso.id);
		}
	};

	const onSubmit = async () => {
		const laboratorio = {
			...alumno,
			laboratorios: cursosMatriculados,
		};
		await addLaboratorio(laboratorio);
	};

	return (
		<AdminLayout>
			<Breadcrumbs fullWidth>
				<Link href="/admin">
					<a className="opacity-60">
						<HomeSimpleDoor />{" "}
					</a>
				</Link>
				<Link href="/admin/laboratorios">
					<a className="opacity-60">Años</a>
				</Link>
				<Link href={`/admin/laboratorios/${año}`}>
					<a className="opacity-60">Alumnos ({año}) </a>
				</Link>
				<Link href={`/admin/laboratorios/${año}/alumnos`}>
					<a className="opacity-60">Alumnos</a>
				</Link>
				<a className="capitalize"> {nombre} </a>
			</Breadcrumbs>
			<div className="w-full flex flex-col items-center gap-3 border border-gray-100 p-4 rounded overflow-y-scroll text-gray-600">
				<h1 className="font-medium">Datos generales</h1>
				<div className="flex flex-col w-full">
					<h2 className="capitalize text-sm">
						<span className="font-medium">Nombre: </span>
						{nombre}
					</h2>
					<h2 className="capitalize text-sm">
						<span className="font-medium">Apellido: </span>
						{apellido}
					</h2>
					<h2 className="text-sm">
						<span className="font-medium">Correo: </span>
						{correo}
					</h2>
					<h2 className="capitalize text-sm">
						<span className="font-medium">CUI: </span>
						{cui}
					</h2>
				</div>
				<div className="border border-gray-500 w-full">
					<h1 className="font-medium bg-gray-500 p-2 text-white">
						Asignar los cursos
					</h1>
					<Tabs value={año}>
						<TabsHeader>
							{años.map(({ value }) => (
								<Tab key={value} value={value}>
									{value} °
								</Tab>
							))}
						</TabsHeader>
						<TabsBody>
							<TabPanel value="1">
								<div className="flex flex-col gap-3">
									{cursosPrimero.map((curso, index) => (
										<Checkbox
											key={index}
											id={curso.nombre}
											label={curso.nombre}
											onChange={(e) =>
												checkCurso(curso, e)
											}
										/>
									))}
								</div>
							</TabPanel>
							<TabPanel value="2">
								<div className="flex flex-col gap-3">
									{cursosSegundo.map((curso, index) => (
										<Checkbox
											key={index}
											id={curso.nombre}
											label={curso.nombre}
											onChange={(e) =>
												checkCurso(curso, e)
											}
										/>
									))}
								</div>
							</TabPanel>
							<TabPanel value="3">
								<div className="flex flex-col gap-3">
									{cursosTercero.map((curso, index) => (
										<Checkbox
											key={index}
											id={curso.nombre}
											label={curso.nombre}
											onChange={(e) =>
												checkCurso(curso, e)
											}
										/>
									))}
								</div>
							</TabPanel>
							<TabPanel value="4">
								<div className="flex flex-col gap-3">
									{cursosCuarto.map((curso, index) => (
										<Checkbox
											key={index}
											id={curso.nombre}
											label={curso.nombre}
											onChange={(e) =>
												checkCurso(curso, e)
											}
										/>
									))}
								</div>
							</TabPanel>
							<TabPanel value="5">
								<div className="flex flex-col gap-3">
									{cursosQuinto.map((curso, index) => (
										<Checkbox
											key={index}
											id={curso.nombre}
											label={curso.nombre}
											onChange={(e) =>
												checkCurso(curso, e)
											}
										/>
									))}
								</div>
							</TabPanel>
						</TabsBody>
					</Tabs>
				</div>
				<div className="flex flex-col gap-3 shadow p-2 border border-teal-400 rounded w-full">
					<h1 className="font-medium text-lg text-teal-600">
						Cursos asignados
					</h1>
					{cursosMatriculados.length > 0 ? (
						cursosMatriculados.map(({ nombre }, index) => (
							<h1 key={index} className="flex gap-2 items-center">
								<ClipboardCheck className="text-green-700" />{" "}
								{nombre}
							</h1>
						))
					) : (
						<h1>No hay cursos seleccionados</h1>
					)}
				</div>
				<div
					className="w-[100] flex gap-2 bg-unsa-500 hover:bg-unsa-600 text-white p-2 rounded cursor-pointer"
					onClick={() => onSubmit()}
				>
					{!loading ? (
						<>
							<SaveFloppyDisk />
							Guardar informacion{" "}
						</>
					) : (
						<>
							<Loading />
							Guardando...
						</>
					)}
				</div>
			</div>
		</AdminLayout>
	);
}

export const getServerSideProps = async (context) => {
	const { params } = context;
	const { año, idUser } = params;

	const res = await fetch(
		`${process.env.API_URL}/api/alumnos/${año}/${idUser}`
	);

	const primerAño = await fetch(`${process.env.API_URL}/api/cursos/1`);
	const segundoAño = await fetch(`${process.env.API_URL}/api/cursos/2`);
	const tercerAño = await fetch(`${process.env.API_URL}/api/cursos/3`);
	const cuartoAño = await fetch(`${process.env.API_URL}/api/cursos/4`);
	const quintoAño = await fetch(`${process.env.API_URL}/api/cursos/5`);

	const cursosPrimero = await primerAño.json();
	const cursosSegundo = await segundoAño.json();
	const cursosTercero = await tercerAño.json();
	const cursosCuarto = await cuartoAño.json();
	const cursosQuinto = await quintoAño.json();

	const cursos = {
		cursosPrimero,
		cursosSegundo,
		cursosTercero,
		cursosCuarto,
		cursosQuinto,
	};

	const alumno = await res.json();

	return {
		props: {
			año,
			alumno,
			cursos,
		},
	};
};
