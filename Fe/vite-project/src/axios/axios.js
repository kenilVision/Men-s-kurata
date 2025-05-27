import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_STRIPE_BEurl,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get('Token');

    // Only attach Authorization if token exists AND request does not disable auth
    if (accessToken && !config.skipAuth) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

export default axiosInstance;