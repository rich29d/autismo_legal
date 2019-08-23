import backend from './backend';

export const store = async (info = {}) => {
  await backend.post('/post/1', info);

  let data = {
    success: false,
    message: 'Login invalido',
  };

  if (info.email === 'email@usuario.com' && info.senha === '123456') {
    data = {
      success: true,
      message: 'logado',
    };
  }

  return data;
};

export default {
  store,
};
