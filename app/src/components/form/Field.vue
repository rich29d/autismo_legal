<template>
  <div class='Field'>
    <text
      :class='classLabelColor'
      class='Text__Size--3'
    >{{label}}</text>

    <wxc-popup
      :show="isBottomShow"
      @wxcPopupOverlayClicked="popupOverlayBottomClick"
      pos="right"
      width="500"
    >
      <scroller class="scroller">
        <wxc-radio :list="options" @wxcRadioListChecked="wxcRadioListChecked"></wxc-radio>
      </scroller>
    </wxc-popup>

    <div
      :class='classBorderColor'
      :value='valueField'
      :style='{backgroundImage: removeArrow ? "none" : null }'
      v-if='typeField === "select"'
      @click='openBottomPopup'
      class='Field__Select Flex Flex__Middle'
    >
      <text>{{ content || placeholder }}</text>
      <img src="" alt="">
    </div>

    <textarea
      :type='typeField'
      :placeholder='placeholder'
      :class='classBorderColor'
      :maxlength="maxLength"
      v-model='content'
      v-else-if='typeField === "textarea"'
      @input='handleInput'
      class='Field__Textarea'
    />

    <input
      :type='typeField'
      :placeholder='placeholder'
      :class='classBorderColor'
      :maxlength="maxLength"
      v-model='content'
      v-else
      @input='handleInput'
      class='Field__Input'
    />
  </div>
</template>

<script>
import { WxcPopup, WxcRadio } from 'weex-ui';

export default {
  name: 'Field',

  components: { WxcPopup, WxcRadio },

  props: {
    label: {
      type: String,
    },

    valueField: {
      type: String,
      default: '',
    },

    typeField: {
      type: String,
      default: 'text',
    },

    options: {
      type: Array,
    },

    placeholder: {
      type: String,
    },

    labelColor: {
      type: String,
      default: 'White',
    },

    borderColor: {
      type: String,
      default: 'White',
    },

    pattern: {
      type: String,
    },

    maxLength: {
      type: Number,
    },
  },

  data() {
    return {
      content: this.valueField,
      isBottomShow: false,
      checkedInfo: {},
    };
  },

  computed: {
    classLabelColor() {
      return `Text Text__${this.labelColor}`;
    },

    classBorderColor() {
      return `Field__Border--${this.borderColor}`;
    },
  },

  watch: {
    valueField(val) {
      this.content = val || '';
    },
  },

  methods: {
    handleInput() {
      this.$emit('input', this.content);
    },

    openBottomPopup() {
      this.isBottomShow = true;
    },

    popupOverlayBottomClick() {
      this.isBottomShow = false;
    },

    wxcRadioListChecked(e) {
      this.checkedInfo = e;
      this.content = e.title;
      this.popupOverlayBottomClick();
      this.handleInput();
    },
  },
};
</script>

<style scoped lang='stylus'>
  @import '~@/assets/style/field.styl'

  .scroller
    height 100%
</style>
