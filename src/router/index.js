import Vue from "vue";
import VueRouter from "vue-router";

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


Vue.use(VueRouter)
import routes from "@/routes"
export default new VueRouter({
    routes
})