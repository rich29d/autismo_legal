<template>
  <div>   

    <wxc-loading :show="toggleLoading"></wxc-loading>
    <list :items="items" />
  </div>
</template>

<script>
import List from "@/components/restrict/post/List";
import PostService from "@/services/post";
import Field from "@/components/form/Field";
import CustomButton from "@/components/form/Button";
import { WxcLoading } from "weex-ui";

const toast = require("@/util/toast");

export default {
  name: "Register",

  components: {
    WxcLoading,
    Field,
    List,
    CustomButton
  },

  prop: {
    reload: Boolean
  },

  data() {
    return {
      items: [],
      category: "",
      term: "",
      toggleLoading: false
    };
  },

  watch: {
    reload: toggle => console.log("ok")
  },

  methods: {
    async loadPosts() {
      this.onLoading(true);

      const { success, message, content } =
        await PostService.search({
          category: 'todas',
          term: false
        });

      this.onLoading(false);

      if (success) {
        this.items = content;
        content.length === 0 && toast('Nenhum item encontrado.');
      } else {
        toast(message);
      }
    },

    onLoading(toggle) {
      this.toggleLoading = toggle;
    }
  },

  mounted() {
    this.loadPosts();
  }
};
</script>
