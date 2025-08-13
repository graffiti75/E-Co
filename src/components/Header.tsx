import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DarkModeContext } from "../context/DarkModeContext";
import { AuthContext } from "../auth/AuthContext";
import { CartContext } from "../cart/CartContext";
import SearchInput from "../search/SearchInput";

const Header: React.FC = () => {
	const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);
	const { user, logout } = useContext(AuthContext);
	const { cartItems } = useContext(CartContext);
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate("/auth");
	};

	return (
		<header className="bg-white dark:bg-gray-800 shadow-md">
			<div className="container mx-auto px-4 py-2 flex justify-between items-center">
				<div className="flex items-center space-x-2">
					<img src="/logo.svg" alt="Logo" className="h-8 w-auto" />
					<h1 className="text-2xl font-bold text-gray-800 dark:text-white">
						E-Co
					</h1>
				</div>

				<div className="flex-1 max-w-2xl">
					<SearchInput />
				</div>

				<div className="flex items-center space-x-4">
					{user ? (
						<>
							<span className="text-gray-600 dark:text-gray-300">
								Welcome, {user.username}
							</span>
							<button
								className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
								onClick={handleLogout}
							>
								Logout
							</button>
						</>
					) : null}
					<Link to="/cart" className="relative text-gray-600 dark:text-gray-300">
						<svg
							className="h-6 w-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
							></path>
						</svg>
						{cartItems.length > 0 && (
							<span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
								{cartItems.length}
							</span>
						)}
					</Link>
					<button
						className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white px-3 py-1 rounded"
						onClick={toggleDarkMode}
					>
						{isDarkMode ? "Light" : "Dark"}
					</button>
				</div>
			</div>
		</header>
	);
};

export default Header;
