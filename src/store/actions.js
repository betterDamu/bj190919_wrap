import {GETADDRRSSOBJ,GETCATEGORIES,GETSHOPS,GETUSER} from "./mutation_types"
import router from "@/router"
import http from "@/http"
import {Toast} from "vant"
const OK = 0;
const ERROR = 1;

function loginSuccess(commit,user){
    //将用户的信息保存到仓库中
    commit(GETUSER,user)
    //登录成功之后要跳转到个人中心(编程式路由进行跳转)
    router.replace("/Profile")

};
function loginFail(loginWay,getCaptcha){
    Toast.fail({
        message:"登录失败,请检查参数",
        duration:2000
    })

    //如果是通过用户名 密码登录的 登录失败之后 要 更新图片验证码
    if (loginWay==="password")
        getCaptcha()
};


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

    async [GETUSER]({commit},{loginWay,phone,code,name,pwd,captcha,getCaptcha}){
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
        body.code === ERROR && loginFail(loginWay,getCaptcha)
    }
}