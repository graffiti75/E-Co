export interface User {
	id: string;
	username: string;
	email: string;
}

export interface Product {
	id: string;
	name: string;
	price: number;
	description: string;
	imageUrl: string;
	category: string;
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
