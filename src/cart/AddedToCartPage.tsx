import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { CartContext } from "./CartContext";
import { formatPrice } from "../utils/formatPrice";

const AddedToCartPage: React.FC = () => {
	const location = useLocation();
	const { product } = location.state || {};
	const { cartItems } = useContext(CartContext);

	const subtotal = cartItems.reduce(
		(sum, item) => sum + item.product.price * item.quantity,
		0
	);

	if (!product) {
		return (
			<div className="text-center">
				<h2 className="text-2xl font-bold">Product not found</h2>
				<p>
					Please go back to the{" "}
					<Link to="/" className="text-blue-500">
						homepage
					</Link>
					.
				</p>
			</div>
		);
	}

	return (
		<div className="container mx-auto p-4">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				<div className="flex items-center">
					<img
						src={product.imageUrl}
						alt={product.name}
						className="w-32 h-32 object-cover rounded-lg"
					/>
					<div className="ml-4">
						<h2 className="text-2xl font-bold text-green-600">
							Added to your cart
						</h2>
						<p className="text-lg">{product.name}</p>
					</div>
				</div>
				<div className="border rounded-lg p-4 shadow-lg bg-white dark:bg-gray-800">
					<p className="text-xl font-semibold mb-4">
						Subtotal: {formatPrice(subtotal)}
					</p>
					<Link
						to="/"
						className="block w-full text-center bg-blue-500 text-white px-4 py-2 rounded mb-2 hover:bg-blue-600"
					>
						Continue shopping
					</Link>
					<Link
						to="/cart"
						className="block w-full text-center bg-gray-200 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
					>
						Go to the Cart
					</Link>
				</div>
			</div>
		</div>
	);
};

export default AddedToCartPage;
