import { useEffect, useState } from "react";
import { getAllPosts } from "../../services/postService";
import { Link } from "react-router-dom";
import { getAllLikes } from "../../services/likeService";

export const Favorites = ({ currentUser }) => {
  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);

  useEffect(() => {
    getAllPosts().then((postsArray) => {
      setPosts(postsArray);
    });
  }, []);
  useEffect(() => {
    getAllLikes().then((likesArray) => {
      setLikes(likesArray);
    });
  }, []);

  return (
    <section className="posts-container">
      <article className="posts">
        {posts.map((post) => {
          likes.map((like) => {
            if (like.postId === post.Id) {
              return (
                <section className="post" key={post.id}>
                  <Link to={`/posts/${post.id}`} key={post.id}>
                    <header className="post-info">{post.title}</header>
                  </Link>
                  <div className="post-info">{post.topic.name}</div>
                </section>
              );
            }
          });
        })}
      </article>
    </section>
  );
};
