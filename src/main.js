// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueSwiper from 'vue-awesome-swiper'
import ElementUI from 'element-ui'
import Echarts from 'echarts'
import api from './utils/api.js'

import './common/css/element-ui.css'
import './common/css/common.css'
import './common/iconfont/iconfont.css'
// import 'element-ui/lib/theme-chalk/index.css';
import 'swiper/dist/css/swiper.css'
import init from './router/init'

Vue.config.productionTip = false

Vue.prototype.$echarts = Echarts
Vue.prototype.init = init
Vue.prototype.api = api; // 将api挂载到vue的原型上

//公用上传文件
// Vue.prototype.fileUrl = 'http://192.168.0.108:8080';
Vue.prototype.fileUrl = 'http://193.112.76.40:8090';

// Vue.prototype.downloadfileUrl = 'http://192.168.0.108:8080/downloadfile/';
Vue.prototype.downloadfileUrl = 'http://193.112.76.40:8090/downloadfile/';

Vue.prototype.tokens = localStorage.token;

Vue.use(ElementUI)
Vue.use(VueSwiper)


router.beforeEach((to, from, next) => {
    let path = to.path
    let role = localStorage.getItem('role') ? localStorage.getItem('role') : ''
    let login = localStorage.getItem('login')
    // let havaLogin = localStorage.getItem('havaLogin')
    let havaLogin = store.state.haveLogin
    let detailsId = localStorage.getItem('detailsId')
    // console.log(havaLogin)
    if (path === '/login') {
        next()
        return false
    }
    if (path === `/home/activity/${detailsId}`) {
        next()
        return false
    }
    if (path === `/home/inform/${detailsId}`) {
        next()
        return false
    }
    if (path === `/home/resources/${detailsId}`) {
        next()
        return false
    }
    if (!login) {
        next('/login')
        // store.commit('showLoginModal', true)
        // init.addLogin(0)
    } else {
        if (role !== 2) {
            if (havaLogin) {
                next()
            } else {
                init.addRoute(parseInt(role))
                next({
                    path: path
                })
            }
        } else {
            next('/login')
        }
    }
})


/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
