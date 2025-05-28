import React, { createContext, useState, useContext } from "react";
import axios, { AxiosError } from "axios";
import { CartItem, Product } from "../types/types";
import { AuthContext } from "../auth/AuthContext";
import { log } from "../utils/logger";

interface ErrorResponse {
	error?: string;
}

export const CartContext = createContext<{
	cartItems: CartItem[];
	error: string | null;
	addToCart: (product: Product) => Promise<boolean>;
	fetchCart: () => Promise<void>;
	updateCartItem: (id: string, quantity: number) => Promise<boolean>;
	removeFromCart: (id: string) => Promise<boolean>;
	clearCart: () => Promise<boolean>;
}>({
	cartItems: [],
	error: null,
	addToCart: async () => false,
	fetchCart: async () => {},
	updateCartItem: async () => false,
	removeFromCart: async () => false,
	clearCart: async () => false,
});

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [cartItems, setCartItems] = useState<CartItem[]>([]);
	const [error, setError] = useState<string | null>(null);
	const { logout } = useContext(AuthContext);

	const handleError = (
		axiosError: AxiosError<ErrorResponse>,
		defaultMessage: string
	) => {
		const message = axiosError.response?.data?.error || defaultMessage;
		if (message === "Invalid token") {
			log(
				"CartContext.handleError -> Invalid token detected, logging out"
			);
			logout();
		}
		setError(message);
	};

	const fetchCart = async () => {
		log(
			`CartContext.fetchCart -> Calling GET ${
				import.meta.env.VITE_API_URL
			}/api/cart`
		);
		try {
			const token = localStorage.getItem("token");
			log(`CartContext.fetchCart -> token: ${token}`);
			log(
				`CartContext.fetchCart -> Calling GET ${
					import.meta.env.VITE_API_URL
				}/api/cart`
			);
			const res = await axios.get(
				`${import.meta.env.VITE_API_URL}/api/cart`,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);

			// Check if response data is valid
			if (!Array.isArray(res.data)) {
				log(
					`CartContext.fetchCart -> Error: Response data is not an array`
				);
				setError("Invalid response format");
				return;
			}
			setError(null);
			setCartItems(res.data);
		} catch (err) {
			const axiosError = err as AxiosError<ErrorResponse>;
			log(`CartContext.fetchCart -> Error: ${axiosError.message}`);
			if (axiosError.response) {
				log(
					`CartContext.fetchCart -> Response status: ${axiosError.response.status}`
				);
				log(
					`CartContext.fetchCart -> Response data: ${JSON.stringify(
						axiosError.response.data,
						null,
						2
					)}`
				);
			}
			handleError(axiosError, "Failed to fetch cart");
		}
	};

	const addToCart = async (product: Product) => {
		const authToken = localStorage.getItem("token");
		if (!authToken) {
			setError(
				"Auth token not found. You must be logged in to add items to the cart."
			);
			return false;
		}

		log(
			`CartContext.addToCart -> Product object received in addToCart: ${JSON.stringify(
				product,
				null,
				2
			)}`
		);

		log(`CartContext.addToCart -> Full product object: ${product}`);

		const cartItem = {
			product,
			quantity: 1,
		};
		log(
			`CartContext.addToCart -> Final payload: ${JSON.stringify(
				cartItem
			)}`
		);
		try {
			const res = await axios.post(
				`${import.meta.env.VITE_API_URL}/api/cart`,
				cartItem,
				{
					headers: {
						Authorization: `Bearer ${authToken}`,
					},
				}
			);
			log(
				`CartContext.addToCart -> Successfully added to cart: ${JSON.stringify(
					res.data
				)}`
			);

			setError(null);
			await fetchCart();
			return true;
		} catch (err) {
			const axiosError = err as AxiosError<ErrorResponse>;
			const errorMessage =
				axiosError.response?.data?.error || "Failed to add to cart";
			log(`CartContext.addToCart -> Error: ${errorMessage}`);
			log(errorMessage);
			setError(errorMessage);
			return false;
		}
	};

	const updateCartItem = async (cartItemId: string, quantity: number) => {
		try {
			const token = localStorage.getItem("token");
			log(
				`CartContext.updateCartItem -> Calling PUT ${
					import.meta.env.VITE_API_URL
				}/api/cart/${cartItemId}`
			);
			log(
				`CartContext.updateCartItem -> cartItemId: ${cartItemId}, quantity: ${quantity}, token: ${token}`
			);
			await axios.put(
				`${import.meta.env.VITE_API_URL}/api/cart/${cartItemId}`,
				{ quantity },
				{ headers: { Authorization: `Bearer ${token}` } }
			);
			setError(null);
			await fetchCart();
			return true;
		} catch (err) {
			const axiosError = err as AxiosError<ErrorResponse>;
			handleError(axiosError, "Failed to update cart");
			return false;
		}
	};

	const removeFromCart = async (cartItemId: string) => {
		try {
			const token = localStorage.getItem("token");
			log(
				`CartContext.removeFromCart -> Calling DELETE ${
					import.meta.env.VITE_API_URL
				}/api/cart/${cartItemId}`
			);
			log(
				`CartContext.removeFromCart -> id: ${cartItemId}, token: ${token}`
			);
			await axios.delete(
				`${import.meta.env.VITE_API_URL}/api/cart/${cartItemId}`,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			setError(null);
			await fetchCart();
			return true;
		} catch (err) {
			const axiosError = err as AxiosError<ErrorResponse>;
			handleError(axiosError, "Failed to remove from cart");
			return false;
		}
	};

	const clearCart = async () => {
		try {
			const token = localStorage.getItem("token");
			log(
				`CartContext.clearCart -> Calling DELETE ${
					import.meta.env.VITE_API_URL
				}/api/cart`
			);
			log(`CartContext.clearCart -> token: ${token}`);
			await axios.delete(`${import.meta.env.VITE_API_URL}/api/cart`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			setError(null);
			await fetchCart();
			return true;
		} catch (err) {
			const axiosError = err as AxiosError<ErrorResponse>;
			handleError(axiosError, "Failed to clear cart");
			return false;
		}
	};

	return (
		<CartContext.Provider
			value={{
				cartItems,
				error,
				addToCart,
				fetchCart,
				updateCartItem,
				removeFromCart,
				clearCart,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};
