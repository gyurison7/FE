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