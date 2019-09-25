<template>
  <div>
    <div
      @click='$emit("loadGuide", guide.idGuia);'
      :style='{animationDelay: `.${index * 2}s`}'
      target='_blank'
      class='Card Card__Border Card__Padding--5 Margin__Bottom--2 FadeFromTop'
      v-for='(guide, index) in items' :key='guide.idGuia'>
      <div class='Card__Image' :style='{backgroundImage: `url(${guide.imagem})`}'></div>

      <div class='Card__Number Text__Right Block'>
        <text class='Text__Bold Inline__Block'>{{ guide.passo }}</text>
      </div>
      
      <div class='Card__Title'>
        <text class='Text__Bold'>{{ guide.titulo }}</text>
      </div>

      <div class='Card__Description'>
        <text>{{ guide.descricao }}</text>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'List',

  props: {
    items: {
      type: Array,
    },
  },
};
</script>
