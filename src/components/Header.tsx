import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { DarkModeContext } from "../context/DarkModeContext";
import { AuthContext } from "../auth/AuthContext";
import SearchInput from "../search/SearchInput";
import HomeIcon from "./icons/HomeIcon";
import SettingsIcon from "./icons/SettingsIcon";
import ShoppingCartIcon from "./icons/ShoppingCartIcon";
import LogoutIcon from "./icons/LogoutIcon"; // Import LogoutIcon
import SunIcon from "./icons/SunIcon"; // Import SunIcon
import MoonIcon from "./icons/MoonIcon"; // Import MoonIcon


interface HeaderProps {
	toggleCartVisibility: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleCartVisibility }) => {
	const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);
	const { user, logout } = useContext(AuthContext);
	const navigate = useNavigate();
	const [isSettingsDropdownOpen, setIsSettingsDropdownOpen] = React.useState(false);
	const settingsRef = React.useRef<HTMLDivElement>(null);

	const handleLogout = () => {
		logout();
		navigate("/auth");
	};

	const handleSettingsClick = () => {
		setIsSettingsDropdownOpen(prev => !prev);
	};

	React.useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
				setIsSettingsDropdownOpen(false);
			}
		};
		if (isSettingsDropdownOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		} else {
			document.removeEventListener("mousedown", handleClickOutside);
		}
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isSettingsDropdownOpen]);

	return (
		<div className="flex justify-between items-center mb-8">
			<div className="flex items-center space-x-4">
				<Link to="/" aria-label="Home">
					<HomeIcon className="h-8 w-8 text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300" />
				</Link>
				<h1 className="text-3xl font-bold">E-Commerce Store</h1>
			</div>
			<div className="flex items-center space-x-4">
				{user ? (
					<>
						<span className="text-black dark:text-white mr-2">
							Welcome, {user.username}
						</span>
						<SearchInput />
						<div className="relative" ref={settingsRef}>
							<button
								onClick={handleSettingsClick}
								className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
								aria-label="Settings"
								aria-expanded={isSettingsDropdownOpen}
							>
								<SettingsIcon className="h-6 w-6 text-black dark:text-white" />
							</button>
							{isSettingsDropdownOpen && (
								<div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-700">
									<Link
										to="/account"
										className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 w-full text-left"
										onClick={() => {
											console.log("Your Account clicked");
											setIsSettingsDropdownOpen(false);
										}}
									>
										Your Account
									</Link>
									<Link
										to="/orders"
										className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 w-full text-left"
										onClick={() => {
											console.log("Your Purchases clicked");
											setIsSettingsDropdownOpen(false);
										}}
									>
										Your Purchases
									</Link>
								</div>
							)}
						</div>
						<button
							onClick={toggleCartVisibility}
							className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
							aria-label="Shopping Cart"
						>
							<ShoppingCartIcon className="h-6 w-6 text-black dark:text-white" />
						</button>
						<button
							onClick={handleLogout}
							className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
							aria-label="Logout"
						>
							<LogoutIcon className="h-6 w-6 text-black dark:text-white" />
						</button>
					</>
				) : null}
				<button
					onClick={toggleDarkMode}
					className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
					aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
				>
					{isDarkMode ? (
						<SunIcon className="h-6 w-6 text-black dark:text-white" />
					) : (
						<MoonIcon className="h-6 w-6 text-black dark:text-white" />
					)}
				</button>
			</div>
		</div>
	);
};

export default Header;
