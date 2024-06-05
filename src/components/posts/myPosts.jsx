import { useEffect, useState } from "react";
import { deletePost, getAllPosts } from "../../services/postService";
import { Link } from "react-router-dom";

import "./allPosts.css"

export const MyPosts = ({ currentUser }) => {
  const [allPosts, setAllPosts] = useState([]);
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    getAllPosts().then((postsArray) => {
      setAllPosts(postsArray);
    });
  }, []);

  useEffect(() =>{
    const foundPosts = allPosts.filter((post) => post.userId === currentUser.id)
    setMyPosts(foundPosts)
    
  },[allPosts])

  const handleDelete = (post) => {
    deletePost(post.id).then(() => {
        getAllPosts().then((postsArray) => {
            setAllPosts(postsArray)
        })
    })
  }

  return (
    <section className="posts-container">
      <article className="posts">
        {myPosts.map((post) => {
            
          return (
            <section className="post" key={post.id}>
              <Link to={`/posts/${post.id}`} key={post.id}>
                <header className="post-info">{post.title}</header>
              </Link>
              <div className="post-info">{post.topic.name}</div>
              <div className="post-info">Likes:</div>
              <button className="btn" onClick={() => handleDelete(post)}>Delete Post</button>
            </section>
          );
        })}
      </article>
    </section>
  );
};
