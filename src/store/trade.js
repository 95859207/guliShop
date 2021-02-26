import { reqTradeInfo } from "@/api"

const state = {
    // 存数据
    tradeInfo:{}
}

const mutations = {
    // 改数据
    RECEIVE_TRADEINFO(state,tradeInfo){
        state.tradeInfo = tradeInfo
    }
}

const actions = {
    //异步发请求   与组件对接   提交mutations
    async getTradeInfo({commit}){
        const result = await reqTradeInfo()
        if(result.code === 200){
            commit('RECEIVE_TRADEINFO',result.data)
        }
    }
}

const getters = {
    detailArrayList(state){
        return state.tradeInfo.detailArrayList || []
    }
}




export default {
    state,
    mutations,
    actions,
   getters
}