import Vue from 'vue'
import Vuex from 'vuex'
// 引入 axios
import axios from './utils/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    logUseInfo:{}

  },
  getters: {
    getLogName: state => {
      return state.logUseInfo.logName;
    }
  },
  mutations: {
    setLogUseInfo (state, UseInfo) {
      state.logUseInfo = UseInfo;
    }
  },
  actions: {
    initLogUserInfo({ commit })  {
      axios.get('/api/getUserInfo').then((res) => {
        console.log(res.data);
        commit('setLogUseInfo', res.data);
      })
    }

  }
})
