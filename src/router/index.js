import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const $router = new Router({
    // mode: 'hash',
    // mode: 'history',
    routes: [
        // {
        //     path: '/',
        //     name: 'Home',
        //     meta: {
        //         title: '广外高级翻译学院-首页'
        //     },
        //     redirect: '/login',
        //     component: () => import(/* webpackChunkName: "navigator" */ '@/views/Index/Panal'),
        //     children: [
        {
            path: '/login',
            name: 'Login',
            meta: {
                title: '广外高级翻译学院-首页'
            },
            component: () => import(/* webpackChunkName: "navigator" */ '@/views/Index/Panal'),
        },
        //     ]
        // },
        {
            path: '/home',
            name: 'Activity',
            meta: {
                title: '广外高级翻译学院-首页'
            },
            redirect: '/home/activity',
            component: () => import(/* webpackChunkName: "navigator" */ '@/views/Index/Common/Panal'),
            children: [
                {
                    path: 'activity/:id',
                    name: 'Activity',
                    meta: {
                        title: '广外高级翻译学院-首页'
                    },
                    component: () => import(/* webpackChunkName: "navigator" */ '@/views/Index/Common/Activity')
                },
                {
                    path: 'inform/:id',
                    name: 'Inform',
                    meta: {
                        title: '广外高级翻译学院-首页'
                    },
                    component: () => import(/* webpackChunkName: "navigator" */ '@/views/Index/Common/Inform'),
                },
                {
                    path: 'resources/:id',
                    name: 'Resources',
                    meta: {
                        title: '广外高级翻译学院-首页'
                    },
                    component: () => import(/* webpackChunkName: "navigator" */ '@/views/Index/Common/Resources'),
                },
            ]
        },

    ]
})
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error => error)
}
// $router.onError((error) => {
//     console.error(error)
//     const pattern = /Loading chunk/g
//     // const pattern = /Loading chunk (\d)+ failed/g
//     const isChunkLoadFailed = error.message.match(pattern)
//     const targetPath = $router.history.pending.fullPath
//     if (isChunkLoadFailed && error.type === 'missing') {
//         // const targetPath = $router.history.pending.fullPath
//         $router.push(targetPath)
//     }
// })

export default $router