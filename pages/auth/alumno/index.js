import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button
} from '@material-tailwind/react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useAuthContext } from '../../../auth/AuthContext'

export default function Login () {
  const { signInAlumno } = useAuthContext()

  const [cui, setCui] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (cui) {
      signInAlumno(cui)
    }
  }

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
						INGRESAR AL SISTEMA
					</Typography>
					<Input label="CUI" size="lg" required value={cui} onChange={(e) => setCui(e.target.value)} />
				</CardBody>
				<CardFooter className="pt-0">
					<Button variant="gradient" fullWidth type="submit">
						Iniciar sesion
					</Button>
					<Link href="/auth/admin">
						<Typography
							as="a"
							variant="small"
							color="blue"
							className="ml-1 font-light mt-6 flex justify-center cursor-pointer"
						>
							Admin
						</Typography>
					</Link>
				</CardFooter>
			</form>
		</Card>
  )
}
