<template>
  <div>
    <logo></logo>

    <div class='Card Card__Blue'>
      <div class='Margin__Bottom--1'>
        <text class='Text__White Text__Bold Text__Size--4'>Cadastro</text>
      </div>

      <div class='Margin__Bottom--2'>
        <text class='Text__White Text__Size--3'>Dados do responsável</text>
      </div>

      <div class='Margin__Bottom--3'>
        <field
          label='Nome'
          typeField='text'
          placeholder='Digite seu seu nome'
          class='Margin__Bottom--2'
          v-model='responsible.nome'
        />

        <field
          label='Email'
          typeField='text'
          placeholder='Digite seu email'
          class='Margin__Bottom--2'
          v-model='responsible.email'
        />

        <field
          label='Celular'
          typeField='text'
          placeholder='Digite seu nº celular'
          class='Margin__Bottom--2'
          v-model='responsible.celular'
        />

        <field
          label='Senha (8 caracteres)'
          typeField='password'
          placeholder='Digite a senha'
          class='Margin__Bottom--2'
          v-model='responsible.senha'
        />

        <field
          label='Repita a senha'
          typeField='password'
          placeholder='Repite a senha'
          class='Margin__Bottom--2'
          v-model='responsible.repeatSenha'
        />

        <div class='Margin__Bottom--1'>
          <text class='Text__White Text__Size--3'>Dados da criança</text>
        </div>

        <div class='Card'>
          <field
            v-model='child.name'
            label='Nome da Criança'
            typeField='text'
            class='Margin__Bottom--2'
            borderColor='Blue'
            labelColor='Dark'
          />

          <field
            :options='optionsSelectSexo'
            :value='child.gender'
            v-model='child.gender'
            label='Sexo'
            typeField='select'
            class='Margin__Bottom--2'
            borderColor='Blue'
            labelColor='Dark'
          />

          <div class='Margin__Bottom--2 Flex Flex__SpaceBetween Flex__Wrap'>
            <text class='Text__Size--3 w12'>Data de nascimento</text>

            <field
              :options='calendar.days'
              v-model='child.birthday.day'
              placeholder='Dia'
              typeField='select'
              class='Width--4'
              borderColor='Blue'
              labelColor='Dark'
            />

            <field
              :options='calendar.months'
              v-model='child.birthday.month'
              placeholder='Mês'
              typeField='select'
              class='Width--4'
              borderColor='Blue'
              labelColor='Dark'
            />

            <field
              :options='calendar.years'
              v-model='child.birthday.year'
              placeholder='Ano'
              typeField='select'
              class='Width--4'
              borderColor='Blue'
              labelColor='Dark'
            />
          </div>

          <field
            v-model='child.age'
            label='Idade (anos)'
            typeField='number'
            class='Margin__Bottom--2'
            borderColor='Blue'
            labelColor='Dark'
          />

          <field
            :options='optionsSelectRelacao'
            v-model='child.relationship'
            label='Relação do usuário para a criança'
            typeField='select'
            class='Margin__Bottom--2'
            borderColor='Blue'
            labelColor='Dark'
          />

          <div class='Flex Margin__Bottom--2 Text__Right'>
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

      <div class='Margin__Bottom--3' v-show="children.length > 0">
        <div
          class="Child Flex Flex__Middle Flex__SpaceBetween"
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
            <text class="Child__Text--name Text__Size--3 Text__White">{{ itemChild.name }}</text>

            <text
              class="Child__Text--ageBirthday Text__Size--2 Text__Blue"
            >{{ itemChild.age }} anos {{ birthdayFormated(itemChild.birthday) }}</text>
          </div>

          <div class="Flex Flex__Middle">
            <custom-button type='Close' color='White' @click='removeChild(index)'></custom-button>
          </div>
        </div>
      </div>

      <div class='Flex Flex__Middle Flex__SpaceBetween'>
        <a href='#/'>
          <text class='Text__White Text__Right Text__Size--3'>Login</text>
        </a>

        <custom-button text='Cadastrar' color='White' @click='cadastrar()'></custom-button>
      </div>
    </div>
  </div>
</template>

<script>
import { WxcCheckbox } from 'weex-ui';
import User from '@/services/user';
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
      calendar: {
        days: this.listNumbers(31),
        months: this.listNumbers(12),
        years: this.listNumbers(100, moment().year() - 99),
      },
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
        birthday: {
          day: 0,
          month: 0,
          year: 0,
        },
        relationship: '',
        hasDiagnosis: null,
      },
      responsible: {
        nome: '',
        email: '',
        celular: '',
        senha: '',
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
      if (this.responsible.nome === '') {
        toast('Preencha o nome do responsável!');
        return true;
      }

      if (!validator.email(this.responsible.email)) {
        toast('Insira um email valido!');
        return true;
      }

      if (this.responsible.celular === '') {
        toast('Preencha o telefone do responsável!');
        return true;
      }

      if (this.responsible.senha === '') {
        toast('Preencha a senha!');
        return true;
      }

      if (this.responsible.senha.length < 8) {
        toast('Digite uma senha de no mínimo 8 caracteres!');
        return true;
      }

      if (this.responsible.repeatSenha !== this.responsible.senha) {
        toast('Senhas não conferem.');
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
      await User.register(this.responsible);
      this.$emit('loading', false);

      toast('cadastrado');
    },

    birthdayFormated(date) {
      return moment(date).format('DD/MM/YYYY');
    },

    listNumbers(count, initNumber = 1) {
      return Array(count).fill('').map((el, i) => ({
        value: i + initNumber,
        title: i + initNumber,
      })).reverse();
    },
  },
};
</script>

<style lang="stylus">
  .Child
    background #6dc6f3
    border-radius 8px
    padding 4vw

  .Child__Icon
    figure
      padding 6vw
      margin-right 15px

  .Child__Text
    max-width 25vw
</style>
