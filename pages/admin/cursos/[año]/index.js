import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Breadcrumbs,
  Button,
  Dialog,
  IconButton,
  Popover,
  PopoverContent,
  PopoverHandler,
  Tooltip
} from '@material-tailwind/react'
import {
  Book,
  BookmarkBook,
  ClockOutline,
  EditPencil,
  HomeSimpleDoor,
  Trash,
  WarningTriangleOutline
} from 'iconoir-react'
import Link from 'next/link'
import { useState } from 'react'
import { AdminLayout } from '../../../../components/Layout/admin/AdminLayout'
import { useCursos } from '../../../../hook/useCursos'

export default function Año ({ año, cursos }) {
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

  const [open, setOpen] = useState(false)
  const [idUser, setIdCurso] = useState(null)

  const { deleteCurso } = useCursos()

  const onDelete = async (id) => {
    await deleteCurso(id)
  }

  const [openGrupo, setOpenGrupo] = useState(0)

  const handleOpenGrupo = (value) => {
    setOpenGrupo(openGrupo === value ? 0 : value)
  }

  return (
		<AdminLayout>
			<Dialog
				open={open}
				handler={() => {
				  setOpen(!open)
				  setIdCurso(null)
				}}
				animate={{
				  mount: { scale: 1, y: 0 },
				  unmount: { scale: 0.9, y: -100 }
				}}
				className="p-4 flex flex-col gap-3 items-center"
			>
				<div className="flex gap-2 flex-row items-center">
					<WarningTriangleOutline color="red" className="" />
					<p>¿Estás seguro de eliminar este curso?</p>
				</div>
				<div className="flex justify-end gap-2 mt-4">
					<Button
						variant="outlined"
						color="gray"
						size="sm"
						onClick={() => {
						  setOpen(!open)
						  setIdCurso(null)
						}}
					>
						Cancelar
					</Button>
					<Button
						color="red"
						size="sm"
						onClick={() => {
						  onDelete(idUser)
						  setOpen(!open)
						  setIdCurso(null)
						}}
					>
						Eliminar
					</Button>
				</div>
			</Dialog>
			<Breadcrumbs fullWidth>
				<Link href="/admin">
					<a className="opacity-60">
						<HomeSimpleDoor />{' '}
					</a>
				</Link>
				<Link href="/admin/cursos">
					<a className="opacity-60">Cursos </a>
				</Link>
				<a>{añoString} </a>
			</Breadcrumbs>
			<div className="w-full flex flex-col gap-3 border border-gray-100 p-4 rounded overflow-y-scroll">
				<div className="w-full flex justify-between items-center">
					<p>Cursos del {añoString}</p>
					<Link href={`/admin/cursos/${año}/nuevo`}>
						<Button
							as="a"
							variant="outlined"
							className="flex gap-2"
						>
							<BookmarkBook />
							Agregar nuevo curso
						</Button>
					</Link>
				</div>
				<div className="w-full h-[1px] bg-blue-gray-100" />
				<div className="w-full flex flex-col gap-3">
					{cursos.length > 0
					  ? (
					  cursos.map((curso) => (
							<div
								key={curso.id}
								className="border border-gray-100 py-2 px-4 rounded cursor-pointer hover:bg-cyan-50 capitalize flex justify-between items-center"
							>
								{' '}
								<div>
									<Popover placement="top-start">
										<PopoverHandler>
											<div className="w-full">
												<div className="text-gray-600 flex gap-2 hover:text-cyan-800">
													<Book />
													{curso.nombre}
												</div>
											</div>
										</PopoverHandler>
										<PopoverContent className="bg-cyan-100 flex flex-col gap-2">
											<p className="flex gap-2 capitalize text-cyan-800">
												<span className="font-medium">
													Curso:
												</span>
												{curso.nombre}
											</p>
											<div className="flex flex-col gap-2 capitalize text-cyan-800 bg-cyan-200 p-2 rounded">
												<h1 className="font-medium">
													Grupos
												</h1>
												<div>
													{curso.grupos.map(
													  (
													    {
													      horario,
													      capacidad,
													      docente,
													      nombre
													    },
													    index
													  ) => (
															<Accordion
																open={
																	openGrupo ===
																	index + 1
																}
																key={index}
																className="flex gap-2 border border-cyan-100 rounded p-1 flex-col"
															>
																<AccordionHeader
																	onClick={() =>
																	  handleOpenGrupo(
																	    index +
																				1
																	  )
																	}
																	className="text-xs p-1"
																>
																	<span className="font-medium ">
																		Grupo:{' '}
																	</span>
																	{nombre}
																</AccordionHeader>
																<AccordionBody>
																	<div>
																		<span className="font-medium">
																			Docente:{' '}
																		</span>
																		{
																			docente
																		}
																	</div>
																	<div>
																		<span className="font-medium">
																			Capacidad:{' '}
																		</span>
																		{
																			capacidad
																		}
																	</div>
																	<div>
																		<span className="font-medium">
																			Dia:{' '}
																		</span>
																		{
																			horario.dia
																		}
																	</div>
																	<div className="flex gap-2">
																		<span className="font-medium">
																			<ClockOutline />
																		</span>
																		{
																			horario.horaInicio
																		}{' '}
																		-{' '}
																		{
																			horario.horaFin
																		}
																	</div>
																</AccordionBody>
															</Accordion>
													  )
													)}
												</div>
											</div>
										</PopoverContent>
									</Popover>
								</div>
								<div className="flex gap-2">
									<Tooltip
										content="Editar curso"
										placement="top"
										className="bg-light-blue-200"
									>
										<div>
											<Link
												href={`/admin/cursos/${año}/${curso.id}/editar`}
											>
												<IconButton
													className="bg-white border shadow-none flex p-1 gap-1 font-thin items-center border-light-blue-100 text-light-blue-100 hover:bg-light-blue-400 hover:border-light-blue-400 hover:text-white focus:outline-none active:border-none"
													as="a"
												>
													<EditPencil />
												</IconButton>
											</Link>
										</div>
									</Tooltip>
									<Tooltip
										content="Eliminar curso"
										placement="top"
										className="bg-red-200"
									>
										<IconButton
											variant="outlined"
											className="flex p-1 gap-1 font-thin items-center border-red-100 text-red-100 hover:bg-red-400 hover:border-red-400 hover:text-white"
											onClick={() => {
											  setOpen(!open)
											  setIdCurso(curso.id)
											}}
										>
											<Trash />
										</IconButton>
									</Tooltip>
								</div>
							</div>
					  ))
					    )
					  : (
						<div className="text-center text-gray-500">
							<p>No hay cursos registrados en este año</p>
						</div>
					    )}
				</div>
			</div>
		</AdminLayout>
  )
}

export const getServerSideProps = async (context) => {
  const { params } = context
  const { año } = params

  const res = await fetch(`http://localhost:3000/api/cursos/${año}`)
  const cursos = await res.json()

  return {
    props: {
      año,
      cursos
    }
  }
}
