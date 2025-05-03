import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const Login: React.FC = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { login } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleSubmit = () => {
		if (email && password) {
			login("User", email); // Mock login
			navigate("/");
		}
	};

	return (
		<div className="container mx-auto p-4 bg-white dark:bg-gray-900 text-black dark:text-white">
			<h2 className="text-2xl font-bold mb-4">Login</h2>
			<input
				type="email"
				placeholder="Email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				className="w-full p-2 mb-4 border rounded bg-white dark:bg-gray-700 text-black dark:text-white"
			/>
			<input
				type="password"
				placeholder="Password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				className="w-full p-2 mb-4 border rounded bg-white dark:bg-gray-700 text-black dark:text-white"
			/>
			<button
				className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
				onClick={handleSubmit}
				disabled={!email || !password}
			>
				Login
			</button>
			<p className="mt-4">
				Don't have an account?{" "}
				<Link
					to="/register"
					className="text-blue-500 dark:text-blue-400 hover:underline"
				>
					Register
				</Link>
			</p>
		</div>
	);
};

export default Login;
