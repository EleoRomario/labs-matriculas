import { Breadcrumbs } from "@material-tailwind/react";
import { HomeSimpleDoor } from "iconoir-react";
import Link from "next/link";
import { AdminLayout } from "../../../../components/Layout/admin/AdminLayout";

export default function Año({ año }) {

  const añoString = año === "1" ? "Primer año" : año === "2" ? "Segundo año" : año === "3" ? "Tercer año" : año === "4" ? "Cuarto año" : "Quinto año";

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
			<h1>{año}</h1>
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
