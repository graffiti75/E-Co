import React from "react";
import { CartItem } from "../types/types";
import ItemQuantityButton from "./ItemQuantityButton";
import { formatPrice } from "../utils/formatPrice";

interface CartItemUIProps {
	item: CartItem;
	updateQuantity: (id: string, quantity: number) => Promise<boolean>;
	removeFromCart: (id: string) => Promise<boolean>;
	refreshCart: () => void;
}

const CartItemUI: React.FC<CartItemUIProps> = ({
	item,
	updateQuantity,
	removeFromCart,
	refreshCart,
}) => {
	return (
		<div className="flex justify-between items-center mb-2">
			<span className="text-black dark:text-white">
				{item.productId.name} (x{item.quantity}) -
				{formatPrice(item.productId.price * item.quantity)}
			</span>
			<div className="flex items-center">
				<ItemQuantityButton
					item={item}
					decrease={true}
					updateQuantity={async (id, quantity) => {
						const success = await updateQuantity(id, quantity);
						if (success) refreshCart();
						return success;
					}}
				/>
				<span className="mx-2 text-black dark:text-white">
					{item.quantity}
				</span>
				<ItemQuantityButton
					item={item}
					decrease={false}
					updateQuantity={async (id, quantity) => {
						const success = await updateQuantity(id, quantity);
						if (success) refreshCart();
						return success;
					}}
				/>
				<button
					className="ml-4 bg bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 dark:hover:bg-red-700"
					onClick={async () => {
						await removeFromCart(item._id);
						refreshCart();
					}}
				>
					Remove
				</button>
			</div>
		</div>
	);
};

export default CartItemUI;
