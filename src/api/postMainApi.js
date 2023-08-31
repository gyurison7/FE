import api from './index.jsx'; // 실제 API 호출을 담당하는 파일을 import 해주세요

export const postWrite = async (id, formData, navigate) => {
  try {
    await api.post(`/group/${id}/memory`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    });
    navigate(`/postmain/${id}`);
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
