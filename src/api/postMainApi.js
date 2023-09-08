import api from './index.jsx'; // 실제 API 호출을 담당하는 파일을 import 해주세요
import { useQuery } from 'react-query';
export const fetchGroupData = async (id) => {
  const response = await api.get(`group/${id}`);
  return response.data;
};

export const useGroupData = (id) => {
  return useQuery(['group', id], () => fetchGroupData(id), {
    onError: (error) => {
      console.error('Error fetching data:', error);
    },
  });
};
