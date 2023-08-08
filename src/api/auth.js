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
  });
  
  return response.data;
}