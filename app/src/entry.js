/* global Vue */
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

/* weex initialized here, please do not move this line */
const { router } = require('./router');
const App = require('@/index.vue');

Vue.component('font-awesome-icon', FontAwesomeIcon);

/* eslint-disable no-new */
new Vue(Vue.util.extend({ el: '#root', router }, App));
router.push('/');
