import { Button, Tooltip } from '@material-tailwind/react'
import { LogOut, User } from 'iconoir-react'
import { useAuthContext } from '../../../auth/AuthContext'

export const AlumnoLayout = ({ children }) => {
  const { alumno, logoutAlumno } = useAuthContext()

  return (
		<div className="bg-white/80 backdrop-blur-sm rounded-lg w-[40rem] h-[98vh] relative">
			<div className="w-100 h-20 flex justify-between items-center p-5">
				<div className="flex flex-row justify-between items-center">
					<User className="text-white bg-unsa-500 rounded-full p-2 h-10 w-10" />
					<div className="flex flex-col ml-5">
						<p className="text-unsa-500 font-semibold text-xs">
							Alumno
						</p>
						<p className="text-gray-800" size="lg">
							{alumno.nombre.toUpperCase()}{" "}{alumno.apellido.toUpperCase()}
						</p>
					</div>
				</div>
				<div>
					<Tooltip placement="top-end" content="Cerrar sesión">
						<Button
							onClick={logoutAlumno}
							variant="outlined"
							className="p-2 rounded-full"
						>
							<LogOut />
						</Button>
					</Tooltip>
				</div>
			</div>
			<div className="flex h-[81vh] flex-col gap-3 items-start bg-white m-8 rounded-lg p-5 mt-0 relative">
				{children}
			</div>
		</div>
  )
}
