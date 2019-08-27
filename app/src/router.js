/* global Vue */
import Router from 'vue-router';
import Login from '@/components/public/Login';
import ForgotPassword from '@/components/public/ForgotPassword';
import Register from '@/components/public/Register';

Vue.use(Router);

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
  ],
});
