import { Breadcrumbs, Button, Input } from "@material-tailwind/react";
import { GridAdd, HomeSimpleDoor, SaveFloppyDisk } from "iconoir-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Grupo } from "../../../../../components/Grupos/Grupo";
import { AdminLayout } from "../../../../../components/Layout/admin/AdminLayout";
import { Loading } from "../../../../../components/Loading/Loading";
import { useCursos } from "../../../../../hook/useCursos";

export default function Editar({ año, curso }) {
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

	const {
		nombre,
		grupos,
		handleInputChange,
		updateCurso,
		loadingSaveCurso,
		setFormData,
	} = useCursos();

	const onSubmitCurso = async (e) => {
		e.preventDefault();
		const upCurso = {
      nombre,
			año,
			grupos: cardGrupos,
		};
		await updateCurso(curso.id, upCurso);
	};

  const [cardGrupos, setCardGrupos] = useState([
		{
			nombre: "",
			docente: "",
			capacidad: "",
			horario: {
				dia: "",
				horaInicio: "",
				horaFin: "",
			},
		},
  ]);

  const handleChange = (index, e) => {
		const data = [...cardGrupos];
		data[index][e.target.name] = e.target.value;
		setCardGrupos(data);
  };
  const handleSelectChange = (index, name, e) => {
		const data = [...cardGrupos];
		data[index][name] = e;
		setCardGrupos(data);
  };
  const handleHorarioChange = (index, name, e) => {
		const data = [...cardGrupos];
		data[index].horario[name] = e;
		setCardGrupos(data);
  };
  const addGrupo = () => {
		const newCardGrupos = [...cardGrupos];
		newCardGrupos.push({
			nombre: "",
			docente: "",
			capacidad: "",
			horario: {
				dia: "",
				horaInicio: "",
				horaFin: "",
			},
		});
		setCardGrupos(newCardGrupos);
  };

	useEffect(() => {
		const { nombre, grupos } = curso;
		setFormData({ nombre, grupos });
    setCardGrupos(grupos);
	}, []);

	return (
		<AdminLayout>
			<Breadcrumbs fullWidth>
				<Link href="/admin">
					<a className="opacity-60">
						<HomeSimpleDoor />{" "}
					</a>
				</Link>
				<Link href="/admin/cursos">
					<a className="opacity-60">Cursos </a>
				</Link>
				<Link href={`/admin/cursos/${año}`}>
					<a className="opacity-60">{añoString}</a>
				</Link>
				<a>Editar Curso</a>
			</Breadcrumbs>
			<div className="w-full flex flex-col items-center gap-3 border border-gray-100 p-4 rounded">
				<h1 className="font-medium">Editar Datos Generales</h1>
				<div className="w-full h-[1px] bg-blue-gray-100" />
				<form
					onSubmit={onSubmitCurso}
					className="w-full flex flex-col items-center gap-3"
				>
					<Input
						label="Nombre"
						name="nombre"
						required
						value={nombre}
						onChange={handleInputChange}
					/>
					<div className="w-full border border-teal-100 p-4 text-teal-200">
						<div className="flex w-full justify-between items-center">
							Grupos{" "}
							<Button
								as="div"
								onClick={() => addGrupo()}
								className="bg-white text-teal-300 border flex items-center gap-2 border-teal-400"
							>
								<GridAdd />
								Crear nuevo grupo
							</Button>
						</div>
						<div className="w-full h-[1px] bg-teal-100 my-2" />
						<div className="w-full flex flex-col gap-5">
							{cardGrupos.map((grupo, index) => {
								return (
									<Grupo
										data={grupo}
										key={index}
										index={index}
										cardGrupos={cardGrupos}
										setCardGrupos={setCardGrupos}
										handleChange={handleChange}
										handleSelectChange={handleSelectChange}
										handleHorarioChange={
											handleHorarioChange
										}
									/>
								);
							})}
						</div>
					</div>
					<Button
						className="w-[100] flex gap-2"
						type="submit"
						disabled={loadingSaveCurso}
					>
						{!loadingSaveCurso ? (
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
					</Button>
				</form>
			</div>
		</AdminLayout>
	);
}

export const getServerSideProps = async (context) => {
	const { params } = context;
	const { año, idCurso } = params;

	const res = await fetch(
		`http://localhost:3000/api/cursos/${año}/${idCurso}`
	);
	const curso = await res.json();

	return {
		props: {
			año,
			curso,
		},
	};
};
