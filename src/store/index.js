import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = { // 要设置的全局访问的state对象
  dialogVisible: false,
  registerVisible: false,
  stuVisible: false,
  studyVisible: false,
  chatVisible: false,
  passwordVisible: false,
  person: true,
  login: false,
  role: 0,
  isLogin: '',
  haveLogin: false,
  pageNumber: ''
  // 要设置的初始属性值
}
const mutations = {
  getPageNumber(state, params) {
    state.pageNumber = params
  },
  showLoginModal(state, params) {
    state.dialogVisible = params
  },
  showRegisterModal(state, params) {
    state.registerVisible = params
  },
  showStuModal(state, params) {
    state.stuVisible = params
  },
  showPasswordModal(state, params) {
    state.passwordVisible = params
  },
  showStudyModal(state, params) {
    state.studyVisible = params
  },
  showChatModal(state, params) {
    state.chatVisible = params
  },
  setHaveLogin(state, data) {
    state.haveLogin = data
    localStorage.setItem('haveLogin', state.haveLogin)
  },
  setLogin(state, data) {
    state.login = data
    localStorage.setItem('login', state.login)
  },
  setIsLogin(state, data) {
    state.isLogin = data
    localStorage.setItem('isLogin', state.isLogin)
  },
  setRole(state, data) {
    state.role = data
    localStorage.setItem('role', state.role)
  },
  clearLogin(state, data) {
    if (data) {
      state.haveLogin = false
      // localStorage.removeItem('login')
      // localStorage.removeItem('role')
      // localStorage.removeItem('isLogin')
      // localStorage.removeItem('haveLogin')
      // state.dialogVisible = true
      localStorage.clear()
    }
  }
}
const store = new Vuex.Store({
  state,
  mutations
})
export default store
