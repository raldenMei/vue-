<template>
    <div>
        <comment :id="id"></comment>
    </div>
</template>

<script>
    //1.导入子组件
    import comment from '../subcomponents/comment.vue'

    export default {
        name: "goodssp",
        components:{
            comment
        },
        data(){
            return{
                id:this.$route.params.id,
            }
        },
    }
</script>

<style scoped>

</style>