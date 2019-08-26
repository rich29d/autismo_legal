<template>
  <button :class="classColor">{{ text }}</button>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: 'Click me!',
    },

    color: {
      type: String,
    },
  },

  computed: {
    classColor() {
      return `Button Button__${this.color}`;
    },
  },
};
</script>

<style lang="stylus">
  @import '~@/assets/style/button.styl'
</style>
