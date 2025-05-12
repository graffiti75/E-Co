import React, { createContext, useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { User } from "../types/types";
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
}>({
	user: null,
	login: async () => false,
	register: async () => false,
	logout: () => {},
	error: null,
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

	return (
		<AuthContext.Provider
			value={{
				user,
				login,
				register,
				logout,
				error,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
