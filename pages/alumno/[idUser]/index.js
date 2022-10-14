import { Breadcrumbs } from '@material-tailwind/react'
import { HomeSimpleDoor } from 'iconoir-react'
import Link from 'next/link'
import { AlumnoLayout } from '../../../components/Layout/alumno/AlumnoLayout'
import { useMatricula } from '../../../hook/alumno/useMatricula'

export default function Matricula({alumno}) {

	const {laboratorios} = alumno[0]

	const { getCursos } = useMatricula();
	
	const cursos = getCursos(laboratorios); 
	console.log("🚀 ~ file: index.js ~ line 15 ~ Matricula ~ cursos", cursos)
	


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
		</AlumnoLayout>
  );
}


export const getServerSideProps = async (context) => {
	const { params } = context;
	const { idUser } = params;

	const res = await fetch(`${process.env.API_URL}/api/laboratorios/alumno/${idUser}`);
	const alumno = await res.json();

	return {
		props: {
			idUser,
			alumno,
		},
	};
};