<template>
  <div class='Menu Flex Flex__SpaceAround'>
    <custom-button
      @click='goTo(path)'
      :key='className'
      :class='[{Button__Active: active === className}, `Button__${className}`]'
      :text='text'
      v-for='{ text, className, path } in menuButtons'
      type='Menu'
    />
  </div>
</template>

<script>
import CustomButton from '@/components/form/Button';

export default {
  name: 'Menu',

  components: {
    CustomButton
  },

  data() {
    return {
      active: '',
      menuButtons: [
        {
          path: '/publicacoes',
          text: 'Publicações',
          className: 'Post'
        },
        {
          path: '/guias',
          text: 'Guias',
          className: 'Guide'
        }
      ]
    };
  },

  methods: {
    goTo(path) {
      location.assign(`#${path}`);
      this.active = this.$route.meta.menu;
    },
  },

  mounted() {
    this.active = this.$route.meta.menu;
  },
};
</script>

<style lang='stylus'>
.Menu {
  position: fixed;
  border-radius: 15px;
  background: #ffffff;
  width: calc(84vw);
  left: 8vw;
  bottom: 8vw;
  padding: 3vw;
  box-shadow: 0 1px 24px rgba(0, 0, 0, 0.16);
  z-index 4
}
</style>
