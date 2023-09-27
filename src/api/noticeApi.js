import api from './index.jsx';

export const fetchNotification = async () => {
  const response = await api.get('/notification');

  return response.data;
};

export const UpdateNotificationStatus = async (participants) => {
  const response = await api.put('/notification', {
    participants,
  });

  return response.data;
};
