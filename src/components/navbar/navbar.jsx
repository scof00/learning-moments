import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";

export const Navbar = () => {
  const navigate = useNavigate();

  return (
    <ul className="navbar">
      <li className="navbar-item">
        <Link className="navbar-link" to="posts">All Posts</Link>
      </li>
      <li className="navbar-item">
        <Link className="navbar-link" to="myPosts">My Posts</Link>
      </li>
      <li className="navbar-item">
        <Link className="navbar-link" to="favorites">Favorites</Link>
      </li> 
      <li className="navbar-item">
        <Link className="navbar-link" to="new">New Post</Link>
      </li>
      <li className="navbar-item">
        <Link className="navbar-link" to="profile">Profile</Link>
      </li>
      {localStorage.getItem("learning_user") ? (
        <li className="navbar-item">
          <Link
            className="navbar-link"
            to=""
            onClick={() => {
              localStorage.removeItem("learning_user");
              navigate("/login", { replace: true });
            }}
          >
            Logout
          </Link>
        </li>
      ) : (
        ""
      )}
    </ul>
  );
};
