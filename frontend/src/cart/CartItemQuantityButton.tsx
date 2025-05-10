import { CartItem } from "../types/types";

interface CartItemQuantityButtonProps {
	item: CartItem;
	decrease: boolean; // true = decrease, false = increase
	updateQuantity: (id: string, quantity: number) => Promise<boolean>;
}

const CartItemQuantityButton: React.FC<CartItemQuantityButtonProps> = ({
	item,
	decrease,
	updateQuantity,
}) => {
	const isDisabled = decrease && item.quantity <= 1;
	return (
		<button
			className="bg-gray-300 dark:bg-gray-700 text-black dark:text-white px-2 py-1 rounded hover:bg-gray-400 dark:hover:bg-gray-600"
			onClick={() =>
				updateQuantity(
					item._id,
					decrease ? item.quantity - 1 : item.quantity + 1
				)
			}
			disabled={isDisabled}
		>
			{decrease ? "-" : "+"}
		</button>
	);
};

export default CartItemQuantityButton;
