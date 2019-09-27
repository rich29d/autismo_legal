import core from '@/api/core';

export default {
  indexByType(type) {
    return core.get(`Parametros/GetPor/${type}`);
  },
};
