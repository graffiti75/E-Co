import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

const AuthScreen: React.FC = () => {
	const [activeTab, setActiveTab] = useState<"login" | "register">("login");

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
			<div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
				<div className="flex mb-6">
					<button
						className={`flex-1 py-2 text-center font-semibold ${
							activeTab === "login"
								? "bg-blue-500 text-white dark:bg-blue-600"
								: "bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
						} rounded-l-lg`}
						onClick={() => setActiveTab("login")}
					>
						Login
					</button>
					<button
						className={`flex-1 py-2 text-center font-semibold ${
							activeTab === "register"
								? "bg-blue-500 text-white dark:bg-blue-600"
								: "bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
						} rounded-r-lg`}
						onClick={() => setActiveTab("register")}
					>
						Register
					</button>
				</div>
				{activeTab === "login" ? <Login /> : <Register />}
			</div>
		</div>
	);
};

export default AuthScreen;
