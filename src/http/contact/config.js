export default {
    baseURL:"http://localhost:9000/api",
    timeout:10000,
    //这个配置是必须的  请求的参数信息
    api:{
        getContactList:{
            url:"/contactList",
            method:"get",
            hooks:{
                //每个请求个性化的一些逻辑
                beforeReq(){}, //请求前触发的钩子
                AfterReq(){},  //请求后触发的钩子
            }
        },
        delContact:{
            url:"/contact",
            method:"delete"
        },
        updateContact:{
            url:"/contact/edit",
            method:"put"
        },
        addContactByJson:{
            url:"/contact/new/json",
            method:"post"
        },
        addContactByForm:{
            url:"/contact/new/form",
            method:"post",
            isForm:true //代表请求时的数据 以formData的形式进行传输
        },
    },
    //这个配置是可选的  模块级别的钩子
    hooks:{
        //相当于是模块级别的钩子
        beforeReq(){},
        AfterReq(){}
    },

}