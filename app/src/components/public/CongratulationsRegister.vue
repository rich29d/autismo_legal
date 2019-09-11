<template>
  <div>
    <logo></logo>

    <div class='Card Card__Blue'>
      <div class='Margin__Bottom--1'>
        <text class='Text__White Text__Bold Text__Size--4'>Parabéns</text>
      </div>

      <div class='Margin__Bottom--2'>
        <text class='Text__White Text__Size--3'>Seu cadastro foi realizado com sucesso.</text>
      </div>

      <div class='Text__Right Block'>
            <custom-button
              text='Login'
              color='White'
              @click='goToLogin'
            ></custom-button>
          </div>
    </div>
  </div>
</template>

<script>
import Logo from './Logo';
import CustomButton from '../form/Button';

export default {
  name: 'CadastroSucesso',

  components: {
    Logo,
    CustomButton,
  },

  methods: {
    goToLogin() {
      location.assign('#/');
    },
  },
};
</script>
