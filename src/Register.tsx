import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const Register: React.FC = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { register } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleSubmit = () => {
		if (username && email && password) {
			register(username, email, password); // Mock register
			navigate("/");
		}
	};

	return (
		<div className="container mx-auto p-4 bg-white dark:bg-gray-900 text-black dark:text-white">
			<h2 className="text-2xl font-bold mb-4">Register</h2>
			<input
				type="text"
				placeholder="Username"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				className="w-full p-2 mb-4 border rounded bg-white dark:bg-gray-700 text-black dark:text-white"
			/>
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
				disabled={!username || !email || !password}
			>
				Register
			</button>
			<p className="mt-4">
				Already have an account?{" "}
				<Link
					to="/login"
					className="text-blue-500 dark:text-blue-400 hover:underline"
				>
					Login
				</Link>
			</p>
		</div>
	);
};

export default Register;
