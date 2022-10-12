import { Breadcrumbs, Button } from "@material-tailwind/react";
import { AddUser, HomeSimpleDoor } from "iconoir-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AdminLayout } from "../../../../components/Layout/admin/AdminLayout";
import { useAlumnos } from "../../../../hook/useAlumnos";

export default function Año({ año }) {
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

  const { getAlumnosByAño } = useAlumnos();

  const [alumnos, setAlumnos] = useState()

  const getAlumnos = async () => {
    const alumnos = await getAlumnosByAño(año);
    setAlumnos(alumnos);
  }

  useEffect(() => {
    getAlumnos();
  }, [])
  console.log("🚀 ~ file: index.js ~ line 22 ~ Año ~ alumnos", alumnos)

	return (
		<AdminLayout>
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
					<Button as="a" variant="outlined" className="flex gap-2">
						<AddUser />
						Agregar nuevo alumno
					</Button>
          </Link>
				</div>
				<div className="w-full h-[1px] bg-blue-gray-100" />
        <div className="w-full flex flex-col gap-3">
        </div>
			</div>
		</AdminLayout>
	);
}

export const getServerSideProps = async (context) => {
	const { params } = context;
	const { año } = params;

	return {
		props: {
			año,
		},
	};
};
