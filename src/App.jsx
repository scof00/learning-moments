import { Outlet, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/navbar/navbar";
import { AllPosts } from "./components/posts/allPosts";
import { ApplicationViews } from "./views/ApplicationViews";
import { Register } from "./components/auth/Register";
import { Login } from "./components/auth/Login";
import { Authorized } from "./views/Authorized";

export const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register />} />

      <Route path="*" element={
        <Authorized>
          <ApplicationViews/>
        </Authorized>
      }/>
     
    </Routes>
  )
};
