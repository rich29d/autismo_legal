import core from '@/api/core';

const existInvalidSearch = search =>
  // eslint-disable-next-line no-mixed-operators
  (!search.term && 'Digite para buscar!') ||
  // eslint-disable-next-line no-mixed-operators
  (!search.category && 'Selecione uma categoria!');

export default {
  store(post) {
    return core.post('/Publicacao', post);
  },

  async search(search) {
    const messageError = existInvalidSearch(search);

    if (messageError) {
      return {
        success: false,
        message: messageError,
      };
    }

    return core.get(`/Publicacao/${search.category}/${search.term}`);
  },
};
