import { useEffect, useState } from "react";
import { getTopics } from "../../services/topicService";
import "./allPosts.css";
import { useNavigate } from "react-router-dom";
import { createNewPost } from "../../services/postService";

export const NewPost = ({ currentUser }) => {
  const [topics, setTopics] = useState([]);

  const [newPost, setNewPost] = useState({ body: "", topic: 0, title: "" });

  useEffect(() => {
    getTopics().then((topicsArray) => setTopics(topicsArray));
  }, []);

  const navigate = useNavigate()

  const handleSave = (event) => {
    event.preventDefault();
    const post= {
        userId: currentUser.id,
        title: newPost.title,
        body: newPost.body,
        topicId: newPost.topic,
        date: Date()
    }
    createNewPost(post).then(() => {
        navigate("/posts")
    })
  }



  return (
    <div className="form">
      <form className="post-form">
        <h2>New Post</h2>
        <fieldset>
          <div className="form-title">
            <input
              text="text"
              className="form-control"
              placeholder="Post Title"
              onChange={(event) => {
                const postCopy = { ...newPost };
                postCopy.title = event.target.value;
                setNewPost(postCopy);
              }}
            ></input>
          </div>
        </fieldset>
        <fieldset>
          <div className="form-body">
            <input
              text="text"
              className="form-input"
              placeholder="Body Text"
              onChange={(event) => {
                const postCopy = { ...newPost };
                postCopy.body = event.target.value;
                setNewPost(postCopy);
              }}
            ></input>
          </div>
        </fieldset>
        <fieldset>
          <div className="form-topic">
            <select onChange={(event) => {
                const postCopy = {...newPost};
                postCopy.topic = event.target.value;
                setNewPost(postCopy)
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
            <button className="form-btn btn-info" onClick={handleSave}>Create Post</button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};
