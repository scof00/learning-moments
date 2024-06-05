import { useEffect, useState } from "react";
import { getTopics } from "../../services/topicService";
import { useNavigate, useParams } from "react-router-dom";
import "./allPosts.css"
import { getPostById, updatePost } from "../../services/postService";

export const EditPost = () => {
    const [post, setPost] = useState({})
    const [topics, setTopics] = useState([])
    const {postId} = useParams()

    useEffect(() => {
        getPostById(postId).then((data) => {
            const postObj = data;
            setPost(postObj)
        })
    }, [postId])

    useEffect(() => {
        getTopics().then((topicsArray) => {
            setTopics(topicsArray)
        })
    },[])

    const handleSave = (event) => {
        event.preventDefault()
        const editedPost = {
            title: post.title,
            body: post.body,
            date: post.date,
            userId: post.userId,
            topicId: post.topicId,
            id: post.id
        }
        updatePost(editedPost).then(() => {
            navigate(`/myPosts`)
        })
    }
  
    const navigate = useNavigate()

    return (
        <div className="form">
      <form className="post-form">
        <h2>Edit Post</h2>
        <fieldset>
          <div className="form-title">
            <input
              text="text"
              className="form-control"
              placeholder={post.title}
              onChange={(event) => {
                const postCopy = { ...post };
                postCopy.title = event.target.value;
                setPost(postCopy);
              }}
            ></input>
          </div>
        </fieldset>
        <fieldset>
          <div className="form-body">
            <input
              text="text"
              className="form-input"
              placeholder={post.body}
              onChange={(event) => {
                const postCopy = { ...post };
                postCopy.body = event.target.value;
                setPost(postCopy);
              }}
            ></input>
          </div>
        </fieldset>
        <fieldset>
          <div className="form-topic">
            <select onChange={(event) => {
                const postCopy = {...post};
                postCopy.topicId = event.target.value;
                setPost(postCopy)
            }}>
              <option value="0">Select Topic</option>
              {topics.map((topic) => {
                return (
                  <option key={topic.id} value={topic.id}>
                    {topic.name}
                  </option>
                );
              })}
            </select>
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <button className="form-btn btn-info" onClick={handleSave}>Save Post</button>
          </div>
        </fieldset>
      </form>
    </div>
    )
}