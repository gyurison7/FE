import axios from 'axios';

export const login = async (loginId, password) => {
  const response = await axios.post(
    `${process.env.REACT_APP_URL}/auth/login`,
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
  const response = await axios.post(
    `${process.env.REACT_APP_URL}/auth/signup`,
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
  const response = await axios.post(
    `${process.env.REACT_APP_URL}/auth/signup/check`,
    {
      loginId,
    }
  );

  return response.data.idCheck;
};

export const userInfoUpload = async (loginId, nickname, profileUrl) => {
  const response = await axios.put(
    `${process.env.REACT_APP_URL}/auth/signup/update`,
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

export const logout = async () => {
  const response = await axios.post(`${process.env.REACT_APP_URL}/auth/logout`, {
    withCredentials: true,
  });

  return response.data;
};
