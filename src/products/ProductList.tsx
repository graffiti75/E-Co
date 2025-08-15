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

	useEffect(() => {
		fetchProducts()
			.then((fetchedProducts) => {
				log(
					`ProductList -> Fetched products: ${JSON.stringify(
						fetchedProducts
					)}`
				);
				setProducts(fetchedProducts);
			})
			.catch(console.error);
	}, []);

	return (
		<div className="flex flex-wrap justify-center">
			{products.length === 0 ? (
				<p className="text-center text-gray-600 dark:text-gray-300">
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
