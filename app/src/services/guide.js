import core from '@/api/core';

export default {
  index() {
    return core.get('/Guia');
  },

  show(id) {
    return core.get(`/Guia/${id}`);
  },

  store(guide) {
    return core.post('/Guia', guide);
  },

  update(guide) {
    return core.put('/Guia', guide);
  },

  destroy(id) {
    return core.delete(`/Guia/${id}`);
  },
};
