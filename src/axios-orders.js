import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-burger-builder-bed93.firebaseio.com/'
});

export default instance;
