import { login, register } from 'src/services/auth';
import { axiosInstance } from 'boot/axios';
const state = () => ({
  user: {}
});

const actions = {
  async register ({ commit }, newUser) {
    const { data } = await register(newUser);
    commit('SET_USER_DATA', data);
  },

  async login ({ commit }, user) {
    const { data } = await login(user);
    commit('SET_USER_DATA', data);
  },

  logout ({ commit }) {
    commit('LOGOUT');
  }
};

const mutations = {
  SET_USER_DATA (state, userData) {
    localStorage.setItem('user-data', JSON.stringify(userData));
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${userData.token}`;
    state.user = userData;
  },
  LOGOUT () {
    localStorage.removeItem('user-data');
    location.reload();
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
