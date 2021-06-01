//请求模块的封装
import axios from 'axios'

const request = axios.create({
    baseURL: 'http://ttapi.research.itcast.cn/' //基础路径
})

export default request
//请求拦截器

//响应拦截器