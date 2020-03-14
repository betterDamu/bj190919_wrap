import Msite from "pages/Msite/Msite.vue";
import Order from "pages/Order/Order.vue";
import Profile from "pages/Profile/Profile.vue";
import Search from "pages/Search/Search.vue";
export default [
    {path:"/Msite",component:Msite},
    {path:"/Order",component:Order},
    {path:"/Profile",component:Profile},
    {path:"/Search",component:Search},
    {path:"/",redirect:"/Msite"}
]