import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Product } from "../types/types";
import { formatPrice } from "../utils/formatPrice";
import { log } from "../utils/logger";

interface ProductCartProps {
	product: Product;
	addToCart: (product: Product) => void;
}

const StarIcon: React.FC<{ filled: boolean }> = ({ filled }) => (
	<svg
		className={`w-5 h-5 ${
			filled ? "text-yellow-400" : "text-gray-300"
		}`}
		fill="currentColor"
		viewBox="0 0 20 20"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
	</svg>
);

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
				<div className="p-4">
					<h3 className="text-lg font-bold mt-2 text-black dark:text-white truncate">
						{product.name}
					</h3>
					<div className="flex items-center mt-1">
						{[...Array(5)].map((_, i) => (
							<StarIcon key={i} filled={i < rating} />
						))}
						<span className="text-gray-600 dark:text-gray-400 ml-2">
							({rating} reviews)
						</span>
					</div>
					<p className="text-gray-600 dark:text-gray-300 mt-2 h-12 overflow-hidden">
						{product.description}
					</p>
					<p className="text-xl font-semibold mt-2 text-black dark:text-white">
						{formatPrice(product.price)}
					</p>
				</div>
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
