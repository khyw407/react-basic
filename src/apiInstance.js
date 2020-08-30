import axios from 'axios';
import { axiosAuthInterceptor } from '@51tf/react-common/auth';
import { cemApiUrl } from './constants';
import mockData from './mockData';

let apiInstance = axios.create({
  baseURL: cemApiUrl,
  timeout: 60*1000,
});
apiInstance.interceptors.request.use(axiosAuthInterceptor);

if (process.env.NODE_ENV === 'development' && process.env.REACT_APP_MOCK_RES === 'true') {
  console.warn('mocking API responses (REACT_APP_MOCK_RES is set to true)');
  mockData(apiInstance);
}

export default apiInstance;
