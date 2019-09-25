import Vue from 'vue'
import weex from 'weex-vue-render'
/* global Vue */
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

weex.init(Vue)
/* weex initialized here, please do not move this line */
const { router } = require('./router');
const App = require('@/index.vue');

Vue.component('font-awesome-icon', FontAwesomeIcon);

/* eslint-disable no-new */
new Vue(Vue.util.extend({ el: '#root', router }, App));
router.push('/');
