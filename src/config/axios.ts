import axios from "axios";
import * as SecureStore from 'expo-secure-store';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  function(config) {
    const context = SecureStore.getItem('context');
    const parsedContext = context ? JSON.parse(context || '{}') : null;  

    if (parsedContext?.auth?.accessToken) {
      config.headers["Authorization"] = 'Bearer ' + parsedContext.auth.accessToken;
    }
    
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

export default axiosInstance