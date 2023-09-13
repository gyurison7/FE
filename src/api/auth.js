import api from './index.jsx';

export const login = async (loginId, password) => {
  const response = await api.post('/auth/login', {
    loginId,
    password,
  });

  return response.data;
};

export const signup = async (loginId, password, confirm) => {
  const response = await api.post('/auth/signup', {
    loginId,
    password,
    confirm,
  });

  return response.data;
};

export const idDuplicateCheck = async (loginId) => {
  const response = await api.post('/auth/signup/check', {
    loginId,
  });

  return response.data.idCheck;
};

export const uploadUserProfile = async (loginId, nickname, profileUrl) => {
  const response = await api.put('/auth/signup/update', {
    loginId,
    nickname,
    ...profileUrl,
  });

  return response.data;
};

export const getUserProfile = async () => {
  const response = await api.get('/userInfo');

  return response.data.userInfoData;
};

export const updateMyPageProfileImage = async (config) => {
  const response = await api.put('/auth/me/profile', config);

  return response.data.profileUrl;
};

export const updateMyPageNickname = async (nickname) => {
  const response = await api.put('/auth/me/nickname', {
    nickname,
  });

  return response.data;
};

export const deleteMyPageProfileImage = async () => {
  const response = await api.put('/auth/me/default', {});

  return response.data;
};

export const changePassword = async (
  originalPassword,
  changedPassword,
  changedConfirm
) => {
  const response = await api.put('/auth/me/password', {
    originalPassword,
    changedPassword,
    changedConfirm,
  });

  return response.data;
};

export const logout = async () => {
  const response = await api.post('/auth/logout', {});

  return response.data;
};

export const memberOut = async (deleteCheck) => {
  const response = await api.delete('/auth/me/delete', {
    data: { deleteCheck },
  });

  return response.data;
};
