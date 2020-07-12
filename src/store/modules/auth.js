import { axiosInstance } from 'boot/axios';
import jwtDecode from 'jwt-decode';
const state = () => ({
  token: null
});

const getters = {
  token (state) {
    return state.token;
  },
  decodedToken (state) {
    if (!state.token) {
      return undefined;
    }
    return jwtDecode(state.token);
  },
  expireAt (state, getters) {
    if (!getters.decodedToken || !getters.decodedToken.exp) {
      return undefined;
    }
    const expiration = getters.decodedToken.exp * 1000;
    return new Date(expiration);
  },
  isLogged (state, getters) {
    return () => {
      const now = new Date();
      return getters.expireAt && getters.expireAt > now;
    };
  }
};

const actions = {
  async register ({ commit }, { name, email, password }) {
    const { data } = await axiosInstance.post('/register', { name, email, password });
    commit('SET_TOKEN', data);
  },

  async login ({ commit }, { email, password }) {
    const { data } = await axiosInstance.post('/signin', { email, password });
    commit('SET_TOKEN', data);
  },

  logout ({ commit }) {
    commit('LOGOUT');
  }
};

const mutations = {
  SET_TOKEN (state, userToken) {
    localStorage.setItem('user-token', JSON.stringify(userToken));
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${userToken.token}`;
    state.token = userToken.token;
  },
  LOGOUT () {
    localStorage.removeItem('user-token');
    location.reload();
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
