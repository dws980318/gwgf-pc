import axios from 'axios';
// import router from '../router'
import { Message } from 'element-ui'
import router from '@/router'
import store from '@/store'
// 创建axios实例
const service = axios.create({
  timeout: 10000 // 请求超时时间
})
service.defaults.baseURL = ''
service.defaults.withCredentials = true
// 添加request拦截器
service.interceptors.request.use(config => {
  if (localStorage.token) {
    config.headers.Authorization = localStorage.token
  }
  return config
}, error => {
  Promise.reject(error)
})
// 添加respone拦截器
service.interceptors.response.use(
  response => {

    if (response.status === 200) {
      let res = {};
      res = response.data
      return res;
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    if (error.response && error.response.status == 404) {
      // router.push('/blank.vue')
      Message.error('请求接口失败，接口无服务，404');
    } else if (error.response && error.response.status == 500) {
      // Message.error('服务器异常请等会登录!');
      // router.replace("/index");
      // setTimeout(() => {
      //   store.commit("clearLogin", true);
      //   location.reload();
      // }, 300);
    } else if (error.response && error.response.status == 700) {
      // Message.error('会话过期请重新登录!');
      // router.replace("/index");
      // setTimeout(() => {
      // store.commit("clearLogin", true);
      store.state.dialogVisible = true
      store.state.haveLogin = false
      // localStorage.showLogin = true;
      // location.reload();
      // }, 300);
    }


    return Promise.reject(error.response)
  }
)

export function get(url, params = {}) {
  params.t = new Date().getTime(); //get方法加一个时间参数,解决ie下可能缓存问题.
  return service({
    url: url,
    method: 'get',
    headers: {
    },
    params
  })
}

//封装form-data请求
export function form(url, data) {
  //默认配置
  var formData = new FormData();
  Object.keys(data).forEach((key) => {
    // console.log(key, data[key])
    formData.append(key, data[key]);
  })
  let sendObject = {
    url: url,
    method: 'post',
    headers: {
      //   dataType: "json",
      //   processData:false,
      //   // mimeType:"multipart/form-data",
      //   'Content-Type': false,
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    data: formData
  };
  // sendObject.data=JSON.stringify(data);
  return service(sendObject)
}

//封装post请求
export function post(url, data = {}) {
  //默认配置
  let sendObject = {
    url: url,
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data: data
  };
  sendObject.data = JSON.stringify(data);
  return service(sendObject)
}

//封装put方法 (resfulAPI常用)
export function put(url, data = {}) {
  return service({
    url: url,
    method: 'put',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data: JSON.stringify(data)
  })
}
//删除方法(resfulAPI常用)
export function deletes(url) {
  return service({
    url: url,
    method: 'delete',
    headers: {}
  })
}

//不要忘记export
export {
  service
}
