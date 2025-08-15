import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Product } from "../types/types";
import { log } from "../utils/logger";
import ProductItem from "./ProductItem";

interface ProductCartProps {
	product: Product;
	addToCart: (product: Product) => void;
}

const ProductCart: React.FC<ProductCartProps> = ({ product, addToCart }) => {
	const rating = 4; // Static rating for now
	const navigate = useNavigate();

	const handleAddToCart = async () => {
		log(`ProductCart -> Product: ${JSON.stringify(product)}`);
		const success = await addToCart(product);
		if (success) {
			navigate("/added-to-cart", { state: { product } });
		}
	};

	return (
		<div className="border rounded-lg p-4 m-2 w-72 shadow-lg bg-white dark:bg-gray-800 transform transition-transform duration-300 hover:scale-105">
			<Link to={`/products/${product.id}`}>
				<img
					src={product.imageUrl}
					alt={product.name}
					className="w-full object-cover h-48 rounded-t-lg"
				/>
				<ProductItem product={product} rating={rating} />
			</Link>
			<div className="px-4 pb-4">
				<button
					className="w-full mt-2 text-white px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
					onClick={handleAddToCart}
				>
					Add to Cart
				</button>
			</div>
		</div>
	);
};

export default ProductCart;
