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

	return (
		<div className="flex items-center w-full">
			<input
				type="text"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				placeholder="Search products..."
				className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-l-md bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>
			<button
				onClick={handleSearch}
				className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600"
			>
				Search
			</button>
		</div>
	);
};

export default SearchInput;
