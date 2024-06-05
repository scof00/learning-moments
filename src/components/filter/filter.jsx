import { useEffect, useState } from "react"
import { getTopics } from "../../services/topicService";
import "./filter.css"

export const Filters = ({setSearchTerm, setTopicFilter, searchTerm, topicFilter}) => {
    const [topics, setTopic] = useState([])
   
    
    useEffect(() => {
        getTopics().then((topicsArray) => setTopic(topicsArray));
      }, []);

      return (
        
          <div className="filters">
            <select className="post-filter" onChange={(event) => {
                return setTopicFilter(event.target.value)
            }}>
              <option value="0">Sort by Topic</option>
              {topics.map((topic) => {
                return (
                  <option key={topic.id} value={topic.id}>
                    {topic.name}
                  </option>
                );
              })}
            </select>
          <input
            value={searchTerm}
            type="text"
            placeholder="Search Posts"
            className="post-search"
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          />
          </div>
    )
}