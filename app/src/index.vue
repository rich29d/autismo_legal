<template>
  <div class="wrapper">
    <wxc-loading :show="toggleLoading"></wxc-loading>

    <router-view @loading="onLoading"/>
  </div>
</template>

<script>
import { WxcLoading } from 'weex-ui';

export default {
  components: { WxcLoading },

  data() {
    return {
      toggleLoading: false,
    };
  },

  methods: {
    onLoading(toggle) {
      this.toggleLoading = toggle;
    },
  },
};
</script>

<style lang="stylus">
  @import './assets/style/general.styl'
</style>
