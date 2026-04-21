# Sentrax - Secure Community Hub

Sentrax is a modern, secure web application designed for community interaction. Built with Node.js, Express, and MongoDB, it features a robust authentication system, persistent session management, and a dynamic community feed where users can share posts and engage through comments—all wrapped in a clean, high-performance Tailwind CSS interface.

## 🚀 Features

### 🔐 Security & Authentication
- **Robust Auth**: Complete registration and login workflows.
- **Session Persistence**: Secure session management using `express-session` with MongoDB storage via `connect-mongo`.
- **Audit Logging**: Backend tracking of critical security events and user actions.

### 👥 Community Interaction
- **Interactive Feed**: Browse and interact with community posts.
- **Rich Content**: Support for titles, content, and image URLs in posts.
- **Comment System**: Real-time engagement on every post.
- **Anonymous Mode**: Privacy-first posting and commenting for sensitive discussions.

### 🛠 Administrative Control
- **Admin Console**: A dedicated dashboard for system administrators to monitor user growth and manage accounts.
- **System Stats**: Live overview of total users and active session states.

### 🎨 Modern UI/UX
- **Themed Design**: Consistent light-mode aesthetic using a `red-100`, `green-100`, and `yellow-100` palette.
- **Responsive**: Built with Tailwind CSS for a seamless experience across mobile and desktop.
- **Iconography**: Integrated Lucide icons for intuitive navigation.

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Templating**: EJS (Embedded JavaScript)
- **Styling**: Tailwind CSS
- **Icons**: Lucide

## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd project21A
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory and add the following:
   ```ini
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   SESSION_SECRET=your_secret_key_here
   ```

4. **Run the Application**
   ```bash
   # For production
   npm start
   
   # For development (with nodemon)
   npm run dev
   ```

## 📁 Project Structure

```text
project21A/
├── src/
│   ├── db/             # Database connection logic
│   ├── routes/         # Express routers (Auth, Post, Comment, Secure)
│   ├── controllers/    # Business logic for each route
│   ├── models/         # Mongoose schemas
│   ├── middleware/     # Auth and security checks
│   └── app.js          # App configuration
├── views/              # EJS templates (Sentrax themed)
├── public/             # Static assets (CSS, JS, Images)
├── server.js           # Server entry point
└── .env                # Sensitive configuration
```

## 📄 License
This project is developed for **Project21A**. All rights reserved.