<template>
  <div class='Margin__Left--2 Margin__Right--2'>
    <logo></logo>

    <div class='Card Card__Blue'>
      <div class='Margin__Bottom--1'>
        <text class='Text__White Text__Bold Text__Size--4'>Login</text>
      </div>

      <div class='Margin__Bottom--2'>
        <field
          label='Email'
          typeField='text'
          placeholder='Digite seu email'
          class='Margin__Bottom--1'
          v-model='email'
        />

        <field
          label='Senha'
          typeField='password'
          placeholder='Digite sua senha'
          class='Margin__Bottom--1'
          v-model='senha'
        />

        <router-link :to="{ path: 'esqueci-senha'}">
          <text class='Text__White Text__Right Text__Size--3'>Esqueci minha senha</text>
        </router-link>
      </div>

      <div class='Flex Flex__Middle Flex__SpaceBetween '>
        <router-link :to="{ path: 'cadastrar'}">
          <text class='Text__White Text__Right Text__Size--3'>Cadastrar</text>
        </router-link>

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
      attempts: 5,
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

      const { success, message } =
        await auth.login({
          email: this.email,
          senha: this.senha,
        });

      this.$emit('loading', false);

      if (success) {
        location.assign('#/publicacoes');
        return
      }

      if (message) {
        toast(message);
        return
      }

      if (attempts === 0) {
        toast('Falha ao fazer login.');
        return
      }
      
      this.attempts--;
      this.verify();
    },
  },
};
</script>
