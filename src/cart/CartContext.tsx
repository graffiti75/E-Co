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

	const addToCart = async (product: Product): Promise<boolean> => {
		const authToken = localStorage.getItem("token");
		if (!authToken) {
			setError(
				"Auth token not found. Cannot add to cart. You must be logged in to add items to the cart."
			);
			return false;
		}

		log(
			`Product object received in addToCart: ${JSON.stringify(
				product,
				null,
				2
			)}`
		);

		// The backend expects productId (string) and quantity (number).
		// Your frontend Product type now has 'id: string'.
		const payload = {
			productId: (product as any)._id, // Use the 'id' from your unified Product type
			quantity: 1,
		};

		try {
			const res = await fetch(
				`${import.meta.env.VITE_API_URL}/api/cart`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${authToken}`,
					},
					body: JSON.stringify(payload),
				}
			);

			if (!res.ok) {
				const errorData = await res.json();
				// const errorMessage = `Failed to add item to cart: ${
				// 	errorData.detail || res.statusText
				// }`;
				console.error("Raw error data from backend:", errorData);

				let detailMessage = "Unknown HTTP error";
				if (errorData.detail && Array.isArray(errorData.detail)) {
					detailMessage = errorData.detail
						.map(
							(err: any) =>
								`Field: ${
									err.loc?.join(" -> ") || "N/A"
								}, Error: ${err.msg || "Unknown error detail"}`
						)
						.join("; ");
				} else if (errorData.detail) {
					detailMessage = String(errorData.detail);
				}
				const errorMessage = `Failed to add item to cart: ${detailMessage}`;
				log(errorMessage);
				setError(errorMessage);
				return false;
			}
			const newCartItem = await res.json(); // This is the CartItem from the backend
			log(`Successfully added to cart: ${newCartItem}`);

			setError(null);
			await fetchCart();
			return true;
		} catch (error) {
			const errorMessage = `Network or other error adding to cart: ${error}`;
			log(errorMessage);
			setError(errorMessage);
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
