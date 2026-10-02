from fastapi import APIRouter, HTTPException
from database import users
from auth import hash_password, verify_password, create_token

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/register")
def register(username: str, email: str, password: str):

    if len(password.encode("utf-8")) > 72:
        raise HTTPException(
            status_code=400,
            detail="Password must be 72 bytes or less"
        )

    if users.find_one({"email": email}):
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    user = {
        "username": username,
        "email": email,
        "password": hash_password(password)
    }

    users.insert_one(user)

    return {
        "message": "User registered successfully"
    }


@router.post("/login")
def login(email: str, password: str):

    user = users.find_one({"email": email})

    if not user or not verify_password(
        password,
        user["password"]
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    token = create_token(email)

    return {
        "message": "Login successful",
        "access_token": token
    }