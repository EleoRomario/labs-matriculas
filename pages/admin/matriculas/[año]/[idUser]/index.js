import { Breadcrumbs, Checkbox, Tab, TabPanel, Tabs, TabsBody, TabsHeader } from "@material-tailwind/react";
import { HomeSimpleDoor } from "iconoir-react";
import Link from "next/link";
import { AdminLayout } from "../../../../../components/Layout/admin/AdminLayout";

export default function Alumno({ año, alumno, cursos }) {
	const { nombre, apellido, cui, correo } = alumno;
	const { cursosPrimero, cursosSegundo, cursosTercero, cursosCuarto, cursosQuinto } = cursos;

	const años = [
		{ value: "1"},
		{ value: "2"},
		{ value: "3"},
		{ value: "4"},
		{ value: "5"},
	];

	

	return (
		<AdminLayout>
			<Breadcrumbs fullWidth>
				<Link href="/admin">
					<a className="opacity-60">
						<HomeSimpleDoor />{" "}
					</a>
				</Link>
				<Link href="/admin/matriculas">
					<a className="opacity-60">Años </a>
				</Link>
				<Link href={`/admin/matriculas/${año}`}>
					<a className="opacity-60">Alumnos ({año})</a>
				</Link>
				<a className="capitalize"> {nombre} </a>
			</Breadcrumbs>
			<div className="w-full flex flex-col gap-3 border border-gray-100 p-4 rounded overflow-y-scroll text-gray-600">
				<h1 className="font-medium">Datos generales</h1>
				<div className="flex flex-col">
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
				<div>
					<h1 className="font-medium">Asignar los cursos</h1>
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
									{cursosPrimero.map((curso,index) => (
										<Checkbox key={index} id={curso.nombre} label={curso.nombre} size="regular" />
									))}
									</div>
							</TabPanel>
							<TabPanel value="2">
								<div className="flex flex-col gap-3">
									{cursosSegundo.map((curso,index) => (
										<Checkbox key={index} id={curso.nombre} label={curso.nombre} size="regular" />
									))}
									</div>
							</TabPanel>
							<TabPanel value="3">
								<div className="flex flex-col gap-3">
									{cursosTercero.map((curso,index) => (
										<Checkbox key={index} id={curso.nombre} label={curso.nombre} size="regular" />
									))}
									</div>
							</TabPanel>
							<TabPanel value="4">
								<div className="flex flex-col gap-3">
									{cursosCuarto.map((curso,index) => (
										<Checkbox key={index} id={curso.nombre} label={curso.nombre} size="regular" />
									))}
									</div>
							</TabPanel>
							<TabPanel value="5">
								<div className="flex flex-col gap-3">
									{cursosQuinto.map((curso,index) => (
										<Checkbox key={index} id={curso.nombre} label={curso.nombre} size="regular" />
									))}
									</div>
							</TabPanel>
						</TabsBody>
					</Tabs>
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
	
	const cursos = {cursosPrimero, cursosSegundo, cursosTercero, cursosCuarto, cursosQuinto};

	const alumno = await res.json();

	return {
		props: {
			año,
			alumno,
			cursos,
		},
	};
};
