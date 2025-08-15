import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Product } from "../types/types";
import { log } from "../utils/logger";
import ProductCart from "../products/ProductCart";

interface SearchResultsProps {
	addToCart: (product: Product) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ addToCart }) => {
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
						<ProductCart
							key={product.id}
							product={product}
							addToCart={addToCart}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default SearchResults;
