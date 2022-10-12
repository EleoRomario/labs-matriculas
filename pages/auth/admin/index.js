import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Typography,
	Input,
	Button,
} from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useAuthContext } from "../../../auth/AuthContext";

export default function Login() {
	const { signInUser } = useAuthContext();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		if (email && password) {
			signInUser(email, password);
		}
	};
	return (
		<Card className="w-96 h-[30rem]">
			<form onSubmit={handleSubmit}>
				<CardHeader className="pt-10 bg-transparent grid place-items-center shadow-none">
					<Image
						className="rounded-full bg-transparent"
						src="/logounsa.png"
						alt="Logo"
						height={150}
						width={100}
						objectFit="contain"
					/>
				</CardHeader>
				<CardBody className="flex flex-col gap-4">
					<Typography
						variant="h4"
						color="blue"
						className="w-full text-center"
					>
						Administrativo
					</Typography>
					<Input
						label="Correo"
						size="lg"
						type={"email"}
						required
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<Input
						type={"password"}
						label="Password"
						size="lg"
						required
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</CardBody>
				<CardFooter className="pt-0">
					<Button type="submit" variant="gradient" fullWidth>
						Iniciar sesion
					</Button>
					<Link href="/auth/alumno">
						<Typography
							as="a"
							variant="small"
							color="blue"
							className="ml-1 font-light mt-6 flex justify-center cursor-pointer"
						>
							Alumno
						</Typography>
					</Link>
				</CardFooter>
			</form>
		</Card>
	);
}
