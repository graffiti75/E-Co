import ProductCard from "./ProductCart";
import { Product } from "../types/types";
import { products } from "./products";

interface ProductListProps {
	addToCart: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ addToCart }) => {
	return (
		<div className="flex flex-wrap justify-center">
			{products.map((product) => (
				<ProductCard
					key={product.id}
					product={product}
					addToCart={addToCart}
				/>
			))}
		</div>
	);
};

export default ProductList;
