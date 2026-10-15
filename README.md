# Glow & Grace 🛍️

Glow & Grace is a full-stack e-commerce web application built with React, Node.js, Express, and PostgreSQL.

Users can browse products, search and filter items, create an account, log in, manage a shopping cart, and place orders through a responsive checkout experience.

## Live Demo

Frontend: https://glow-and-grace-1.onrender.com

Backend API: https://glow-and-grace-c15y.onrender.com


## Features

- Browse 16 products loaded from PostgreSQL
- Search products by name
- Filter products by category
- Sort products by price
- Add products to the shopping cart
- Increase and decrease product quantities
- Remove products from the cart
- Automatic cart total calculation
- User registration and login
- Secure password hashing with bcrypt
- Duplicate email validation
- Responsive checkout form
- Orders saved to PostgreSQL
- Responsive mobile and desktop design
- Full-stack deployment with Render


## Tech Stack

### Frontend
- React
- Vite
- React Router
- JavaScript
- HTML5
- CSS3

### Backend
- Node.js
- Express.js
- REST API
- bcrypt
- CORS

### Database
- PostgreSQL

### Deployment & Tools
- Render
- Git
- GitHub
- Cursor / VS Code


## How It Works

1. The React frontend sends HTTP requests to the Express REST API.
2. Express handles product, authentication, and order requests.
3. PostgreSQL stores products, users, orders, and order items.
4. bcrypt hashes user passwords before they are stored.
5. The frontend and backend are deployed separately on Render.


## Database

The application uses PostgreSQL with the following main tables:

- `products` — stores product information such as name, price, and category
- `users` — stores registered user accounts and hashed passwords
- `orders` — stores customer order and shipping information
- `order_items` — stores the individual products included in each order


## Project Structure

glow-and-grace/
├── client/        # React frontend
│   └── src/
│       ├── components/
│       ├── pages/
│       └── assets/
│
├── server/        # Node.js / Express backend
│   └── server.js
│
└── README.md

