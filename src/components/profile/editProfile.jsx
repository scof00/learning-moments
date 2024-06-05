import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createUser,
  getUserById,
  updateUser,
} from "../../services/userService";

export const EditProfile = ({ currentUser }) => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    getUserById(currentUser).then((data) => {
      const userObj = data;
      setUser(userObj);
    });
  }, [currentUser]);

  const handleSave = (event) => {
    event.preventDefault();

    const editedProfile = {
      id: user.id,
      name: user.name,
      email: user.email,
      cohort: user.cohort,
    };
    updateUser(editedProfile).then(() => {
      navigate(`/profile`);
    });
  };

  return (
    <form className="profile">
      <h2>Update Profile</h2>
      <fieldset>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            onChange={(event) => {
              const copy = { ...user };
              copy.name = event.target.value;
              setUser(copy);
            }}
            value={user?.name ? user?.name : ""}
            required
            className="form-control"
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="text"
            onChange={(event) => {
              const copy = { ...user };
              copy.email = event.target.value;
              setUser(copy);
            }}
            value={user?.email ? user?.email : ""}
            required
            className="form-control"
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label>Cohort #</label>
          <input
            type="number"
            onChange={(event) => {
              const copy = { ...user };
              copy.cohort = event.target.value;
              setUser(copy);
            }}
            value={user?.cohort ? user?.cohort : ""}
            required
            className="form-control"
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <button className="form-btn btn-primary" onClick={handleSave}>
            Save Profile
          </button>
        </div>
      </fieldset>
    </form>
  );
};
