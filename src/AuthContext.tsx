import React, { createContext, useState } from "react";

export interface User {
	username: string;
	email: string;
}

export const AuthContext = createContext<{
	user: User | null;
	login: (username: string, email: string) => void;
	register: (username: string, email: string, password: string) => void;
	logout: () => void;
}>({
	user: null,
	login: () => {},
	register: () => {},
	logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = useState<User | null>(null);

	const login = (username: string, email: string) => {
		setUser({ username, email });
	};

	const register = (username: string, email: string, password: string) => {
		setUser({ username, email });
	};

	const logout = () => {
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ user, login, register, logout }}>
			{children}
		</AuthContext.Provider>
	);
};
