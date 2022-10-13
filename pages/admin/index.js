import { Book, DashboardSpeed, Group } from "iconoir-react";
import Link from "next/link";
import { useAuthContext } from "../../auth/AuthContext";
import { AdminLayout } from "../../components/Layout/admin/AdminLayout";

export default function Admin() {

  return (
		<AdminLayout>
			<h1 className="w-full bg-unsa-200 text-white p-2 rounded flex gap-2 items-center"> <DashboardSpeed /> Dashboard</h1>
			<div className="flex flex-row flex-wrap items-center justify-center gap-4 border border-gray-200 rounded w-full p-2">
				<Link href="/admin/alumnos">
					<a className="flex gap-2 w-52 border border-gray-300 rounded border-l-4 p-4 hover:border-unsa-100 cursor-pointer text-gray-600 hover:text-unsa-100">
						<Group />
						Alumnos
					</a>
				</Link>
				<Link href="/admin/cursos">
					<a className="flex gap-2 w-52 border border-gray-300 rounded border-l-4 p-4 hover:border-unsa-100 cursor-pointer text-gray-600 hover:text-unsa-100">
						<Book />
						Cursos
					</a>
				</Link>
			</div>
		</AdminLayout>
  );
}