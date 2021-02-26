
import {getUserTempId} from '@/utils/userabout'
import {reqGetCode, reqGetUserInfo, reqUserLogin, reqUserLogout, reqUserRegister,reqUserAddressList} from '@/api'

const state = {
    userTempId:getUserTempId(),
    code:'',   //用户注册验证码信息
    // token:'',    //初始的token
    token:localStorage.getItem('TOKEN_KEY'),    //自动登录的token
    userInfo:{} ,  //根据token获取用户信息
    userAddressList:[],

}

const mutations = {
    RECEIVE_CODE(state,code){
        state.code = code
    },
    RECEIVE_TOKEN(state,token){
        state.token = token
    },
    RECEIVE_USERINFO(state,userInfo){
        state.userInfo = userInfo
    },
    //清空token
    // RESET_TOKEN(state){
    //     state.token = ''
    // },

    //退出登录需要清空信息和token
    RESET_USER(state){
        state.token = ''
        state.userInfo = {}

    },
    //
    RECEIVE_USERADDRESSLIST(state,userAddressList){
        state.userAddressList = userAddressList
    }

}

const actions = {
    async userRegister({commit},userInfo){
        const result = await reqUserRegister(userInfo)
        if(result.code === 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('failed'))
        }
    },
    // 请求获取code
    async getCode({commit},phone){
        const result = await reqGetCode(phone)
        if(result.code === 200){
            commit('RECEIVE_CODE',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('failed'))
        }
    },
    // 请求登录
    async userLogin({commit},userInfo){
        const result = await reqUserLogin(userInfo)
        if(result.code = 200){
            commit('RECEIVE_TOKEN',result.data.token)
            //自动登录就是保存token到localStorage
             localStorage.setItem('TOKEN_KEY',result.data.token)
            return 'ok'
        }else{
            return Promise.reject(new Error('failed'))
        }
    },
    //根据token请求获取用户信息
    async getUserInfo({commit}){
        const result = await reqGetUserInfo()
        if(result.code === 200){
            commit('RECEIVE_USERINFO',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('failed'))
        }
    },
    //清除用户token信息
    async clearToken({commit}){
        commit('RESET_USER')
        localStorage.removeItem('TOKEN_KEY')  //当token过期，需要把过期的token清除，要清除state中的也得清除localstorage的
    },

    //退出登录
    async userLogout({commit}){
        const result = await reqUserLogout()
        if(result.code === 200){
            commit('RESET_USER')
            localStorage.removeItem('TOKEN_KEY')
            return 'ok'
        }else{
            return Promise.reject(new Error('failed'))
        }
    },

    //获取用户收货地址
    async getUserAddressList({commit}){
        const result = await reqUserAddressList()
        if(result.code === 200){
            commit('RECEIVE_USERADDRESSLIST',result.data)
        }
    }
}

const getters = {
    // 简化数据的操作
   
}

export default {
    state,
    mutations,
    actions,
    getters,
    //modules 代表模块化开发         
    
}