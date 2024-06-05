import { useEffect, useState } from "react";
import "./allPosts.css";
import { getAllPosts } from "../../services/postService";
import { Filters } from "../filter/filter";
import { Link } from "react-router-dom";
import { PostDetails } from "./postDetails";
import { getAllLikes } from "../../services/likeService";
export const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [topicFilter, setTopicFilter] = useState(0);
  const [likes, setLikes] = useState([])

  useEffect(() => {
    getAllPosts().then((postsArray) => {
      setPosts(postsArray);
    });
  }, []);

  useEffect(() => {
    if (topicFilter == 1) {
      const filtered = posts.filter((post) => post.topicId === 1);
      setFilteredPosts(filtered);
    } else if (topicFilter == 2) {
      const filtered = posts.filter((post) => post.topicId === 2);
      setFilteredPosts(filtered);
    } else if (topicFilter == 3) {
      const filtered = posts.filter((post) => post.topicId === 3);
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(posts);
    }
  }, [topicFilter, posts]);

  useEffect(() => {
    const foundPost = posts.filter((post) => {
      return post?.title
        ?.toLowerCase()
        .includes(searchTerm.toLocaleLowerCase());
    });
    setFilteredPosts(foundPost);
  }, [searchTerm, posts]);

  useEffect(() =>{
    getAllLikes().then((likesArray) => {
      setLikes(likesArray)
    })
  },[])


  return (
    <>
      <Filters
        setSearchTerm={setSearchTerm}
        setTopicFilter={setTopicFilter}
        topicFilter={topicFilter}
        searchTerm={searchTerm}
      />
      <section className="posts-container">
        <article className="posts">
          {filteredPosts.map((post) => {
            return (
              <section className="post" key={post.id}>
                <Link to={`/posts/${post.id}`} key={post.id}>
                  <header className="post-info">{post.title}</header>
                </Link>
                <div className="post-info">{post.topic.name}</div>
                <div className="post-info">Likes:
                {likes.map((like) => {
                  let counter = 0
                  if(like.postId === post.id){
                    counter ++
                    return <div>{counter}</div>
                  }
                })}
                </div>
              </section>
            );
          })}
        </article>
      </section>
    </>
  );
};
