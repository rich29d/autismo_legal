import core from '@/api/core';

export default {
  index() {
    return core.get('/Responsavel_Responsavel_Guia');
  },

  show(id) {
    return core.get(`/Responsavel_Responsavel_Guia/${id}`);
  },

  store(guide) {
    return core.post('/Responsavel_Responsavel_Guia', guide);
  },

  update(guide) {
    return core.put('/Responsavel_Responsavel_Guia', guide);
  },

  destroy(id) {
    return core.delete(`/Responsavel_Responsavel_Guia/${id}`);
  },
};
