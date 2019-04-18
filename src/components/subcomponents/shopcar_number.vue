<template>
    <div>
        <div class="mui-numbox" data-numbox-step='1' data-numbox-min='1'>
            <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
            <input @change="countChanged" ref="num" :value="initCount" class="mui-numbox-input" type="number" readonly/>
            <button class="mui-btn mui-numbox-btn-plus" type="button">+</button>
        </div>
    </div>
</template>

<script>
    import mui from '../../lib/mui/js/mui.min.js'
    export default {
        name: "shopcar_number",
        props:['initCount','goodsId'],
        mounted(){
            //初始化数字框的控件
            mui('.mui-numbox').numbox();
        },
        methods:{
            //监听数据的改变
            countChanged(){
                this.$store.commit('updateCount',{id:this.goodsId,count:this.$refs.num.value})
            }
        },
    }
</script>

<style scoped>

</style>