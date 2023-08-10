import api from './index.jsx'

const getGroupData = () => {
    return api.get('/group', { withCredentials: true })
    .then(response => response.data)
    .catch(error => {
        throw error;
    });
};

export { getGroupData}