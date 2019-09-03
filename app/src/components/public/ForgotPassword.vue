<template>
  <div>
    <logo></logo>

    <div class='Card Card__Blue'>
      <div class='Margin__Bottom--1'>
        <text class='Text__White Text__Size--2'>{{ textForgotPassword }}</text>
      </div>

      <div class='Margin__Bottom--2'>
        <field
          label='Email'
          type='text'
          placeholder='Digite seu email'
          class='Margin__Bottom--16'
          v-model='email'
        />
      </div>

      <div class='Flex Flex__Middle Flex__SpaceBetween'>
        <a href='/'>
          <text class='Text__White Text__Right Text__Size--3'>Voltar</text>
        </a>

        <custom-button text='Enviar' color='White' @click='sendEmail()'></custom-button>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from './Logo';
import Field from '../form/Field';
import CustomButton from '../form/Button';
import user from '../../services/user';

const toast = require('@/util/toast');

export default {
  name: 'ForgotPassword',
  data() {
    return {
      email: '',
      textForgotPassword:
`Insira seu email cadastrado,
enviaremos uma mensagem para resgistro de nova senha.`,
    };
  },
  components: {
    Logo,
    Field,
    CustomButton,
  },
  methods: {
    async sendEmail() {
      this.$emit('loading', true);

      const { message } = await user.sendEmailForgotPassword(this.email);

      this.$emit('loading', false);

      toast(message);
    },
  },
};
</script>
