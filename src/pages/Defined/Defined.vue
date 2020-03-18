<template>
    <div style="font-size: 30px">
        Defined
    </div>
</template>

<script>


    // 导航被触发。
    // 在失活的组件里调用离开守卫。
    // 调用全局的 beforeEach 守卫。
    // 在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)。
    // 在路由配置里调用 beforeEnter。
    // 解析异步路由组件。
    // 在被激活的组件里调用 beforeRouteEnter。
    // 调用全局的 beforeResolve 守卫 (2.5+)。
    // 导航被确认。
    // 调用全局的 afterEach 钩子。
    // 触发 DOM 更新。



    export default {
        name: "Defined",
        beforeRouteEnter (to, from, next) {
            // 在渲染该组件的对应路由被 confirm 前调用
            // 不！能！获取组件实例 `this`
            // 因为当守卫执行前，组件实例还没被创建
            console.log("Defined组件 beforeRouteEnter",this)
            next((vm)=>{
               console.log(vm,"-----")
            })
        },
        //这个钩子是专门为动态路由组件设计的 当前我们这个普通路由组件被加载时 不会调用
        beforeRouteUpdate (to, from, next) {
            // 在当前路由改变，但是该组件被复用时调用
            // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
            // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
            // 可以访问组件实例 `this`
            console.log("Defined组件 beforeRouteUpdate")
            next()
        },
        beforeRouteLeave (to, from, next) {
            // 导航离开该组件的对应路由时调用
            // 可以访问组件实例 `this`
            console.log("Defined组件 beforeRouteLeave")
            next()
        }
    }
</script>

<style scoped>

</style>