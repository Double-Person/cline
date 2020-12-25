<template>
        <div class="contain">
            <div class="header">
                <img :src="'./static/imgPhone/return-icon.png'" alt="返回" class="return" @click="back">
                <span class="title">任务详情</span>
                <img :src="'./static/imgPhone/more.png'" alt="更多" class="more" @click="showMore">
            </div>
            <div class="more-div" v-if="moreShow">
                <span @click="feedBack" v-if="data.canFeedback">物料反馈</span>
                <span @click="revokeTasks" v-if="data.canRevoke">任务撤回</span>
                <span @click="acceptTasks" v-if="data.canAccept">接取任务</span>
            </div>
            <div class="main">
                <div>
                    <div>
                        <span>客户名称：</span>
                    </div>
                    <div>
                        <span class="ellipsis">{{data.name}}</span>
                    </div>
                </div>
                <div>
                    <div>
                        <span>时间限制：</span>
                    </div>
                    <div>
                        <span style="color: #000000;font-size: 16px">{{data.createTime}} <span style="margin: 0 12px;color:#333333;font-size: 12px">至</span> {{data.endTime}}</span>
                    </div>
                </div>
                <div>
                    <div>
                        <span>任务描述：</span>
                    </div>
                    <div v-html="data.describes" style="word-wrap: break-word">
                        
                    </div>
                </div>
                <div>
                    <div>
                        <span>任务价格：</span>
                    </div>
                    <div>
                        <span>{{data.price}} 元</span>
                    </div>
                </div>
                <div>
                    <div>
                        <span>任务环节：</span>
                    </div>
                    <div>
                        <div v-for="(item,index) in data.steps">
                            <div class="step-circle">
                                <img v-bind:src="item.works==7?'./static/imgPc/step-true-icon.png':'./static/imgPc/step-false-icon.png'" alt="">
                                <span>{{item.name}}</span>
                                <span v-bind:id="item.endStatus==2?'canClick':'cantClick'" @click="endStatus(item.endStatus,item.id)">{{item.endStatusText}}</span>
                            </div>
                            <div class="step-line" v-if="index!=data.steps.length-1">
                                <img v-bind:src="item.works==7?'./static/imgPc/line-true-icon.png':'./static/imgPc/line-false-icon.png'" alt="">
                                <span>{{item.time}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <span> 执行人：</span>
                    </div>
                    <div class="executive-div" v-for="item in data.executors">
                        <div class="executive-item">
                            <img v-bind:src="'./static/imgPhone/head-icon.png'" alt="head">
                            <span>{{item.userName}}</span>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    
    </template>

<script>
    export default {
        data() {
            return {
                moreShow:false,
                data:{
                    canAccept: false,
                    canFeedback: false,
                    canRevoke: false,
                    name:"",
                    createTime:"",
                    endTime:"",
                    describes:"",
                    price:"",
                    step:[{works:7,name:"",time:""}],//name: "步骤1" ,time: "2019-09-16 21:44:02" ,works: 7
                    executors:[{faceicon:"",userName:"",userId:""}]
                }

            }
        },
        computed: {

        },
        watch: {

        },
        mounted() {
            this.init();
        },
        destroy() {},
        methods: {
            showMore(){
                this.moreShow=!this.moreShow;
            },
            init(){
                var params={
                    tasksId:this.$route.query.id,
                    userId:JSON.parse(this.$cookie.get("userInfo")).userId
                }
                this.$http.get("/api/tasks/findTasksById",params).then((res)=>{
                    
                    if(res.code==1000){
                        var resData=res.data;
                        var data= { name:"",
                                    createTime:"",
                                    endTime:"",
                                    describes:"",
                                    price:"",
                                    steps:"",
                                    executors:""
                                }
                        data.canAccept=resData.canAccept;
                        data.canFeedback=resData.canFeedback;
                        data.canRevoke=resData.canRevoke,
                        data.name=resData.tasks.name;
                        data.createTime=resData.tasks.createTime;
                        data.endTime=resData.tasks.endTime;
                        data.describes=resData.tasks.describes;
                        data.price=resData.tasks.price;
                        var steps=resData.steps;
                        var endStatus=["已完成","点击完成","未完成","已过期"];
                        var stepsArr=[]
                        for(var i=0;i<steps.length;i++){
                            var stepItem={
                                canEnd: steps[i].canEnd,
                                endStatusText:endStatus[steps[i].endStatus-1],
                                endStatus: steps[i].endStatus,
                                id: steps[i].id,
                                name: steps[i].name,
                                works: steps[i].works,
                            }
                            stepsArr.push(stepItem)
                        }
                        data.steps=stepsArr;
                        data.executors=resData.executors;


                        console.log(data.steps.slice(0,data.steps.length-1))
                        this.data=data;
                    }
                    // this.$router.push({path:'/'})
                }).catch((err)=>{

                })
            },
            feedBack(){
                this.$router.push({path:'/feedBack',query:{id:this.$route.query.id}})
            },
            //接取任务
            acceptTasks(){
                var params={
                    tasksId:this.$route.query.id,
                    userId:JSON.parse(this.$cookie.get("userInfo")).userId
                }
                this.$http.get("/api/tasks/acceptTasks",params).then((res)=>{
                    if(res.code==1000){
                        this.$message({
                            message: res.msg,
                            type: 'success'
                        });
                    }else if(res.code==1001){
                        this.$message({
                            message: res.msg,
                            type: 'warning'
                        });
                    }
                    
                    // this.$router.push({path:'/'})
                }).catch((err)=>{

                })
            },
            //撤回任务
            revokeTasks(){
                var params={
                    tasksId:this.$route.query.id
                }
                this.$http.get("/api/tasks/revokeTasks",params).then((res)=>{
                    if(res.code==1000){
                        this.$message({
                            message: res.msg,
                            type: 'success'
                        });
                    }else if(res.code==1001){
                        this.$message({
                            message: res.msg,
                            type: 'warning'
                        });
                    }
                    // this.$router.push({path:'/'})
                }).catch((err)=>{

                })
            },
            getAccept(){

            },
            endStatus(status,id){
                if(status==2){
                    var params={
                        stepsId:id,
                        userId:JSON.parse(this.$cookie.get("userInfo")).userId
                    }
                    this.$http.get("/api/links/finishLinks",params).then((res)=>{
                        if(res.code==1000){
                            this.$message({
                                message: res.msg,
                                type: 'success'
                            });
                            setTimeout(()=>{
                                this.$router.go(0);
                            },2000)
                            
                        }else if(res.code==1001){
                            this.$message({
                                message: res.msg,
                                type: 'warning'
                            });
                        }
                        // this.$router.push({path:'/'})
                    }).catch((err)=>{

                    })
                }
            },
            // /api/tasks/revokeTasks
            // /api/tasks/acceptTasks
            back(){
                this.$router.go(-1);
            }
        }
    }
</script>
<style scoped>
    .contain {
        background-color: #FFFFFF;
        width: 100%;
        height: 100%;
        overflow-y: scroll;
    }
    
    .contain span {
        color: #333333;
        font-size: 12px;
    }
    
    .main>div {
        margin: 0 0 40px 10px;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
    }
    
    .contain .header {
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #FFFFFF;
        margin: 0;
        border-bottom: 4px solid #ECEFF6;
    }
    
    .contain .header .return {
        width: 8px;
        height: 14px;
        margin: 0 0 0 10px;
    }
    
    .contain .header .title {
        font-size: 20px;
    }
    
    .contain .header .more {
        width: 4px;
        margin: 0 10px 0 0;
    }
    
    .more-div {
        position: absolute;
        top: 50px;
        right: 0;
        width: 80px;
        height: 54px;
        box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.1);
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-direction: column;
        background-color: #FFFFFF;
    }
    
    .more-div span {
        color: #000000;
        font-size: 10px;
    }
    
    .main {
        width: 100%;
        height: calc(100% - 54px);
        overflow-y: scroll;
    }
    
    .main>div>div:nth-child(1) {
        width: 80px;
    }
    
    .main>div>div:nth-child(1) span {
        color: #BCBCBC
    }
    
    .main>div>div:nth-child(2) {
        width: calc(100% - 100px);
    }
    
    .main>div>div:nth-child(2) span {
        color: #000000;
    }
    #canClick{
        color: #25b42f;
        cursor: pointer;
        font-size: 12px;
        margin: 0 0 0 20px;
    }
    #cantClick{
        color: #999999;
        cursor: not-allowed;
        font-size: 12px;
        margin: 0 0 0 20px;
    }
    .step-circle {
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    
    .step-circle img {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        margin: 0 10px 0 0;
    }
    
    .step-line {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        margin: 0 0 8px 0;
    }
    
    .step-line img {
        width: 3px;
        height: 35px;
        margin: 0 19px 0 8px;
    }
    
    .step-line span {
        font-size: 10px;
        color: #BCBCBC;
        line-height: 10px;
    }
    
    .executive-div {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
    }
    
    .executive-div img {
        width: 38px;
        height: 38px;
        border-radius: 50%;
    }
    
    .executive-div span {
        font-size: 12px;
        color: #BCBCBC;
    }
    
    .executive-item {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin: 0 43px 0 0;
    }
    .ellipsis{
        width:200px; 
        display: block;
        overflow:hidden; 
        text-overflow:ellipsis; 
        white-space:nowrap; 
        word-break:keep-all; 
    }
</style>