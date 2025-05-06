import React, { useState, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProductList from "./products/ProductList";
import ProductDetails from "./products/ProductDetails";
import Cart from "./cart/Cart";
import Checkout from "./checkout/Checkout";
import AuthScreen from "./auth/AuthScreen";
import Header from "./components/Header";
import { Product, CartItem } from "./types/types";
import { AuthContext } from "./auth/AuthContext";

const App: React.FC = () => {
	const [cart, setCart] = useState<CartItem[]>([]);
	const { user } = useContext(AuthContext);

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
					<Route path="/auth" element={<AuthScreen />} />
					<Route
						path="/"
						element={
							user ? (
								<ProductList addToCart={addToCart} />
							) : (
								<Navigate to="/auth" />
							)
						}
					/>
					<Route
						path="/products/:id"
						element={
							user ? (
								<ProductDetails addToCart={addToCart} />
							) : (
								<Navigate to="/auth" />
							)
						}
					/>
					<Route
						path="/checkout"
						element={
							user ? (
								<Checkout
									cartItems={cart}
									clearCart={clearCart}
								/>
							) : (
								<Navigate to="/auth" />
							)
						}
					/>
				</Routes>
				{user && (
					<Cart
						cartItems={cart}
						updateQuantity={updateQuantity}
						removeFromCart={removeFromCart}
						clearCart={clearCart}
					/>
				)}
			</div>
		</div>
	);
};

export default App;
