import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { DarkModeContext } from "../context/DarkModeContext";
import { AuthContext } from "../auth/AuthContext";
import SearchInput from "../search/SearchInput";

const Header: React.FC = () => {
	const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);
	const { user, logout } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate("/auth");
	};

	const handleUserProfileClick = () => {
		console.log("User profile icon clicked");
		// Placeholder for future navigation or dropdown
	};

	const handleSettingsClick = () => {
		console.log("Settings icon clicked");
		// Placeholder for future navigation or dropdown
	};

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
							onClick={handleLogout}
						>
							Logout
						</button>
						<SearchInput />
						{/* User Profile Icon */}
						<button
							onClick={handleUserProfileClick}
							className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
							aria-label="User Profile"
						>
							<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
						</button>
						{/* Settings Icon */}
						<button
							onClick={handleSettingsClick}
							className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
							aria-label="Settings"
						>
							<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
							</svg>
						</button>
						{/* Shopping Cart Icon */}
						<Link to="/cart" className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700" aria-label="Shopping Cart">
							<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
							</svg>
						</Link>
					</>
				) : null}
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
