import { CartItem } from "../types/types";
import OrderSummary from "./OrderSummary";
import ShippingForm from "./ShippingForm";
import BackButton from "../components/BackButton";

interface CheckoutProps {
	cartItems: CartItem[];
	clearCart: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ cartItems, clearCart }) => {
	return (
		<div className="container mx-auto p-4">
			<h2 className="text-2xl font-bold mb-4 text-black dark:text-white">
				Checkout
			</h2>
			<div className="flex flex-col md:flex-row">
				<ShippingForm clearCart={clearCart} />
				<OrderSummary cartItems={cartItems} />
			</div>
			<BackButton />
		</div>
	);
};

export default Checkout;
