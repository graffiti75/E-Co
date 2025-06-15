import axios from "axios";
import { Product } from "../types/types";
import { log } from "../utils/logger";

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
