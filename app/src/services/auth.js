import backend from '@/api/backend';

const validator = require('@/util/validator');

const existInvalid = ({ email, senha }) =>
  // eslint-disable-next-line no-mixed-operators
  (email === '' || senha === '') && 'Preencha os campos para logar!' ||
  // eslint-disable-next-line no-mixed-operators
  !validator.email(email) && 'Email invalido';

export default {
  async login(info) {
    const messageError = existInvalid(info);

    if (messageError) {
      return {
        success: false,
        message: messageError,
      };
    }

    const loginValido = info.email === 'email@usuario.com' && info.senha === '123456';

    await new Promise(resolve => setTimeout(resolve, 800));

    await backend.get('/posts/1', info);

    return {
      success: loginValido,
      message: loginValido ? 'Logado' : 'Login invalido',
    };
  },

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.assign('/');
  },
};
