import React, { useState } from "react";

interface ShippingFormProps {
	clearCart: () => void;
}

const ShippingForm: React.FC<ShippingFormProps> = ({ clearCart }) => {
	const [name, setName] = useState("");
	const [address, setAddress] = useState("");
	const [submitted, setSubmitted] = useState(false);

	const handleSubmit = () => {
		if (name && address) {
			setSubmitted(true);
			clearCart();
		}
	};

	if (submitted) {
		return (
			<div className="container mx-auto p-4 text-center text-black dark:text-white">
				<h2 className="text-2xl font-bold mb-4">Order Confirmed!</h2>
				<p>
					Thank you, {name}! Your order will be shipped to {address}.
				</p>
			</div>
		);
	}

	return (
		<div className="md:w-1/2">
			<h3 className="text-xl font-semibold mb-2 text-black dark:text-white">
				Shipping Information
			</h3>
			<input
				type="text"
				placeholder="Full Name"
				value={name}
				onChange={(e) => setName(e.target.value)}
				className="w-full p-2 mb-4 border rounded bg-white dark:bg-gray-700 text-black dark:text-white"
			/>
			<input
				type="text"
				placeholder="Address"
				value={address}
				onChange={(e) => setAddress(e.target.value)}
				className="w-full p-2 mb-4 border rounded bg-white dark:bg-gray-700 text-black dark:text-white"
			/>
			<button
				className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 dark:hover:bg-green-700"
				onClick={handleSubmit}
				disabled={!name || !address}
			>
				Place Order
			</button>
		</div>
	);
};

export default ShippingForm;
