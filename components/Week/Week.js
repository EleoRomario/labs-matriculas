import { useEffect, useState } from "react";
import { dias, horas } from "../../utils/week";

export const Week = () => {

  const [matrix, setMatrix] = useState(
		Array.from({length:15}, () => Array.from({length:5}, () => null))
  );
  const addDia = () => {
    const dia = [...matrix]
    dia[3][4] = "Hola"
    setMatrix(dia)
  }
  useEffect(()=>{
    addDia()
  },[])

  return (
		<div className="bg-gray-100 rounded p-2">
			<div className="grid grid-cols-6 gap-1">
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
			<div className="grid grid-cols-[0.2fr_1fr]">
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
				<div className="w-full grid grid-rows-[15]">
					{matrix.map((row, rowIndex) => (
						<div key={rowIndex} className="grid grid-cols-5">
							{row.map((column, columnIndex) => (
								<div key={columnIndex}>
									<p>{column}</p>
								</div>
							))}
						</div>
					))}
				</div>
			</div>
		</div>
  );
}