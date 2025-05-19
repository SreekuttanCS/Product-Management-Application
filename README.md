# 🛍️ Product Management Application

A full-stack Product Management web application built using **Node.js**, **Express.js**, **MongoDB**, and **React.js**. This application allows authenticated users to manage categories, subcategories, and products with multiple variants, and also includes wishlist, search, filter, and pagination functionalities.

---

## 🚀 Features

### 🔐 Authentication

- User Signup and Login using JWT
- Protected routes with middleware

### 🗂️ Category & Subcategory Management

- Add, update, delete categories
- Add subcategories linked to categories

### 📦 Product Management

- Add/edit/delete products under subcategories
- Add multiple **variants** per product

### 🔍 User Features

- View product list
- Wishlist functionality
- Search products by name
- Filter products by sub-category
- Pagination for product listing

---

## 🧱 Tech Stack

| Layer    | Tech                          |
| -------- | ----------------------------- |
| Frontend | React.js, Axios, Tailwind CSS |
| Backend  | Node.js, Express.js           |
| Database | MongoDB with Mongoose         |
| Auth     | JWT, bcryptjs                 |
| State    | Redux Toolkit                 |

---

## ⚙️ Installation

```bash
git clone https://github.com/SreekuttanCS/Product-Management-Application.git
cd Product-Management-Application
```

Setup Backend

```bash
cd backend
npm install
```
👉 Create a .env file in the backend folder and add the following:

```bash
PORT=5000
MONGO_URI=your_mongo_url_here

JWT_SECRET=your_jwt_secret_here

```
You can refer to the .env.example file for the structure.

Run the server:

```bash
npm run dev
```

Setup Frontend

```bash
cd ../frontend
npm install
npm run dev
```
