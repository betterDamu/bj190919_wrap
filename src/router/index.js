import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter)
import routes from "@/routes"

//vue-router内部的问题 我们在使用编程式导航 由于promise没有被注册回调 vue-router会选择报错
const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}
VueRouter.prototype.replace = function replace(location, onResolve, onReject) {
    if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
    return originalReplace.call(this, location).catch(err => err)
}


const router = new VueRouter({
    routes
})


//全局的前置守卫
router.beforeEach((to, from, next) => {
    // to 要去哪一个路由组件
    // from 当前在哪一个路由组件上
    //只有next 被调用了 才能通行
    console.log("全局的前置钩子 beforeEach")
    next() // 像express中中间件
})

//全局解析钩子
router.beforeResolve((to, from, next)=>{
    console.log("全局的解析钩子 beforeResolve")
    next() // 像express中中间件
})

//全局的后置钩子
router.afterEach((to, from) => {
    console.log("全局的后置钩子 afterEach")
})



export default router