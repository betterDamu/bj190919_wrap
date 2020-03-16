import {GETADDRRSSOBJ,GETCATEGORIES} from "./mutation_types"
import http from "@/http"
const OK = 0;
export default {
    async [GETADDRRSSOBJ](store){
        const body = await http.msite.getPosition();
        if(body.code===OK)
            store.commit(GETADDRRSSOBJ,body.data)
    },

    async [GETCATEGORIES](store,cb) {
        const body = await http.msite.getCategories();
        if (body.code === OK)
            store.commit(GETCATEGORIES,body.data)
        //确保分类列表的数据得到更新了
        // cb && cb()
    }
}