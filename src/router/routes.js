import Authenticate from 'src/pages/Authenticate';
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue'), meta: { authorize: true } },
      {
        path: '/users',
        name: 'users',
        component: () => import('pages/Users.vue'),
        meta: { authorize: true }
      }
    ]
  },
  {
    path: '/authenticate',
    component: Authenticate
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
];

export default routes;
