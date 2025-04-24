import React, { useState } from "react";
import ProductCard from "./ProductCart";
import Cart from "./Cart";
import { Product, CartItem } from "./types";
// import "./App.css";

// Mock Products Data
const products: Product[] = [
	{
		id: 1,
		name: "Laptop",
		price: 999,
		description: "High-performance laptop",
		imageUrl: "https://via.placeholder.com/150",
	},
	{
		id: 2,
		name: "Phone",
		price: 499,
		description: "Latest smartphone",
		imageUrl: "https://via.placeholder.com/150",
	},
	{
		id: 3,
		name: "Headphones",
		price: 99,
		description: "Noise-cancelling headphones",
		imageUrl: "https://via.placeholder.com/150",
	},
];

const App: React.FC = () => {
	const [cart, setCart] = useState<CartItem[]>([]);

	const addToCart = (product: Product) => {
		const existingItem = cart.find(
			(item) => item.product.id === product.id
		);
		if (existingItem) {
			setCart(
				cart.map((item) =>
					item.product.id === product.id
						? { ...item, quantity: item.quantity + 1 }
						: item
				)
			);
		} else {
			setCart([...cart, { product, quantity: 1 }]);
		}
	};

	const updateQuantity = (id: number, quantity: number) => {
		if (quantity <= 0) {
			setCart(cart.filter((item) => item.product.id !== id));
		} else {
			setCart(
				cart.map((item) =>
					item.product.id === id ? { ...item, quantity } : item
				)
			);
		}
	};

	const removeFromCart = (id: number) => {
		setCart(cart.filter((item) => item.product.id !== id));
	};

	const clearCart = () => {
		setCart([]);
	};

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-3xl font-bold text-center mb-8">
				E-Commerce Store
			</h1>
			<div className="flex flex-wrap justify-center">
				{products.map((product) => (
					<ProductCard
						key={product.id}
						product={product}
						addToCart={addToCart}
					/>
				))}
			</div>
			<Cart
				cartItems={cart}
				updateQuantity={updateQuantity}
				removeFromCart={removeFromCart}
				clearCart={clearCart}
			/>
		</div>
	);
};

export default App;
