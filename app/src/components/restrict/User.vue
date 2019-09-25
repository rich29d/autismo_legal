<template>
  <div class='Main'>
    <div class="Header Padding__Left--2 Padding__Right--2">
      <header-user @reload='reload = true'/>
    </div>

    <div class='Padding__Left--2 Padding__Right--2 Padding__Top--2'>      
      <div class="Padding__Bottom--1">
        <text class="Title">{{ $route.meta.title }}</text>
      </div>
  
      <menu />

      <component :reload='reload' :is='require(`@/components/restrict/${$route.name}`)' />
    </div>
  </div>
</template>

<script>
import CustomButton from '@/components/form/Button';
import HeaderUser from '@/components/restrict/HeaderUser';
import Menu from '@/components/restrict/Menu';
import { get } from 'lodash';

export default {
  name: 'User',

  components: {
    HeaderUser,
    CustomButton,
    Menu,
  },

  data() {
    return {
      reload: false,
      title: get(this.$router, 'meta.title', 'Título'),
    };
  },
};
</script>

<style lang="stylus">
.Header
  background-color #FFF

.Main
  background-color #e7eaec
  min-height 100vh
  padding-bottom 40vw

  .Title
    color: #3f4867;
    font-size: 20px;
    text-transform: uppercase;
    font-weight: bold;
</style>
