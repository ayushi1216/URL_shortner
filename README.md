URL Shortener App

This is a full-stack URL Shortener application built using :

- **Backend**: Node.js, Express.js, Sequelize, MySQL
- **Frontend**: React.js

---

## 🔧 Backend (Node.js + Express + Sequelize)

### 📁 Folder Structure:
```
Backend/
├── config/
│   └── db.js          // Sequelize DB connection
├── controllers/
│   └── urlController.js // Handles logic to shorten and redirect URLs
├── models/
│   └── Url.js         // Sequelize model for URLs
├── routes/
│   └── urlRoutes.js   // API route definitions
├── .env               // Environment variables
├── server.js          // Entry point

```

### ✅ Features:
- Shorten long URLs via `POST /api/shorten`
- Redirect short URLs to original target via `GET /:shortId`
- Sequelize ORM with MySQL (configured via `.env` file)


### 📮 API Endpoints:
#### POST `/api/shorten`
- **Request Body:**
```json
{
  "originalUrl": "https://example.com"
}
```
- **Response:**
```json
{
  "shortUrl": "http://localhost:5000/abc123",
  "id": "abc123"
}
```




## 💻 Frontend (React.js)

### 📁 Key Features:
- Input form to enter original URL
- Sends URL to backend API and displays the shortened result
- Keeps a list of shortened URLs created during the session
- Each shortened URL opens in a **new tab** when clicked



### 🧠 iFrame Alternative:
Originally, an `<iframe>` was considered to preview the destination URL within the app UI. However, most modern websites (e.g., YouTube, Google) block being embedded via iframe using security headers like `X-Frame-Options: DENY`.

Hence, instead of using iframe preview, **redirecting to the original URL in a new tab** is used for reliable and user-friendly behavior.


### 🖼 UI Overview:

- Plain CSS
- Button-clicks generate and show a list of short links
- Clicking a link opens the shortened URL in a new tab


### Backend:
```bash
cd Backend
npm install
node server.js
```
### Frontend:
```bash
cd Frontend
npm install
npm start
```
> ⚠️ Ensure MySQL is running and database credentials are configured correctly in `.env`


---

## 📌 Technologies Used:
- **Backend**: Express.js, Sequelize, MySQL, nanoid
- **Frontend**: React.js, plain CSS, fetch API

---
