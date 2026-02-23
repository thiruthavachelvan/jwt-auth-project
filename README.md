# JWT Authentication and Authorization API

## 📌 Project Description

This project implements user authentication and authorization using Bearer Tokens (JWT) in a Node.js application with Express.js and MongoDB (Mongoose).  

The application follows the MVC architecture and includes secure password hashing, token generation, and protected routes.

---

## 🚀 Live Deployment

Backend Deployed URL:

https://jwt-auth-project-z5dh.onrender.com

---

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (jsonwebtoken)
- bcryptjs
- Postman
- Render (Deployment)

---

## 📁 Project Structure (MVC Pattern)
jwt-auth-project/
│
├── models/
│ └── User.js
│
├── controllers/
│ └── authController.js
│
├── routes/
│ └── authRoutes.js
│
├── middleware/
│ └── authMiddleware.js
│
├── server.js
├── package.json
└── README.md

---

## 📌 API Endpoints

### 1️⃣ Register User

**POST**  
`/api/auth/register`

Request Body:

```json
{
  "username": "thiru",
  "email": "thiru@email.com",
  "password": "123456"
}

Response:
{
  "message": "User registered successfully"
}

2️⃣ Login User

POST
/api/auth/login

Request Body:
{
  "email": "thiru@email.com",
  "password": "123456"
}

Response:
{
  "message": "Login successful",
  "token": "JWT_TOKEN_HERE"
}

3️⃣ Get User (Protected Route)

GET
/api/auth/user

Headers:
Authorization: Bearer JWT_TOKEN_HERE

Response:
{
  "message": "User data fetched successfully",
  "user": {
    "id": "user_id",
    "email": "thiru@email.com"
  }
}

Authentication Flow:

1.User registers → Password is hashed using bcrypt.

2.User logs in → JWT token is generated.

3.Token is sent in Authorization header.

4.Middleware verifies token.

5.Protected route returns user data.

Environment Variables:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000

Testing:

All APIs were tested using Postman.

Deployment:

The application is deployed using Render.

Author:

Thiru