import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import CartItemUI from "./CartItemUI";
import { formatPrice } from "../utils/formatPrice";
import { log } from "../utils/logger";
import { CartContext } from "./CartContext";

interface CartProps {
	error: string | null;
	fetchCart: () => Promise<void>;
	updateCartItem: (cartItemId: string, quantity: number) => Promise<boolean>;
	removeFromCart: (id: string) => Promise<boolean>;
	clearCart: () => void;
}

const Cart: React.FC<CartProps> = ({
	error,
	fetchCart,
	updateCartItem,
	removeFromCart,
	clearCart,
}) => {
	const { cartItems } = useContext(CartContext);
	log(`Cart -> error: ${error}`);
	const validCartItems = cartItems.filter(
		(item) => item.product.id !== null
	);
	log(`Cart -> validCartItems: ${JSON.stringify(validCartItems, null, 2)}`);
	const total = validCartItems.reduce(
		(sum, item) => sum + item.product.price * item.quantity,
		0
	);
	// The code below updates the Shopping Cart only after login.
	useEffect(() => {
		fetchCart()
			.then(() => log(`Cart -> fetchCart() completed.`))
			.catch(console.error);
	}, []);

	// The code below updates the Shopping Cart every time a CardItem is updated.
	const refreshCart = () => {
		fetchCart()
			.then(() => log(`Cart -> refreshCart() completed.`))
			.catch(console.error);
	};

	return (
		<div className="mt-8 p-4 border rounded-lg shadow-lg bg-white dark:bg-gray-800">
			<h2 className="text-2xl font-bold mb-4 text-black dark:text-white">
				Shopping Cart
			</h2>
			{error && <p className="text-red-500">{error}</p>}
			{validCartItems.length === 0 ? (
				<p className="text-black dark:text-white">
					Your cart is empty.
				</p>
			) : (
				<>
					{validCartItems.map((item) => (
						<CartItemUI
							key={item._id}
							item={item}
							updateQuantity={updateCartItem}
							removeFromCart={removeFromCart}
							refreshCart={refreshCart}
						/>
					))}
					<p className="text-xl font-semibold mt-4 text-black dark:text-white">
						Total: {formatPrice(total)}
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
