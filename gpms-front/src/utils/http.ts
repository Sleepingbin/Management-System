import axios, { AxiosInstance } from 'axios';

const http: AxiosInstance = axios.create({
  baseURL: 'http://192.168.30.5:5174/api'
});

export default http;
