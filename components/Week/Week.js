import { useEffect, useState } from "react";
import { dias, horas, horasFin, horasInicio } from "../../utils/week";
import { PopoverCurso } from "./PopoverCurso";

export const Week = ({cursos}) => {
	
  const [matrix, setMatrix] = useState(
		Array.from({length:15}, () => Array.from({length:5}, () => null))
  );

	const horasDias = (curso) =>{
		curso.horario.forEach((d) => {
			const { dia, horaInicio, horaFin } = d;
			const indexDia = dias.indexOf(dia);
			const indexHoraInicio = horasInicio.indexOf(horaInicio);
			const indexHoraFin = horasFin.indexOf(horaFin);
			addDia(indexDia,indexHoraInicio,indexHoraFin, curso)
		})
	}

	useEffect(() => {
		cursos.forEach(curso => {
			horasDias(curso)
		})
		// const labs = horario.map((lab) => lab.laboratorio);
		// setLaboratorios(labs);
	}, [cursos]);

  const addDia = (dia, horai,horaf, curso) => {
		const dHora = [...matrix]
    console.log("🚀 ~ file: Week.js ~ line 35 ~ addDia ~ dia, horai,horaf", dia, horai,horaf)
		dHora[horai][dia] = <PopoverCurso data={curso} />
		dHora[horaf][dia] = <PopoverCurso data={curso} />
    setMatrix(dHora)
  }

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
								<div key={columnIndex} className="bg-gray-50 h-[23px]">
									<p className="bg-green-50 shadow-sm">{column}</p>
								</div>
							))}
						</div>
					))}
				</div>
			</div>
		</div>
  );
}