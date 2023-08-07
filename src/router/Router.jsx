import { BrowserRouter, Route, Routes } from "react-router-dom";
import GroupMain from "../pages/group/GroupMain.jsx";
import Login from "../pages/signup-login/Login.jsx";
import Signup from "../pages/signup-login/Signup.jsx";
import GroupWrite from "../pages/group/GroupWrite.jsx";
import MyPage from "../pages/mypage/MyPage.jsx";
import Introduction from "../pages/app-introduction/Introduction.jsx";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GroupMain />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/write" element={<GroupWrite />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/introduction" element={<Introduction/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
