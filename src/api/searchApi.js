import api from './index.jsx';

const fetchGroupByAlbum = async (searchGroup) => {
  try {
    const response = await api.get(`/group/search/groupName/${searchGroup}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

const fetchGroupByPlace = async (place) => {
  console.log(`Fetching data for place: ${place}`);
  try {
    const response = await api.get(`/group/search/place/${place}`);
    console.log(`Success fetching data for place: ${place}`, response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data for place: ${place}`, error);
    throw error;
  }
};

const fetchGroupByDate = async (searchDate) => {
  try {
    const response = await api.get(`/group/search/date/${searchDate}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

const fetchNickname = async (nickname) => {
  try {
    const response = await api.get(`/nickname/${nickname}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export { fetchGroupByAlbum, fetchGroupByDate, fetchGroupByPlace, fetchNickname };
