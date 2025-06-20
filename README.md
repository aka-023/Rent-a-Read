# 📚 Rent a Read

A modern book rental platform that helps readers enjoy offline books and allows owners to earn from their personal collections.

---

## 🚀 Tech Stack

- **Next.js (App Router)** – Frontend framework  
- **Clerk** – Authentication & user profiles  
- **Stripe** – Secure payments  
- **Cloudinary** – Image hosting & optimization  
- **MongoDB Atlas** – NoSQL cloud database  

---

## ⚙️ Environment Variables

### `.env.local` (Client-Side)

```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=YOUR_CLOUD_NAME
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=YOUR_UPLOAD_PRESET
NEXT_PUBLIC_CLOUDINARY_API_KEY=YOUR_API_KEY
NEXT_PUBLIC_CLOUDINARY_API_SECRET=YOUR_API_SECRET

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=YOUR_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY=YOUR_CLERK_SECRET_KEY
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/auth/callback
NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/auth/callback

NEXT_PUBLIC_STRIPE_PUBLIC_KEY=YOUR_STRIPE_PUBLIC_KEY
STRIPE_SECRET_KEY=YOUR_STRIPE_SECRET_KEY
```

### `.env` (Server-Side)

```env
MONGO_URL="YOUR_MONGODB_CONNECTION_STRING"
ADMIN_PASSWORD="YOUR_ADMIN_PASSWORD"
```

---

## 🧭 Website Flow

```text
1. Landing Page → Welcome to Rent a Read 
2. Library → Browse available books 
3. Book Detail → View availability & reviews
4. Rent → Sign up / log in 
5. Checkout → Select days & pay 
6. Review → Leave feedback 
7. Orders → Track & return books 
8. Cart → Save rentals for later 
9. Profile → Manage your account
10. Admin → View/delete users 
```

> _Have a collection of books? Lend them out and earn! 💸_

---
### Screenshots 📸

![Landing Page](https://github.com/user-attachments/assets/4c708b0a-4df8-4ae7-b9a4-e0b8240ed957)
![Library](https://github.com/user-attachments/assets/27999764-80b0-4253-b033-72d09c954ea1)
![Cart](https://github.com/user-attachments/assets/a8ab1323-007d-4a2a-9d96-4e4aad2010c8)
![Book Details](https://github.com/user-attachments/assets/c594e24c-3b9d-48ef-b757-36ea2c5361a2)
![Review](https://github.com/user-attachments/assets/0020f70c-10ca-4319-a405-cf87f9cc2814)

---
## 💡 Why Rent a Read?

- Experience the joy of **offline book reading** anywhere 📖  
- Earn passive income by renting your **personal collection** 💰  
---

❤️ thank you for your time !!
