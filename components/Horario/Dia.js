import { Option, Select } from '@material-tailwind/react'
import { Calendar, Cancel, ClockOutline } from 'iconoir-react'

export const Dia = ({ index, data, handleHorarioChange, cardHorarios, setCardHorarios }) => {
  const { dia, horaInicio, horaFin } = data

  const removeDia = () => {
    const horarios = [...cardHorarios]
    horarios.splice(index, 1)
    setCardHorarios(horarios)
  }

  return (
		<div className="bg-white border border-teal-800 rounder flex gap-5 flex-col p-3 relative">
			<Cancel
				className="absolute top-0.5 right-0.5 cursor-pointer border border-teal-800 hover:text-white hover:bg-teal-800"
				onClick={() => removeDia()}
			/>
			<h1>Dia</h1>
			<div className="w-full flex gap-2 items-center">
				<Calendar />
				<Select
					label="Dia"
					value={dia}
					onChange={(e) => handleHorarioChange(index, 'dia', e)}
				>
					<Option value="Lunes">Lunes</Option>
					<Option value="Martes">Martes</Option>
					<Option value="Miercoles">Miercoles</Option>
					<Option value="Jueves">Jueves</Option>
					<Option value="Viernes">Viernes</Option>
				</Select>
			</div>
			<div className="w-full flex gap-2 items-center">
				<ClockOutline />
				<Select
					label="Hora inicio"
					value={horaInicio}
					onChange={(e) =>
					  handleHorarioChange(index, 'horaInicio', e)
					}
				>
					<Option value="7:00">7:00 am</Option>
					<Option value="7:50">7:50 am</Option>
					<Option value="8:50">8:50 am</Option>
					<Option value="9:40">9:40 am</Option>
					<Option value="10:40">10:40 am</Option>
					<Option value="11:30">11:30 am</Option>
					<Option value="12:20">12:20 pm</Option>
					<Option value="13:10">1:10 pm</Option>
					<Option value="14:00">2:00 pm</Option>
					<Option value="14:50">2:50 pm</Option>
					<Option value="15:50">3:50 pm</Option>
					<Option value="16:40">4:40 pm</Option>
					<Option value="17:40">5:40 pm</Option>
					<Option value="18:30">6:30 pm</Option>
					<Option value="19:20">7:20 pm</Option>
					<Option value="20:10">8:10 pm</Option>
				</Select>
			</div>
			<div className="w-full flex gap-2 items-center">
				<ClockOutline />
				<Select
					label="Hora fin"
					value={horaFin}
					onChange={(e) => handleHorarioChange(index, 'horaFin', e)}
				>
					<Option value="7:50">7:50 am</Option>
					<Option value="8:40">8:40 am</Option>
					<Option value="9:40">9:40 am</Option>
					<Option value="10:30">10:30 am</Option>
					<Option value="11:30">11:30 am</Option>
					<Option value="12:20">12:20 pm</Option>
					<Option value="13:10">1:10 pm</Option>
					<Option value="14:00">2:00 pm</Option>
					<Option value="14:50">2:50 pm</Option>
					<Option value="15:40">3:40 pm</Option>
					<Option value="16:40">4:40 pm</Option>
					<Option value="17:30">5:30 pm</Option>
					<Option value="18:30">6:30 pm</Option>
					<Option value="19:20">7:20 pm</Option>
					<Option value="20:10">8:10 pm</Option>
					<Option value="21:00">9:00 pm</Option>
				</Select>
			</div>
		</div>
  )
}
