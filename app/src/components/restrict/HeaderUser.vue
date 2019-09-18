<template>
  <div class="Flex Flex__SpaceBetween">
    <div class="Logo"></div>
    <wxc-loading :show="toggleLoading"></wxc-loading>
    <register @loading="onLoading" @loadPosts='$emit("reload", true);'/>
    <search @loading="onLoading"/>
  </div>
</template>

<script>
import Search from '@/components/restrict/post/Search';
import Register from '@/components/restrict/post/Register';
import CustomButton from '@/components/form/Button';

let domModule = weex.requireModule('dom');
import { WxcLoading } from 'weex-ui';

export default {
  name: 'HeaderUser',

  components: {
    Search,
    Register,
    WxcLoading,
    CustomButton,
  },

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

  created(){
      domModule.addRule('fontFace', {
          'fontFamily': "awesomeFont",
          'src': "url('https://cdn.bootcss.com/font-awesome/4.7.0/fonts/fontawesome-webfont.ttf?v=4.7.0')"
      });
}
};
</script>

<style lang="stylus">
.Logo
  background url("~@/assets/images/logo.png") center center / contain no-repeat
  padding 13% 20%

.icon
  font-family: awesomefont
</style>
