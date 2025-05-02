import React from "react";
import { Link } from "react-router-dom";
import { Product } from "./types";

interface ProductCartProps {
	product: Product;
	addToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCartProps> = ({ product, addToCart }) => {
	return (
		<div className="border rounded-lg p-4 m-2 w-64 shadow-lg bg-white dark:bg-gray-800">
			<Link to={`/products/${product.id}`}>
				<img
					src={product.imageUrl}
					alt={product.name}
					className="w-full object-cover"
				/>
				<h3 className="text-lg font-bold mt-2 text-black dark:text-white">
					{product.name}
				</h3>
				<p className="text-gray-600 dark:text-gray-300">
					{product.description}
				</p>
				<p className="text-xl font-semibold mt-1 text-black dark:text-white">
					${product.price}
				</p>
			</Link>
			<button
				className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 dark:hover:bg-blue-700"
				onClick={() => addToCart(product)}
			>
				Add to Cart
			</button>
		</div>
	);
};

export default ProductCard;
