import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GroupMain from '../pages/group/GroupMain.jsx';
import Login from '../pages/signup-login/Login.jsx';
import Signup from '../pages/signup-login/Signup.jsx';
import GroupWrite from '../pages/group/GroupWrite.jsx';
import MyPage from '../pages/mypage/MyPage.jsx';
import Introduction from '../pages/app-introduction/Introduction.jsx';
import UserInfo from '../pages/signup-login/UserInfo.jsx';
import PostMain from '../pages/post/PostMain.jsx';
import PostWrite from '../pages/post/PostWrite.jsx';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Introduction />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/userinfo" element={<UserInfo />} />
        <Route path="/groupmain" element={<GroupMain />} />
        <Route path="/groupwrite" element={<GroupWrite />} />
        <Route path="/postmain" element={<PostMain />} />
        <Route path="/postwrite" element={<PostWrite />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
