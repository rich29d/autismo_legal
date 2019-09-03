const axios = require('axios');

export default axios.create({
  baseURL: 'https://autismolegal-api-nucleo.azurewebsites.net/api',
  timeout: 5000,
});
