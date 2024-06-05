import { useEffect, useState } from "react"
import "./profile.css"
import { getUserById } from "../../services/userService"
import { Link, useParams } from "react-router-dom"
import { getAllPosts, getPostById } from "../../services/postService"

export const Profile = ({currentUser}) => {
    const [user, setUser] = useState({})
    const [posts, setPosts] = useState([])
    const [sorted, setSorted] = useState([])

    useEffect(() => {
        getUserById(currentUser).then((data) => {
            const userObj = data;
            setUser(userObj)
        })
    },[currentUser])

    useEffect(() => {
        getAllPosts().then((postsArray) => [
            setPosts(postsArray)
        ])
    },[currentUser])

    useEffect(() =>{
        const foundPosts = posts.filter((post) => post.userId === currentUser.id)
        setSorted(foundPosts)
        
      },[posts])

      const numberOfPosts = sorted.length

    return (
        <div className="parent">

        <section className="user">
            <header className="user-info">{user?.name}</header>
            <div className="user-info">
                <span >Email: </span>
                {user?.email}
            </div>
            <div className="user-info">
                <span>Cohort: </span>
                {user?.cohort}
            </div>
            <div className="user-info">
                <span >Number of posts: </span>
                {numberOfPosts}
            </div>
            <div className="user-info">
                <Link to="editProfile"><button>Edit Profile</button></Link>
            </div>
        </section>
        </div>
    )
}