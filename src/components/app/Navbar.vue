<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click.prevent="$emit('took')">
          <i class="material-icons black-text" >dehaze</i>
        </a>
        <span class="black-text">{{Newdate}}</span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a
            class="dropdown-trigger black-text"
            href="#"
            data-target="dropdown"
            ref="dropdown"
          >
            {{name}}
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id="dropdown" class="dropdown-content">
            <li>
              <router-link to='/profile' class="black-text">
                <i class="material-icons">account_circle</i>Профиль
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a href="#" class="black-text" @click.prevent="logout">
                <i class="material-icons">assignment_return</i>Выйти
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>


<script>
export default {
  data: () => ({
    date:new Date("2014-0-30"),
    interval: null,
    dropdown:null
  }),
  methods:{
    async logout(){
      await this.$store.dispatch('logout')
      this.$router.push('/login?message=logout')
    }
  },
  computed:{
    Newdate(){
    var dd = this.date.getDate();
    if (dd < 10) dd = '0' + dd;

    var mm = this.date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;

    var yy = this.date.getFullYear() % 100;
    if (yy < 10) yy = '0' + yy;

    var ss = this.date.getSeconds()
    if (ss < 10) ss = '0' + ss;

    var hh = this.date.getHours()
    if (hh < 10) hh = '0' + hh;

    var mn = this.date.getMinutes()
    if (mn < 10) mn = '0' + mn;


    return dd + '.' + mm + '.' + yy + " год " + ","+ hh  +":" + mn+ ":"+ ss;
    },
    name(){
      return this.$store.getters.info.name
    }
  },
  mounted(){
    this.interval=setInterval(() =>{
      this.date = new Date
    }, 1000)
    this.dropdown = M.Dropdown.init(this.$refs.dropdown,{
      constrainWidth:false
    })
  },
  beforeUnmount(){
    clearInterval(this.interval)
    if(this.dropdown && this.dropdown.destroy){
      this.dropdown.destroy()
    }
  }
}
</script>