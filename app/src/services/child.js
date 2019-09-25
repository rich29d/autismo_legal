import core from '@/api/core';

export default {
  register(child, responsable) {
    const childUser = {
      idCrianca: 0,
      idPessoa: responsable.idPessoa,
      idResponsavel: responsable.idResponsavel,
      diagnosticoFechado: child.hasDiagnosis || false,
      pessoa: {
        idPessoa: 0,
        nome: child.name,
        sexo: child.gender,
        email: responsable.email,
        celular: responsable.cell,
        foto: '',
        dataNascimento: child.birthday,
      },
    };

    return core.post('/Crianca', childUser);
  },
};
