URL Shortener App

This is a full-stack URL Shortener application built using :

- **Backend**: Node.js, Express.js, Sequelize, MySQL


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





### 🧠 iFrame Alternative:
Originally, an `<iframe>` was considered to preview the destination URL within the app UI. However, most modern websites (e.g., YouTube, Google) block being embedded via iframe using security headers like `X-Frame-Options: DENY`.

Hence, instead of using iframe preview, **redirecting to the original URL in a new tab** is used for reliable and user-friendly behavior.



### Backend:
```bash
cd Backend
npm install
node server.js
```

---


