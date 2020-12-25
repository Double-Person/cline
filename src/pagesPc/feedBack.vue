<template>
    <div class="contain">
        <div class="select-div">
            <div class="word-div">
                <p>物料选择:</p>
                <span class="word-span">(可多选)</span>
            </div>
            <div class="select">
                <div v-for="item in data.select" :key="item.matterId">
                    <span>{{item.name}}</span>
                    <img v-bind:src="item.selectFlag?'./static/imgPc/checkbox-true-icon.png':'./static/imgPc/checkbox-icon.png'" alt="" @click="selectFuc(item.matterId)">
                </div>
            </div>
        </div>
        <div class="question-div">
            <div class="word-div">
                <p>问题补充:</p>
            </div>
            
            <div class="question">
                <quillEditor v-model="data.question" ></quillEditor> 
            </div>
        </div>
        <div>
            <button class="confirm" @click="confirm">提交反馈</button>
        </div>
        
    </div>
</template>

<script>
    // import cover1 from '@/assets/images/1.jpg'
    import { quillEditor } from 'vue-quill-editor'
    export default {
        components: {
            quillEditor
        },
        data() {
            return {
                data: {
                    select: [],
                    question: ""
                }

            }
        },
        computed: {

        },
        watch: {

        },
        mounted() {
            this.init();
            this.initData();
        },
        destroy() {},
        methods: {
            init() {
                var data = this.$route.query;
                console.log(data)
                this.$emit('init', data)
            },
            // 字典管理
            initData(){
                var params={
                    
                }
                this.$http.get("/api/matter/findMatter","").then((res)=>{
                    
                    if(res.code==1000){
                        var data=res.data;
                        var arr=[];
                        for(var i=0,l=data.length;i<l;i++){
                            var item={
                                matterId: data[i].matterId,
                                name: data[i].name,
                                selectFlag: false
                            };
                            arr.push(item)
                        }
                        
                        this.data.select=arr;
                    }
                    // this.$router.push({path:'/'})
                }).catch((err)=>{

                })
            },
            //选中
            selectFuc(id){
                var select=this.data.select;
                for(var i=0;i<select.length;i++){
                    if(select[i].matterId==id){
                        var flag=select[i].selectFlag;
                        select[i].selectFlag=!flag;
                        break;
                    }
                };
                this.data.select=select;
                
            },
            //提交
            confirm(){
                var select=this.data.select;
                var ids=[];
                for(var i=0;i<select.length;i++){
                    if(select[i].selectFlag){
                        ids.push(select[i].matterId)
                    }
                }
                
                var params={
                    userId:JSON.parse(this.$cookie.get("userInfo")).userId,
                    tasksId:Number(this.$route.query.id),
                    ids:ids.join(","),
                    contents:this.data.question
                }
                // params
                this.$message.closeAll();
                if(params.ids==""){
                    this.$message({
                        message: "物料不能为空",
                        type: 'warning'
                    });
                }else{
                    this.$http.post("/api/feedback/addFeedback",params).then((res)=>{
                    
                        if(res.code==1000){
                            this.$message({
                                message: res.msg,
                                type: 'success'
                            });
                        }
                        this.$router.push({path:'/feedBackResult',query:{from:"feedBack"}})
                    }).catch((err)=>{

                    })
                }
            }
        }
    }
</script>

<style scoped>
    .contain {
        width: 100%;
        height: 880px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        overflow-y: scroll;
    }
    
    .select-div {
        margin: 83px 0 61px 0;
    }
    
    .word-div {
        width: 134px;
    }
    
    .contain p {
        font-size: 18px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        text-align: center;
        margin: 10px 0 0 0;
    }
    
    .word-span {
        font-size: 12px;
        font-weight: 400;
        color: rgba(176, 176, 176, 1);
        display: block;
        width: 100%;
        text-align: center;
    }
    
    .contain>div {
        display: flex;
        justify-content: flex-start;
    }
    
    .select {
        width: 540px;
        background: rgba(255, 255, 255, 1);
        border: 2px solid rgba(218, 226, 234, 1);
        padding: 10px 0;
    }
    
    .select span {
        font-size: 18px;
        color: #333333;
    }
    
    .select div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 30px;
        margin: 0 0 10px 0;
    }
    
    .select div img {
        width: 24px;
        height: 24px;
        cursor: pointer;
    }
    
    .question {
        width: 540px;
    }
    
    .confirm {
        width: 240px;
        height: 60px;
        background: rgba(68, 108, 234, 1);
        border-radius: 30px;
        border: 0;
        font-size: 24px;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        margin: 10px 0 0 130px;
        outline: none;
    }
</style>
<style>
    .el-textarea__inner {
        font-size: 18px;
        color: #B0B0B0;
        border: 2px solid rgba(218, 226, 234, 1);
    }
</style>