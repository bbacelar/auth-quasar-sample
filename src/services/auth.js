import { axiosInstance } from 'boot/axios';
export function register ({ name, email, password }) {
  return axiosInstance.post('/register', { name, email, password });
}

export function login ({ email, password }) {
  return axiosInstance.post('/signin', { email, password });
}
