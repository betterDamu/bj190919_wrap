<template>
    <div style="text-align: center">
        <van-button type="primary" style="margin-top: 150px"
                    @click="exit">退出登录</van-button>
    </div>
</template>

<script>
    import { Button } from 'vant';
    import {mapActions} from "vuex";
    import {RESTUSER} from "@/store/mutation_types";
    import router from "@/router";
    export default {
        name: "UserDetail",
        components:{
            [Button.name]:Button
        },
        methods:{
            ...mapActions([RESTUSER]),
            exit(){
                // //将用户信息清空 vuex
                // this[RESTUSER]()
                // //清除loacl中的token
                // localStorage.removeItem("ele-token")
                // //跳回登录页
                // router.replace("/Login")

                router.push("/Defined")
            }
        },
        beforeRouteLeave (to, from, next) {
            console.log("UserDetail组件内部 的 beforeRouteLeave")
            next()
        }
    }
</script>

<style scoped>

</style>