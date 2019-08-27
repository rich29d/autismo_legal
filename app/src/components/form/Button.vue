<template>
  <button :class="classColor">{{ text }}</button>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: '',
    },

    color: {
      type: String,
    },

    type: {
      type: String,
      default: 'Normal',
    },
  },

  computed: {
    classColor() {
      return `Button Button__${this.color} Button__${this.type}`;
    },
  },
};
</script>

<style lang="stylus">
  @import '~@/assets/style/button.styl'
</style>
