import React from "react";

const Hero: React.FC = () => {
	return (
		<div
			className="bg-cover bg-center h-64 text-white flex items-center justify-center mb-8"
			style={{ backgroundImage: "url('https://placehold.co/1200x400')" }}
		>
			<div className="text-center">
				<h2 className="text-4xl font-bold">Welcome to E-Co</h2>
				<p className="text-xl mt-2">
					Your one-stop shop for everything you need.
				</p>
			</div>
		</div>
	);
};

export default Hero;
