import React, { createContext, useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { User, CartItem, Product } from "../types/types";
import { log } from "../utils/logger";

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
			log(
				`AuthContext.login -> Calling POST ${
					import.meta.env.VITE_API_URL
				}/api/login`
			);
			log(
				`AuthContext.login -> username: email: ${email}, password: ${password}`
			);
			const res = await axios.post(
				`${import.meta.env.VITE_API_URL}/api/login`,
				{ email, password }
			);
			log(`AuthContext.login -> res: ${res}`);
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
			log(
				`AuthContext.register -> Calling POST ${
					import.meta.env.VITE_API_URL
				}/api/register`
			);
			log(
				`AuthContext.register -> username: ${username}, email: ${email}, password: ${password}`
			);
			const res = await axios.post(
				`${import.meta.env.VITE_API_URL}/api/register`,
				{ username, email, password }
			);
			log(`AuthContext.register -> res: ${res}`);
			setUser(res.data.user);
			localStorage.setItem("token", res.data.token);
			setError(null);
			return true;
		} catch (err) {
			const axiosError = err as AxiosError<ErrorResponse>;
			const errorMessage =
				axiosError.response?.data?.error || "Registration failed";
			setError(errorMessage);
			log(`Registration error: ${errorMessage}`);
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
			log(`AuthContext.addToCart -> token: ${token}`);
			log(
				`AuthContext.addToCart -> Calling POST ${
					import.meta.env.VITE_API_URL
				}/api/cart`
			);
			log(
				`AuthContext.addToCart -> productId: ${product._id}, quantity: 1`
			);
			const res = await axios.post(
				`${import.meta.env.VITE_API_URL}/api/cart`,
				{ productId: product._id, quantity: 1 },
				{ headers: { Authorization: `Bearer ${token}` } }
			);
			log(`AuthContext.addToCart -> res: ${res}`);
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
			log(`AuthContext.fetchCart -> token: ${token}`);
			log(
				`AuthContext.fetchCart -> Calling GET ${
					import.meta.env.VITE_API_URL
				}/api/cart`
			);
			const res = await axios.get(
				`${import.meta.env.VITE_API_URL}/api/cart`,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			log(`AuthContext.fetchCart -> res: ${JSON.stringify(res)}`);
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
			log(`AuthContext.updateCartItem -> token: ${token}`);
			log(
				`AuthContext.updateCartItem -> Calling PUT ${
					import.meta.env.VITE_API_URL
				}/api/cart/${id}`
			);
			log(
				`AuthContext.updateCartItem -> id: ${id}, quantity: ${quantity}`
			);
			const res = await axios.put(
				`${import.meta.env.VITE_API_URL}/api/cart/${id}`,
				{ quantity },
				{ headers: { Authorization: `Bearer ${token}` } }
			);
			log(`AuthContext.updateCartItem -> res: ${res}`);
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
			log(`AuthContext.removeFromCart -> token: ${token}`);
			log(
				`AuthContext.removeFromCart -> Calling DELETE ${
					import.meta.env.VITE_API_URL
				}/api/cart/${id}`
			);
			const res = await axios.delete(
				`${import.meta.env.VITE_API_URL}/api/cart/${id}`,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			log(`AuthContext.removeFromCart -> res: ${res}`);
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
			log(`AuthContext.clearCart -> token: ${token}`);
			log(
				`AuthContext.clearCart -> Calling DELETE ${
					import.meta.env.VITE_API_URL
				}/api/cart`
			);
			const res = await axios.delete(
				`${import.meta.env.VITE_API_URL}/api/cart`,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			log(`AuthContext.clearCart -> res: ${res}`);
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
