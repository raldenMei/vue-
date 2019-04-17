<template>
    <div class="goodsInfo-container">
        <!--小球-->
        <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter">
            <div class="ball" v-show="flag"></div>
        </transition>

        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <swiper :bannerList="banner"></swiper>
                </div>
            </div>
        </div>

        <!--商品购买区域-->
        <div class="mui-card">
            <div class="mui-card-header">{{infoList.title}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价：<del>{{infoList.market_price}}元</del>
                        销售价：<span class="nowPrice">{{infoList.sell_price}}元</span>
                    </p>
                    <p>
                        购买数量：6个
                    </p>
                    <p>
                        <mt-button type="primary"size="small">立即购买</mt-button>
                        <mt-button @click="addCar" type="danger" size="small">加入购物车</mt-button>
                    </p>
                </div>
            </div>
        </div>

        <!--商品参数-->
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：{{infoList.goods_no}}</p>
                    <p>库货情况：{{infoList.stock_quantity}}</p>
                    <p>上架时间：{{infoList.add_time|dateFormat}}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button @click="goDetail1(infoList.id)" type="primary"size="large" plain>图文介绍</mt-button>
                <mt-button @click="goDetail2(infoList.id)" type="danger" size="large" plain>商品评论</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
    import swiper from '../subcomponents/swiper.vue'
    export default {
        name: "goodsInfo",
        components:{
            swiper
        },
        data(){
            return{
                id:this.$route.params.id,
                banner:[],
                infoList:[],
                flag:false
            }
        },
        methods:{
            /*获取轮播图数据*/
            getBanner(){
                this.$http.get('api/getthumimages/'+this.id)
                    .then(result=>{
                        if (result.body.status === 0){
                            // this.banner=result.body.message
                            //因为封装好了的组件设置的是item.img ,不一致，所以遍历的追加一个item.img
                            result.body.message.forEach(item=>{
                                item.img=item.src
                            })
                            this.banner=result.body.message
                        }

                    })
            },
            getGoodsInfo(){
                this.$http.get('api/goods/getinfo/'+this.id)
                    .then(result=>{
                        if (result.body.status===0){
                            this.infoList=result.body.message[0]
                        }
                    })
            },
            goDetail1(id){
                //3.传递命名的路由,给路由是设置对应的名字
                this.$router.push({name:'goodsTw',params:{id}})
            },
            goDetail2(id){
                //3.传递命名的路由,给路由是设置对应的名字
                this.$router.push({name:'goodsSp',params:{id}})
            },
            addCar(){
                this.flag=!this.flag
            },
            //设置小球的动画
            beforeEnter(el){
                el.style.transform='translate(0,0)'
            },
            enter(el,done){
                el.offsetWidth;

                //解决因分辨率不同，需要计算坐标值 -->Element.getBoundingClientRect()
                //获取小球的位置
                let ball=document.querySelector('.ball').getBoundingClientRect()
                //获取徽标的位置:关于dom元素和所在的组件没有任何关系
                let badge=document.querySelector('.mui-badge').getBoundingClientRect()
                //求差
                let x=badge.left-ball.left;
                let y=badge.top-ball.top;

                // el.style.transform='translate(90px,350px)'
                el.style.transform=`translate(${x}px,${y}px)`
                el.style.transition='all 1s cubic-bezier(.35,-0.39,1,.79)'
                done();
            },
            afterEnter(){
                this.flag=!this.flag
            },
        },
        created(){
            this.getBanner()
            this.getGoodsInfo()
        }
    }
</script>

<style scoped lang="less">
    .goodsInfo-container{
        background-color: #eee;
        /*解决垂直方向外边距塌陷的问题*/
        overflow: hidden;
        .nowPrice{
            color: red;
            font-weight: bolder;
            font-size: 16px;
        }
        .mui-card-footer{
            display: block;
            button{
                margin: 10px 0;
            }
        }
        .ball{
            width: 15px;
            height: 15px;
            background-color: red;
            border-radius: 50%;
            position: absolute;
            left:140px;
            top: 430px;
            z-index: 999;
        }
    }
</style>