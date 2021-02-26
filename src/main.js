import Vue from 'vue'
import App from './App.vue'       // @是一个别名  代表的就是src的路径
import router from '@/router'
import store from '@/store'
import 'swiper/css/swiper.css' //引入swiper的css

import '@/mock/mockServer'        //引入mockServer  让模拟的接口生效
// import {reqCategoryList} from '@/api'
// reqCategoryList()
import  * as API from '@/api'        //直接获取接口请求函数文件暴露出来的对象

import { Button,MessageBox,Message } from 'element-ui';   //按需引入

import '@/utils/validate'     //引入vee-validate相关配置

//图片懒加载
import VueLazyload from 'vue-lazyload'
import loading from '@/assets/images/loading.gif'
// 在图片界面没有进入到可视范围前不加载, 在没有得到图片前先显示loading图片
Vue.use(VueLazyload, { // 内部自定义了一个指令lazy
  loading,  // 指定未加载得到图片之前的loading图片
})





//注册
Vue.use(Button)


Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message;   //提示消息，比alert好看

// 全局注册的组件
import TypeNav from '@/components/TypeNav'
import SlideLoop from '@/components/SlideLoop'
import Pagination from '@/components/Pagination'

// 全局注册
Vue.component('TypeNav',TypeNav)
Vue.component('SlideLoop',SlideLoop)
Vue.component('Pagination',Pagination)

Vue.config.productionTip = false

new Vue({
  beforeCreate(){
    Vue.prototype.$bus = this,  //安装总线
    Vue.prototype.$API = API
  },
  render: h => h(App),
  router,            //拿到this.$router 和this.$route
  store              //拿到this.$store
}).$mount('#app')
