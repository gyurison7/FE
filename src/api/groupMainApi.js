import api from './index.jsx';

const getGroupData = async () => {
    try {
        const response = await api.get('/group', { withCredentials: true });
        console.log('API Response:', response.data);
        return response.data.findMyGroupData || []; 
    } catch (error) {
        console.error("Error fetching group data:", error);
        return []; 
    }
};

export { getGroupData };