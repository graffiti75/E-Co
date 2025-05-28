import React from "react";
import { Link } from "react-router-dom";
import { Product } from "../types/types";
import { formatPrice } from "../utils/formatPrice";
import { log } from "../utils/logger";
interface ProductCartProps {
	product: Product;
	addToCart: (product: Product) => void;
}

const ProductCart: React.FC<ProductCartProps> = ({ product, addToCart }) => {
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
					{formatPrice(product.price)}
				</p>
			</Link>
			<button
				className="mt-2  text-white px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
				onClick={() => {
					log(`ProductCart -> Product: ${JSON.stringify(product)}`);
					addToCart(product);
				}}
			>
				Add to Cart
			</button>
		</div>
	);
};

export default ProductCart;
