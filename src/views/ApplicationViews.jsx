import { Outlet, Route, Routes } from "react-router-dom";
import { Navbar } from "../components/navbar/navbar";
import { AllPosts } from "../components/posts/allPosts";
import { useEffect, useState } from "react";
import { PostDetails } from "../components/posts/postDetails";
import { NewPost } from "../components/posts/newPost";
import { MyPosts } from "../components/posts/myPosts";
import { Profile } from "../components/profile/profile";
import { EditPost } from "../components/posts/editPost";
import { EditProfile } from "../components/profile/editProfile";
import { Favorites } from "../components/posts/favoritePosts";

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const localLearningUser = localStorage.getItem("learning_user");
    const learningUserObject = JSON.parse(localLearningUser);
    setCurrentUser(learningUserObject);
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Navbar />
            <Outlet />
          </>
        }
      >
        <Route path="posts">
          <Route index element={<AllPosts currentUser={currentUser}/>} />
          <Route path=":postId" element={<PostDetails currentUser={currentUser}/>} />
          <Route path =":postId/edit" element={<EditPost/>} />
        </Route>
          <Route path="favorites" element={<Favorites currentUser={currentUser}/>} />
          <Route path="new" element={<NewPost currentUser={currentUser}/>} />
          <Route path="myPosts" element={<MyPosts currentUser={currentUser}/>}/>
          <Route path="profile" element={<Profile currentUser={currentUser}/>}/>
          <Route path="profile/editProfile" element={<EditProfile currentUser={currentUser}/>} />
      </Route>
    </Routes>
  );
};
