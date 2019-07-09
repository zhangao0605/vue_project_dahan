import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import login from './modules/login'
//
// Vue.use(Vuex)
// const modulesFiles = require.context('./modules', false, /\.js$/)
// const modules = modulesFiles.keys().reduce((modules, modulePath) => {
//   const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
//   const value = modulesFiles(modulePath)
//   modules[moduleName] = value.default
//   return modules
// }, {})
Vue.use(Vuex)
const store = new Vuex.Store({
  modules:{
    app,
    login
  },
  getters
})

export default store
