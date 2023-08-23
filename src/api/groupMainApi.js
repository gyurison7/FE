import api from './index.jsx';

const getGroupData = async () => {
  try {
    const response = await api.get('/group', { withCredentials: true });
    console.log(response);
    const groupData = response.data.findMyGroupData || [];
    const userId = response.data.userId;

    if (userId) {
      localStorage.setItem('userId', userId);
    }

    return groupData;
  } catch (error) {
    return [];
  }
};

export { getGroupData };
