export default ({ store }) => {
  const hasToken = localStorage.getItem('user-token');

  if (hasToken) {
    const userToken = JSON.parse(hasToken);
    store.commit('auth/SET_TOKEN', userToken);
  }
};
