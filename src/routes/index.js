import Msite from "pages/Msite/Msite.vue";
import Order from "pages/Order/Order.vue";
import Profile from "pages/Profile/Profile.vue";
import Search from "pages/Search/Search.vue";
import Login from "pages/Login/Login.vue";
import UserDetail from "pages/UserDetail/UserDetail.vue";
import Defined from "pages/Defined/Defined.vue";

export default [
    {path:"/Msite",component:Msite,meta:{showFooter:true}},
    {path:"/Order",component:Order,meta:{showFooter:true}},
    {path:"/Profile",component:Profile,meta:{showFooter:true}},
    {path:"/Search",component:Search,meta:{showFooter:true}},
    {path:"/Login",component:Login,meta:{showFooter:false}},
    {path:"/UserDetail",component:UserDetail,meta:{showFooter:false}},
    {
        path:"/Defined",
        component:Defined,
        meta:{showFooter:false},
        //路由独享级别的钩子
        beforeEnter: (to, from, next) => {
            console.log("Defined beforeEnter 路由独享")
            next()
        }
    },
    {path:"/",redirect:"/Msite"}
]