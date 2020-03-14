export default (axios,config={})=>{
    if(!config.api)
        throw new Error("api配置必须存在")
    if(!config.api instanceof Object)
        throw new Error("api必须得是一个对象")

    const httpUtil = {};
    const api = config.api;

    for(let name in api){
        const {url,method,isForm,hooks} =api[name];
        if(hooks){
            api[name].beforeReq = hooks.beforeReq;
            api[name].AfterReq = hooks.AfterReq;
        }

        httpUtil[name] = async (data={})=>{
            if(!(data instanceof Object)) //如果传入的数据不是对象 则报错
                throw new Error("请求数据必须是一个对象")

            let transformData = null;
            if(isForm){
                transformData = new FormData();
                for(let key in data){
                    transformData.append(key,data[key])
                }
            }else {
                transformData = data;
            }


            let body = "";
            switch (method){
                case "get":
                case "delete":
                    api[name].beforeReq && api[name].beforeReq()
                    body = await axios({
                        url,
                        method,
                        params:transformData
                    })
                    api[name].AfterReq && api[name].AfterReq()
                    break;
                case "put":
                case "post":
                    api[name].beforeReq && api[name].beforeReq()
                    body = await axios({
                        url,
                        method,
                        data:transformData
                    })
                    api[name].AfterReq && api[name].AfterReq()
                    break;
            }

            return body
        }
    }

    return httpUtil;
}