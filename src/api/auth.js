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

export const uploadUserProfile = async (formData) => {
  const response = await api.put('/auth/signup/update', formData, {
    withCredentials: true,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const getUserProfile = async () => {
  const response = await api.get('/userInfo', {
    withCredentials: true,
  });

  return response.data.userInfoData;
};

export const updateMyPageProfileImage = async (formData) => {
  const response = await api.put('/auth/me/profile', formData, {
    withCredentials: true,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data.profileUrl;
};

export const updateMyPageNickname = async (nickname) => {
  const response = await api.put(
    '/auth/me/nickname',
    {
      nickname,
    },
    {
      withCredentials: true,
    }
  );

  return response.data;
};

export const deleteMyPageProfileImage = async () => {
  const response = await api.put(
    '/auth/me/default',
    {},
    {
      withCredentials: true,
    }
  );

  return response.data;
};

export const changePassword = async (
  originalPassword,
  changedPassword,
  changedConfirm
) => {
  const response = await api.put(
    '/auth/me/password',
    {
      originalPassword,
      changedPassword,
      changedConfirm,
    },
    { withCredentials: true }
  );

  return response.data;
};

export const logout = async () => {
  const response = await api.post('/auth/logout', {
    withCredentials: true,
  });

  return response.data;
};
