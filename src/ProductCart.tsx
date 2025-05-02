import React from "react";
import { Link } from "react-router-dom";
import { Product } from "./types";

interface ProductCartProps {
	product: Product;
	addToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCartProps> = ({ product, addToCart }) => {
	return (
		<div className="border rounded-lg p-4 m-2 w-64 shadow-lg">
			<Link to={`/products/${product.id}`}>
				<img
					src={product.imageUrl}
					alt={product.name}
					className="w-full h-40 object-cover"
				/>
				<h3 className="text-lg font-bold mt-2">{product.name}</h3>
				<p className="text-gray-600">{product.description}</p>
				<p className="text-xl font-semibold mt-1">${product.price}</p>
			</Link>
			<button
				className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
				onClick={() => addToCart(product)}
			>
				Add to Cart
			</button>
		</div>
	);
};

export default ProductCard;
