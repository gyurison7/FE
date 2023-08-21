import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GroupMain from '../pages/group/GroupMain.jsx';
import Login from '../pages/signup-login/Login.jsx';
import Signup from '../pages/signup-login/Signup.jsx';
import GroupWrite from '../pages/group/GroupWrite.jsx';
import MyPage from '../pages/mypage/MyPage.jsx';
import Introduction from '../pages/app-introduction/Introduction.jsx';
import UserProfile from '../pages/signup-login/UserProfile.jsx';
import PostMain from '../pages/post/PostMain.jsx';
import PostWrite from '../pages/post/PostWrite.jsx';
import KakaoLoginRedirect from '../pages/kakao-login/KakaoLoginRedirect.jsx';
import PasswordChange from '../pages/mypage/PasswordChange.jsx';
import GroupEdit from '../pages/group/GroupEdit.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import DatePicker from '../components/common/modal/DatePicker.jsx';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Introduction />} />
        <Route path='/login' element={<Login />} />
        <Route path='/api/auth/login/kakao/callback' element={<KakaoLoginRedirect />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/userprofile' element={<UserProfile />} />
        <Route path='/groupmain' element={<ProtectedRoute />}>
          <Route index element={<GroupMain />} />
        </Route>
        <Route path='/groupwrite' element={<ProtectedRoute />}>
          <Route index element={<GroupWrite />} />
        </Route>
        <Route path='/postmain/:id' element={<ProtectedRoute />}>
          <Route index element={<PostMain />} />
        </Route>
        <Route path='/postwrite/:id' element={<ProtectedRoute />}>
          <Route index element={<PostWrite />} />
        </Route>
        <Route path='/mypage' element={<ProtectedRoute />}>
          <Route index element={<MyPage />} />
        </Route>
        <Route path='/pwchange' element={<ProtectedRoute />}>
          <Route index element={<PasswordChange />} />
        </Route>
        <Route path='/groupedit/:id' element={<ProtectedRoute />}>
          <Route index element={<GroupEdit />} />
        </Route>
        <Route path='/testdate' element={<DatePicker />}/>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
