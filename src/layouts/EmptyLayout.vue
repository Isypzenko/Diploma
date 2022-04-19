<template>
  <div class="grey darken-1 empty-layout">
    <router-view></router-view>
  </div>
</template>

<script>
import message from '@/utilis/message.js'
export default {
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
}
</script>