import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Product } from "../types/types";
import { log } from "../utils/logger";

const SearchResults: React.FC = () => {
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(true);
	const location = useLocation();
	const query = new URLSearchParams(location.search).get("query");

	useEffect(() => {
		const fetchSearchResults = async () => {
			log(`SearchResults.fetchSearchResults -> query: ${query}`);
			if (query) {
				try {
					log(
						`SearchResults.fetchSearchResults -> Calling /api/products/search?query=${query}`
					);
					const res = await axios.get(
						`${
							import.meta.env.VITE_API_URL
						}/api/products/search?query=${query}`
					);
					log(`SearchResults.fetchSearchResults -> res: ${res}`);
					setProducts(res.data);
				} catch (err) {
					log(`SearchResults.fetchSearchResults -> Error: ${err}`);
				} finally {
					log(`SearchResults.fetchSearchResults -> Finally`);
					setLoading(false);
				}
			} else {
				setLoading(false);
			}
		};
		fetchSearchResults();
	}, [query]);

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div className="container mx-auto p-4">
			<h2 className="text-2xl font-bold mb-4">
				Search Results for "{query}"
			</h2>
			{products.length === 0 ? (
				<p>No products found.</p>
			) : (
				<div className="flex flex-wrap justify-center">
					{products.map((product) => (
						<div
							key={product.id}
							className="m-4 p-4 border rounded"
						>
							<h3>{product.name}</h3>
							<p>{product.category}</p>
							<p>${product.price}</p>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default SearchResults;
