import axios from "axios";
import config from "./config"
import {loading,success,fail} from "@/util/toast"


const contact = axios.create({
    baseURL:config.baseURL||"",
    timeout:config.timeout||10000
})


contact.interceptors.request.use(function (axiosConfig) {
    loading();
    config.hooks && config.hooks.beforeReq && config.hooks.beforeReq();

    //为msite模块定义一些个性化的业务逻辑
    //分类列表 商家列表的请求 是需要携带token
    /*if(axiosConfig.url === "/4000/index_category" || axiosConfig.url === "/4000/shops"){
        axiosConfig.headers.Authorization = localStorage.getItem("ele-token")
    }*/

    return axiosConfig;
});

contact.interceptors.response.use(function (response) {
    success();
    config.hooks && config.hooks.AfterReq && config.hooks.AfterReq();
    return response.data;
}, function (error) {
    fail();
    config.hooks && config.hooks.AfterReq && config.hooks.AfterReq();
    return Promise.reject(error);
});


export default contact