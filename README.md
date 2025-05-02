<h1 align="center">🧢 E-Commerce Clothing Store</h1>
<p align="center">A full-stack, modern web application for selling clothes with seamless UX and smart admin tools.</p>

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=rect&color=F38BA8,F9E2AF,A6E3A1,94E2D5,89B4FA&height=5&section=footer"/>
</p>

## ✨ Overview

This is an in-progress e-commerce platform built using **Next.js**, **Tailwind CSS**, and **MongoDB**, offering a stylish, responsive experience for both users and admins.

Key Features:
- 🔐 JWT + NextAuth authentication
- 🛒 Cart, Wishlist, Secure Checkout
- 📦 Admin Dashboard for managing products & users
- 💳 Stripe Payment Integration
- 📊 Sales analytics and inventory tracking
- ⚙️ Fully API-driven using REST/Next.js API Routes

> Designed to scale, built to impress.

---

## 📷 Screenshots

| Home Page | Admin Panel | Cart |
|----------|-------------|------|
| ![home](assets/screens/home.png) | ![admin](assets/screens/admin.png) | ![cart](assets/screens/cart.png) |

---

## 🛠 Tech Stack

**Frontend**  
> `Next.js`, `Tailwind CSS`, `Shadcn UI`, `Axios`

**Backend**  
> `Next.js API Routes`, `MongoDB`, `Mongoose`, `Redis`, `Zod`, `JWT`

**Dev Tools & Deployment**  
> `Vercel`, `Postman`, `ESLint`, `Prettier`, `Git`, `GitHub`

---

## 🗺️ System Architecture

- **Frontend**: Next.js Pages + Components  
- **Backend**: API Routes handling auth, cart, orders, payments  
- **Database**: MongoDB Atlas  
- **External Services**: Stripe, SendGrid, Vercel Serverless Functions

```mermaid
flowchart TD
  User -->|Login| Auth[JWT/NextAuth]
  User -->|Browse| UI[Next.js + Tailwind]
  UI --> API[API Routes]
  API --> DB[(MongoDB)]
  API --> Stripe
  Admin --> Dashboard
