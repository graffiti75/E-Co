import React from "react";
import { CartItem } from "./types";
import ItemQuantityButton from "./ItemQuantityButton";

interface CartItemUIProps {
	item: CartItem;
	updateQuantity: (id: number, quantity: number) => void;
	removeFromCart: (id: number) => void;
}

const CartItemUI: React.FC<CartItemUIProps> = ({
	item,
	updateQuantity,
	removeFromCart,
}) => {
	return (
		<div
			key={item.product.id}
			className="flex justify-between items-center mb-2"
		>
			<span className="text-black dark:text-white">
				{item.product.name} (x{item.quantity}) - $
				{item.product.price * item.quantity}
			</span>
			<div className="flex items-center">
				<ItemQuantityButton
					item={item}
					decrease={true}
					updateQuantity={updateQuantity}
				/>
				<span className="mx-2 text-black dark:text-white">
					{item.quantity}
				</span>
				<ItemQuantityButton
					item={item}
					decrease={false}
					updateQuantity={updateQuantity}
				/>
				<button
					className="ml-4 bg bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 dark:hover:bg-red-700"
					onClick={() => removeFromCart(item.product.id)}
				>
					Remove
				</button>
			</div>
		</div>
	);
};

export default CartItemUI;
