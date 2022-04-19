<template>
  <div>
        <div>
          <div class="page-title">
            <h3>История записей</h3>
          </div>

          <div class="history-chart">
            <canvas ref='canvas'></canvas>
          </div>
          <Loader v-if="loading"></Loader>
          <p class='center' v-else-if="!records.length">записей пока нет</p>
          <section v-else>
            <History-table :records="items"></History-table>
            <v-pagination
                v-model="page"
                :pages="pageCount"
                :range-size="3"
                active-color="#DCEDFF"
                @update:modelValue="updateHandler"
              />
          </section>
        </div>
    <div class="fixed-action-btn">
      <a class="btn-floating btn-large blue" href="#">
        <i class="large material-icons">add</i>
      </a>
    </div>
  </div>
</template>

<script>
import Loader from '../components/app/Loader.vue'
import HistoryTable from '../components/HistoryTable.vue'
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import paginationMixin from '@/mixins/pagination.mixin.js'
import {Pie} from 'vue-chartjs'



export default {
  name:'history',
  extends: Pie,
  mixins:[paginationMixin],
  data: () =>({
    loading:true,
    records:[],
    page:null
  }),
  async mounted(){
    this.records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')
  console.log(categories)
    this.setup(categories)
    this.renderChart({labels: categories.map(c => c.title),
        datasets: [{
            label: 'Расходы по категориям',
            data: categories.map(c => {
              return this.records.reduce((total,r) => {
                if(r.categoryId === c.id && r.type === 'outcome'){
                  total += +r.amount
                }
                return total
              },0)
            }),
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]})
    this.loading = false
  },
  methods:{
    setup(categories){
      this.setupPagination(this.records.map(record => {
      return{
        ...record,
        categoryName: categories.find(c => c.id === record.categoryId).title,
        typeClass: record.type === 'income' ? 'green': 'red',
        typeText: record.type === 'income' ? 'Доход': 'Расход',
      }
    }))
    
    }
  },
  components:{
    HistoryTable, Loader,VPagination
  },
}
</script>