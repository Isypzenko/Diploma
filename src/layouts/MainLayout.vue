<template>
  <div>
    <Loader class="loader" v-if="loading"></Loader>
    <div v-else class="app-main-layout">
      <Navbar @took="isOpen = !isOpen"></Navbar>
      <Sidebar v-bind:isOpen="isOpen"></Sidebar>

      <main class="app-content" :class="{ full: !isOpen }">
        <div class="app-page">
          <router-view></router-view>
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link class="btn-floating btn-large blue" to="/record" v-tooltip="'Создать новую запись'">
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>


<script>
import Navbar from "@/components/app/Navbar";
import Sidebar from "@/components/app/Sidebar";
import Loader from "@/components/app/Loader";
import message from '@/utilis/message.js'

export default {
  name: "main-layout",
  data: () => ({
    isOpen: true,
    loading: true,
  }),
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch("fetchInfo");
    }
    this.loading = false;
  },
  methods: {},
  components: {
    Navbar,
    Sidebar,
    Loader
  },
  computed:{
    error(){
      return this.$store.getters.error
    }
  },
  watch:{
    error(fbError){
      this.$message(message[fbError.code] || 'Что-то пошло не так')
    }
  }
};
</script>

<style scoped>
  .loader{
    display: block;
    position: fixed;
    top: 50%;
    left: 50%;
  }
</style>