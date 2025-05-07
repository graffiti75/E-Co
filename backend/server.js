const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI).then(async () => {
	console.log("MongoDB connected");
	// Seed products
	const Product = require("./models/Product");
	const existingProducts = await Product.countDocuments();
	if (existingProducts === 0) {
		console.log("Seeding initial products...");
		const initialProducts = [
			{
				name: "Laptop",
				price: 999,
				description: "High-performance laptop",
				imageUrl:
					"https://images.unsplash.com/photo-1611186871348-b1ce696e52c9",
			},
			{
				name: "Phone",
				price: 499,
				description: "Latest smartphone",
				imageUrl:
					"https://images.unsplash.com/photo-1724438192720-c19a90e24a69",
			},
			{
				name: "Headphones",
				price: 99,
				description: "Noise-cancelling headphones",
				imageUrl:
					"https://plus.unsplash.com/premium_photo-1679513691474-73102089c117",
			},
		];
		await Product.insertMany(initialProducts);
		console.log("Initial products seeded");
	}
});

// Models
const User = require("./models/User");
const Product = require("./models/Product");
const CartItem = require("./models/CartItem");

// Middleware to verify JWT
const authMiddleware = (req, res, next) => {
	const token = req.header("Authorization")?.replace("Bearer ", "");
	if (!token) return res.status(401).json({ error: "No token provided" });
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.userId = decoded.userId;
		next();
	} catch (err) {
		res.status(401).json({ error: "Invalid token" });
	}
};

// Simple test
app.get("/test", (req, res) => {
	console.log("Test endpoint hit");
	res.send("Test OK");
});

// Register Route
app.post("/api/register", async (req, res) => {
	console.log("Register request:", req.body);
	const { username, email, password } = req.body;
	if (!username || !email || !password) {
		console.log("Validation error: Missing fields");
		return res.status(400).json({ error: "All fields are required" });
	}
	if (password.length < 6) {
		console.log("Validation error: Password too short");
		return res
			.status(400)
			.json({ error: "Password must be at least 6 characters" });
	}
	try {
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			console.log("Error: Email already exists", email);
			return res.status(400).json({ error: "Email already exists" });
		}
		const hashedPassword = await bcrypt.hash(password, 10);
		const user = new User({ username, email, password: hashedPassword });
		await user.save();
		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
			expiresIn: "1h",
		});
		res.status(201).json({ token, user: { username, email } });
	} catch (err) {
		console.error("Register error:", err);
		res.status(500).json({ error: "Server error" });
	}
});

// Login Route
app.post("/api/login", async (req, res) => {
	console.log("Login request:", req.body);
	const { email, password } = req.body;
	if (!email || !password) {
		console.log("Validation error: Missing fields");
		return res
			.status(400)
			.json({ error: "Email and password are required" });
	}
	try {
		const user = await User.findOne({ email });
		if (!user) {
			console.log("Error: User not found", email);
			return res.status(400).json({ error: "Invalid credentials" });
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			console.log("Error: Password mismatch", email);
			return res.status(400).json({ error: "Invalid credentials" });
		}
		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
			expiresIn: "1h",
		});
		res.json({
			token,
			user: { username: user.username, email: user.email },
		});
	} catch (err) {
		console.error("Login error:", err.message);
		res.status(500).json({ error: "Server error" });
	}
});

// Product Routes
app.get("/api/products", async (req, res) => {
	try {
		const products = await Product.find();
		res.json(products);
	} catch (err) {
		console.error("Products error:", err.message);
		res.status(500).json({ error: "Server error" });
	}
});

app.post("/api/products", async (req, res) => {
	const { name, price, description, imageUrl } = req.body;
	if (!name || !price || !description || !imageUrl) {
		return res.status(400).json({ error: "All fields are required" });
	}
	try {
		const product = new Product({ name, price, description, imageUrl });
		await product.save();
		res.status(201).json(product);
	} catch (err) {
		console.error("Product create error:", err.message);
		res.status(500).json({ error: "Server error" });
	}
});

// Cart Routes
app.get("/api/cart", authMiddleware, async (req, res) => {
	try {
		const cartItems = await CartItem.find({ userId: req.userId }).populate(
			"productId"
		);
		res.json(cartItems);
	} catch (err) {
		console.error("Cart fetch error:", err.message);
		res.status(500).json({ error: "Server error" });
	}
});

app.post("/api/cart", authMiddleware, async (req, res) => {
	const { productId, quantity } = req.body;
	if (!productId || !quantity) {
		return res
			.status(400)
			.json({ error: "Product ID and quantity are required" });
	}
	try {
		const existingItem = await CartItem.findOne({
			userId: req.userId,
			productId,
		});
		if (existingItem) {
			existingItem.quantity += quantity;
			await existingItem.save();
			res.json(existingItem);
		} else {
			const cartItem = new CartItem({
				userId: req.userId,
				productId,
				quantity,
			});
			await cartItem.save();
			res.status(201).json(cartItem);
		}
	} catch (err) {
		console.error("Cart add error:", err.message);
		res.status(500).json({ error: "Server error" });
	}
});

app.delete("/api/cart/:id", authMiddleware, async (req, res) => {
	try {
		await CartItem.findOneAndDelete({
			_id: req.params.id,
			userId: req.userId,
		});
		res.json({ message: "Item removed" });
	} catch (err) {
		console.error("Cart delete error:", err.message);
		res.status(500).json({ error: "Server error" });
	}
});

app.put("/api/cart/:id", authMiddleware, async (req, res) => {
	const { quantity } = req.body;
	if (!quantity || quantity < 1) {
		return res.status(400).json({ error: "Valid quantity is required" });
	}
	try {
		const cartItem = await CartItem.findOneAndUpdate(
			{ _id: req.params.id, userId: req.userId },
			{ quantity },
			{ new: true }
		);
		if (!cartItem) {
			return res.status(404).json({ error: "Cart item not found" });
		}
		res.json(cartItem);
	} catch (err) {
		console.error("Cart update error:", err.message);
		res.status(500).json({ error: "Server error" });
	}
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server on port ${PORT}`));
