// 对axios二次封装  让axios发请求时有额外的功能 

import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store/index.js'

const service = axios.create({
    timeout: 10000,
    baseURL: '/api',

});

// 请求拦截器
service.interceptors.request.use(
    (config) => {
        // config就是请求过来的报文
        // 添加进度条
        NProgress.start();

        // 需要添加临时标识，后期每个请求都会带上这个临时标识
        let userTempId = store.state.user.userTempId
        if (userTempId) {
            config.headers.userTempId = userTempId
        }
        //登陆成功后，把token添加到请求头中，今后都要带上token
        let token = store.state.user.token
        if(token){
            config.headers.token = token
        }

        return config
    },
    // 请求拦截器中失败的回调一般不写
);

// 响应拦截器
service.interceptors.response.use(
    (response) => {
        // response就是响应报文
        NProgress.done();
        return response.data   //返回的data就是要的数据
    },
    (error) => {
        NProgress.done();
        alert('发送ajax请求失败' + error.message || '未知错误')
        return new Promise(() => { })
    }
)


export default service