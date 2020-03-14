<template>
  <div id="app">
    {{test}}
    <router-view></router-view>
  </div>
</template>

<script>
  import {mapState} from "vuex";
  export default {
    name: 'App',
    computed:{
        ...mapState(["test"])
    },
    async mounted(){
         await this.$http.contact.getContactList();
         await this.$http.github.getUsers({q:"betterDamu"})
    }
  }
</script>

<style scoped lang="stylus">

</style>
