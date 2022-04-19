<template>
  <div>


    
      <div class="app-page">
        <div>
          <div class="page-title">
            <h3>Новая запись</h3>
          </div>
          <Loader v-if="loading"></Loader>
          <p v-else-if="!categories.length" class='center'>Категорий пока нет. <router-link to="/categories">Добавить новую категорию</router-link></p>
          <form v-else class="form">
            <div class="input-field">
              <select ref="select" v-model="category">
                <option v-for="c in categories" :key='c.id' :value="c.id">
                  {{c.title}}
                </option>
              </select>
              <label>Выберите категорию</label>
            </div>

            <p>
              <label>
                <input
                  class="with-gap"
                  name="type"
                  type="radio"
                  value="income"
                  v-model='type'
                />
                <span>Доход</span>
              </label>
            </p>

            <p>
              <label>
                <input
                  class="with-gap"
                  name="type"
                  type="radio"
                  value="outcome"
                  v-model='type'
                />
                <span>Расход</span>
              </label>
            </p>

            <div class="input-field">
              <input id="amount" type="number" v-model.number="amount" :class="{ invalid: v$.amount.$error }" />
              <label for="amount">Сумма</label>
              <span class="helper-text invalid" v-if="v$.amount.$error"
            >Минимальная величина:{{ this.v$.amount.minValue.$params.min }}</span
          >
            </div>

            <div class="input-field">
              <input id="description" type="text" v-model="description" :class="{ invalid: v$.description.$error }" />
              <label for="description">Описание</label>
              <span class="helper-text invalid" v-if="v$.description.$error"
            >Введите описание </span
          >
            </div>

            <button class="btn waves-effect waves-light" type="submit" @click.prevent="handleSubmit">
              Создать
              <i class="material-icons right">send</i>
            </button>
          </form>

        </div>
      </div>
    

    <div class="fixed-action-btn">
      <a class="btn-floating btn-large blue" href="#">
        <i class="large material-icons">add</i>
      </a>
    </div>
  </div>
</template>

<script>
import useValidate from "@vuelidate/core";
import { required, minValue } from "@vuelidate/validators";
import Loader from "@/components/app/Loader.vue";
import {mapGetters} from 'vuex'

export default {
    setup() {
    return { v$: useValidate() };
  },
  name:'record',
  data:() =>({
    loading: true,
    categories: [],
    select: null,
    category: null,
    type: 'outcome',
    amount: 1,
    description: ''
  }),
  components:{
    Loader
  },
  validations: {
    amount: { minValue:minValue(1) },
    description: { required },
  },
  async mounted(){
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
    if(this.categories.length){
      this.category = this.categories[0].id
    }
    setTimeout(() =>{
      this.select = M.FormSelect.init(this.$refs.select);
      M.updateTextFields()
    },0)
    
  },
  computed:{
    ...mapGetters(['info']),
    canCreateRecord(){
      if(this.type == 'income'){
        return true
      }
      return this.info.bill >= this.amount
    }
  },
  methods:{
    async handleSubmit(){
      this.v$.$touch();
      if (this.v$.$error) return;
      if(this.canCreateRecord){
        try{
          await this.$store.dispatch('createRecord',{
          categoryId: this.category,
          amount: this.amount,
          description:this.description,
          type: this.type,
          date: new Date().toJSON()
        })
        const bill = this.type === 'income' ? this.info.bill + this.amount : this.info.bill - this.amount
        await this.$store.dispatch('updateInfo',{bill})
        this.$message('Запись успешно создана')
        this.v$.$reset()
        this.amount = 1
        this.description = ''
                }catch(e){

        }
        
      }else{
        this.$message(`Недостаточно средств на счете (${this.amount - this.info.bill})`)
      
      }
    }
  },
  unmounted(){
    if(this.select && this.select.destroy){
      this.select.destroy()
    }
  }
}
</script>