import core from '@/api/core';

export default {
  register(child, responsable) {
    const childUser = {
      idCrianca: 0,
      idPessoa: 0,
      idResponsavel: responsable.user.idUsuario,
      diagnosticoFechado: child.hasDiagnosis,
      pessoa: {
        idPessoa: 0,
        nome: child.name,
        sexo: child.gender,
        email: responsable.email,
        celular: responsable.cell.ddd + responsable.cell.number,
        foto: '',
        dataNascimento: `${child.birthday.year}-${child.birthday.month}-${child.birthday.day}`,
      },
    };

    return core.post('/Crianca', childUser);
  },
};
