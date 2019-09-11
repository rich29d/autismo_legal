import backend from '@/api/backend';

const { get } = require('lodash');
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

    const response = await backend.post('/Usuario/login', {
      login: info.email,
      senha: info.senha,
    });

    if (response.success) {
      localStorage.setItem('idUser', get(response, 'dados.user.idUsuario'));
      localStorage.setItem('token', get(response, 'dados.access_token'));
    }

    return response;
  },

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.assign('/');
  },
};
