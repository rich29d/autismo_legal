<template>
  <div>
    <logo></logo>

    <div class='Card Card__Blue'>
      <div class='Margin__Bottom--16'>
        <text class='Text__White Text__Bold Text__Size--24'>Login</text>
      </div>

      <div class='Margin__Bottom--24'>
        <field
          label='Email'
          typeField='text'
          placeholder='Digite seu email'
          class='Margin__Bottom--16'
          v-model='email'
        />

        <field
          label='Senha'
          typeField='password'
          placeholder='Digite sua senha'
          class='Margin__Bottom--16'
          v-model='senha'
        />

        <a href='#/esqueci-senha'>
          <text class='Text__White Text__Right Text__Size--5'>Esqueci minha senha</text>
        </a>
      </div>

      <div class='Flex Flex__Middle Flex__SpaceBetween'>
        <a href='#/cadastrar'>
          <text class='Text__White Text__Right Text__Size--20'>Cadastrar</text>
        </a>

        <custom-button text='Entrar' color='White' @click='verify()'></custom-button>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from './Logo';
import Field from '../form/Field';
import CustomButton from '../form/Button';
import auth from '../../services/auth';

const toast = require('@/util/toast');

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      senha: '',
    };
  },
  components: {
    Logo,
    Field,
    CustomButton,
  },
  methods: {
    async verify() {
      this.$emit('loading', true);

      const { message } =
        await auth.login({
          email: this.email,
          senha: this.senha,
        });

      this.$emit('loading', false);

      toast(message);
    },
  },
};
</script>
