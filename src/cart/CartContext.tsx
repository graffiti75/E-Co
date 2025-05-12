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
		try {
			const token = localStorage.getItem("token");
			log(
				`CartContext.fetchCart -> Calling GET ${
					import.meta.env.VITE_API_URL
				}/api/cart`
			);
			log(`CartContext.fetchCart -> token: ${token}`);
			const res = await axios.get(
				`${import.meta.env.VITE_API_URL}/api/cart`,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			setError(null);
			const validData = res.data.filter(
				(item: CartItem) => item.productId !== null
			);
			setCartItems(validData);
		} catch (err) {
			const axiosError = err as AxiosError<ErrorResponse>;
			handleError(axiosError, "Failed to fetch cart");
		}
	};

	const addToCart = async (product: Product) => {
		try {
			const token = localStorage.getItem("token");
			log(
				`CartContext.addToCart -> Calling POST ${
					import.meta.env.VITE_API_URL
				}/api/cart`
			);
			log(
				`CartContext.addToCart -> productId: ${product._id}, token: ${token}`
			);
			await axios.post(
				`${import.meta.env.VITE_API_URL}/api/cart`,
				{ productId: product._id, quantity: 1 },
				{ headers: { Authorization: `Bearer ${token}` } }
			);
			setError(null);
			await fetchCart();
			return true;
		} catch (err) {
			const axiosError = err as AxiosError<ErrorResponse>;
			handleError(axiosError, "Failed to add to cart");
			return false;
		}
	};

	const updateCartItem = async (id: string, quantity: number) => {
		try {
			const token = localStorage.getItem("token");
			log(
				`CartContext.updateCartItem -> Calling PUT ${
					import.meta.env.VITE_API_URL
				}/api/cart`
			);
			log(
				`CartContext.updateCartItem -> id: ${id}, quantity: ${quantity}, token: ${token}`
			);
			await axios.put(
				`${import.meta.env.VITE_API_URL}/api/cart/${id}`,
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

	const removeFromCart = async (id: string) => {
		try {
			const token = localStorage.getItem("token");
			log(
				`CartContext.removeFromCart -> Calling DELETE ${
					import.meta.env.VITE_API_URL
				}/api/cart`
			);
			log(`CartContext.removeFromCart -> id: ${id}, token: ${token}`);
			await axios.delete(
				`${import.meta.env.VITE_API_URL}/api/cart/${id}`,
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
