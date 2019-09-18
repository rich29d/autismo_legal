const axios = require('axios');
const { get } = require('lodash');

const core = axios.create({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
  baseURL: 'https://autismolegal-api-nucleo.azurewebsites.net/api',
  timeout: 5000,
});

core.interceptors.response.use(
  ({ data }) => ({
    ...data,
    content: get(data, 'dados'),
    success: data.sucesso,
    message: get(data, 'dados.msg'),
  } || {}),
  error => ({
    success: false,
    message: get(error, 'response.data.erros[0].message'),
  }),
);

export default core;
