import {GETADDRRSSOBJ} from "./mutation_types"
import http from "@/http"
const OK = 0;
export default {
    async [GETADDRRSSOBJ](store){
        const body = await http.msite.getPosition();
        if(body.code===OK)
            store.commit(GETADDRRSSOBJ,body.data)
    }
}