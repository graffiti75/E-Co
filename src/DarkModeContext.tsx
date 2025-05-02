import React, { createContext, useState, useEffect, ReactNode } from "react";

interface DarkModeContextType {
	isDarkMode: boolean;
	toggleDarkMode: () => void;
}

export const DarkModeContext = createContext<DarkModeContextType>({
	isDarkMode: false,
	toggleDarkMode: () => {},
});

interface DarkModeProviderProps {
	children: ReactNode;
}

export const DarkModeProvider: React.FC<DarkModeProviderProps> = ({
	children,
}) => {
	const [isDarkMode, setIsDarkMode] = useState(() => {
		const saved = localStorage.getItem("darkMode");
		return saved ? JSON.parse(saved) : false;
	});

	useEffect(() => {
		localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
		if (isDarkMode) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}, [isDarkMode]);

	const toggleDarkMode = () => {
		setIsDarkMode(!isDarkMode);
	};

	return (
		<DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
			{children}
		</DarkModeContext.Provider>
	);
};
