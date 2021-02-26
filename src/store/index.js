import Vue from 'vue'
import Vuex from 'vuex'
import home from './home'
import search from './search'
import detail from './detail'
import shopcart from './shopcart'
import user from './user'
import trade from './trade'

Vue.use(Vuex)


const state = {
    // 存数据
}

const mutations = {
    // 改数据
}

const actions = {
    //异步发请求   与组件对接   提交mutations
}

const getters = {
    // 简化数据的操作
}


export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    //modules 代表模块化开发         
    modules: {
        home,
        search,
        detail,
        shopcart,
        user,
        trade
    }
})

