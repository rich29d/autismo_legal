const moment = require('moment');

// eslint-disable-next-line no-useless-escape
module.exports.email = email => (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(email);

module.exports.date = (date, format = 'YYYY-MM-DD') => moment(date, format).isValid();

module.exports.number = number => (/\d/).test(number);
