import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export interface User {
	username: string;
	email: string;
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
	// const [user, setUser] = useState<User | null>(null);
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

	// const login = (email: string, password: string) => {
	// 	if (!email || !password) {
	// 		setError("Email and password are required");
	// 		return false;
	// 	}
	// 	if (password.length < 6) {
	// 		setError("Password must be at least 6 characters");
	// 		return false;
	// 	}
	// 	setError(null);
	// 	// setUser({ username: "User", email });
	// 	const newUser = { username: "User", email };
	// 	setUser(newUser);
	// 	return true;
	// };

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
			setError(err.response?.data?.error || "Login failed");
			return false;
		}
	};

	// const register = (username: string, email: string, password: string) => {
	// 	if (!username || !email || !password) {
	// 		setError("All fields are required");
	// 		return false;
	// 	}
	// 	if (password.length < 6) {
	// 		setError("Password must be at least 6 characters");
	// 		return false;
	// 	}
	// 	setError(null);
	// 	// setUser({ username, email });
	// 	const newUser = { username, email };
	// 	setUser(newUser);
	// 	return true;
	// };

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
			setError(err.response?.data?.error || "Registration failed");
			console.log(`Registration error: ${err.response?.data?.error}`);
			console.log("Hello");
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
		<AuthContext.Provider value={{ user, login, register, logout, error }}>
			{children}
		</AuthContext.Provider>
	);
};
