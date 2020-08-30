import axios from 'axios';
import mockApi from './mockApi';

let apiInstance = axios.create({
  baseURL: process.env.REACT_APP_API,
  timeout: 60*1000,
});

if (process.env.NODE_ENV === 'development' && process.env.REACT_APP_MOCK_RES === 'true') {
  console.warn('mocking API responses (REACT_APP_MOCK_RES is set to true)');
  mockApi(apiInstance);
}

export default apiInstance;
