import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import routes from './routes'
import store from '@/store'
import user from '@/store/user'

// 将原有push方法,地址 存起来,后期还能拿到原来的
const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.replace

VueRouter.prototype.push = function (location, onResolved, onRejected) {
    // location 就是调用 this.$router.push 传递过来的对象
    if (onResolved === undefined && onRejected === undefined) {
        // 证明调用时只传递了个匹配路由对象 没有传递成功或失败的回调
        return originPush.call(this, location).catch(() => { })
    } else {
        return originPush.call(this, location, onResolved, onRejected)
    }
}

VueRouter.prototype.replace = function (location, onResolved, onRejected) {
    // location 就是调用 this.$router.push 传递过来的对象
    if (onResolved === undefined && onRejected === undefined) {
        // 证明调用时只传递了个匹配路由对象 没有传递成功或失败的回调
        return originReplace.call(this, location).catch(() => { })
    } else {
        return originReplace.call(this, location, onResolved, onRejected)
    }
}





//暴露一个路由器的对象
 const router = new VueRouter({
    routes,
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
})

//全局前置路由守卫,用来对token校验
router.beforeEach(async(to, from, next) => {

    //第一步：守卫拦截住，先获取用户的token和信息
    let token = store.state.user.token
    let userInfo = store.state.user.userInfo.name

    if(token){
    //如果token存在，代表用户登陆过
        if(to.path === '/login'){
            //用户已经登录了，还要往登录页跳，没必要
            next('/')
        }else{
            //如果用户已经登录了，但是跳转的不是登录页，那看用户信息获取了没有
            if(userInfo){
                //如果token存在，代表用户登陆过
                next()
            }else{
                //用户已经登录，但是用户还没有获取用户信息，需要在这里请求用户信息
                try {
                   await store.dispatch('getUserInfo') //用户根据token获取用户信息
                   next()
                } catch (error) {
                    //获取用户信息失败，可能是token过期了
                    //把用户的过期token清除掉，重新跳转到登录页
                    store.dispatch('clearToken')
                    next('/login')
                }
                
            }
        }
    }else{
        //用户根本没登录 ,跳转到登录页面
        let targetPath = to.path
        if(targetPath.indexOf('/trade') !== -1 || targetPath.indexOf('/pay')!== -1 || targetPath.startsWith('/center')){
            next('login?redirect=' + targetPath)
        }else{
            next()
        }
    }
})

export default router