// Home的vuex模块

import { reqCategoryList,reqBannerList,reqFloorList } from '@/api'



const state = {
    categoryList: [],
    bannerList:[],
    floorList:[]
}

const mutations = {
    RECEIVE_CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList
    },
    RECEIVE_BANNERLIST(state, bannerList) {
        state.bannerList = bannerList
    },
    RECEIVE_FLOORLIST(state, floorList) {
        state.floorList = floorList
    }
}

const actions = {
    async getCategoryList({ commit }) {
        // 发请求
        const result = await reqCategoryList()
        if(result.code === 200){
            commit('RECEIVE_CATEGORYLIST',result.data)
        }
    },
    async getBannerList({ commit }) {
        // 发请求
        const result = await reqBannerList()
        if(result.code === 200){
            commit('RECEIVE_BANNERLIST',result.data)
        }
    },
    async getFloorList({ commit }) {
        // 发请求
        const result = await reqFloorList()
        if(result.code === 200){
            commit('RECEIVE_FLOORLIST',result.data)
        }
    },

}

const getters = {

}


export default {
    state,
    mutations,
    actions,
    getters

}

