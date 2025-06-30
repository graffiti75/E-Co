import React, { useState, useEffect } from "react";
import ProductCart from "./ProductCart";
import { Product } from "../types/types";
import { fetchProducts } from "./products";
import { log } from "../utils/logger";

interface ProductListProps {
	addToCart: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ addToCart }) => {
	const [products, setProducts] = useState<Product[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		setIsLoading(true);
		setError(null);
		fetchProducts()
			.then((fetchedProducts) => {
				log(
					`ProductList -> Fetched products: ${JSON.stringify(
						fetchedProducts
					)}`
				);
				setProducts(
					fetchedProducts.map((product) => ({
						...product,
						_id: product.id,
					}))
				);
			})
			.catch((err) => {
				console.error("Failed to fetch products:", err);
				setError("Failed to load products. Please try again later.");
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);

	if (isLoading) {
		return (
			<p className="text-center text-gray-600 dark:text-gray-300 mt-8">
				Loading products...
			</p>
		);
	}

	if (error) {
		return (
			<p className="text-center text-red-500 dark:text-red-400 mt-8">
				{error}
			</p>
		);
	}

	return (
		<div className="flex flex-wrap justify-center">
			{products.length === 0 ? (
				<p className="text-center text-gray-600 dark:text-gray-300 mt-8">
					Empty list
				</p>
			) : (
				products.map((product) => (
					<ProductCart
						key={product.id}
						product={product}
						addToCart={addToCart}
					/>
				))
			)}
		</div>
	);
};

export default ProductList;
