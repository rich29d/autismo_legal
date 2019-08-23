module.exports = (message) => {
  const modal = weex.requireModule('modal');

  modal.alert({
    message,
    okTitle: 'ok',
  });
};
