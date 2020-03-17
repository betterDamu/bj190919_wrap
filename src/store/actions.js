import {GETADDRRSSOBJ,GETCATEGORIES,GETSHOPS,GETUSER} from "./mutation_types"
import http from "@/http"
const OK = 0;
const ERROR = 1;

function loginSuccess(commit,user){
    //将用户的信息保存到仓库中
    commit(GETUSER,user)
};
function loginFail(){};


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
    },

    async [GETSHOPS](store){
        const body = await http.msite.getShops();
        if (body.code === OK)
            store.commit(GETSHOPS,body.data)
    },

    async [GETUSER]({commit},{loginWay,phone,code,name,pwd,captcha}){
        let body = "";
        if(loginWay === "message"){
            //发手机&短信的请求
            body = await http.login.loginBySms({
                phone,
                code
            })
        }else if(loginWay==="password"){
            //发用户名&密码的请求
            body = await http.login.loginByUserAndPwd({
                name,
                pwd,
                captcha
            })
        }

        body.code === OK && loginSuccess(commit,body.data)
        body.code === ERROR && loginFail()
    }
}