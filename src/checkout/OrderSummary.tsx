import { CartItem } from "../types/types";
import { formatPrice } from "../utils/formatPrice";

interface OrderSummaryProps {
	cartItems: CartItem[];
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ cartItems }) => {
	const total = cartItems.reduce(
		(sum, item) => sum + item.productId.price * item.quantity,
		0
	);

	return (
		<div className="md:w-1/2 md:ml-6 mt-4 md:mt-0">
			<h3 className="text-xl font-semibold mb-2 text-black dark:text-white">
				Order Summary
			</h3>
			{cartItems.map((item) => (
				<div
					key={item._id}
					className="flex justify-between mb-2 text-black dark:text-white"
				>
					<span>
						{item.productId.name} (x{item.quantity})
					</span>
					<span>
						{formatPrice(item.productId.price * item.quantity)}
					</span>
				</div>
			))}
			<p className="text-xl font-semibold mt-4 text-black dark:text-white dark:bg-gray-900">
				Total: {formatPrice(total)}
			</p>
		</div>
	);
};

export default OrderSummary;
