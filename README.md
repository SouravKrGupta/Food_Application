# 🍕 Jalpaan Express - Food Delivery Application

A full-stack food delivery application with separate admin and user interfaces, built with modern web technologies.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### 🛍️ User Features
- **User Authentication** - Register and login with secure JWT tokens
- **Food Browsing** - Browse food items by categories
- **Cart Management** - Add, remove, and manage cart items
- **Order Placement** - Place orders with delivery address
- **Order Tracking** - Track order status and history
- **Profile Management** - Update user profile and preferences

### 👨‍💼 Admin Features
- **Admin Authentication** - Secure admin login and registration
- **Food Management** - Add, edit, and remove food items
- **Order Management** - View and update order statuses
- **User Management** - View all registered users
- **Dashboard Analytics** - Overview of orders, users, and revenue
- **Category Management** - Organize food by categories

### 🔒 Security Features
- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control (Admin/User)
- CORS protection
- Input validation and sanitization

## 🛠️ Tech Stack

### Frontend (User)
- **React** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **CSS3** - Styling
- **Vite** - Build tool

### Frontend (Admin)
- **React** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **CSS3** - Styling
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Multer** - File uploads
- **Nodemailer** - Email service
- **Morgan** - HTTP request logger
- **Colors** - Console coloring

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MongoDB** - [Download](https://www.mongodb.com/try/download/community)
- **Git** - [Download](https://git-scm.com/)

## 🚀 Installation & Setup

### Step 1: Download and Extract
1. Download the project zip file
2. Extract it to your desired location
3. Open the extracted folder in your code editor

### Step 2: Install Dependencies

#### Backend Setup
```bash
cd backend
npm install
```

#### Admin Frontend Setup
```bash
cd Admin
npm install
```

#### User Frontend Setup
```bash
cd frontend
npm install
```

### Step 3: Environment Configuration

#### Backend Environment Variables
Create a `.env` file in the `backend` directory:

```env
MONGODB_URI=mongodb+srv://Food:Food12345@cluster0.zpwhhu3.mongodb.net/food-del
JWT_SECRET=your_super_secret_jwt_key_here
PORT=4000
CORS_ORIGINS=http://localhost:5173,http://localhost:5174,http://localhost:5175,http://localhost:5176
```

**Note:** Replace the MongoDB URI with your own MongoDB connection string if needed.

### Step 4: Start MongoDB
Make sure MongoDB is running on your system:
```bash
# On Windows
net start MongoDB

# On macOS
brew services start mongodb/brew/mongodb-community

# On Linux
sudo systemctl start mongod
```

### Step 5: Run the Application

#### Start Backend Server
```bash
cd backend
npm run server
```
The backend will start on `http://localhost:4000`

#### Start Admin Frontend
```bash
cd Admin
npm run dev
```
The admin panel will be available on `http://localhost:5174` (or next available port)

#### Start User Frontend
```bash
cd frontend
npm run dev
```
The user application will be available on `http://localhost:5173` (or next available port)

## 📁 Project Structure

```
Jalpaan_Food_Application/
├── backend/                    # Backend API server
│   ├── config/
│   │   └── db.js              # Database connection
│   ├── controller/            # Route controllers
│   │   ├── foodController.js
│   │   ├── orderController.js
│   │   └── userController.js
│   ├── middleware/            # Custom middleware
│   │   ├── auth.js           # JWT authentication
│   │   ├── admin.js          # Admin role verification
│   │   └── upload.js         # File upload handling
│   ├── models/               # Database models
│   │   ├── foodModel.js
│   │   ├── orderModel.js
│   │   └── userModel.js
│   ├── routes/               # API routes
│   │   ├── foodRoute.js
│   │   ├── orderRoute.js
│   │   └── userRoute.js
│   ├── helpers/              # Utility functions
│   │   └── senMail.js        # Email service
│   ├── uploads/              # Uploaded files
│   ├── .env                  # Environment variables
│   ├── package.json
│   ├── server.js             # Main server file
│   └── README.md
├── Admin/                     # Admin panel (React)
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   │   ├── Navbar/
│   │   │   └── Sidebar/
│   │   ├── context/          # React context
│   │   │   └── AdminContext.jsx
│   │   ├── pages/            # Page components
│   │   │   ├── Add/
│   │   │   ├── Home/
│   │   │   ├── List/
│   │   │   ├── Login/
│   │   │   ├── Orders/
│   │   │   ├── Profile/
│   │   │   └── Register/
│   │   ├── assets/           # Static assets
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
├── frontend/                  # User application (React)
│   ├── src/
│   │   ├── components/       # Components
│   │   ├── context/          # React context
│   │   ├── pages/            # Pages
│   │   ├── assets/           # Assets
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── README.md
├── .gitignore
└── README.md                 # This file
```

## 🔗 API Endpoints

### Authentication Routes
- `POST /api/user/register` - User registration
- `POST /api/user/login` - User login
- `GET /api/user/profile` - Get user profile (authenticated)
- `PUT /api/user/profile` - Update user profile (authenticated)
- `GET /api/user/users` - Get all users (admin only)

### Food Routes
- `POST /api/food/add` - Add new food item (admin only)
- `GET /api/food/list` - Get all food items
- `POST /api/food/remove` - Remove food item (admin only)

### Order Routes
- `POST /api/order/place` - Place new order (authenticated)
- `POST /api/order/verify` - Verify payment
- `POST /api/order/userorders` - Get user orders (authenticated)
- `GET /api/order/list` - Get all orders (admin only)
- `POST /api/order/status` - Update order status (admin only)

### Cart Routes
- `POST /api/cart/add` - Add item to cart (authenticated)
- `POST /api/cart/remove` - Remove item from cart (authenticated)
- `POST /api/cart/get` - Get user cart (authenticated)

## 🔧 Environment Variables

### Backend (.env)
```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name

# Authentication
JWT_SECRET=your_jwt_secret_key_here

# Server
PORT=4000

# CORS
CORS_ORIGINS=http://localhost:5173,http://localhost:5174,http://localhost:5175
```

## 📖 Usage

### For Users:
1. Register/Login to the user application
2. Browse food items by categories
3. Add items to cart
4. Place orders with delivery details
5. Track order status

### For Admins:
1. Register/Login to the admin panel
2. Add new food items with images
3. Manage existing food items (edit/remove)
4. View and update order statuses
5. Monitor user registrations and analytics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

If you have any questions or need help setting up the project, please feel free to reach out!

---

**Made with ❤️ for food lovers everywhere!** 🍕🍔🍟