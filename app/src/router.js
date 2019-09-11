/* global Vue */
import Router from 'vue-router';
import Login from '@/components/public/Login';
import ForgotPassword from '@/components/public/ForgotPassword';
import Register from '@/components/public/Register';
import CongratulationsRegister from '@/components/public/CongratulationsRegister';

Vue.use(Router);

// eslint-disable-next-line import/prefer-default-export
export const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
    },
    {
      path: '/esqueci-senha',
      name: 'ForgotPassword',
      component: ForgotPassword,
    },
    {
      path: '/cadastrar',
      name: 'Register',
      component: Register,
    },
    {
      path: '/cadastro-sucesso',
      name: 'CongratulationsRegister',
      component: CongratulationsRegister,
    },
  ],
});
