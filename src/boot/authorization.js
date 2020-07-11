export default ({ urlPath, redirect, store, app, router }) => {
  const isAuthorized = localStorage.getItem('user-data');
  if (!isAuthorized && !urlPath.startsWith('/authenticate')) {
    redirect({ path: '/authenticate' });
  }
};
