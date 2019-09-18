<template>
  <div>
    <wxc-loading :show="toggleLoading"></wxc-loading>
    <list :items='items'/>
  </div>
</template>

<script>
import List from '@/components/restrict/post/List';
import PostService from '@/services/post';
import { WxcLoading } from 'weex-ui';

const toast = require('@/util/toast');

export default {
  name: 'Register',

  components: {
    WxcLoading,
    List,
  },

  prop: {
    reload: Boolean,
  },

  data() {
    return {
      items: [],
      toggleLoading: false,
    };
  },

  watch: {
    reload: toggle => console.log('ok'),
  },

  methods: {
    async loadPosts() {
      this.onLoading(true);

      const { success, message, content } =
        await PostService.search({
          category: 'a',
          term: 'a',
        });

      this.onLoading(false);

      if (success) {
        this.items = content;
      } else {
        toast(message);
      }
    },

    onLoading(toggle) {
      this.toggleLoading = toggle;
    },
  },

  mounted() {
    this.loadPosts();
    console.log(this.reload);
  },
};
</script>
