import { IconButton, Input, Option, Select } from "@material-tailwind/react";
import { Calendar, Cancel, ClockOutline, Plus } from "iconoir-react";
import { useEffect, useState } from "react";
import { Dia } from "../Horario/Dia";

export const Grupo = ({
	data,
	index,
	cardGrupos,
	setCardGrupos,
	handleChange,
	handleSelectChange,
}) => {
	const { nombre, docente, capacidad, horario } = data;

	const [cardHorarios, setCardHorarios] = useState(horario);

	const removeGrupo = () => {
		const grupos = [...cardGrupos];
		grupos.splice(index, 1);
		setCardGrupos(grupos);
	};

	
	const addDia = () => {
		const newCardDia = [...cardHorarios];
		newCardDia.push({
			dia: "",
			horaInicio: "",
			horaFin: "",
		});
		setCardHorarios(newCardDia);	
	};

	const handleHorarioChange = (index, name, e) => {
		const data = [...cardHorarios];
		data[index][name] = e;
		setCardHorarios(data);
	};

	useEffect(() => {
		const data = [...cardGrupos];
		data[index].horario = cardHorarios;
		setCardGrupos(data);
		}, [cardHorarios]);

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
			<div className="bg-white text-teal-900 border border-gray-100 p-2 rounded flex flex-col gap-4">
				<div className="flex justify-between items-center">
					<h1 className="font-medium">Horario</h1>
					<div
						className="p-2 border border-teal-800 rounded flex items-center gap-2 cursor-pointer hover:bg-teal-50"
						onClick={() => addDia()}
					>
						<Plus />
						Añadir día
					</div>
				</div>
				<div className="flex flex-col gap-5">
					{cardHorarios.map((horario, index) => {
						return (
							<Dia
								key={index}
								index={index}
								data={horario}
								cardHorarios={cardHorarios}
								setCardHorarios={setCardHorarios}
								handleHorarioChange={handleHorarioChange}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
};
