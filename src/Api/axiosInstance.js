import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'http://brainova.runasp.net/api'
});

export default axiosInstance;
