<template>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Сумма</th>
        <th>Дата</th>
        <th>Категория</th>
        <th>Тип</th>
        <th>Открыть</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(record, idx) of records" :key="record.id">
        <td>{{idx + 1}}</td>
        <td>{{currencyFilter(record.amount)}}</td>
        <td>{{Newdate(record.date)}}</td>
        <td>{{record.categoryName}}</td>
        <td>
          <span class="white-text badge " :class="[record.typeClass]">{{record.typeText}}</span>
        </td>
        <td>
          <button class="btn-small btn" @click="$router.push('/detail/' + record.id)">
            <i class="material-icons">open_in_new</i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
    props:{
      records:{
        required: true,
        type: Array
      }
    },
    methods:{
      currencyFilter(value,currency = 'UAH'){
      return new Intl.NumberFormat('ua-UA',{
        style:'currency',
        currency
      }).format(value)
    },
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
    },
    }
}
</script>