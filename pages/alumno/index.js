import { Button} from '@material-tailwind/react'
import { PasteClipboard } from 'iconoir-react'
import Link from 'next/link'
import { useAuthContext } from '../../auth/AuthContext'
import { AlumnoLayout } from '../../components/Layout/alumno/AlumnoLayout'

export default function Alumno () {

	const { alumno } = useAuthContext();

  return (
		<AlumnoLayout>
			<Link href={`/alumno/${alumno.uid}`}>
				<Button
					as="a"
					color="blue"
					className="flex justify-center items-center gap-2"
				>
					<PasteClipboard />
					<span className="font-light">Ver mis cursos</span>
				</Button>
			</Link>
			<div className="border border-gray-200 rounded-lg w-full p-2">
				<p className="text-gray-500 text-lg font-light">
					Laboratorios Matriculados
				</p>
			</div>
		</AlumnoLayout>
  )
}
