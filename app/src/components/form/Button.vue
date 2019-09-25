<template>
  <button :class="classColor">
    <text v-if='icon' class='icon' v-html='`&#x${icon};`'/>
    <span>{{ text }}</span>
  </button>
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
      default: '',
    },

    icon: {
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
