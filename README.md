# 📚 **MERN Smart Book Store with AI Recommendation System**

A full-stack **Smart Book Store** built using the **MERN stack** with a **Python AI/ML-based recommendation system** that suggests books based on user search behavior and interests.

The platform works like a real e-commerce bookstore where users can browse, search, buy books, track orders, and receive intelligent book recommendations.

---

## 🚀 **Tech Stack**

### **Frontend**

* ⚛️ React.js
* 🔄 Redux Toolkit
* 🧭 React Router
* 🌐 Axios
* 🎨 Tailwind CSS / CSS

### **Backend**

* 🟢 Node.js
* 🚂 Express.js
* 🍃 MongoDB + Mongoose
* 🔐 JWT Authentication
* 🔑 Bcrypt (Password Hashing)

### **AI/ML Recommendation Service**

* 🐍 Python
* ⚡ Flask / FastAPI
* 🤖 Machine Learning (Content-based Recommendation)
* 🧠 NLP for text analysis

---

## ✨ **Key Features**

### **👤 User Features**

* User Register & Login
* Browse Books
* Search Books
* AI-based Book Recommendations
* Add to Cart
* Online Payment Integration
* Track Order Status
* View Order History

### **🛠 Admin Features**

* Admin Login
* Upload New Books (image, price, description)
* Update Book Details
* Delete Books
* View All Orders
* Update Order Status (Pending → Shipped → Delivered)

---

## 🧠 **How Recommendation System Works**

1. User types a search query.
2. Query is sent to Python AI service.
3. ML model analyzes book titles, descriptions, and genres.
4. Similar books are recommended.
5. Recommendations appear dynamically on UI.

---

## ⚙️ **How to Run the Project**

### 1️⃣ Start Backend

```bash
cd backend
npm install
npm start
```

### 2️⃣ Start Frontend

```bash
cd frontend
npm install
npm start
```

### 3️⃣ Start AI Recommendation Service

```bash
cd ai-service
pip install -r requirements.txt
python app.py
```

---

## 🛢️ **Environment Variables (.env)**

Create a `.env` file in backend:

```
env file consist port number links etc....
```

---

## 💳 **Payment Integration**

Supports:

* Razorpay / Cod

---

## 🔐 **Security Features**

* Hashed passwords with bcrypt
* JWT authentication
* Protected user & admin routes

---

## 🎯 **Future Enhancements**

* Wishlist
* Book Reviews & Ratings
* Personalized Dashboard
* Real-time Order Tracking
* Advanced AI Recommendations

---

## 👨‍💻 **Developed By**

**Your Name**
*MERN Stack Developer | AI/ML Enthusiast:- Prabhat Pal*

---

## 📜 License

This project is licensed under the **MIT License**.

---

