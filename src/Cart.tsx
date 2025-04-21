import React from "react";
import { CartItem } from "./types";

interface CartProps {
	cartItems: CartItem[];
	removeFromCart: (id: number) => void;
}

const Cart: React.FC<CartProps> = ({ cartItems, removeFromCart }) => {
	const total = cartItems.reduce(
		(sum, item) => sum + item.product.price * item.quantity,
		0
	);

	return (
		<div className="mt-8 p-4 border rounded-lg shadow-lg">
			<h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
			{cartItems.length === 0 ? (
				<p>Your cart is empty.</p>
			) : (
				<>
					{cartItems.map((item) => (
						<div
							key={item.product.id}
							className="flex justify-between items-center mb-2"
						>
							<span>
								{item.product.name} (x{item.quantity}) - $
								{item.product.price * item.quantity}
							</span>
							<button
								className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
								onClick={() => removeFromCart(item.product.id)}
							>
								Remove
							</button>
						</div>
					))}
					<p className="text-xl font-semibold mt-4">
						Total: ${total}
					</p>
				</>
			)}
		</div>
	);
};

export default Cart;
