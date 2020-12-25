<template>
    <div class="contain">
        <div class="header">
            <img :src="'./static/imgPhone/return-icon.png'" alt="返回" class="return" @click="back">
            <span class="title">消息</span>
            <span @click="maskFuc(true)">铃声修改</span>
        </div>
        <div class="main">
            <div class="item" v-for="item in cards.list">
                <div>
                    <span>{{item.title}}</span>
                    <span>{{item.time}}</span>
                </div>
                <div>
                    <span>{{item.content}}点击跳转至<span style="color: #446CEA;cursor: pointer;" @click="taskInfo(item.tasksId)">任务详情</span>页</span>
                </div>
            </div>
            <div class="pagination">
                <el-pagination
                    @size-change="handleSizeChange"
                    :page-size="10"
                    @current-change="handleCurrentChange"
                    background
                    layout="prev, pager, next"
                    :total="cards.totalRow">
                </el-pagination>
            </div>
        </div>
        <div class="voice" v-show="mask">
            <span class="cancel" @click="maskFuc(false)">取消</span>
            <div>
                <span>文件路径:</span>
                <el-select v-model="voiceId" placeholder="请选择" @change="voicePlay()">
                    <el-option
                        v-for="item in voiceArr"
                        :key="item.voiceId"
                        
                        :label="item.name"
                        :value="item.voiceId">
                    </el-option>
                </el-select>
            </div>
            <button class="confirm" @click="voiceConfirm">确认修改</button>
        </div>
        <div class="mask" v-show="mask">

        </div>
    </div>

</template>

<script>
    export default {
        data() {
            return {
                mask:false,
                voiceArr:[],
                voiceId:"",
                audio:"",
                cards: {
                    totalPage:1,
                    pageNumber: 1,
                    pageSize: 10,
                    list: [{
                        content: "11111wwww11",
                        id: 5,
                        tasksId: 1,
                        time: "2019/09/17 16:34",
                        title: "任务已被接取",
                        worksName: "已查看",
                    }]
                },
                page:1
            }
        },
        computed: {

        },
        watch: {

        },
        created(){
            this.getVoice();
            this.init();
        },
        mounted() {

        },
        destroy() {},
        methods: {
            //修改音乐
            getVoice(){
                this.$http.get("/api/voice/findAll","").then((res)=>{
                    if(res.code==1000){
                        this.voiceArr=res.data;
                    }
                }).catch((err)=>{

                })
            },
            voiceConfirm(){
                this.$message.closeAll();
                if(this.voiceId==""){
                    this.$message({
                        message: "请选择声音",
                        type: 'warning'
                    });
                }else{
                    var params={
                        userId:JSON.parse(this.$cookie.get("userInfo")).userId,
                        voiceId:this.voiceId
                    }
                    this.$http.get("/api/voice/updateUserVoice",params).then((res)=>{
                        if(res.code==1000){
                            this.$message({
                                message: res.msg,
                                type: 'success'
                            });
                            this.maskFuc(false);
                        }
                    }).catch((err)=>{

                    })
                }
                
            },
            voicePlay(){
                var voiceArr= this.voiceArr;
                var src=""
                for(var i=0;i<voiceArr.length;i++){
                    if(voiceArr[i].voiceId==this.voiceId){
                        src=voiceArr[i].url;
                        break;
                    }
                }
                this.audio = new Audio();
                this.audio.src = src;
                let playPromise; 
                playPromise = this.audio.play();
                // if (playPromise) {
                //     playPromise.then(() => {
                //         // 音频加载成功
                //         // 音频的播放需要耗时
                //     this.tiemr = setInterval(() => {
                //         second--;
                //         if (second <= 0) {
                //             this.audio.pause()
                //             clearInterval(this.tiemr);
                //         }
                //     }, 1000);
                //     }).catch((e) => {
                //     // 音频加载失败
                //         console.error(e);
                //     });
                // }
            },
            init() {
                var params={
                    userId:(JSON.parse(this.$cookie.get("userInfo"))).userId,
                    page:this.page

                };
                this.$http.get("/api/messages/findMyMessages",params).then((res)=>{
                    
                    if(res.code==1000){
                        this.cards=res.data;
                        //消除红点
                        this.clearRed()
                    }
                }).catch((err)=>{

                })
            },
            taskInfo(id){
                var data={id:id}
                this.$router.push({path:'/taskInfo',query:data})
            },
            clearRed(){
                this.$parent.newMessage();
            },
            handleSizeChange(val) {
                console.log(val)
            },
            handleCurrentChange(val) {
                this.page=val;
                this.init();
            },
            back(){
                this.$router.go(-1);
            },
            maskFuc(flag){
                this.mask=flag;
            }
        }
    }
</script>
<style scoped>
    .contain{
        width: 100%;
        height: 100%;
        position: relative;
    }
    .header {
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #FFFFFF;
    }
    
    .return {
        width: 8px;
        height: 14px;
        margin: 0 0 0 10px;
    }
    
    .title {
        font-size: 14px;
        margin: 0 0 0 -10px;
    }
    
    .header span:nth-child(2) {
        font-size: 18px;
    }
    
    .main {
        width: 100%;
        height: calc(100% - 50px);
        overflow-y: scroll;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;
    }
    
    .item {
        width: calc(100% - 16px);
        height: auto;
        background-color: #FFFFFF;
        margin: 8px 0 0 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: column;
    }
    
    .item>div {
        width: calc(100% - 24px);
        height: auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 12px 0 0 0;
    }
    
    .item>div:nth-child(1) span:nth-child(1) {
        font-size: 16px;
    }
    
    .item>div:nth-child(1) span:nth-child(2) {
        font-size: 10px;
        color: #999999;
        word-break:normal; 
        
    }
    
    .item>div:nth-child(2) {
        background-color: #F7F7F7;
        margin: 12px 0 12px 0;
        padding: 11px;
        width: calc(100% - 46px);
        /* width:auto;  */
        display:block; 
        white-space:pre-wrap;
        word-wrap : break-word ;
        overflow: hidden ;
    }
    
    .item>div:nth-child(2) span {
        color: #666666;
    }
    .pagination{
        float: right;
    }
    .voice{
        width: 300px;
        height: 238px;
        top:170px;
        left: 30px;
        position: absolute;
        background-color: white;
        z-index: 999;
        box-shadow:0px 0px 3px 0px rgba(0, 0, 0, 0.1);
        border-radius:5px;
    }
    .voice .cancel{
        font-size: 14px;
        color: #999999;
        margin: 20px 0 0 230px;
        display: block;
    }
    .voice>div{
        width: 340px;
        height: 50px;
        margin: 30px auto;
    }
    .voice button{
        width: 140px;
        height: 40px;
        background-color: #446CEA;
        color: white;
        border: 0;
        outline: none;
        font-size: 18px;
        cursor: pointer;
        border-radius: 5px;
        display: block;
        margin: 30px auto;
        cursor: pointer;
    }
    .mask{
        width: 100%;
        height: 100%;
        position: absolute;
        background-color: #000000;
        top:0;
        left: 0;
        opacity: 0.3;
    }
</style>