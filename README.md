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

![image](https://github.com/user-attachments/assets/1231458d-c870-40be-b71c-7c70c542ba6d)
![image](https://github.com/user-attachments/assets/cfa21076-d998-4a6a-a03e-6cce70e63545)
![image](https://github.com/user-attachments/assets/442ef380-1122-490f-8b77-918fc8762752)
![image](https://github.com/user-attachments/assets/6a97f9ec-ae3e-47b4-ad10-691a13a2180b)
![image](https://github.com/user-attachments/assets/e306fabd-40ca-4281-98b4-e25115b85ba8)
![image](https://github.com/user-attachments/assets/658d4dd7-6011-4207-b9e0-e851c20be01d)
![image](https://github.com/user-attachments/assets/ef8ec6a2-7311-4a77-94ff-3d7fcd82d376)
![image](https://github.com/user-attachments/assets/3a603163-4363-46c8-b8f7-9200512db184)




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
