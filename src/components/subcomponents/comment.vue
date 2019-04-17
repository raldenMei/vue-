<template>
    <div class="sub_container">
        <h4>发表评论</h4>
        <hr>
        <textarea v-model="msg" placeholder="请输入评论内容(最多吐槽120字)" maxlength="120"></textarea>

        <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>

        <div class="list" v-for="(item,i) in comments" :key="item.id">
            <div class="user">
                第{{i+1}}楼  用户：{{item.user_name}}
                发表时间：{{item.add_time | dateFormat}}
            </div>
            <div class="body">
                {{item.content}}
            </div>
        </div>

        <!--加载更多-->
        <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui'
    export default {
        name: "comment",
        data(){
            return{
                comments:[] ,//评论数据
                msg:'',//绑定model值
                pageIndex:1//默认展示第一条的数据
            }
        },
        props:['id'],
        methods:{
            getComment(){
                console.log(this.id);
                this.$http.get('api/getcomments/'+this.id+'?pageindex='+this.pageIndex)
                    .then(result=>{
                        if (result.body.status===0){
                            // console.log(result.body);
                            // this.comments=result.body.message
                            //拼接新数组
                            this.comments=this.comments.concat(result.body.message)
                        }
                    })
            },
            postComment(){
                if (this.msg.trim().length==0) {
                    Toast('评论内容不能为空')
                    return false
                }
                //参数①：地址  ②：交给服务器的数据对象{content：this.msg}  🌂：定义提交的格式为普通表单的格式
                this.$http.post('api/postcomment/'+this.id,{content:this.msg},{emulateJSON:true})
                    .then(result=>{
                        if (result.body.status===0){
                            //拼接出评论对象
                            let user={
                                user_name:'匿名用户',
                                add_time:Date.now(),
                                content:this.msg
                            }
                            this.comments.unshift(user);
                            this.msg=''
                        }
                    })
            },
            //点击加载更多
            getMore(){
                this.pageIndex++;
                this.getComment()
            }
        },
        created(){
            this.getComment();
        }
    }
</script>

<style scoped lang="less">
    .sub_container{
        textarea{
            height: 80px;
            margin: 0;
            font-size: 14px;
        }
        .list{
            margin: 5px 0;
            .user{
                line-height: 30px;
                background-color: #ccc;
                font-size: 14px;
            }
            .body{
                line-height: 35px;
                text-indent: 2em;
            }
        }
    }
</style>