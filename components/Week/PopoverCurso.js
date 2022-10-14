import { Popover, PopoverContent, PopoverHandler } from "@material-tailwind/react"
import { BookmarkEmpty } from "iconoir-react"

export const PopoverCurso = ({ data }) => {
	const { curso, docente, nombre:grupo, color} = data;

	const getContrastYIQ = (hexcolor) => {
		const r = parseInt(hexcolor.substr(1, 2), 16);
		const g = parseInt(hexcolor.substr(3, 2), 16);
		const b = parseInt(hexcolor.substr(5, 2), 16);
		const yiq = (r * 299 + g * 587 + b * 114) / 1000;
		return yiq >= 128 ? "#000" : "#fff";
	}

	return (
		<Popover>
			<PopoverHandler>
				<div
					className="w-full cursor-pointer flex justify-center text-center"
					style={{ backgroundColor: color, color: getContrastYIQ(color) }}
				>
					<BookmarkEmpty />{grupo}
				</div>
			</PopoverHandler>
			<PopoverContent className="flex flex-col gap-2 p-2">
				<h1>Curso: {curso}</h1>
				<h1>Docente: {docente}</h1>
				<h1>Grupo: {grupo}</h1>
			</PopoverContent>
		</Popover>
	);
};