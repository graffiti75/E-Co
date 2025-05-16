export interface User {
	id: string; // Added id
	username: string;
	email: string;
}

export interface Product {
	id: string; // Changed from _id
	name: string;
	price: number;
	description: string;
	imageUrl: string;
}

export interface CartItem {
	id: string; // Changed from _id
	userId: string;
	productId: string; // Changed from 'Product' object to string ID
	quantity: number;
}

// If you have a type for the token response from the backend:
export interface TokenResponse {
	token: string;
	user: User;
}
