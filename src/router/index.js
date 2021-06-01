import Vue from 'vue'
import VueRouter from 'vue-router'
import login from "@/views/login"
import layoutIndex from '@/views/layout'


Vue.use(VueRouter)

const routes = [
    //登录页面
    {
        path: '/login',
        name: 'login',
        component: login
    },
    //主页
    {
        path: '/',
        name: 'layout',
        component: layoutIndex,
        children: [{
                path: '', //默认子路由
                name: 'home',
                component: () =>
                    import ('@/views/home/')
            },
            {
                path: '/qa', //问答模块
                name: 'qa',
                component: () =>
                    import ('@/views/qa/')
            }, {
                path: '/my', //我的
                name: 'my',
                component: () =>
                    import ('@/views/my/')
            }, {
                path: '/videos', //视频
                name: '/videos',
                component: () =>
                    import ('@/views/video/')
            }
        ]
    }


]

const router = new VueRouter({
    routes
})

export default router