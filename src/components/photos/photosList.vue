<template>
    <div>
        <!--顶部tabbar选项模块-->
        <div id="slider" class="mui-slider" data-slider="4">
            <div id="sliderSegmentedControl" class="mui-slider-indicator mui-segmented-control mui-segmented-control-inverted mui-scroll-wrapper">
                <div class="mui-scroll">
                    <a v-for="(item,i) in photos"
                            :key="item.id"
                            :class="['mui-control-item',item.id==0?'mui-active':'']"
                            href="#item1mobile"
                       @click="getPhotosList(item.id)"
                    >
                        {{item.title}}
                    </a>
                </div>
            </div>
        </div>

        <!--图片列表区域-->
        <ul class="photoList">
            <router-link tag="li" v-for="item in photosList" :key="item.id" :to="'/home/photoInfo/'+item.id">
                <img v-lazy="item.img_url" alt="">
                <div>
                    <h5>{{item.title}}</h5>
                    <p class="mui-ellipsis-2">{{item.zhaiyao}}</p>
                </div>
            </router-link>
        </ul>
    </div>
</template>

<script>
    'use strict'
    /*局部导入js文件*/
    import mui from '../../lib/mui/js/mui.min'
    //报错  分析：1 mui.js可能用到了caller，callee，arguments等属性，但是webpack打包号的main.js中，可能默认启用了严格模式，所有俩者冲突
    //解决方案  1：把mui.js中的非严格模式的代码干掉，不现实
    //          2.把webpack打包时的严格模式禁用  插件：babel-plugin-transform-remove-strict-mode
    export default {
        name: "photosList",
        data(){
            return{
                photos:[],
                photosList:[]
            }
        },
        mounted(){//在mounted里面操作，代表DOM元素已经渲染完成
            //2.初始化滑动控件
            mui('.mui-scroll-wrapper').scroll({
                deceleration:0.0005
            });
            //3.tabbar栏失效，样式于导入的mui.js冲突，修改了mui-tab-item的类名  样式不变
        },
        methods:{
            getPhotos(){
                this.$http.get('api/getimgcategory')
                    .then(result=>{
                        if (result.body.status===0){
                            result.body.message.unshift({title:'全部',id:0})
                            this.photos=result.body.message
                        }
                    })
            },
            //5.点击图片分类显示对应的数据
            getPhotosList(id){
                this.$http.get('api/getimages/'+id).then(result=>{
                    if (result.body.status===0){
                       this.photosList=result.body.message
                    }
                })
            }
        },
        created(){
            this.getPhotos();
            //刷新时，触发图片列表
            this.getPhotosList(0);
        }
    }
</script>

<style scoped lang="less">
    *{
        touch-action: pan-y;
    }
    .photoList{
        margin: 0;
        padding: 5px;
        li{
            background-color: #ccc;
            text-align: center;
            list-style: none;
            margin-bottom: 10px;
            box-shadow: 0px 0px 10px #999;
            position: relative;
            div{
                position: absolute;
                width: 100%;
                bottom: 0;
                left: 0;
                background-color: rgba(0,0,0,0.3);
                overflow: hidden;
                h5{
                    color:white;
                    text-align: left;
                    font-size: 14px;
                    font-weight: 700;
                }
                p{
                    color:rgb(255,246,241);
                    text-align: left;
                    font-size: 12px;
                }
            }
            img{
                width: 100%;
                display: block;
            }
            /*懒加载*/
            img[lazy=loading]{
                width: 40px;
                height: 300px;
                margin: auto;
            }
        }
    }
</style>