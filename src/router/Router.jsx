import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../pages/main";
import Login from "../pages/login";
import Signup from "../pages/signup";
import Write from "../pages/write";



const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/write" element={<Write />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
