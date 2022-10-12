import { Breadcrumbs, Button } from "@material-tailwind/react";
import { Group, HomeSimpleDoor, NavArrowLeft } from "iconoir-react";
import Link from "next/link";
import { AdminLayout } from "../../../components/Layout/admin/AdminLayout";

export default function Alumnos() {
  return (
		<AdminLayout>
			<Breadcrumbs fullWidth>
				<Link href="/admin">
					<a className="opacity-60">
						<HomeSimpleDoor />{" "}
					</a>
				</Link>
				<a>Alumnos </a>
			</Breadcrumbs>
			<div className="w-full flex flex-col gap-3 border border-gray-100 p-4 rounded">
				<Link href="/admin/alumnos/1">
					<a className="flex flex-row gap-2 items-center text-lime-800 hover:text-lime-900 p-2 border border-l-4 rounded bg-lime-50 cursor-pointer border-lime-100 hover:bg-lime-100 hover:border-lime-200">
						<Group />
						Primer año
					</a>
				</Link>
				<Link href="/admin/alumnos/2">
					<a className="flex flex-row gap-2 items-center text-green-800 hover:text-green-900 p-2 border border-l-4 rounded bg-green-50 cursor-pointer border-green-100 hover:bg-green-100 hover:border-green-200">
						<Group />
						Segundo año
					</a>
				</Link>
				<Link href="/admin/alumnos/3">
					<a className="flex flex-row gap-2 items-center text-teal-800 hover:text-teal-900 p-2 border border-l-4 rounded bg-teal-50 cursor-pointer border-teal-100 hover:bg-teal-100 hover:border-teal-200">
						<Group />
						Tercer año
					</a>
				</Link>
				<Link href="/admin/alumnos/4">
					<a className="flex flex-row gap-2 items-center text-cyan-800 hover:text-cyan-900 p-2 border border-l-4 rounded bg-cyan-50 cursor-pointer border-cyan-100 hover:bg-cyan-100 hover:border-cyan-200">
						<Group />
						Cuarto año
					</a>
				</Link>
				<Link href="/admin/alumnos/5">
					<a className="flex flex-row gap-2 items-center text-indigo-800 hover:text-indigo-900 p-2 border border-l-4 rounded bg-indigo-50 cursor-pointer border-indigo-100 hover:bg-indigo-100 hover:border-indigo-200">
						<Group />
						Quinto año
					</a>
				</Link>
			</div>
		</AdminLayout>
  );
}