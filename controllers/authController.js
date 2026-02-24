const User = require("../models/User");
const bcrypt = require("bcryptjs");

// REGISTER FUNCTION
exports.register = async (req, res) => {

    try {

        const { username, email, password } = req.body;

        // Validation check
        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Username, email, and password are required"
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters"
            });
        }

        // check if user exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({
            message: "User registered successfully"
        });

    }
    catch (error) {
        res.status(500).json({
            error: error.message
        });
    }

};
const jwt = require("jsonwebtoken");

// LOGIN FUNCTION
exports.login = async (req, res) => {

    try {

        const { email, password } = req.body;

        // Validation check
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid password"
            });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({
            message: "Login successful",
            token: token
        });

    }
    catch (error) {
        res.status(500).json({
            error: error.message
        });
    }

};