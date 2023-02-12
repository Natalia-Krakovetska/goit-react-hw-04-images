import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY = '31910031-2af744f88dbcdc5739401f7e8';

export const fetchImages = async (keyword, page) => {
  const response = await axios.get(
    `?q=${keyword}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response.data;
};
