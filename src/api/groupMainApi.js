import api from './index.jsx';

const getGroupData = async () => {
  try {
    const response = await api.get('/group', { withCredentials: true });
    const groupData = response.data.findMyGroupData || [];
    const userId = response.data.userId;

    if (
      localStorage.getItem('userId') === null ||
      localStorage.getItem('userId') === ''
    )
      localStorage.setItem('userId', userId);

    return groupData;
  } catch (error) {
    return [];
  }
};

export { getGroupData };
