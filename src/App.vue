<template>
  <div id="app">
    <router-view></router-view>
    <FooterGuide v-show="$route.meta.showFooter"></FooterGuide>
  </div>
</template>

<script>
  import {mapState,mapActions} from "vuex";
  import FooterGuide from "components/FooterGuide/FooterGuide.vue"
  import {AUTOLOGIN} from "@/store/mutation_types";
  export default {
    name: 'App',
    computed:{
        ...mapState(["test"])
    },
    components:{
        FooterGuide,
    },
    methods:{
        ...mapActions([AUTOLOGIN])
    },
    created(){
        //登录过一次后;只要token没有失效 以后都自动登录
        // this[AUTOLOGIN]();
    }
  }
</script>

<style scoped lang="stylus">
  #app
    width 100%
    height 100%
    overflow hidden
</style>
