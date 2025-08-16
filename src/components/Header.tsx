import React, { useContext } from "react";
import HeaderCart from "./HeaderCart";
import { useNavigate } from "react-router-dom";
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

	const goToHome = () => {
		navigate("/");
	};

	return (
		<header className="bg-white dark:bg-gray-800 shadow-md">
			<div className="container mx-auto px-4 py-2 flex justify-between items-center">
				<div className="flex items-center space-x-2">
					<h1
						className="text-2xl font-bold text-gray-800 dark:text-white cursor-pointer"
						onClick={goToHome}
					>
						E-Co
					</h1>
				</div>

				<div className="flex-1 max-w-2xl">
					{user ? <SearchInput /> : null}
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
					{user ? (
						<HeaderCart cartItemsCount={cartItems.length} />
					) : null}
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
