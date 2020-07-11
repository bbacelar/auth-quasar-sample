import Vue from 'vue';
import axios from 'axios';
import { Notify } from 'quasar';

const axiosInstance = axios.create({
  baseURL: process.env.API_URL
});

export default ({ store, router }) => {
  const isAuthorized = localStorage.getItem('user-data');

  if (isAuthorized) {
    const userData = JSON.parse(isAuthorized);
    store.commit('auth/SET_USER_DATA', userData);
  }

  axiosInstance.interceptors.response.use(
    response => response,
    error => {
      const { status } = error.response;
      switch (status) {
        case 401:
          router.push('/');
          store.dispatch('auth/logout');
          break;
        case 400:
          Notify.create({ type: 'warning', message: error.response.data.message || 'Bad request' });
          break;
        case 404:
          Notify.create({ type: 'negative', message: error.response.data || 'Not found' });
          break;
        case 500:
          Notify.create({ type: 'negative', message: 'Internal error' });
          break;
        default:
          break;
      }
      return Promise.reject(error);
    }
  );
};

Vue.prototype.$axios = axiosInstance;
export { axiosInstance };
