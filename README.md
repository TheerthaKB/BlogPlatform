# BlogSpace - Full Stack Blogging Platform

BlogSpace is a full-stack blogging platform where users can create accounts, publish blog posts, edit and delete their own posts, and interact through comments.

The project uses React for the frontend, FastAPI for the backend, and MongoDB Atlas for data storage.

## Features

- User registration and login
- JWT-based authentication
- Secure password hashing using bcrypt
- Create blog posts
- View all published posts
- View individual posts
- Edit your own posts
- Delete your own posts
- My Posts section
- Add comments to posts
- Delete your own comments
- MongoDB Atlas database integration
- RESTful API architecture
- Protected API endpoints
- CORS configuration
- Environment variables for sensitive credentials
- Invalid MongoDB ObjectId validation

## Tech Stack

### Frontend
- React.js
- Vite
- React Router
- JavaScript
- CSS

### Backend
- Python
- FastAPI
- PyMongo
- JWT
- bcrypt
- python-dotenv

### Database
- MongoDB Atlas

## Project Structure

```text
BlogPlatform/
│
├── backend/
│   ├── routes/
│   │   ├── auth.py
│   │   ├── posts.py
│   │   └── comments.py
│   │
│   ├── auth.py
│   ├── database.py
│   ├── main.py
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── PostCard.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── CreatePost.jsx
│   │   │   ├── EditPost.jsx
│   │   │   ├── MyPosts.jsx
│   │   │   └── PostDetails.jsx
│   │   │
│   │   ├── App.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   └── vite.config.js
│
└── .gitignore
