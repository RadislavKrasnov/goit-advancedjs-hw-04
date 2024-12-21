import axios from "axios";

const API_KEY = '47642330-01773e177615e156ed5ec02c5';
axios.defaults.baseURL = 'https://pixabay.com/api/';

const searchPixabayImages = async (query) => {
  try {
    const response = await axios.get('/', {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
      }
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export { searchPixabayImages };
