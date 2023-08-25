import axios from 'axios';
import { getCookie } from 'cookies-next';

const token = getCookie('token');
export const axiosInstance = axios.create({
  headers: {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  baseURL: process.env.NEXT_PUBLIC_SERVER_PATH,
  withCredentials: true,
});
