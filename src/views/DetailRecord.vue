<template>
  <div>
    <Loader v-if="loading"></Loader>
        <div v-else-if="record">
          <div>
            <div class="breadcrumb-wrap">
              <router-link to="/history" class="breadcrumb">История</router-link>
              <a @click.prevent class="breadcrumb">{{record.type === 'income' ? 'Доход' : 'Расход' }}</a>
            </div>
            <div class="row">
              <div class="col s12 m6">
                <div class="card " :class="{'red':record.type === 'outcome','green': record.type === 'income'}">
                  <div class="card-content white-text">
                    <p>Описание: {{record.description}}</p>
                    <p>Сумма:{{record.amount + ' грн'}}</p>
                    <p>Категория:{{record.categoryName}}</p>

                    <small>{{Newdate(record.date)}}</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p class="center" v-else>Запись с id ={{$route.params.id}} не найдена</p>
    <div class="fixed-action-btn">
      <a class="btn-floating btn-large blue" href="#">
        <i class="large material-icons">add</i>
      </a>
    </div>
  </div>
</template>

<script>
import Loader from '@/components/app/Loader.vue'
export default {
  name:'detail',
  components:{
    Loader
  },
  data: () => ({
    record:null,
    loading: true
  }),
  async mounted(){
    const id = this.$route.params.id
    const record = await this.$store.dispatch('fetchRecordById',id)
    const category = await this.$store.dispatch('fetchCategoryById',record.categoryId)
    this.record={
      ...record,
      categoryName:category.title
    }
    this.loading = false
  },
  methods:{
  Newdate(data){
    let date = new Date(data)
    var dd = date.getDate();
    if (dd < 10) dd = '0' + dd;

    var mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;

    var yy = date.getFullYear() % 100;
    if (yy < 10) yy = '0' + yy;

    var ss = date.getSeconds()
    if (ss < 10) ss = '0' + ss;

    var hh = date.getHours()
    if (hh < 10) hh = '0' + hh;

    var mn = date.getMinutes()
    if (mn < 10) mn = '0' + mn;


    return dd + '.' + mm + '.' + yy + " год " + ","+ hh  +":" + mn+ ":"+ ss;
    },}
}
</script>