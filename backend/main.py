from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import client
from routes.auth import router as auth_router
from routes.posts import router as posts_router
from routes.comments import router as comments_router

app = FastAPI(title="Blog Platform API")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth_router)
app.include_router(posts_router)
app.include_router(comments_router)


@app.get("/")
def home():
    try:
        client.admin.command("ping")
        return {
            "message": "Blog API running",
            "database": "connected"
        }
    except Exception as e:
        return {
            "database": "connection failed",
            "error": str(e)
        }