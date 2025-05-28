export interface User {
	id: string; // Added id
	username: string;
	email: string;
}

export interface Product {
	id: string;
	name: string;
	price: number;
	description: string;
	imageUrl: string;
}

export interface CartItem {
	id: string;
	userId: string;
	product: Product;
	quantity: number;
}

// If you have a type for the token response from the backend:
export interface TokenResponse {
	token: string;
	user: User;
}
