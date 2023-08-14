import api from './index.jsx';

const getGroupData = async () => {
    try {
        const response = await api.get('/group', { withCredentials: true });
        return response.data.findMyGroupData || []; 
    } catch (error) {
        return []; 
    }
};

export { getGroupData };