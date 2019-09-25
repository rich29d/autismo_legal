<template>
  <div class='Modal FadeFromTop'>
    <div
      class='Card Card__Padding--5'>
      <div class='Card__Image Text__Right Block Card__Padding--5' :style='{backgroundImage: `url(${guide.imagem})`}'>
        <custom-button type="Close" color="White" @click="$emit('closeGuide');"></custom-button>
      </div>

      <div class='Card__Number Text__Right Block'>
        <text class='Text__Bold Inline__Block'>{{ guide.passo }}</text>
      </div>
      
      <div class='Card__Title'>
        <text class='Text__Bold'>{{ guide.titulo }}</text>
      </div>

      <div class='Card__Description'>
        <text>{{ guide.texto }}</text>
      </div>
    </div>
  </div>
</template>

<script>
import GuideService from "@/services/guide";
import CustomButton from "@/components/form/Button";

export default {
  name: 'ItemGuide',
  
  components: {
    CustomButton,
  },

  data() {
    return {
      guide: {},
    };
  },

  props: {
    idGuide: {
      type: Number,
    },
  },

  methods: {
    async loadGuide() {
      if (!this.idGuide)
        return
      
      this.$emit('onLoading', true);
      const { success, message, content } = await GuideService.show(this.idGuide);
      this.$emit('onLoading', false);

      if (success) {
        this.guide = content;
      } else {
        toast(message);
      }
    },    
  },

  watch: {
    idGuide() {
      this.loadGuide();
    },
  },
};
</script>

<style lang="stylus">
  .Modal .Card__Image
    border-radius 0
    height 50vw
</style>