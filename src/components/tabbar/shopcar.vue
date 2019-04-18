<template>
    <div class="shopcar_container">
        <div class="mui-card" v-for="(item,i) in goodsList" :key="item.id">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <mt-switch v-model="$store.state.car[i].selected" @change="selected(item.id,$store.state.car[i].selected)"></mt-switch>
                    <img :src="item.thumb_path" alt="">
                    <div class="info">
                        <h1>{{item.title}}</h1>
                        <p class="item">
                            <span class="price">{{item.sell_price}}元</span>
                            <number :initCount="$store.getters.getGoodsCount[item.id]" :goodsId="item.id"></number>
                            <a href="#" @click.prevent="remove(i,item.id)">删除</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner jiesuan">
                    <div class="left">
                        <p>总计（不含运费）</p>
                        <p>已勾选商品 <span class="red">
                            {{this.$store.getters.getTotal.count}}</span> 件，
                            总价 <span class="red">
                                ￥{{this.$store.getters.getTotal.allPrice}}
                            </span>
                        </p>
                    </div>
                    <mt-button type="danger">去结算</mt-button>
                </div>
            </div>
        </div>


    </div>
</template>

<script>
    import number from '../subcomponents/shopcar_number.vue'
    export default {
        name: "shopcar",
        data(){
            return{
                goodsList:[]
            }
        },
        components:{
            number
        },
        methods:{
            //获取购物车商品列表
            getGoodsList(){
                //获取商品的id
                let idArr=[];
                this.$store.state.car.forEach(item=>idArr.push(item.id))
                if (idArr.length<=0)return false;

                this.$http.get('api/goods/getshopcarlist/'+idArr.join(','))
                    .then(resule=>{
                        if (resule.body.status===0){
                            this.goodsList=resule.body.message
                        }
                    })
            },
            //点击删除
            remove(i,id){
                this.goodsList.splice(i,1);

                this.$store.commit('removeGoods',id)
            },
            selected(id,selected){
                this.$store.commit('updateSelected',{id:id,selected:selected})
            }
        },
        created(){
            this.getGoodsList()
        }
    }
</script>

<style scoped lang="less">
    .shopcar_container{
        background-color: #eee;
        overflow: hidden;
        .mui-card-content-inner{
            display: flex;
            /*纵向居中*/
            align-items: center;
            img{
                width: 50px;
                height: 50px;
            }
            h1{
                font-size: 14px;
            }
            .info{
                .item{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
                .price{
                    color: red;
                    font-weight: bolder;
                }
            }
        }
        .jiesuan {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .red {
                color: red;
                font-weight: bold;
                font-size: 16px;
            }
        }
    }
</style>