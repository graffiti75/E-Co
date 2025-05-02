import React from "react";
import { Link } from "react-router-dom";
import { CartItem } from "./types";

interface CartProps {
	cartItems: CartItem[];
	updateQuantity: (id: number, quantity: number) => void;
	removeFromCart: (id: number) => void;
	clearCart: () => void;
}

const Cart: React.FC<CartProps> = ({
	cartItems,
	updateQuantity,
	removeFromCart,
	clearCart,
}) => {
	const total = cartItems.reduce(
		(sum, item) => sum + item.product.price * item.quantity,
		0
	);

	return (
		<div className="mt-8 p-4 border rounded-lg shadow-lg bg-white dark:bg-gray-800">
			<h2 className="text-2xl font-bold mb-4 text-black dark:text-white">
				Shopping Cart
			</h2>
			{cartItems.length === 0 ? (
				<p className="text-black dark:text-white">
					Your cart is empty.
				</p>
			) : (
				<>
					{cartItems.map((item) => (
						<div
							key={item.product.id}
							className="flex justify-between items-center mb-2"
						>
							<span className="text-black dark:text-white">
								{item.product.name} (x{item.quantity}) - $
								{item.product.price * item.quantity}
							</span>
							<div className="flex items-center">
								<button
									className="bg-gray-300 dark:bg-gray-700 text-black dark:text-white px-2 py-1 rounded hover:bg-gray-400 dark:hover:bg-gray-600"
									onClick={() =>
										updateQuantity(
											item.product.id,
											item.quantity - 1
										)
									}
									disabled={item.quantity <= 1}
								>
									-
								</button>
								<span className="mx-2 text-black dark:text-white">
									{item.quantity}
								</span>
								<button
									className="bg-gray-300 dark:bg-gray-700 text-black dark:text-white px-2 py-1 rounded hover:bg-gray-400 dark:hover:bg-gray-600"
									onClick={() =>
										updateQuantity(
											item.product.id,
											item.quantity + 1
										)
									}
								>
									+
								</button>
								<button
									className="ml-4 bg 'bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 dark:hover:bg-red-700"
									onClick={() =>
										removeFromCart(item.product.id)
									}
								>
									Remove
								</button>
							</div>
						</div>
					))}
					<p className="text-xl font-semibold mt-4 text-black dark:text-white">
						Total: ${total}
					</p>
					<div className="mt-4 flex space-x-4">
						<button
							className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
							onClick={clearCart}
						>
							Clear Cart
						</button>
						<Link
							to="/checkout"
							className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 dark:hover:bg-green-700"
						>
							Checkout
						</Link>
					</div>
				</>
			)}
		</div>
	);
};

export default Cart;
