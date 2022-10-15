import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { dias, horas, horasFin, horasInicio } from "../../utils/week";
import { Cruze } from "./Cruze";
import { PopoverCurso } from "./PopoverCurso";

export const Week = ({ cursos }) => {
	const [matrix, setMatrix] = useState(
		Array.from({ length: 15 }, () => Array.from({ length: 5 }, () => null))
	);

	const [horasRegistradas, setHorasRegistradas] = useState([]);

	const horasDias = (curso) => {
		curso.horario.forEach((d) => {
			const { dia, horaInicio, horaFin } = d;
			const indexDia = dias.indexOf(dia);
			const indexHoraInicio = horasInicio.indexOf(horaInicio);
			const indexHoraFin = horasFin.indexOf(horaFin);
			const hora = {
				curso: curso.curso,
				indexDia,
				indexHoraInicio,
				indexHoraFin,
			};
			const exist = horasRegistradas.find((h) => h.curso === curso.curso);
			if (exist !== undefined) {
				const newHorasRegistradas = horasRegistradas.filter(
					(h) => h.curso !== curso.curso
				);
				setHorasRegistradas([...newHorasRegistradas, hora]);
				deleteDia(
					exist.indexDia,
					exist.indexHoraInicio,
					exist.indexHoraFin,
					curso
				);
				addDia(indexDia, indexHoraInicio, indexHoraFin, curso);
			} else {
				setHorasRegistradas((horasRegistradas) => [
					...horasRegistradas,
					hora,
				]);
				addDia(indexDia, indexHoraInicio, indexHoraFin, curso);
			}
		});
	};

	useEffect(() => {
		cursos.forEach((curso) => {
			horasDias(curso);
		});
	}, [cursos]);

	const addDia = (dia, horai, horaf, curso) => {
		const dHora = [...matrix];
		if (dHora[horai][dia] !== null) {
			dHora[horai][dia] = <Cruze />;
			dHora[horaf][dia] = <PopoverCurso data={curso} />;
			toast.error("Cruze de horarios");
		}else if (dHora[horaf][dia] !== null) {
			dHora[horai][dia] = <PopoverCurso data={curso} />;
			dHora[horaf][dia] = <Cruze />;
			toast.error("Cruze de horarios");
		}else{
			dHora[horai][dia] = <PopoverCurso data={curso} />;
			dHora[horaf][dia] = <PopoverCurso data={curso} />;
		}
		setMatrix(dHora);
	};
	const deleteDia = (dia, horai, horaf) => {
		const dHora = [...matrix];
		dHora[horai][dia] = null;
		dHora[horaf][dia] = null;
		setMatrix(dHora);
	};

	return (
		<div className="bg-gray-100 rounded p-2">
			<div className="grid grid-cols-6 gap-1 my-2">
				<div></div>
				{dias.map((dia, index) => {
					return (
						<div
							key={index}
							className="bg-white rounded text-[10px] text-gray-500 shadow text-center p-1 select-none"
						>
							{dia}
						</div>
					);
				})}
			</div>
			<div className="grid grid-cols-[0.2fr_1fr] gap-2">
				<div className="grid grid-rows-[15] gap-1">
					{horas.map((hora, index) => {
						return (
							<div
								key={index}
								className="bg-white rounded text-[10px] text-gray-500 shadow text-center p-1 select-none"
							>
								{hora}
							</div>
						);
					})}
				</div>
				<div className="w-full grid grid-rows-[15] gap-1">
					{matrix.map((row, rowIndex) => (
						<div key={rowIndex} className="grid grid-cols-5 gap-1">
							{row.map((column, columnIndex) => (
								<div
									key={columnIndex}
									className="bg-gray-50 h-[23px]"
								>
									<p className="bg-green-50 shadow-sm">
										{column}
									</p>
								</div>
							))}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
