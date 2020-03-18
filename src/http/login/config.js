const token = localStorage.getItem("ele-token");
console.log(token);
export default {
    api:{
        getCode:{
            url:"/sendcode",
            method:"get",
            crosUrl:"/4000"
        },
        loginByUserAndPwd:{
            url:"/login_pwd",
            method:"post",
            crosUrl:"/4000"
        },
        loginBySms:{
            url:"/login_sms",
            method:"post",
            crosUrl:"/4000"
        },
        autoLogin:{
            url:"/auto_login",
            method:"get",
            crosUrl:"/4000",
            token,
        }
    }
}