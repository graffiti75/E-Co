import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import ProductDetails from "./ProductDetails";
import Cart from "./Cart";
import Checkout from "./Checkout";
import { Product, CartItem } from "./types";
import Header from "./Header";
import ProductList from "./ProductList";

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
		<div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
			<div className="container mx-auto p-4">
				<Header />
				<Routes>
					<Route
						path="/"
						element={<ProductList addToCart={addToCart} />}
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
