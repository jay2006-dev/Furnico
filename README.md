# 🪑 Furnico - Crafting Comfort for You

![Furnico Banner](./furnico_banner.png)

Furnico is a premium, high-fidelity e-commerce platform dedicated to luxury minimalist furniture. Built with a modern tech stack, it offers a seamless shopping experience for users and a robust management dashboard for administrators.

---

## ✨ Key Features

### 🛒 Customer Experience
- **Elegant UI/UX**: Minimalist design with smooth transitions and responsive layouts.
- **Product Discovery**: Browse by categories (Sofas, Chairs, Tables, Beds, Lighting).
- **Interactive Cart**: Real-time cart management with dynamic pricing.
- **Secure Checkout**: Streamlined checkout process for luxury furniture.
- **Feedback System**: Users can provide ratings and feedback on their experience.

### 🔐 Admin Features
- **Comprehensive Dashboard**: Real-time analytics with visual graphs and bar charts.
- **Inventory Management**: Full CRUD operations for products and categories.
- **Order Tracking**: Monitor and manage user orders from placement to delivery.
- **User Insights**: Access and manage user feedback and interaction data.
- **Financial Analytics**: Visualize earnings and sales trends.

---

## 🚀 Tech Stack

### Frontend
- **React 19**: Modern UI development with concurrent features.
- **Redux Toolkit**: Centralized state management for cart and auth.
- **Tailwind CSS 4**: Utility-first styling with modern design tokens.
- **Framer Motion**: Premium micro-animations and transitions.
- **Vite**: Ultra-fast build tool and development server.

### Backend
- **Node.js & Express**: Scalable and fast server-side logic.
- **MongoDB & Mongoose**: Flexible NoSQL database for product and order data.
- **JWT & Bcrypt**: Secure authentication and password hashing.
- **Nodemon**: Automated development workflow.

---

## 📂 Project Structure

```bash
Furnico/
├── FrontEnd/          # React + Vite application
│   ├── src/           # Component logic and pages
│   ├── public/        # Static assets
│   └── ...
└── server/            # Node.js Express API
    ├── models/        # Mongoose schemas
    ├── routes/        # API endpoints
    ├── controllers/   # Business logic
    └── ...
```

---

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account or local MongoDB
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/jay2006-dev/Furnico.git
   cd Furnico
   ```

2. **Setup Server**
   ```bash
   cd server
   npm install
   ```
   Create a `.env` file in the `server` directory:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_secret_key
   NODE_ENV=development
   ```

3. **Setup Frontend**
   ```bash
   cd ../FrontEnd
   npm install
   ```

4. **Seed Data (Optional)**
   To populate the database with luxury product samples:
   ```bash
   cd ../server
   node seeder.js
   ```

### Running the Application

- **Run Server**: `npm run dev` (inside `/server`)
- **Run Frontend**: `npm run dev` (inside `/FrontEnd`)

---

## 📈 Roadmap
- [ ] Integration with Stripe for payments.
- [ ] AI-powered furniture placement visualization (AR).
- [ ] Multi-language support.
- [ ] Dark mode theme toggle.

## 📄 License
This project is licensed under the ISC License.

---
Developed with ❤️ by the Furnico Team.
