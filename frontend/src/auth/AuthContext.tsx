import React, { createContext, useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { User, CartItem, Product } from "../types/types";

interface ErrorResponse {
	error?: string;
}

export const AuthContext = createContext<{
	user: User | null;
	login: (username: string, email: string) => Promise<boolean>;
	register: (
		username: string,
		email: string,
		password: string
	) => Promise<boolean>;
	logout: () => void;
	error: string | null;
	addToCart: (product: Product) => Promise<boolean>;
	fetchCart: () => Promise<CartItem[]>;
	updateCartItem: (id: string, quantity: number) => Promise<boolean>;
	removeFromCart: (id: string) => Promise<boolean>;
	clearCart: () => void;
}>({
	user: null,
	login: async () => false,
	register: async () => false,
	logout: () => {},
	error: null,
	addToCart: async () => false,
	fetchCart: async () => [],
	updateCartItem: async () => false,
	removeFromCart: async () => false,
	clearCart: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = useState<User | null>(() => {
		const storedUser = localStorage.getItem("user");
		return storedUser ? JSON.parse(storedUser) : null;
	});
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		localStorage.setItem("user", JSON.stringify(user));
		localStorage.setItem(
			"token",
			user ? localStorage.getItem("token") || "" : ""
		);
	}, [user]);

	const login = async (email: string, password: string) => {
		try {
			const res = await axios.post(
				`${import.meta.env.VITE_API_URL}/api/login`,
				{ email, password }
			);
			setUser(res.data.user);
			localStorage.setItem("token", res.data.token);
			setError(null);
			return true;
		} catch (err) {
			const axiosError = err as AxiosError<ErrorResponse>;
			setError(axiosError.response?.data?.error || "Login failed");
			return false;
		}
	};

	const register = async (
		username: string,
		email: string,
		password: string
	) => {
		try {
			const res = await axios.post(
				`${import.meta.env.VITE_API_URL}/api/register`,
				{ username, email, password }
			);
			setUser(res.data.user);
			localStorage.setItem("token", res.data.token);
			setError(null);
			return true;
		} catch (err) {
			const axiosError = err as AxiosError<ErrorResponse>;
			const errorMessage =
				axiosError.response?.data?.error || "Registration failed";
			setError(errorMessage);
			console.log(`Registration error: ${errorMessage}`);
			return false;
		}
	};

	const logout = () => {
		setUser(null);
		setError(null);
		localStorage.removeItem("user");
		localStorage.removeItem("token");
	};

	const addToCart = async (product: Product) => {
		try {
			const token = localStorage.getItem("token");
			await axios.post(
				`${import.meta.env.VITE_API_URL}/api/cart`,
				{ productId: product._id, quantity: 1 },
				{ headers: { Authorization: `Bearer ${token}` } }
			);
			setError(null);
			return true;
		} catch (err) {
			const axiosError = err as AxiosError<ErrorResponse>;
			setError(
				axiosError.response?.data?.error || "Failed to add to cart"
			);
			return false;
		}
	};

	const fetchCart = async () => {
		try {
			const token = localStorage.getItem("token");
			const res = await axios.get(
				`${import.meta.env.VITE_API_URL}/api/cart`,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			return res.data;
		} catch (err) {
			const axiosError = err as AxiosError<ErrorResponse>;
			setError(
				axiosError.response?.data?.error || "Failed to fetch cart"
			);
			return [];
		}
	};

	const updateCartItem = async (id: string, quantity: number) => {
		try {
			const token = localStorage.getItem("token");
			await axios.put(
				`${import.meta.env.VITE_API_URL}/api/cart/${id}`,
				{ quantity },
				{ headers: { Authorization: `Bearer ${token}` } }
			);
			setError(null);
			return true;
		} catch (err) {
			const axiosError = err as AxiosError<ErrorResponse>;
			setError(
				axiosError.response?.data?.error || "Failed to update cart"
			);
			return false;
		}
	};

	const removeFromCart = async (id: string) => {
		try {
			const token = localStorage.getItem("token");
			await axios.delete(
				`${import.meta.env.VITE_API_URL}/api/cart/${id}`,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			setError(null);
			return true;
		} catch (err) {
			const axiosError = err as AxiosError<ErrorResponse>;
			setError(
				axiosError.response?.data?.error || "Failed to remove from cart"
			);
			return false;
		}
	};

	const clearCart = async () => {
		try {
			const token = localStorage.getItem("token");
			await axios.delete(`${import.meta.env.VITE_API_URL}/api/cart`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			setError(null);
			return true;
		} catch (err) {
			const axiosError = err as AxiosError<ErrorResponse>;
			setError(
				axiosError.response?.data?.error || "Failed to clear cart"
			);
			return false;
		}
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				login,
				register,
				logout,
				error,
				addToCart,
				fetchCart,
				updateCartItem,
				removeFromCart,
				clearCart,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
