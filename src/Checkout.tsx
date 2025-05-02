import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CartItem } from "./types";

interface CheckoutProps {
	cartItems: CartItem[];
	clearCart: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ cartItems, clearCart }) => {
	const [name, setName] = useState("");
	const [address, setAddress] = useState("");
	const [submitted, setSubmitted] = useState(false);

	const total = cartItems.reduce(
		(sum, item) => sum + item.product.price * item.quantity,
		0
	);

	const handleSubmit = () => {
		if (name && address) {
			setSubmitted(true);
			clearCart();
		}
	};

	if (submitted) {
		return (
			<div className="container mx-auto p-4 text-center">
				<h2 className="text-2xl font-bold mb-4">Order Confirmed!</h2>
				<p>
					Thank you, {name}! Your order will be shipped to {address}.
				</p>
				<Link
					to="/"
					className="text-blue-500 hover:underline mt-4 inline-block"
				>
					Back to Products
				</Link>
			</div>
		);
	}

	return (
		<div className="container mx-auto p-4">
			<h2 className="text-2xl font-bold mb-4">Checkout</h2>
			<div className="flex flex-col md:flex-row">
				<div className="md:w-1/2">
					<h3 className="text-xl font-semibold mb-2">
						Shipping Information
					</h3>
					<input
						type="text"
						placeholder="Full Name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						className="w-full p-2 mb-4 border rounded"
					/>
					<input
						type="text"
						placeholder="Address"
						value={address}
						onChange={(e) => setAddress(e.target.value)}
						className="w-full p-2 mb-4 border rounded"
					/>
					<button
						className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
						onClick={handleSubmit}
						disabled={!name || !address}
					>
						Place Order
					</button>
				</div>
				<div className="md:w-1/2 md:ml-6 mt-4 md:mt-0">
					<h3 className="text-xl font-semibold mb-2">
						Order Summary
					</h3>
					{cartItems.map((item) => (
						<div
							key={item.product.id}
							className="flex justify-between mb-2"
						>
							<span>
								{item.product.name} (x{item.quantity})
							</span>
							<span>${item.product.price * item.quantity}</span>
						</div>
					))}
					<p className="text-xl font-semibold mt-4">
						Total: ${total}
					</p>
				</div>
			</div>
			<Link
				to="/"
				className="text-blue-500 hover:underline mt-4 inline-block"
			>
				Back to Products
			</Link>
		</div>
	);
};

export default Checkout;
