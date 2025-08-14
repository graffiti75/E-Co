import React from "react";

const Hero: React.FC = () => {
	return (
		<div
			className="bg-cover bg-center h-96 text-black flex items-center justify-center mb-8"
			style={{
				backgroundImage:
					"url('https://assets.lummi.ai/assets/Qmcyq93vj2qx5cqFKSChKM8AwUGXsmwr58WCpWFevkFYSR?auto=format&w=1200')",
			}}
		>
			<div className="text-center bg-white bg-opacity-75 p-8 rounded-lg">
				<h2 className="text-4xl font-bold">Discover Your Style</h2>
				<p className="text-xl mt-2">
					High-quality products, curated for you.
				</p>
			</div>
		</div>
	);
};

export default Hero;
