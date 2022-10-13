import { IconButton, Input, Option, Select } from "@material-tailwind/react";
import { Calendar, Cancel, ClockOutline } from "iconoir-react";
import { useState } from "react";

export const Grupo = ({
	data,
	index,
	cardGrupos,
	setCardGrupos,
	handleChange,
	handleSelectChange,
	handleHorarioChange,
}) => {
	const { nombre, docente, capacidad, horario } = data;
	const { dia, horaInicio, horaFin } = horario;

	const removeGrupo = () => {
		const grupos = [...cardGrupos];
		grupos.splice(index, 1);
		setCardGrupos(grupos);
	};

	return (
		<div className="w-full flex flex-col gap-5 p-5 pt-10 border bg-teal-50 border-teal-700 rounded relative">
			<div
				className="absolute top-1 right-1 rounded-full bg-teal-600 text-white p-1 cursor-pointer"
				onClick={() => removeGrupo()}
			>
				<Cancel />
			</div>
			<Select
				label="Grupo"
				value={nombre}
				onChange={(e) => handleSelectChange(index, "nombre", e)}
			>
				<Option value="A">A</Option>
				<Option value="B">B</Option>
				<Option value="C">C</Option>
				<Option value="D">D</Option>
				<Option value="E">E</Option>
			</Select>
			<Input
				label="Docente"
				name="docente"
				value={docente}
				onChange={(e) => handleChange(index, e)}
			/>
			<Input
				label="Capacidad"
				type={"number"}
				name="capacidad"
				value={capacidad}
				onChange={(e) => handleChange(index, e)}
			/>
			<div className="bg-white rounder flex gap-5 flex-col p-3">
				<h1>Horario</h1>
				<div className="w-full flex gap-2 items-center">
					<Calendar />
					<Select
						label="Dia"
						value={dia}
						onChange={(e) => handleHorarioChange(index, "dia", e)}
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
							handleHorarioChange(index, "horaInicio", e)
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
						<Option value="15:40">3:40 pm</Option>
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
						onChange={(e) =>
							handleHorarioChange(index, "horaFin", e)
						}
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
		</div>
	);
};
