import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getPostById } from "../../services/postService"

export const PostDetails = ({currentUser}) => {
// Still need to add th ability to like and edit a post depending on the view
    const [post, setPost] = useState({})
    const {postId} = useParams()
    const [likes, setLikes] = useState([])

    useEffect(() => {
        getPostById(postId).then((data) => {
            const postObj = data;
            setPost(postObj)
        })
    }, [postId])

    

    return (
        <div className="post">
            <div className="post-info">
                <div>{post?.title}</div>
            </div>
            <div className="post-info">
                <div>{post?.topic?.name}</div>
            </div>
            <div className="post-info">
                <div>{post?.user?.name}</div>
            </div>
            <div className="post-info">
                <div>{post?.body}</div>
            </div>
            <div className="post-info">
                <div>{post?.date}</div>
            </div>
            <div className="btn-container">
                {currentUser.id === post.userId ?
                (
                    <Link to="edit" postid={post.id}><button>Edit</button></Link>
                ) :(
                    <button>❤️</button>
                )} 
            </div>
            
            
        </div>
    )
}