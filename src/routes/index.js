import Msite from "pages/Msite/Msite.vue";
import Order from "pages/Order/Order.vue";
import Profile from "pages/Profile/Profile.vue";
import Search from "pages/Search/Search.vue";
import Login from "pages/Login/Login.vue";
export default [
    {path:"/Msite",component:Msite,meta:{showFooter:true}},
    {path:"/Order",component:Order,meta:{showFooter:true}},
    {path:"/Profile",component:Profile,meta:{showFooter:true}},
    {path:"/Search",component:Search,meta:{showFooter:true}},
    {path:"/Login",component:Login,meta:{showFooter:false}},
    {path:"/",redirect:"/Msite"}
]