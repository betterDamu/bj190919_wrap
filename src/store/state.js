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