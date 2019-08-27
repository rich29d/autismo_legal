<template>
  <div>
    <logo></logo>

    <div class='Card Card__Blue'>
      <div class='Margin__Bottom--16'>
        <text class='Text__White Text__Bold Text__Size--24'>Cadastro</text>
      </div>

      <div class='Margin__Bottom--16'>
        <text class='Text__White Text__Size--24'>Dados do responsável</text>
      </div>

      <div class='Margin__Bottom--24'>
        <field
          label='Nome'
          typeField='text'
          placeholder='Digite seu seu nome'
          class='Margin__Bottom--16'
          v-model='responsible.name'
        />

        <field
          label='Email'
          typeField='text'
          placeholder='Digite seu email'
          class='Margin__Bottom--16'
          v-model='responsible.email'
        />

        <field
          label='Celular'
          typeField='text'
          placeholder='Digite seu nº celular'
          class='Margin__Bottom--16'
          v-model='responsible.phone'
        />

        <div class='Margin__Bottom--16'>
          <text class='Text__White Text__Size--24'>Dados da criança</text>
        </div>

        <div class='Card'>
          <field
            v-model='child.name'
            label='Nome da Criança'
            typeField='text'
            class='Margin__Bottom--16'
            borderColor='Blue'
            labelColor='Dark'
          />

          <field
            :options='optionsSelectSexo'
            :value='child.gender'
            v-model='child.gender'
            label='Sexo'
            typeField='select'
            class='Margin__Bottom--16'
            borderColor='Blue'
            labelColor='Dark'
          />

          <field
            v-model='child.birthday'
            label='Data de Nascimento'
            typeField='date'
            class='Margin__Bottom--16'
            borderColor='Blue'
            labelColor='Dark'
          />

          <field
            v-model='child.age'
            label='Idade'
            typeField='number'
            class='Margin__Bottom--16'
            borderColor='Blue'
            labelColor='Dark'
          />

          <field
            :options='optionsSelectRelacao'
            v-model='child.relationship'
            label='Relação do usuário para a criança'
            typeField='select'
            class='Margin__Bottom--16'
            borderColor='Blue'
            labelColor='Dark'
          />

          <div class='Flex Margin__Bottom--16 Text__Right'>
            <wxc-checkbox
              style='flex-direction: row-reverse; padding-left: 0;'
              :has-bottom-border='false'
              v-model='child.hasDiagnosis'
              title="Já tem diagnostico"
            ></wxc-checkbox>
          </div>

          <div class='Text__Right Block'>
            <custom-button
              text='Adicionar criança'
              color='Blue'
              @click='addChild()'
            ></custom-button>
          </div>
        </div>
      </div>

      <div class='Margin__Bottom--24' v-show="children.length > 0">
        <div
          class="Child Flex Margin__Bottom--16"
          v-for='(itemChild, index) in children'
          :key='itemChild.name + index'
        >
          <div class="Child__Icon Flex Flex__Middle">
            <img
              v-if="itemChild.gender === 'Feminino'"
              :src='require("@/assets/images/girl-face.svg")'
            >
            <img
              v-if="itemChild.gender === 'Masculino'"
              :src='require("@/assets/images/boy-face.svg")'
            >
          </div>

          <div class="Child__Text">
            <text class="Child__Text--name Text__Size--24 Text__White">{{ itemChild.name }}</text>

            <text
              class="Child__Text--ageBirthday Text__Blue"
            >{{ itemChild.age }} anos {{ birthdayFormated(itemChild.birthday) }}</text>
          </div>

          <div class="Flex Flex__Middle">
            <custom-button type='Close' color='White' @click='removeChild(index)'></custom-button>
          </div>
        </div>
      </div>

      <div class='Flex Flex__Middle Flex__SpaceBetween'>
        <a href='#/cadastrar'>
          <text class='Text__White Text__Right Text__Size--20'>Já sou cadastrado</text>
        </a>

        <custom-button text='Cadastrar' color='White' @click='cadastrar()'></custom-button>
      </div>
    </div>
  </div>
</template>

<script>
import { WxcCheckbox } from 'weex-ui';
import Logo from './Logo';
import Field from '../form/Field';
import CustomButton from '../form/Button';

const toast = require('@/util/toast');
const validator = require('@/util/validator');
const moment = require('moment');

export default {
  name: 'Cadastro',

  components: {
    Logo,
    Field,
    CustomButton,
    WxcCheckbox,
  },

  data() {
    return {
      email: '',
      senha: '',
      optionsSelectSexo: [
        {
          value: 1,
          title: 'Feminino',
        },
        {
          value: 2,
          title: 'Masculino',
        },
      ],
      optionsSelectRelacao: [
        {
          value: 0,
          title: 'Pai',
        },
        {
          value: 1,
          title: 'Mãe',
        },
        {
          value: 2,
          title: 'Responsável legal',
        },
      ],
      children: [],
      child: {
        name: '',
        gender: '',
        age: '',
        birthday: '',
        relationship: '',
        hasDiagnosis: null,
      },
      responsible: {
        name: '',
        email: '',
        phone: '',
      },
    };
  },

  methods: {
    invalidChild() {
      if (this.child.name === '') {
        toast('Preencha o nome da criança!');
        return true;
      }

      if (this.child.gender === '') {
        toast('Preencha o sexo da criança!');
        return true;
      }

      if (!validator.date(this.child.birthday)) {
        toast('Data de nascimento inválida.');
        return true;
      }

      if (!validator.number(this.child.age)) {
        toast('Idade inválida, insira apenas números!');
        return true;
      }

      if (this.child.relationship === '') {
        toast('Preencha a relação do usuário para a criança!');
        return true;
      }

      return false;
    },

    invalidResponsible() {
      if (this.responsible.name === '') {
        toast('Preencha o nome do responsável!');
        return true;
      }

      if (!validator.email(this.responsible.email)) {
        toast('Insira um email valido!');
        return true;
      }

      if (this.responsible.phone === '') {
        toast('Preencha o telefone do responsável!');
        return true;
      }

      if (this.children.length === 0) {
        toast('Insira uma criança!');
        return true;
      }

      return false;
    },

    addChild() {
      if (this.invalidChild()) {
        return;
      }

      const newChild = Object.assign({}, this.child);
      this.children.push(newChild);
    },

    removeChild(index) {
      this.children.splice(index, 1);
    },

    async cadastrar() {
      if (this.invalidResponsible()) {
        return;
      }

      this.$emit('loading', true);
      await new Promise(resolve => setTimeout(resolve, 800));
      this.$emit('loading', false);

      toast('cadastrado');
    },

    birthdayFormated(date) {
      return moment(date).format('DD/MM/YYYY');
    },
  },
};
</script>

<style lang="stylus">
  .Child
    background #6dc6f3
    border-radius 5px
    padding 20px

  .Child__Icon
    figure
      padding 25px
      margin-right 15px

  .Child__Text
    max-width 150px
</style>
