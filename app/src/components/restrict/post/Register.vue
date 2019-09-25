<template>
  <div class="Flex Flex__Middle Static">
    <div class="Register__Button Relative">
      <custom-button icon="f067" type="Rounded" @click="toggleRegister(true)" color="Yellow" />
      <div class="Register__Background Fixed" :class="{Show: show}"></div>
    </div>

    <div class="Register__Content Absolute Position__Top Position__Left" v-show="show">
      <div class="Register__Form Margin__Bottom--3 Margin__Top--2 FadeFromTop" v-show="show">
        <div class="Margin__Bottom--1 Flex Flex__SpaceBetween Flex__Middle">
          <text class="Title Text__Bold Text__Size--4">PUBLICAÇÕES<br /><small class="Text__White">Cadastro</small>
          </text>

          <custom-button type="Close" color="White" @click="toggleRegister(false)"></custom-button>
        </div>

        <div class="Margin__Bottom--2">
          <field
            :valueField='post.titulo'
            label="Título"
            typeField="text"
            placeholder="Digite o titulo"
            class="Margin__Bottom--1"
            v-model="post.titulo"
          />

          <field
            :valueField='post.chamada'
            label="Chamada"
            typeField="textarea"
            placeholder="Digite a chamada"
            class="Margin__Bottom--1"
            v-model="post.chamada"
          />

          <field
            :valueField='post.link'
            label="Link"
            typeField="text"
            placeholder="Digite o link"
            class="Margin__Bottom--1"
            v-model="post.link"
          />

          <field
            :valueField='post.categoria'
            label="Categoria"
            typeField="text"
            placeholder="Digite a categoria"
            class="Margin__Bottom--1"
            v-model="post.categoria"
          />

          <field
            :valueField='post.tags'
            label="Tags"
            typeField="text"
            placeholder="Digite uma tag"
            class="Margin__Bottom--1"
            v-model="post.tags"
          />
        </div>

        <div class="Flex Flex__SpaceBetween Flex__Middle">
          <div class="Flex Text__Right Width--5">
            <wxc-checkbox
              @wxcCheckBoxItemChecked="setPublish"
              :checked="post.publicado"
              :has-bottom-border="false"
              style="flex-direction: row-reverse; padding-left: 0; background: none; color: #FFF"
              title="Ativo"
            ></wxc-checkbox>
          </div>

          <div class="Text__Right Block Width--5">
            <custom-button text="Cadastrar" @click="createPost()"></custom-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomButton from "@/components/form/Button";
import List from "@/components/restrict/post/List";
import PostService from "@/services/post";
import Field from "@/components/form/Field";
import { WxcCheckbox } from "weex-ui";

const toast = require('@/util/toast');

export default {
  name: "Register",

  components: {
    CustomButton,
    List,
    Field,
    WxcCheckbox
  },

  data() {
    return {
      show: false,
      post: this.paramsPost(),
      isPublish: 0,
    };
  },

  methods: {
    setPublish($event) {
        this.post.publicado = $event.checked;
    },
    
    existFieldInvalid() {
      const { post } = this;
      
      if (post.titulo === '') {
        toast('Digite um título');
        return true;
      }

      if (post.chamada === '') {
        toast('Digite uma chamada');
        return true;
      }

      if (post.link === '') {
        toast('Digite um link');
        return true;
      }

      if (post.categoria === '') {
        toast('Selecione uma categoria');
        return true;
      }

      if (post.tags === '') {
        toast('Digite uma tag');
        return true;
      }

      return false;
    },

    paramsPost() {
      return {
        idPublcacao: 0,
        titulo: '',
        chamada: '',
        link: '',
        categoria: '',
        tags: '',
        publicado: false,
      }
    },
    
    async createPost() {
      if (this.existFieldInvalid()) {
        return;
      }
      
      this.$emit("loading", true);

      const { success, message, content } =
        await PostService.store(this.post);

      this.$emit("loading", false);

      toast(message);

      this.post = this.paramsPost();
    },

    toggleRegister(toggle) {
      this.show = toggle;
      !toggle && this.$emit("loadPosts", true);
    }
  }
};
</script>

<style lang="stylus">
@import '~@/assets/style/variable.styl';

.Register__Background {
  background: #F00;
  border-radius: 50%;
  background-color: $yellow;
  z-index: 8;
  width: 0;
  height: 0;
  top: 30px;
  right: 100px;
  transform: translate(50%, -50%);
  transition: all 0.8s ease;

  &.Show {
    width: 400vw;
    height: 400vw;
  }
}

.Register__Content {
  z-index: 10;
  width: 84vw;
}
</style>