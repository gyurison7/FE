import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import GroupMain from '../pages/group/GroupMain.jsx';
import Login from '../pages/signup-login/Login.jsx';
import Signup from '../pages/signup-login/Signup.jsx';
import GroupWrite from '../pages/group/GroupWrite.jsx';
import MyPage from '../pages/mypage/MyPage.jsx';
import Introduction from '../pages/app-introduction/Introduction.jsx';
import UserProfile from '../pages/signup-login/UserProfile.jsx';
import PostMain from '../pages/post/PostMain.jsx';
import PostWrite from '../pages/post/PostWrite.jsx';
import PasswordChange from '../pages/mypage/PasswordChange.jsx';
import GroupEdit from '../pages/group/GroupEdit.jsx';
import DatePicker from '../components/common/modal/DatePicker.jsx';
import PostDetail from '../pages/post/PostDetail.jsx';
import Search from '../pages/search/Search.jsx';
import Notice from '../pages/notice/Notice.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import NotProtectedRoute from './NotProtectedRoute.jsx';
import GoogleAnalytics from '../utils/GoogleAnalytics.js';
import PostEdit from '../pages/post/PostEdit.jsx';

function isLogin() {
  return !!localStorage.getItem('userId');
}

const Router = () => {
  return (
    <BrowserRouter>
      <GoogleAnalytics />
      <Routes>
        <Route path='/' element={<NotProtectedRoute />}>
          <Route index element={<Introduction />} />
        </Route>
        <Route path='/login' element={<NotProtectedRoute />}>
          <Route index element={<Login />} />
        </Route>
        <Route path='/signup' element={<NotProtectedRoute />}>
          <Route index element={<Signup />} />
        </Route>
        <Route path='/userprofile' element={<ProtectedRoute />}>
          <Route index element={<UserProfile />} />
        </Route>
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
        <Route path='/postmain/:groupId/:postId' element={<ProtectedRoute />}>
          <Route index element={<PostDetail />} />
        </Route>
        <Route path='/postedit/:groupId/:memoryId' element={<ProtectedRoute />}>
          <Route index element={<PostEdit />} />
        </Route>
        <Route path='/search' element={<ProtectedRoute />}>
          <Route index element={<Search />} />
        </Route>
        <Route path='/testdate' element={<DatePicker />} />
        <Route path='/notice' element={<ProtectedRoute />}>
          <Route index element={<Notice />} />
        </Route>
        <Route
          path='*'
          element={
            isLogin() ? <Navigate to='/groupmain' /> : <Navigate to='/login' />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
