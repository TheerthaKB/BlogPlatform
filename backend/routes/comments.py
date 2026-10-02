from fastapi import APIRouter, HTTPException, Depends
from database import comments, posts
from auth import get_current_user, security
from bson import ObjectId
from bson.errors import InvalidId

router = APIRouter(prefix="/comments", tags=["Comments"])


@router.post("/{post_id}")
def add_comment(
    post_id: str,
    text: str,
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

    if not posts.find_one({"_id": object_id}):
        raise HTTPException(
            status_code=404,
            detail="Post not found"
        )

    comment = {
        "post_id": post_id,
        "text": text,
        "author": email
    }

    result = comments.insert_one(comment)

    return {
        "message": "Comment added",
        "comment_id": str(result.inserted_id)
    }


@router.get("/{post_id}")
def get_comments(post_id: str):

    result = []

    for comment in comments.find({"post_id": post_id}):
        comment["_id"] = str(comment["_id"])
        result.append(comment)

    return result


@router.delete("/{comment_id}")
def delete_comment(
    comment_id: str,
    credentials=Depends(security)
):

    email = get_current_user(credentials)

    try:
        object_id = ObjectId(comment_id)
    except InvalidId:
        raise HTTPException(
            status_code=400,
            detail="Invalid comment ID"
        )

    comment = comments.find_one({
        "_id": object_id
    })

    if not comment:
        raise HTTPException(
            status_code=404,
            detail="Comment not found"
        )

    if comment["author"] != email:
        raise HTTPException(
            status_code=403,
            detail="Not your comment"
        )

    comments.delete_one({
        "_id": object_id
    })

    return {
        "message": "Comment deleted successfully"
    }