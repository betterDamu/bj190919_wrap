<template>
  <div id="app">
    <router-view></router-view>
    <FooterGuide></FooterGuide>
  </div>
</template>

<script>
  import {mapState} from "vuex";
  import FooterGuide from "components/FooterGuide/FooterGuide.vue"
  export default {
    name: 'App',
    computed:{
        ...mapState(["test"])
    },
    components:{
        FooterGuide,
    }
  }
</script>

<style scoped lang="stylus">

</style>
