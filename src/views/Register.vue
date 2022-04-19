<template>
  <form class="card auth-card">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{invalid: this.v$.email.$error}"
        />
        <label for="email">Email</label>
        <small class="helper-text invalid" v-if="this.v$.email.$error" >Введите Email</small>
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model.trim="password"
          :class="{invalid: this.v$.password.$error}"
        />
        <label for="password">Пароль</label>
        <small class="helper-text invalid" v-if="this.v$.password.$error">Введите пароль или введите пароль не менее {{this.v$.password.minLength.$params.min}} символов. Сейчас он {{password.length}}</small>
      </div>
      <div class="input-field">
        <input id="name" type="text" v-model.trim="name" :class="{invalid: this.v$.name.$error}" />
        <label for="name">Имя</label>
        <small class="helper-text invalid" v-if="this.v$.name.$error">Введите имя</small>
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="agree" />
          <span>С правилами согласен</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit" @click.prevent="submitRegister">
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login">Войти!</router-link>
      </p>
    </div>
  </form>
</template>


<script>
import useValidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
export default {
    setup() {
    return { v$: useValidate() };
  },
  name:'register',
  data: () => ({
    email: "",
    password: "",
    name:'',
    agree:false
  }),
  validations: {
    email: { required,email },
    password: { required, minLength: minLength(5) },
    name:{required},
    agree:{checked: v => v}
  },
  methods: {
    async submitRegister() {
      this.v$.$touch();
      if (this.v$.$error) return;
    
    const formData = {
      email:this.email,
      password: this.password,
      name:this.name
    }
    try{
      await this.$store.dispatch('register',formData)
      this.$router.push("/");
    }
    catch(e){
      
    }
    
      
    },
  },
}
</script>