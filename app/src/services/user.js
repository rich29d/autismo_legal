import backend from '@/api/backend';

const validator = require('@/util/validator');

const existInvalid = email =>
  // eslint-disable-next-line no-mixed-operators
  email === '' && 'Preencha o campo de email!' ||
  // eslint-disable-next-line no-mixed-operators
  !validator.email(email) && 'Email invalido';

export default {
  async sendEmailForgotPassword(email) {
    const messageError = existInvalid(email);

    if (messageError) {
      return {
        success: false,
        message: messageError,
      };
    }

    await new Promise(resolve => setTimeout(resolve, 800));

    await backend.get('/posts/1', { email });

    return {
      success: true,
      message: 'Email enviado.',
    };
  },
};
