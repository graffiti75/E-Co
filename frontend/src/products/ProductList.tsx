import React, { useState, useEffect } from "react";
import ProductCart from "./ProductCart";
import { Product } from "../types/types";
import { fetchProducts } from "./products";

interface ProductListProps {
	addToCart: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ addToCart }) => {
	const [products, setProducts] = useState<Product[]>([]);

	useEffect(() => {
		fetchProducts().then(setProducts).catch(console.error);
	}, []);

	return (
		<div className="flex flex-wrap justify-center">
			{products.map((product) => (
				<ProductCart
					key={product._id}
					product={product}
					addToCart={addToCart}
				/>
			))}
		</div>
	);
};

export default ProductList;
