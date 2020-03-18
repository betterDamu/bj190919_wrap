//这行代码只被执行了一次  项目初始化的时候 执行了一次
//const token = localStorage.getItem("ele-token");
export default {
    api:{
        getPosition:{
            url:"/position/40.10038,116.36867",
            method:"get",
            crosUrl:"/4000"
        },
        getCategories:{
            url:"/index_category",
            method:"get",
            crosUrl:"/4000",
            //将token也得配置化
            //因为vue项目的整个http模块的封装程度是很高的
            token(){
                return localStorage.getItem("ele-token")
            },
        },
        getShops:{
            url:"/shops",
            method:"get",
            crosUrl:"/4000",
            token(){
                return localStorage.getItem("ele-token")
            }
        }
    }
}