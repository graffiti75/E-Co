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
mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("MongoDB connected"));

// User Schema
const userSchema = new mongoose.Schema({
	username: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
});
const User = mongoose.model("User", userSchema);

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
	const { email, password } = req.body;
	if (!email || !password) {
		return res
			.status(400)
			.json({ error: "Email and password are required" });
	}
	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ error: "Invalid credentials" });
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
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
		res.status(500).json({ error: "Server error" });
	}
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server on port ${PORT}`));
