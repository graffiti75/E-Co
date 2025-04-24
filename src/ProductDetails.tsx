import React from "react";
import { useParams, Link } from "react-router-dom";
import { Product } from "./types";

// Mock products (same as App.tsx, ideally move to a shared file later)
const products: Product[] = [
	{
		id: 1,
		name: "Laptop",
		price: 999,
		description: "High-performance laptop with 16GB RAM and 512GB SSD.",
		imageUrl: "https://via.placeholder.com/300",
	},
	{
		id: 2,
		name: "Phone",
		price: 499,
		description: "Latest smartphone with 108MP camera and 5G support.",
		imageUrl: "https://via.placeholder.com/300",
	},
	{
		id: 3,
		name: "Headphones",
		price: 99,
		description: "Noise-cancelling headphones with 20-hour battery life.",
		imageUrl: "https://via.placeholder.com/300",
	},
];

interface ProductDetailsProps {
	addToCart: (product: Product) => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ addToCart }) => {
	const { id } = useParams<{ id: string }>();
	const product = products.find((p) => p.id === parseInt(id || "0"));

	if (!product) {
		return <div className="text-center p-4">Product not found</div>;
	}

	return (
		<div className="container mx-auto p-4">
			<Link
				to="/"
				className="text-blue-500 hover:underline mb-4 inline-block"
			>
				Back to Products
			</Link>
			<div className="flex flex-col md:flex-row items-center">
				<img
					src={product.imageUrl}
					alt={product.name}
					className="w-full md:w-1/2 h-64 object-cover rounded-lg"
				/>
				<div className="md:ml-6 mt-4 md:mt-0">
					<h2 className="text-3xl font-bold">{product.name}</h2>
					<p className="text-gray-600 mt-2">{product.description}</p>
					<p className="text-2xl font-semibold mt-4">
						${product.price}
					</p>
					<button
						className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
						onClick={() => addToCart(product)}
					>
						Add to Cart
					</button>
				</div>
			</div>
		</div>
	);
};

export default ProductDetails;
