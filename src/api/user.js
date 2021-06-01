//用户相关请求模块


import request from "@/utils/request"
//在非组件模块中获取store必须通过这种方式
//这里单独加载store.和在组件中this.$store 一个东西
import store from '@/store/'

/* 登录／注册 */
export const login = data => {
    return request({
        method: 'post',
        url: '/app/v1_0/authorizations',
        data
    })
}


/* 发送短信验证码 */
export const sendSms = mobile => {
    return request({
        method: 'get',
        url: `/app/v1_0/sms/codes/${mobile}`
    })
}

/* 获取当前用户信息 */
export const getCurrentUser = () => {
    return request({
        method: 'get',
        url: '/app/v1_0/user',
        headers: {
            Authorization: `Bearer ${store.state.user.token}`
        }
    })
}

/* 获取当前用户列表 */
export const getUserChannels = () => {
    return request({
        method: 'get',
        url: '/app/v1_0/user/channels',
        headers: {
            Authorization: `Bearer ${store.state.user.token}`
        }
    })
}