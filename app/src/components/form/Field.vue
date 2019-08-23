<template>
  <div class="Field">
    <text class="Text__White Text__Size--16">{{label}}</text>
    <input
      :type="type"
      :placeholder="placeholder"
      v-model="content"
      @input="handleInput"
      class="Field__Input"
    />
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      default: 'text',
    },

    placeholder: {
      type: String,
    },
  },

  data() {
    return {
      content: this.value,
    };
  },

  methods: {
    handleInput() {
      this.$emit('input', this.content);
    },
  },
};
</script>

<style scoped lang="stylus">
  @import '~@/assets/style/field.styl'
</style>
