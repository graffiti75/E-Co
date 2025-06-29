import React, { useContext, useState } from "react"; // Added useState
import { Routes, Route, Navigate } from "react-router-dom";
import ProductList from "./products/ProductList";
import ProductDetails from "./products/ProductDetails";
import Cart from "./cart/Cart";
import Checkout from "./checkout/Checkout";
import AuthScreen from "./auth/AuthScreen";
import Header from "./components/Header";
import { AuthContext } from "./auth/AuthContext";
import { CartContext } from "./cart/CartContext";
import SearchResults from "./search/SearchResults";

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
	const [isCartVisible, setIsCartVisible] = useState(false); // State for cart visibility

	const toggleCartVisibility = () => {
		setIsCartVisible(!isCartVisible);
		if (!isCartVisible) { // If cart is about to become visible, fetch cart items
			fetchCart();
		}
	};

	return (
		<div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
			<div className="container mx-auto p-4">
				<Header toggleCartVisibility={toggleCartVisibility} /> {/* Pass toggle function */}
				<Routes>
					<Route path="/auth" element={<AuthScreen />} />
					<Route path="/search" element={<SearchResults />} />
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
				{user && isCartVisible && ( // Conditionally render Cart
					<Cart
						error={error}
						fetchCart={fetchCart} // fetchCart is already called in toggleCartVisibility, but keeping it here won't harm
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
