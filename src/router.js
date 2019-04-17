import Vue from 'vue'
//1.导入路由模块
import VueRouter from 'vue-router'
//安装路由
Vue.use(VueRouter)
//2.导入对应的路由组件
import Home from './components/tabbar/home.vue'
import Member from './components/tabbar/member.vue'
import ShopCar from './components/tabbar/shopcar.vue'
import Search from './components/tabbar/search.vue'
import NewsList from './components/news/newsList.vue'
import NewsInfo from './components/news/newsInfo.vue'
import PhotosList from './components/photos/photosList.vue'
import PhotoInfo from './components/photos/photoInfo.vue'
import GoodsList from './components/goods/goodList.vue'
import GoodsInfo from './components/goods/goodsInfo.vue'
import GoodsTw from './components/goods/goodstw.vue'
import GoodsSp from './components/goods/goodssp.vue'

//3.创建路由对象
let router = new VueRouter({
    //设置路由切换高亮显示
    linkActiveClass:'mui-active',
    routes:[
        { path:'/', redirect:'/home'},
        { path:'/home', component:Home},
        { path:'/member', component:Member},
        { path:'/shopcar', component:ShopCar},
        { path:'/search', component:Search},
        { path:'/home/newsList', component:NewsList},
        { path:'/home/newsInfo/:id', component:NewsInfo},
        { path:'/home/photosList', component:PhotosList},
        { path:'/home/photoInfo/:id', component:PhotoInfo},
        { path:'/home/goodsList', component:GoodsList},
        { path:'/home/goodsInfo/:id', component:GoodsInfo,name:'goodsInfo'},
        { path:'/home/goodsInfo/goodstw/:id', component:GoodsTw,name:'goodsTw'},
        { path:'/home/goodsInfo/goodssp/:id', component:GoodsSp,name:'goodsSp'},
    ]
})

//4.把路由对象暴露出去
export default router