import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import { log } from "../utils/logger";

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

import SearchIcon from "../components/icons/SearchIcon"; // Import SearchIcon

	return (
		<div className="flex items-center">
			<input
				type="text"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				placeholder="Search products..."
				className="p-2 border rounded bg-white dark:bg-black text-black dark:text-white" // Ensure text color is appropriate
			/>
			<button
				onClick={handleSearch}
				className="ml-2 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700" // Modernized button style
				aria-label="Search"
			>
				<SearchIcon className="h-6 w-6 text-black dark:text-white" />
			</button>
		</div>
	);
};

export default SearchInput;
