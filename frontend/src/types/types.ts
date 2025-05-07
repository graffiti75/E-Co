export interface User {
	username: string;
	email: string;
}

export interface Product {
	_id: string;
	name: string;
	price: number;
	description: string;
	imageUrl: string;
}

export interface CartItem {
	_id: string;
	userId: string;
	productId: Product;
	quantity: number;
}
