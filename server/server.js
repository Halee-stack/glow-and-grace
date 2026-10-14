require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const bcrypt = require("bcrypt");

const app = express();
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

pool.query("SELECT NOW()", (err, res) => {
    if (err) {
        console.error("Database connection error:", err);
    } else {
        console.log("PostgreSQL connected!");
    }
})

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5001;

app.get("/", (req, res) => {
    res.send("Glow & Grace backend is running!");
});


app.get("/api/products", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM products ORDER BY id");

        res.json(result.rows);
    } catch (error) {
        console.error("Error getting products:", error);
        res.status(500).json({ error: "Server error" });
    }
});

app.post("/api/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
            [name, email, hashedPassword]
        );

        res.status(201).json({
            message: "User registered successfully"
        });

    } catch (error) {
        console.error("Registration error:", error);

        res.status(500).json({
            error: "Registration failed"
        });
    }
});

app.post("/api/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const result = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({
                error: "Invalid email or password"
            });
        }

        const user = result.rows[0];

        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                error: "Invalid email or password"
            });
        }

        res.status(200).json({
            message: "Login successful",
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });

        app.post("/api/orders", async (req, res) => {
            try {
                const {
                    userId,
                    fullName,
                    address,
                    city,
                    zipCode,
                    total,
                    items
                } = req.body;

                const orderResult = await pool.query(
                    `INSERT INTO orders
                     (user_id, full_name, address, city, zip_code, total)
                     VALUES ($1, $2, $3, $4, $5, $6)
                     RETURNING *`,
                    [userId, fullName, address, city, zipCode, total]
                );

                const order = orderResult.rows[0];
                for (const item of items) {
                    await pool.query(
                        `INSERT INTO order_items
                       (order_id, product_id, quantity, price)
                       VALUES ($1, $2, $3, $4)`,
                        [order.id, item.id, item.quantity, item.price]
                    );
                }

                console.log("Order created:", order);

                res.status(201).json({
                    message: "Order placed successfully",
                    orderId: order.id
                });
            } catch (error) {
                console.error("Order error:", error);

                res.status(500).json({
                    error: "Order failed"
                });
            }
        });




    } catch (error) {
        console.error("Login error:", error);

        res.status(500).json({
            error: "Login failed"
        });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});