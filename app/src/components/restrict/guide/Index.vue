<template>
  <div>
    <wxc-loading :show="toggleLoading"></wxc-loading>
    <list :items="items" @loadGuide="loadGuide" />
    
    <item
      @closeGuide="showGuide = false"
      @onLoading="onLoading"
      :idGuide="idGuide"
      v-show="showGuide"
    />
  </div>
</template>

<script>
import List from "@/components/restrict/guide/List";
import Item from "@/components/restrict/guide/Item";
import GuideService from "@/services/guide";
import Field from "@/components/form/Field";
import CustomButton from "@/components/form/Button";
import { WxcLoading } from "weex-ui";

const toast = require("@/util/toast");

export default {
  name: "GuideList",

  components: {
    WxcLoading,
    Field,
    List,
    Item,
    CustomButton
  },

  prop: {
    reload: Boolean
  },

  data() {
    return {
      items: [],
      toggleLoading: false,
      idGuide: null,
      showGuide: false
    };
  },

  methods: {
    async loadGuides() {
      this.onLoading(true);

      const { success, message, content } = await GuideService.index();

      this.onLoading(false);

      if (success) {
        content.sort((a, b) => {
          if (a.passo < b.passo) return -1;

          if (a.passo > b.passo) return 1;

          return 0;
        });

        this.items = content;

        content.length === 0 && toast("Nenhum item encontrado.");
      } else {
        toast(message);
      }
    },

    loadGuide(id) {
      this.idGuide = id;
      this.showGuide = true;
    },

    onLoading(toggle) {
      this.toggleLoading = toggle;
    }
  },

  mounted() {
    this.loadGuides();
  }
};
</script>
