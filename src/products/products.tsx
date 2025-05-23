import axios from "axios";
import { Product } from "../types/types";
import { log } from "../utils/logger";

/*
export const products: Product[] = [
	{
		id: 1,
		name: "Laptop",
		price: 999,
		description: "High-performance laptop",
		imageUrl:
			"https://images.unsplash.com/photo-1611186871348-b1ce696e52c9",
	},
	{
		id: 2,
		name: "Phone",
		price: 499,
		description: "Latest smartphone",
		imageUrl:
			"https://images.unsplash.com/photo-1724438192720-c19a90e24a69",
	},
	{
		id: 3,
		name: "Headphones",
		price: 99,
		description: "Noise-cancelling headphones",
		imageUrl:
			"https://plus.unsplash.com/premium_photo-1679513691474-73102089c117",
	},
];
*/

export const fetchProducts = async (): Promise<Product[]> => {
	try {
		const res = await axios.get(
			`${import.meta.env.VITE_API_URL}/api/products`
		);
		log(`fetchProducts -> Response: ${JSON.stringify(res.data)}`);
		return res.data;
	} catch (err) {
		console.error(err);
		return [];
	}
};
