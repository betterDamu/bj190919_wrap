// 发送请求需要的配置
import config from "./config"
// 发送请求需要的那个axios实例
import axios from "./axios"
// 当前这个工具函数 会根据api 和  axios来生成当前模块要往外提供的请求方法
import utilFn from "@/util/http"

export default utilFn(axios,config)