import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../types/types";
import { fetchProducts } from "./products";
import BackButton from "../components/BackButton";
import { formatPrice } from "../utils/formatPrice";

interface ProductDetailsProps {
	addToCart: (product: Product) => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ addToCart }) => {
	const { id } = useParams<{ id: string }>();
	const [product, setProduct] = useState<Product | null>(null);

	useEffect(() => {
		fetchProducts()
			.then((products) => {
				const found = products.find((p) => p.id === id);
				setProduct(found || null);
			})
			.catch(console.error);
	}, [id]);

	if (!product) {
		return <div className="text-center p-4">Product not found</div>;
	}

	return (
		<div className="container mx-auto p-4">
			<BackButton />
			<div className="flex flex-col md:flex-row items-center">
				<img
					src={product.imageUrl}
					alt={product.name}
					className="w-full h-64 md:w-1/2 object-cover rounded-lg"
				/>
				<div className="md:ml-6 mt-4 md:mt-0">
					<h2 className="text-3xl font-bold">{product.name}</h2>
					<p className="text-gray-600 mt-2">{product.description}</p>
					<p className="text-2xl font-semibold mt-4">
						{formatPrice(product.price)}
					</p>
					<button
						className="mt-4 bg-blue-500 text-white px-4 py-2 rounded- hover:bg-blue-700"
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
