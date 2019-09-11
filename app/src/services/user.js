import backend from '@/api/backend';

const validator = require('@/util/validator');

const existInvalid = email =>
  // eslint-disable-next-line no-mixed-operators
  (email === '' && 'Preencha o campo de email!') ||
  // eslint-disable-next-line no-mixed-operators
  (!validator.email(email) && 'Email invalido');

export default {
  async sendEmailForgotPassword(email) {
    const messageError = existInvalid(email);

    if (messageError) {
      return {
        success: false,
        message: messageError,
      };
    }

    return backend.post('/Usuario/esqueciminhasenha', { email });
  },

  register(responsable) {
    const user = {
      idUsuario: 0,
      idPerfil: 2,
      login: responsable.email,
      senha: responsable.password,
      idPessoa: 0,
      pessoa: {
        idPessoa: 0,
        nome: responsable.name,
        sexo: 'I',
        email: responsable.email,
        celular: responsable.cell.ddd + responsable.cell.number,
        idUsuario: 0,
        foto: '',
        dataNascimento: '2000-01-01',
      },
      status: 1,
    };

    return backend.post('/Usuario', user);
  },
};
