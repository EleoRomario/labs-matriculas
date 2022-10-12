import { Button, Tooltip, Typography } from "@material-tailwind/react";
import { LogOut, PasteClipboard, UserScan } from "iconoir-react";
import Link from "next/link";
import { useAuthContext } from "../../auth/AuthContext";
import { CardLayout } from "../../components/Layout/CardLayout";

export default function Alumno() {
	const { alumno, logoutAlumno } = useAuthContext();

	return (
		<CardLayout>
			<Tooltip
				animate={{
					mount: { scale: 1, y: 0 },
					unmount: { scale: 0, y: 25 },
				}}
				placement="bottom-start"
				content="Cerrar sesión"
			>
				<Button
					onClick={logoutAlumno}
					color="red"
					variant="outlined"
					className="p-2 absolute top-2 left-2"
				>
					<LogOut />
				</Button>
			</Tooltip>
			<div className="w-100 flex flex-col items-center gap-4 py-8">
				<UserScan
					color="white"
					height={80}
					width={80}
					strokeWidth={0.5}
					className="bg-unsa-50 rounded-2xl p-2"
				/>
				<Typography as="h1" className="text-unsa text-2xl text-center">
					{alumno.displayName}
				</Typography>
			</div>
			<div className="w-100 h-100 flex flex-col items-center">
				<Link href="/alumno/matricula">
					<Button
						as="a"
						color="blue"
						className="flex justify-center items-center gap-2"
					>
						<PasteClipboard />
						<span className="font-light">Ver mis cursos</span>
					</Button>
				</Link>
			</div>
		</CardLayout>
	);
}
