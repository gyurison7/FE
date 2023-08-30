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

const createGroup = async (data) => {
  const response = await api.post('/group', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    withCredentials: true,
  });
  return response.data;
}

const editGroup = async ({data, id}) => {
  const response = await api.put(`/group/${id}`,data,{
    headers:{
      'Content-Type': 'multipart/form-data',
    },
    withCredentials:true,
  });
  return response.data
}

export { getGroupData, createGroup, editGroup };
