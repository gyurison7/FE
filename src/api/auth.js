import axios from 'axios';

export const login = async (loginId, password) => {
  const response = await axios.post(`${process.env.REACT_APP_URL}/login`, {
    loginId,
    password,
  }, {
    withCredentials: true
  });

  return response.data;
}

export const signup = async (loginId, password, confirm) => {
  const response = await axios.post(`${process.env.REACT_APP_URL}/signup`, {
    loginId,
    password,
    confirm,
  }, {
    withCredentials: true
  });

  return response.data;
}

export const idDuplicateCheck = async (loginId) => {
  const response = await axios.post(`${process.env.REACT_APP_URL}/signup/check`, {
    loginId
  });

  return response.data.idCheck;
}

export const userInfoUpload = async (nickname, imageUrl) => {
  const response = await axios.put(`${process.env.REACT_APP_URL}/signup/update`, {
    nickname,
    imageUrl,
  }, {
    withCredentials: true
  });

  return response.data;
}