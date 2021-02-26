import { reqSearchInfo } from "@/api"



const state = {
    // 存数据
    searchInfo:{}
}

const mutations = {
    // 改数据
    RECEIVE_SEARCHINFO(state,searchInfo){
        state.searchInfo = searchInfo
    }
}

const actions = {
    //异步发请求   与组件对接   提交mutations
    async getSearchInfo({commit},searchParams){
        const result = await reqSearchInfo(searchParams)
        if(result.code === 200){
            commit('RECEIVE_SEARCHINFO',result.data)
        }
    }
}

const getters = {
    // 简化数据的操作
    attrsList(state){
        return state.searchInfo.attrsList || []
    },
    goodsList(state){
        return state.searchInfo.goodsList || []
    },
    trademarkList(state){
        return state.searchInfo.trademarkList || []
    }
}


export default {
    state,
    mutations,
    actions,
    getters,
    
}

