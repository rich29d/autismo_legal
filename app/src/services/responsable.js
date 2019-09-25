import core from '@/api/core';

export default {
  register(idPessoa) {
    const responsable = {
      idResponsavel: 0,
      idPessoa,
    };

    return core.post('/Responsavel', responsable);
  },
};
