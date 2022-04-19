<template>
  <div>


    <main class="app-content">
      <div class="app-page">
        <div>
          <div class="page-title">
            <h3>Профиль</h3>
          </div>

          <form class="form input-field">
            <div class="input-field">
              <input id="description" class="input-field" type="text" v-model="name" :class="{ invalid: this?.v$?.name?.$error }"    />
              <label for="description">Имя</label>
              <small class="helper-text invalid" v-if="this?.v$?.name?.$error"
          >Введите имя</small
        >
            </div>
            <div class="switch">
            <label>
              English
              <input type="checkbox">
              <span class="lever"></span>
              Русский
            </label>
            </div>

            <button class="btn waves-effect waves-light" type="submit" @click.prevent="submitForm">
              Обновить
              <i class="material-icons right">send</i>
            </button>
          </form>
        </div>
      </div>
    </main>

    <div class="fixed-action-btn">
      <a class="btn-floating btn-large blue" href="#">
        <i class="large material-icons">add</i>
      </a>
    </div>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import {mapGetters, mapActions} from 'vuex'
export default {
  data: () => ({
    name:'', 
  }),
  setup() {
    return { v$: useVuelidate() };
  },
  validations: {
      named: {required}
  },
    mounted(){
    this.name = this.info.name
    setTimeout(() =>{
      M.updateTextFields()
    })
    
  },
  computed:{
    ...mapGetters(['info'])
  },
  methods:{
    ...mapActions(['updateInfo']),
      async submitForm() {
        console.log(this.name)
      this.v$.$touch();
      if (this.v$.$error) return;
      try{
        
        await this.updateInfo({
          name: this.name
        })
      }
      catch(e){
        
      }
    },
  }
}
</script>

<style scoped>
  .switch{
    margin-bottom: 2rem;
  }
</style>