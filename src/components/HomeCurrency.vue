<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">Курс валют</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Валюта</th>
              <th>Курс</th>
              <th>Дата</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="cur in currencies" :key="cur">
              <td>{{cur}}</td>
              <td>{{rates[cur].toFixed(2)}}</td>
              <td>{{date}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:['rates','date'],
  date: () =>({
    
  }),
  beforeMount(){
    this.currencies = ['UAH','USD','EUR']
  },
  methods:{
    // Newdate(){
    // var dd = this.date.getDate();
    // if (dd < 10) dd = '0' + dd;

    // var mm = this.date.getMonth() + 1;
    // if (mm < 10) mm = '0' + mm;

    // var yy = this.date.getFullYear() % 100;
    // if (yy < 10) yy = '0' + yy;

    // var ss = this.date.getSeconds()
    // if (ss < 10) ss = '0' + ss;

    // var hh = this.date.getHours()
    // if (hh < 10) hh = '0' + hh;

    // var mn = this.date.getMinutes()
    // if (mn < 10) mn = '0' + mn;


    // return dd + '.' + mm + '.' + yy + " год " + ","+ hh  +":" + mn+ ":"+ ss;
    // },
  }
}
</script>