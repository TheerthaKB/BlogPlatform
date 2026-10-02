import bcrypt
from jose import jwt, JWTError
from fastapi import HTTPException, Header
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

SECRET_KEY = "blog-secret-key"
ALGORITHM = "HS256"

security = HTTPBearer()


def hash_password(password):
    return bcrypt.hashpw(
        password.encode("utf-8"),
        bcrypt.gensalt()
    ).decode("utf-8")


def verify_password(password, hashed_password):
    return bcrypt.checkpw(
        password.encode("utf-8"),
        hashed_password.encode("utf-8")
    )


def create_token(email):
    return jwt.encode(
        {"email": email},
        SECRET_KEY,
        algorithm=ALGORITHM
    )


def get_current_user(
    credentials: HTTPAuthorizationCredentials
):

    try:
        token = credentials.credentials

        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        return payload["email"]

    except (JWTError, KeyError):
        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )