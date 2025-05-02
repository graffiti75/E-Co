import React, { useState, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { DarkModeContext } from "./DarkModeContext";
import ProductCard from "./ProductCart";
import ProductDetails from "./ProductDetails";
import Cart from "./Cart";
import Checkout from "./Checkout";
import { Product, CartItem } from "./types";
import { products } from "./products";

const App: React.FC = () => {
	const [cart, setCart] = useState<CartItem[]>([]);
	const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);

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
		<div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
			<div className="container mx-auto p-4">
				<div className="flex justify-between items-center mb-8">
					<h1 className="text-3xl font-bold">E-Commerce Store</h1>
					<button
						className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
						onClick={toggleDarkMode}
					>
						{isDarkMode ? "Light Mode" : "Dark Mode"}
					</button>
				</div>
				<Routes>
					<Route
						path="/"
						element={
							<div className="flex flex-wrap justify-center">
								{products.map((product) => (
									<ProductCard
										key={product.id}
										product={product}
										addToCart={addToCart}
									/>
								))}
							</div>
						}
					/>
					<Route
						path="/products/:id"
						element={<ProductDetails addToCart={addToCart} />}
					/>
					<Route
						path="/checkout"
						element={
							<Checkout cartItems={cart} clearCart={clearCart} />
						}
					/>
				</Routes>
				<Cart
					cartItems={cart}
					updateQuantity={updateQuantity}
					removeFromCart={removeFromCart}
					clearCart={clearCart}
				/>
			</div>
		</div>
	);
};

export default App;
