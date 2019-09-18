const axios = require('axios');
const { get } = require('lodash');

const auth = axios.create({
  baseURL: 'https://autismolegal-api-autenticacao.azurewebsites.net/api',
  timeout: 5000,
});

auth.interceptors.response.use(
  ({ data }) => ({
    data: data.dados,
    success: data.sucesso,
    message: get(data, 'dados.msg'),
  } || {}),
  error => ({
    success: false,
    message: get(error, 'response.data.erros[0].message'),
  }),
);

export default auth;
