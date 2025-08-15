import React from "react";
import { Product } from "../types/types";
import { formatPrice } from "../utils/formatPrice";
import StarIcon from "../components/icons/StarIcon";

interface ProductItemProps {
	product: Product;
	rating?: number;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, rating = 4 }) => {
	return (
		<div className="p-4">
			<h3 className="text-lg font-bold mt-2 text-black dark:text-white truncate">
				{product.name}
			</h3>
			<div className="flex items-center mt-1">
				{[...Array(5)].map((_, i) => (
					<StarIcon key={i} filled={i < rating} />
				))}
				<span className="text-gray-600 dark:text-gray-400 ml-2">
					({rating} reviews)
				</span>
			</div>
			<p className="text-gray-600 dark:text-gray-300 mt-2 h-12 overflow-hidden">
				{product.description}
			</p>
			<p className="text-xl font-semibold mt-2 text-black dark:text-white">
				{formatPrice(product.price)}
			</p>
		</div>
	);
};

export default ProductItem;
