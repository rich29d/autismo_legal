<template>
  <div class="wrapper">
    <loading :display="toggleLoading ? 'show' : 'hide'">
      <loading-indicator></loading-indicator>
    </loading>

    <router-view @loading="onLoading"/>
  </div>
</template>

<script>
export default {
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
