import api from './index.jsx';

export const login = async (loginId, password) => {
  const response = await api.post(
    '/auth/login',
    {
      loginId,
      password,
    },
    {
      withCredentials: true,
    }
  );

  return response.data;
};

export const signup = async (loginId, password, confirm) => {
  const response = await api.post(
    '/auth/signup',
    {
      loginId,
      password,
      confirm,
    },
    {
      withCredentials: true,
    }
  );

  return response.data;
};

export const idDuplicateCheck = async (loginId) => {
  const response = await api.post('/auth/signup/check', {
    loginId,
  });

  return response.data.idCheck;
};

export const uploadUserProfile = async (loginId, nickname, profileUrl) => {
  const response = await api.put(
    '/auth/signup/update',
    {
      loginId,
      nickname,
      profileUrl,
    },
    {
      withCredentials: true,
    }
  );

  return response.data;
};

export const getUserProfile = async () => {
  const response = await api.get('/userInfo', {
    withCredentials: true,
  });

  return response.data.userInfoData;
};

export const updateMyPageProfile = async (nickname, profileUrl) => {
  const response = await api.put(
    '/auth/me/profile',
    {
      nickname,
      profileUrl,
    },
    {
      withCredentials: true,
    }
  );

  return response.data;
};

export const logout = async () => {
  const response = await api.post('/auth/logout', {
    withCredentials: true,
  });

  return response.data;
};
