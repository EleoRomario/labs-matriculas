import { Breadcrumbs, Button, Input } from '@material-tailwind/react'
import { HomeSimpleDoor, SaveFloppyDisk } from 'iconoir-react'
import Link from 'next/link'
import { useEffect } from 'react'
import { AdminLayout } from '../../../../../components/Layout/admin/AdminLayout'
import { Loading } from '../../../../../components/Loading/Loading'
import { useAlumnos } from '../../../../../hook/useAlumnos'

export default function Editar ({ año, alumno }) {
  const añoString =
		año === '1'
		  ? 'Primer año'
		  : año === '2'
		    ? 'Segundo año'
		    : año === '3'
		      ? 'Tercer año'
		      : año === '4'
		        ? 'Cuarto año'
		        : 'Quinto año'

  const {
    nombre,
    apellido,
    correo,
    cui,
    handleInputChange,
    updateAlumno,
    loadingSaveAlumno,
    setFormData
  } = useAlumnos()

  const onSubmitAlumno = async (e) => {
    e.preventDefault()
    const upAlumno = {
      nombre,
      apellido,
      correo,
      cui,
      año
    }
    await updateAlumno(alumno.id, upAlumno)
  }

  useEffect(() => {
    const { nombre, apellido, correo, cui } = alumno
    setFormData({ nombre, apellido, correo, cui })
  }, [])

  return (
		<AdminLayout>
			<Breadcrumbs fullWidth>
				<Link href="/admin">
					<a className="opacity-60">
						<HomeSimpleDoor />{' '}
					</a>
				</Link>
				<Link href="/admin/alumnos">
					<a className="opacity-60">Alumnos </a>
				</Link>
				<Link href={`/admin/alumnos/${año}`}>
					<a className="opacity-60">{añoString}</a>
				</Link>
				<a>Editar Alumno</a>
			</Breadcrumbs>
			<div className="w-full flex flex-col items-center gap-3 border border-gray-100 p-4 rounded">
				<h1 className="font-medium">Editar Datos Generales</h1>
				<div className="w-full h-[1px] bg-blue-gray-100" />
				<form
					onSubmit={onSubmitAlumno}
					className="w-full flex flex-col items-center gap-3"
				>
					<Input
						label="Nombre"
						name="nombre"
						required
						value={nombre}
						onChange={handleInputChange}
					/>
					<Input
						label="Apellido"
						name="apellido"
						required
						value={apellido}
						onChange={handleInputChange}
					/>
					<Input
						label="Correo"
						name="correo"
						required
						type={'email'}
						value={correo}
						onChange={handleInputChange}
					/>
					<Input
						label="CUI"
						type={'number'}
						name="cui"
						required
						value={cui}
						onChange={handleInputChange}
					/>
					<Button
						className="w-[100] flex gap-2"
						type="submit"
						disabled={loadingSaveAlumno}
					>
						{!loadingSaveAlumno
						  ? (
							<>
								<SaveFloppyDisk />
								Actualizar informacion{' '}
							</>
						    )
						  : (
							<>
								<Loading />
								Actualizando...
							</>
						    )}
					</Button>
				</form>
			</div>
		</AdminLayout>
  )
}

export const getServerSideProps = async (context) => {
  const { params } = context
  const { año, idUser } = params

  const res = await fetch(`http://localhost:3000/api/alumnos/${año}/${idUser}`)
  const alumno = await res.json()

  return {
    props: {
      año,
      alumno
    }
  }
}
