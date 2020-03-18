export default {
    imgBaseUrl:"https://fuss10.elemecdn.com", //图片的基地址
    addressObj:{
        address:""
    }, //商家地址
    categories:[], //分类列表
    shops:[], //商家列表
    user:{}, //登录的用户信息
    token:localStorage.getItem("ele-token") //用户的登录凭证
}


/*
    token 一般存用户的id 放在客户端
    每次请求的时候 我我们会带上token(id)
    可以从token提取id 去数据库查询到用户的所有信息 在进行操作

    客户端是不能直接存储用户的所有信息的!! 这样太不安全
*/
