import {GETADDRRSSOBJ} from "./mutation_types"
export default {
    [GETADDRRSSOBJ](state,addressObj){
        state.addressObj = addressObj
    }
}