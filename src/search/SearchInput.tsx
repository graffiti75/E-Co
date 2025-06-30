import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import { log } from "../utils/logger";
import SearchIcon from "../components/icons/SearchIcon"; // Import SearchIcon

const SearchInput: React.FC = () => {
	const [query, setQuery] = useState("");
	const navigate = useNavigate();
	const location = useLocation();
	const { user } = useContext(AuthContext);

	const handleSearch = () => {
		if (!user) {
			log(`SearchInput.handleSearch -> User not logged in`);
			navigate("/auth"); // Redirect to login if not logged in
			return;
		}
		log(`SearchInput.handleSearch -> query: ${query}`);
		if (query.trim()) {
			log(`SearchInput.handleSearch -> Inside IF`);
			navigate(`/search?query=${encodeURIComponent(query)}`);
		}
	};

	useEffect(() => {
		setQuery(""); // Reset query when location changes
	}, [location]);

	return (
		<div className="relative flex items-center"> {/* Added relative positioning */}
			<input
				type="text"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				placeholder="Search products..."
				className="p-2 pr-10 border rounded bg-white dark:bg-black text-black dark:text-white w-full" // Added pr-10 for padding right, w-full
			/>
			<button
				onClick={handleSearch}
				className="absolute right-0 top-0 h-full px-3 flex items-center rounded-r-md hover:bg-gray-100 dark:hover:bg-gray-700" // Positioned icon button
				aria-label="Search"
			>
				<SearchIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" /> {/* Adjusted icon size and color */}
			</button>
		</div>
	);
};

export default SearchInput;
