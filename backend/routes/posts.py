from fastapi import APIRouter, HTTPException, Depends
from database import posts
from auth import get_current_user, security
from bson import ObjectId
from bson.errors import InvalidId

router = APIRouter(prefix="/posts", tags=["Posts"])


@router.post("/")
def create_post(
    title: str,
    content: str,
    credentials=Depends(security)
):

    email = get_current_user(credentials)

    post = {
        "title": title,
        "content": content,
        "author": email
    }

    result = posts.insert_one(post)

    return {
        "message": "Post created successfully",
        "post_id": str(result.inserted_id)
    }


@router.get("/")
def get_posts():

    result = []

    for post in posts.find():
        post["_id"] = str(post["_id"])
        result.append(post)

    return result


@router.get("/my-posts")
def get_my_posts(
    credentials=Depends(security)
):

    email = get_current_user(credentials)

    result = []

    for post in posts.find({"author": email}):
        post["_id"] = str(post["_id"])
        result.append(post)

    return result


@router.get("/{post_id}")
def get_post(post_id: str):

    try:
        object_id = ObjectId(post_id)
    except InvalidId:
        raise HTTPException(
            status_code=400,
            detail="Invalid post ID"
        )

    post = posts.find_one({"_id": object_id})

    if not post:
        raise HTTPException(
            status_code=404,
            detail="Post not found"
        )

    post["_id"] = str(post["_id"])

    return post


@router.put("/{post_id}")
def update_post(
    post_id: str,
    title: str,
    content: str,
    credentials=Depends(security)
):

    email = get_current_user(credentials)

    try:
        object_id = ObjectId(post_id)
    except InvalidId:
        raise HTTPException(
            status_code=400,
            detail="Invalid post ID"
        )

    post = posts.find_one({"_id": object_id})

    if not post:
        raise HTTPException(
            status_code=404,
            detail="Post not found"
        )

    if post["author"] != email:
        raise HTTPException(
            status_code=403,
            detail="Not your post"
        )

    posts.update_one(
        {"_id": object_id},
        {
            "$set": {
                "title": title,
                "content": content
            }
        }
    )

    return {
        "message": "Post updated successfully"
    }


@router.delete("/{post_id}")
def delete_post(
    post_id: str,
    credentials=Depends(security)
):

    email = get_current_user(credentials)

    try:
        object_id = ObjectId(post_id)
    except InvalidId:
        raise HTTPException(
            status_code=400,
            detail="Invalid post ID"
        )

    post = posts.find_one({"_id": object_id})

    if not post:
        raise HTTPException(
            status_code=404,
            detail="Post not found"
        )

    if post["author"] != email:
        raise HTTPException(
            status_code=403,
            detail="Not your post"
        )

    posts.delete_one({"_id": object_id})

    return {
        "message": "Post deleted successfully"
    }