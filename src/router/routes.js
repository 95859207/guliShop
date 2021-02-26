const Home = () => import('@/pages/Home')
const Search = () => import('@/pages/Search')


// import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
// import Search from '@/pages/Search'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Trade from '@/pages/Trade'
import Center from '@/pages/Center'
import MyOrder from '@/pages/Center/MyOrder'
import GroupOrder from '@/pages/Center/GroupOrder'
import store from "@/store"
 
 
 
 export default [
    {
        path: '/communication',
        component: () => import('@/pages/Communication/Communication'),
        children: [
          {
            path: 'event',
            component: () => import('@/pages/Communication/EventTest/EventTest'),
            meta: {
              isHideFooter: true
            },
          },
          {
            path: 'model',
            component: () => import('@/pages/Communication/ModelTest/ModelTest'),
            meta: {
              isHideFooter: true
            },
          },
          {
            path: 'sync',
            component: () => import('@/pages/Communication/SyncTest/SyncTest'),
            meta: {
              isHideFooter: true
            },
          },
          {
            path: 'attrs-listeners',
            component: () => import('@/pages/Communication/AttrsListenersTest/AttrsListenersTest'),
            meta: {
              isHideFooter: true
            },
          },
          {
            path: 'children-parent',
            component: () => import('@/pages/Communication/ChildrenParentTest/ChildrenParentTest'),
            meta: {
              isHideFooter: true
            },
          },
          {
            path: 'scope-slot',
            component: () => import('@/pages/Communication/ScopeSlotTest/ScopeSlotTest'),
            meta: {
              isHideFooter: true
            },
          }
        ],
      },






      

    {
        path:'/center',
        component:Center,
        children:[
            {
                path:'myorder',
                component:MyOrder
            },
            {
                path:'grouporder',
                component:GroupOrder
            },
            {
                path:'',
                redirect:'myorder'
            }
        ]
    },
    {
        path:'/pay',
        component:Pay,
        beforeEnter: (to, from, next) => {
            if(from.path === '/trade'){
                next()
            }else{
                alert('只有从交易也买你才能跳到支付页面')
                next(false)
            }
        }
    },
    {
        path:'/paysuccess',
        component:PaySuccess
    },
    {
        path:'/trade',
        component:Trade,
        //只有从购物车才能跳到交易页面
        beforeEnter: (to, from, next) => {
            if(from.path === '/shopcart'){
                next()
            }else{
                alert('只有从购物车才能跳到交易页面')
                next(false)
            }
        }
    },
    {
        path:'/home',
        component:Home

    },
    
    {
        path:'/shopcart',
        component:ShopCart
    },
    {
        path:'/addcartsuccess',
        component:AddCartSuccess,
        beforeEnter: (to, from, next) => {
            let skuNum = to.query.skuNum
            let skuInfo = sessionStorage.getItem('SKUINFO_KEY')
            if(skuNum && skuInfo){
                next()
            }else{
                alert('必须携带skuNum参数，也必须存储skuInfo')
                next('/')
            }
        }
    },
    {
        path:'/detail/:goodsId',
        component:Detail
    },
    {
        path:'/login',
        component:Login,
        meta:{
            isHidden:true
        },
        
    },
    {
        path:'/register',
        component:Register,
        meta:{
            isHidden:true
        }
    },
    {
        path:'/search/:keyword?',
        component:Search,
        name:'search',
        props:(route)=>{
            return {keyword:route.params.keyword,keyword1:route.query.keyword1}
        },

    },
    {
        path:'/',
        redirect:'/home',
    },
   
]