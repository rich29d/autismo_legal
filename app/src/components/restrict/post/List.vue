<template>
  <div>
    <a
      :href='post.link'
      :style='{animationDelay: `.${index * 2}s`}'
      target='_blank'
      class='Card Card__Border Card__Padding--5 Margin__Bottom--2 FadeFromTop'
      v-for='(post, index) in items' :key='post.idPublicacao'>
      <div class='Card__Title'>
        <text class='Text__Bold'>{{ post.titulo }}</text>
      </div>

      <div class='Card__Date'>
        <text>{{ post.data }}</text>
      </div>

      <div class='Card__Description'>
        <text>{{ post.chamada }}</text>
      </div>

      <div class='Card__Label Flex'>
        <div class="Flex Flex__Middle Margin__Right--1">
          <img :src='require("@/assets/images/002-banner.svg")' alt='Categoria' >
          <text class='Card__Label--category'>{{ post.categoria }}</text>
        </div>

        <div class="Flex Flex__Middle Margin__Right--1">
          <img :src='require("@/assets/images/001-tag-black-shape.svg")' alt='Categoria' >
          <text class='Card__Label--tag'>{{ post.tags }}</text>
        </div>
      </div>
    </a>
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
