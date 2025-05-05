import React, { createContext, useState } from "react";

export interface User {
	username: string;
	email: string;
}

export const AuthContext = createContext<{
	user: User | null;
	login: (username: string, email: string) => boolean;
	register: (username: string, email: string, password: string) => boolean;
	logout: () => void;
	error: string | null;
}>({
	user: null,
	login: () => false,
	register: () => false,
	logout: () => {},
	error: null,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = useState<User | null>(null);
	const [error, setError] = useState<string | null>(null);

	const login = (email: string, password: string) => {
		if (!email || !password) {
			setError("Email and password are required");
			return false;
		}
		if (password.length < 6) {
			setError("Password must be at least 6 characters");
			return false;
		}
		setError(null);
		setUser({ username: "User", email });
		return true;
	};

	const register = (username: string, email: string, password: string) => {
		if (!username || !email || !password) {
			setError("All fields are required");
			return false;
		}
		if (password.length < 6) {
			setError("Password must be at least 6 characters");
			return false;
		}
		setError(null);
		setUser({ username, email });
		return true;
	};

	const logout = () => {
		setUser(null);
		setError(null);
	};

	return (
		<AuthContext.Provider value={{ user, login, register, logout, error }}>
			{children}
		</AuthContext.Provider>
	);
};
