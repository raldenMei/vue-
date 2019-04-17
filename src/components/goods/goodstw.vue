<template>
    <div class="goodsTw_container">
       <h3>{{Twlist.title}}</h3>
        <hr>
        <div class="content" v-html="Twlist.content">

        </div>
    </div>
</template>

<script>
    export default {
        name: "goodstw",
        data(){
          return{
              id:this.$route.params.id,
              Twlist:[]
          }
        },
        methods:{
            getGoodsTw(){
                this.$http.get('api/goods/getdesc/'+this.id)
                    .then(result=>{
                        if (result.body.status===0){
                            this.Twlist=result.body.message[0]
                        }
                    })
            }
        },
        created(){
            this.getGoodsTw()
        }
    }
</script>

<style scoped lang="less">
    .goodsTw_container{
        width: 100%;
        padding: 5px;
        h3{
            color: deepskyblue;
            text-align: center;
            margin: 15px 0;
        }
    }
</style>