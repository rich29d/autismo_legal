<template>
  <button :class="classColor" @click="clicked">{{ text }}</button>
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

  methods: {
    clicked() {
      this.$emit('click');
    },
  },
};
</script>

<style lang="stylus">
  @import '~@/assets/style/button.styl'
</style>
