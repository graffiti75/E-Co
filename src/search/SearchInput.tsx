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
		<div className="flex items-center">
			<input
				type="text"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				placeholder="Search products..."
				className="p-2 border rounded bg-white dark:bg-black"
			/>
			<button
				onClick={handleSearch}
				className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
			>
				Search
			</button>
		</div>
	);
};

export default SearchInput;
