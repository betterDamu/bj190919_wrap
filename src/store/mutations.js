import {GETADDRRSSOBJ,GETCATEGORIES,
    GETSHOPS,GETUSER,RESTUSER,AUTOLOGIN} from "./mutation_types"
export default {
    [GETADDRRSSOBJ](state,addressObj){
        state.addressObj = addressObj
    },
    [GETCATEGORIES](state,categories){
        state.categories = categories
    },
    [GETSHOPS](state,shops){
        state.shops = shops
    },
    [GETUSER](state,user){
        state.user = user;
        state.token = user.token;
    },
    [RESTUSER](state){
        state.user={};
        state.token = "";
    },
    [AUTOLOGIN](state,user){
        state.user = user
    }
}