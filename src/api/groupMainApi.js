import { uploadImage } from './imageUpload.js';
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
  const imageUrl = await uploadImage(data.chosenFile);

  const dataToPost = {
    ...data,
    thumbnailUrl: imageUrl,
  };
  delete dataToPost.chosenFile;
  const response = await api.post('/group', dataToPost, {
    withCredentials: true,
  });

  return response.data;
};

const editGroup = async ({ data, id, chosenFile }) => {

  if (chosenFile) {
    data.thumbnailUrl = await uploadImage(chosenFile); 
  }

  const response = await api.put(`/group/${id}`, data, {
    withCredentials: true,
  });

  return response.data;
};

export { getGroupData, createGroup, editGroup };
