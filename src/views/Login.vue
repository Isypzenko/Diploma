<template>
  <form class="card auth-card">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{ invalid: this.v$.email.$error }"
        />
        <label for="email">Email</label>
        <small class="helper-text invalid" v-if="this.v$.email.$error"
          >Введите Email</small
        >
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model.trim="password"
          :class="{ invalid: this.v$.password.$error }"
        />
        <label for="password">Пароль</label>
        <small class="helper-text invalid" v-if="this.v$.password.$error"
          >Введите пароль или введите пароль не менее
          {{ this.v$.password.minLength.$params.min }} символов. Сейчас он
          {{ password.length }}</small
        >
      </div>
    </div>
    <div class="card-action">
      <div>
        <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
          @click.prevent="submitForm"
        >
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <router-link to="/register">Зарегистрироваться</router-link>
      </p>
    </div>
  </form>
</template>

<script>

import useValidate from "@vuelidate/core";
import message from '@/utilis/message.js'
import { required, email, minLength } from "@vuelidate/validators";
export default {
  name: "login",
  setup() {
    return { v$: useValidate() };
  },
  data: () => ({
    email: "",
    password: "",

  }),
  validations: {
    email: { required, email },
    password: { required, minLength: minLength(5) },
  },
  mounted() {
    if(message[this.$route.query.message]){
      this.$message(message[this.$route.query.message])
    }
  },
  methods: {
    async submitForm() {
      this.v$.$touch();
      if (this.v$.$error) return;

      const formData = {
        email: this.email,
        password: this.password,
      };
      try{
        await this.$store.dispatch('login',formData)
        this.$router.push("/");
      }
      catch(e){
        
      }
      
      

      
    },
  },
};
</script>