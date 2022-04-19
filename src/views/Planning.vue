<template>
  <div>


    <main class="app-content">
      <div class="app-page">
        <div>
          <div class="page-title">
            <h3>Планирование</h3>
            <h4>{{currencyFilter(info.bill) }}</h4>
          </div>
          <Loader v-if="loading"></Loader>
          <p v-else-if="!categories.length" class='center'>Категорий пока нет. <router-link to="/categories">Добавить новую категорию</router-link></p>
          <section v-else>
            <div v-for="cat of categories" :key='cat.id'>
              <p >
                <strong>{{cat.title}}</strong>
                {{currencyFilter(cat.spend)}} из {{currencyFilter(cat.limit)}}
              </p>
              <div class="progress" v-tooltip="currencyFilter(cat.tooltip)">
                <div class="determinate " :class="[cat.progressColor]" :style="{width:cat.progressPercent + '%'}"></div>
              </div>
            </div>
          </section>
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
import {mapGetters} from 'vuex'
import Loader from '@/components/app/Loader.vue'
export default {
  name:'planning',
  data:() => ({
    loading: true,
    categories:[]
  }),
  components:{
    Loader
  },
  async mounted(){
    const records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')

    this.categories = categories.map(cat => {
      const spend = records.filter(r => r.categoryId === cat.id).filter(r => r.type === 'outcome').reduce((total, record) => {
        return total += +record.amount
      }, 0)
      const percent = 100 * spend / cat.limit
      const progressPercent = percent > 100 ? 100 : percent
      const progressColor = percent < 60 ? 'green' : percent < 100 ? 'yellow': 'red'
      const tooltipValue = cat.limit - spend
      const tooltip = `${tooltipValue < 0 ? 'Превышение на' : 'Осталось'} ${Math.abs(tooltipValue)}`
      return {
        ...cat,
        progressPercent,
        progressColor,
        spend,
        tooltip
      }
    })
    this.loading = false
  },
  computed:{
    ...mapGetters(['info'])
  },
  methods:{
    currencyFilter(value){
      return value + " UAH"
    }
  }
}
</script>