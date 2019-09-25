<template>
  <div class="Flex Flex__Middle Static">
    <div class="Search__Button Relative">
      <custom-button icon="f002" type="Rounded" @click="showSearch" />
      <div class="Search__Background Fixed" :class="{Show: show}"></div>
    </div>

    <div class="Search__Content Absolute Position__Top Position__Left" v-show="show">
      <div class="Search__Form Margin__Bottom--3 Margin__Top--2 FadeFromTop" v-show="show">
        <div class="Margin__Bottom--1 Flex Flex__SpaceBetween">
          <text class="Text__White Text__Bold Text__Size--4">Pesquisar</text>

          <custom-button type='Close' color='White' @click='show = false'></custom-button>
        </div>

        <div class="Margin__Bottom--2">
          <field
            label="Buscar"
            typeField="text"
            placeholder="Digite para buscar"
            class="Margin__Bottom--1"
            v-model="term"
          />

          <field
            label="Categoria"
            typeField="text"
            placeholder="Digite uma categoria"
            class="Margin__Bottom--1"
            v-model="category"
          />
        </div>

        <div class="Text__Right Block">
          <custom-button text="Buscar" color="White" @click="loadPosts()"></custom-button>
        </div>
      </div>

      <list :items="items" />
    </div>
  </div>
</template>

<script>
import CustomButton from "@/components/form/Button";
import List from "@/components/restrict/post/List";
import PostService from "@/services/post";
import Field from '@/components/form/Field';

export default {
  name: "Search",

  components: {
    CustomButton,
    List,
    Field,
  },

  data() {
    return {
      show: false,
      items: [],
      category: "",
      term: ""
    };
  },

  methods: {
    async loadPosts() {      
      this.$emit("loading", true);
      this.items = [];

      const { success, message, content } = await PostService.search({
        category: this.category || '',
        term: this.term || '',
      });

      this.$emit("loading", false);

      if (success) {
        this.items = content;
      } else {
        toast(message);
      }
    },

    showSearch() {
      this.show = true;      
    },
  },
};
</script>

<style lang="stylus">
@import '~@/assets/style/variable.styl';

.Search__Background {
  background: #F00;
  border-radius: 50%;
  background-color: $secondy;
  z-index: 8;
  width: 0;
  height: 0;
  top: 30px;
  right: 45px;
  transform: translate(50%, -50%);
  transition: all 0.8s ease;

  &.Show {
    width: 400vw;
    height: 400vw;
  }
}

.Search__Content {
  z-index: 10;
  width: 84vw;
}
</style>