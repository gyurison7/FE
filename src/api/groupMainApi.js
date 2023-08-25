import api from './index.jsx';

const getGroupData = async () => {
  try {
    const response = await api.get('/group', { withCredentials: true });
    console.log(response);
    const groupData = response.data.findMyGroupData || [];

    return groupData;
  } catch (error) {
    return [];
  }
};

export { getGroupData };
