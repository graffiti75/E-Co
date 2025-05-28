import React from "react";
import { CartItem } from "../types/types";
import CartItemQuantityButton from "./CartItemQuantityButton";
import { formatPrice } from "../utils/formatPrice";
import { log } from "../utils/logger";

interface CartItemUIProps {
	item: CartItem;
	updateQuantity: (cartItemId: string, quantity: number) => Promise<boolean>;
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
				{item.product.name} (x{item.quantity}) -
				{formatPrice(item.product.price * item.quantity)}
			</span>
			<div className="flex items-center">
				<CartItemQuantityButton
					item={item}
					decrease={true}
					updateQuantity={async (id, quantity) => {
						const success = await updateQuantity(id, quantity);
						log(
							`CartItemUI.CartItemQuantityButton(decrease=true) -> success: ${success}`
						);
						if (success) refreshCart();
						return success;
					}}
				/>
				<span className="mx-2 text-black dark:text-white">
					{item.quantity}
				</span>
				<CartItemQuantityButton
					item={item}
					decrease={false}
					updateQuantity={async (cartItemId, quantity) => {
						const success = await updateQuantity(
							cartItemId,
							quantity
						);
						log(
							`CartItemUI.CartItemQuantityButton(decrease=false) -> success: ${success}`
						);
						if (success) refreshCart();
						return success;
					}}
				/>
				<button
					className="ml-4 bg bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 dark:hover:bg-red-700"
					onClick={async () => {
						const cartItemId = (item as any)._id;
						await removeFromCart(cartItemId);
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
