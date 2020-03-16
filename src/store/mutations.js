import {GETADDRRSSOBJ,GETCATEGORIES} from "./mutation_types"
export default {
    [GETADDRRSSOBJ](state,addressObj){
        state.addressObj = addressObj
    },
    [GETCATEGORIES](state,categories){
        state.categories = categories
    }
}