import {GETADDRRSSOBJ,GETCATEGORIES} from "./mutation_types"
import http from "@/http"
const OK = 0;
export default {
    async [GETADDRRSSOBJ](store){
        const body = await http.msite.getPosition();
        if(body.code===OK)
            store.commit(GETADDRRSSOBJ,body.data)
    },

    async [GETCATEGORIES](store) {
        const body = await http.msite.getCategories();
        if (body.code === OK)
            store.commit(GETCATEGORIES,body.data)
    }
}