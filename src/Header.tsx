import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { DarkModeContext } from "./DarkModeContext";
import { AuthContext } from "./AuthContext";

const Header: React.FC = () => {
	const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);
	const { user, logout } = useContext(AuthContext);

	return (
		<div className="flex justify-between items-center mb-8">
			<h1 className="text-3xl font-bold">E-Commerce Store</h1>
			<div className="flex items-center space-x-4">
				{user ? (
					<>
						<span className="text-black dark:text-white">
							Welcome, {user.username}
						</span>
						<button
							className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
							onClick={logout}
						>
							Logout
						</button>
					</>
				) : (
					<Link
						to="/login"
						className="text-blue-500 dark:text-blue-400 hover:underline"
					>
						Login
					</Link>
				)}
				<button
					className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
					onClick={toggleDarkMode}
				>
					{isDarkMode ? "Light Mode" : "Dark Mode"}
				</button>
			</div>
		</div>
	);
};

export default Header;
