import {reqDetailInfo} from '@/api'


const state = {
    // 存数据
    detailInfo:{}
}

const mutations = {
    // 改数据
    RECEIVE_DETAILINFO(state,detailInfo){
        state.detailInfo = detailInfo
    }
}

const actions = {
    //异步发请求   与组件对接   提交mutations
    async getDetailInfo({commit},skuId){
        const result = await reqDetailInfo(skuId)
        if(result.code === 200){
            commit('RECEIVE_DETAILINFO',result.data)
        }
    }
}

const getters = {
    // 简化数据的操作
    categoryView(state){
        return state.detailInfo.categoryView  || {}
    },
    skuInfo(state){
        return state.detailInfo.skuInfo || {}
    },
    spuSaleAttrList(state){
        return state.detailInfo.spuSaleAttrList || []
    }
}


export default {
    state,
    mutations,
    actions,
    getters,
    //modules 代表模块化开发         
    
}

