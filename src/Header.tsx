import React, { useContext } from "react";
import { DarkModeContext } from "./DarkModeContext";

const Header: React.FC = () => {
	const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);

	return (
		<div className="flex justify-between items-center mb-8">
			<h1 className="text-3xl font-bold">E-Commerce Store</h1>
			<button
				className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
				onClick={toggleDarkMode}
			>
				{isDarkMode ? "Light Mode" : "Dark Mode"}
			</button>
		</div>
	);
};

export default Header;
