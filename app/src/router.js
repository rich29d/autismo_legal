/* global Vue */
import Router from 'vue-router';
import Login from '@/components/public/Login';
import ForgotPassword from '@/components/public/ForgotPassword';
import Register from '@/components/public/Register';
import CongratulationsRegister from '@/components/public/CongratulationsRegister';

import UserPage from '@/components/restrict/User';

Vue.use(Router);

// eslint-disable-next-line import/prefer-default-export
export const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      meta: {
        isPublic: true,
      },
    },

    {
      path: '/esqueci-senha',
      name: 'ForgotPassword',
      component: ForgotPassword,
      meta: {
        isPublic: true,
      },
    },

    {
      path: '/cadastrar',
      name: 'Register',
      component: Register,
      meta: {
        isPublic: true,
      },
    },

    {
      path: '/cadastro-sucesso',
      name: 'CongratulationsRegister',
      component: CongratulationsRegister,
      meta: {
        isPublic: true,
      },
    },

    {
      path: '/publicacoes',
      name: 'post/Index',
      component: UserPage,
      meta: {
        title: 'PUBLICAÇÕES',
        menu: 'Post',
      },
    },

    {
      path: '/publicacoes/cadastro',
      name: 'post/Register',
      component: UserPage,
      meta: {
        title: 'CADASTRO',
      },
    },

    {
      path: '/guias',
      name: 'guide/Index',
      component: UserPage,
      meta: {
        title: 'GUIAS DO RESPONSÀVEL',
        menu: 'Guide',
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const isPublic = to.meta.isPublic;
  const token = localStorage.getItem('token');

  if (!(isPublic || token)) {
    return next('/');
  }

  return next();
});
