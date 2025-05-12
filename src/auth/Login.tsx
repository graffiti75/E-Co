import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const Login: React.FC = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { login, error } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleSubmit = async () => {
		if (await login(email, password)) {
			navigate("/");
		}
	};

	return (
		<div className="text-black dark:text-white">
			<h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
			{error && (
				<p className="text-red-500 dark:text-red-400 mb-4">{error}</p>
			)}
			<div className="mb-4">
				<label className="block mb-1">Email</label>
				<input
					type="email"
					placeholder="Enter your email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-black dark:text-white"
				/>
			</div>
			<div className="mb-4">
				<label className="block mb-1">Password</label>
				<input
					type="password"
					placeholder="Enter your password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-black dark:text-white"
				/>
			</div>
			<button
				className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
				onClick={handleSubmit}
				disabled={!email || !password}
			>
				Login
			</button>
		</div>
	);
};

export default Login;
