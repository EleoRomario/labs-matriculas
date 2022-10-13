import { Button, Tooltip, Typography } from "@material-tailwind/react";
import { LogOut, User } from "iconoir-react";
import { useAuthContext } from "../../../auth/AuthContext";

export const AdminLayout = ({ children }) => {
	const { user, logoutUser } = useAuthContext();
	const { email } = user

	return (
		<div className="bg-white/80 backdrop-blur-sm rounded-lg w-[40rem] h-[90vh] relative">
			<div className="w-full h-20 flex justify-between items-center p-5">
				<div className="flex flex-row justify-between items-center">
					<User className="text-white bg-unsa-500 rounded-full p-2 h-10 w-10" />
					<div className="flex flex-col ml-5">
						<p className="text-unsa-500 font-semibold text-xs">
							Administrativo
						</p>
						<p className="text-gray-800" size="lg">
							{email}
						</p>
					</div>
				</div>
				<div>
					<Tooltip placement="top-end" content="Cerrar sesión">
						<Button
							onClick={logoutUser}
							variant="outlined"
							className="p-2 rounded-full"
						>
							<LogOut />
						</Button>
					</Tooltip>
				</div>
			</div>
			<div className="flex h-[72vh] flex-col gap-3 items-start bg-white m-8 rounded-lg p-5  mt-0 relative">
				{children}
			</div>
		</div>
	);
};
