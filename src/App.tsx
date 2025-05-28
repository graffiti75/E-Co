import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProductList from "./products/ProductList";
import ProductDetails from "./products/ProductDetails";
import Cart from "./cart/Cart";
import Checkout from "./checkout/Checkout";
import AuthScreen from "./auth/AuthScreen";
import Header from "./components/Header";
import { AuthContext } from "./auth/AuthContext";
import { CartContext } from "./cart/CartContext";

const App: React.FC = () => {
	const { user } = useContext(AuthContext);
	const {
		error,
		cartItems,
		addToCart,
		fetchCart,
		updateCartItem,
		removeFromCart,
		clearCart,
	} = useContext(CartContext);

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
									cartItems={cartItems}
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
						error={error}
						fetchCart={fetchCart}
						updateCartItem={updateCartItem}
						removeFromCart={removeFromCart}
						clearCart={clearCart}
					/>
				)}
			</div>
		</div>
	);
};

export default App;
