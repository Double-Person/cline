<template>
    <div class="contain">
        <div class="title">
            <div>
                <img :src="'./static/imgPhone/more-white.png'" alt="更多" class="more" @click="menu">
                <div class="more-div" v-show="moreDiv">
                    <p @click="linkTo(0)">物料反馈</p>
                    <p @click="linkTo(1)">货款管理</p>
                </div>
            </div>
            <!-- <span>物料生产</span> -->
            <span v-if="query.style==1">任务</span>
            <span v-if="query.style==2">我的</span>
            <div>
                <img :src="'./static/imgPhone/message-icon.png'" alt="message" @click="goMessage">
                <div class="message-active" v-if="haveNewMessage">

                </div>
            </div>
        </div>
        <div class="userInfo">
            <img :src="'./static/imgPhone/head-icon.png'" alt="">
            <span>{{userInfo.userName}}</span>
        </div>
        
        <div class="header" v-show="query.style==1">
            <div class="item" @click="taskConditionFuc(1)">
                <span v-bind:class="query.taskCondition==1?'active-span':''">未完成</span>
            </div>
            <div class="item" @click="taskConditionFuc(2)">
                <span v-bind:class="query.taskCondition==2?'active-span':''">已结束</span>
            </div>
            <div class="item" @click="taskConditionFuc(3)">
                <span v-bind:class="query.taskCondition==3?'active-span':''">已过期</span>
            </div>
        </div>
        
        <div class="header" v-show="query.style==2">
            <div class="item" @click="giveOrGet(true)">
                <span v-bind:class="query.giveOrGet==true?'active-span':''">我发布的</span>
            </div>
            <div class="item" @click="giveOrGet(false)">
                <span v-bind:class="query.giveOrGet==false?'active-span':''">我接取的</span>
            </div>
        </div>
        <div class="mine-header" v-show="query.style==2">
            <div v-bind:class="query.taskCondition==1?'mine-acitve-div':'mine-div'" @click="taskConditionFuc(1)">
                <span>未完成</span>
            </div>
            <div v-bind:class="query.taskCondition==2?'mine-acitve-div':'mine-div'" @click="taskConditionFuc(2)">
                <span>已结束</span>
            </div>
            <div v-bind:class="query.taskCondition==3?'mine-acitve-div':'mine-div'" @click="taskConditionFuc(3)">
                <span>已过期</span>
            </div>
        </div>
        <div class="main">
            <div id="contain">
                <div class="search">
                    <div>
                        <img :src="'./static/imgPhone/search-icon.png'" alt="search" @click="refreshData">
                        <input type="text" placeholder="搜索" v-model="query.keywords"/>
                    </div>
                </div>
                <!-- 时间查询 -->
                <div class="date">
                    <img :src="'./static/imgPc/left-icon.png'" alt="left" @click="dateChange(1)">
                    <span v-for="item in queryDate" :key="item.id" v-bind:class="item.selected?'dateActive':''" @click="clickDate(item.id)">{{item.text}}</span>
                    <img :src="'./static/imgPc/right-icon.png'" alt="left" @click="dateChange(2)">
                </div>
                <div class="cards">
                    <div class="card-item" v-for="item in cards.list" :key="item.id" v-if="cards.list.length>0" v-bind:class="item.urgent?'shine-box':''" @click="cardInfo(item.id)">
                        <span class="item-num">NO.{{item.number}}</span>
                        <p class="item-name">{{item.name}}</p>
                        <span class="time">
                            <span class="time-left">{{item.startTime}}</span>
                            <span class="time-right">{{item.endTime}}</span>
                        </span>
                        <div class="progress">
                            <div class="p_left" :style="{width:item.ratio*100+'%'}"></div>
                            <div class="p_right" :style="{width:(1-item.ratio)*100+'%'}"></div>
                        </div>
                    </div>
                    <div v-if="cards.list.length==0" class="blankDiv">
                        <img :src="'./static/imgPhone/nodata.png'" alt="">
                        <span>暂时没有数据</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
            <div @click="styleFuc(1)">
                <img v-bind:src="query.style==1?'./static/imgPhone/task-icon.png':'./static/imgPhone/task-default-icon.png'" alt="任务">
                <span>任务</span>
            </div>
            <div class="add-item">
                <img :src="'./static/imgPhone/add-icon.png'" alt="增加" @click="addTask">
            </div>
            <div @click="styleFuc(2)">
                <img v-bind:src="query.style==2?'./static/imgPhone/mine-icon.png':'./static/imgPhone/mine-default-icon.png'" alt="我的">
                <span>我的</span>
            </div>
        </div>
    </div>

</template>
<style scoped>
    .contain {
        width: 100%;
        height: 100%;
    }
    
    .title {
        display: flex;
        justify-content: space-between;
        justify-items: center;
        align-items: center;
        padding: 0 10px;
        background-color: #446CEA;
        height: 46px;
    }
    .title .more{
        width: 4px;
        height: 20px;
    }
    .more-div{
        background-color: red;
        position: absolute;
        top:30px;
        left: 0;
        width: 70px;
        height: 60px;
        background: rgba(255,255,255,1);
        border: 2px solid rgba(240,241,245,1);
        -webkit-box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.05);
        box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.05);
        border-radius: 5px 5px 5px 5px;
        display: flex;
        justify-content: space-around;
        justify-items: center;
        align-items: center;
        flex-direction: column;
    }
    .more-div{

    }
    .title span {
        color: white;
    }
    
    .title span:nth-child(2) {
        font-size: 20px;
    }
    
    .title>div {
        width: 12px;
        height: 14px;
        position: relative;
    }
    
    .title>div img {
        width: 100%;
        height: 100%;
    }
    
    .title>div .message-active {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background-color: #FF1A25;
        position: absolute;
        top: 1px;
        right: -1px;
    }
    .userInfo{
        width: 100%;
        height: 120px;
        background-color: #FFFFFF;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .userInfo img{
        width: 60px;
        height: 60px;
        border-radius: 50%;
        margin: 0 40px;
    }
    .userInfo span{
        font-size: 16px;
    }
    .header {
        width: 100%;
        height: 40px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        background-color: #FFFFFF;
    }
    
    .header .item {
        width: 50%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    .header .item span {
        font-size: 12px;
        color: #666666;
        line-height: 40px;
        
    }
    .mine-header{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin: 0 0 0 10px;
        height: 40px;
    }
    .mine-header .mine-acitve-div{
        width: 60px;
        height: 28px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #446CEA;
    }
    .mine-header .mine-div{
        width: 60px;
        height: 28px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .mine-header .mine-acitve-div span{
        font-size: 12px;
        line-height: 12px;
        color: #E0E0E0;
    }
    .mine-header .mine-div span{
        font-size: 12px;
        line-height: 12px;
        /* color: #E0E0E0; */
    }
    .dateActive{
        background-color: #446CEA !important;
        color: white;
    }
    .main {
        width: 100%;
        height: calc(100% - 206px);
        background-color: #EEF1F8;
        overflow-y: scroll;
    }
    .active-span{
        color: #446CEA !important;
        border-bottom: 2px solid #446CEA;
    }
    /* main */
    #contain {
        width: calc(100% - 20px);
        height: calc(100% - 20px);
        padding: 10px;
    }
    
    #contain .search {
        width: 100%;
        height: 34px;
        border-radius: 17px;
        background-color: #FFFFFF;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    
    #contain .search div {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    
    #contain .search img {
        width: 15px;
        height: 15px;
    }
    
    #contain .search input {
        width: 80%;
        height: 100%;
        border: 0;
        outline: 0;
    }
    
    #contain .date {
        width: 100%;
        height: 40px;
        display: flex;
        justify-content: space-between;
        align-content: center;
        align-items: center;
    }
    
    #contain .date span {
        display: block;
        width: 47px;
        height: 20px;
        border-radius: 10px;
        background-color: #FFFFFF;
        text-align: center;
    }
    #contain .date img {
        display: block;
        /* width: 47px; */
        height: 20px;
        border-radius: 10px;
        /* background-color: #FFFFFF; */
        text-align: center;
    }
    
    #contain .cards {
        width: 100%;
        /* display: flex; */
        /* justify-content: flex-start;
        flex-direction: row;
        align-items: center;
        flex-wrap: wrap; */
        display: flex;
        display: -webkit-flex;
        justify-content: flex-start;
        flex-direction: row;
        flex-wrap: wrap;
    }
    
    #contain .cards .card-item {
        width: 26%;
        height: 79px;
        padding: 5px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(224, 224, 224, 1);
        box-shadow: 0px 4px 6px 0px rgba(0, 0, 0, 0.05);
        border-radius: 9px;
        margin: 0 10px 10px 0;
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-direction: column;
        text-align: left;
    }
    #contain .cards .shine-box{animation: glow 500ms ease-out infinite alternate; }
    @keyframes glow {
        0% {
            border-color: #ff1600;
            box-shadow: 0 0 5px rgba(255,22,0,.2), inset 0 0 5px rgba(255,22,0,.1), 0 1px 0 #ff1600;
        }
        100% {
            border-color: #efefef;
            box-shadow: 0 0 20px rgba(255,255,255,.6), inset 0 0 10px rgba(255,255,255,.4), 0 1px 0 #efefef;
        }
    }
    #contain .cards .card-item>span,
    #contain .cards .card-item p {
        display: block;
        width: 100%;
        text-align: left;
        line-height: 16px;
    }
    
    #contain .time {
        display: block;
        width: 100%;
        text-align: left;
    }
    
    #contain .item-num {
        font-size: 6px;
        font-weight: 400;
        color: rgba(178, 178, 178, 1);
    }
    
    #contain .item-name {
        font-size: 12px;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        display: block;
        overflow:hidden; 
        text-overflow:ellipsis; 
        white-space:nowrap; 
        word-break:keep-all; 
        width: 200px;
    }
    
    #contain .time-left {
        background: rgba(255, 195, 72, 1);
        border-radius: 7px 7px 7px 7px;
        color: white;
        font-size: 12px;
        padding: 4px 4px;
        line-height: 12px;
    }
    
    #contain .time-right {
        font-size: 12px;
        font-weight: 400;
        color: rgba(178, 178, 178, 1);
    }
    
    #contain .progress {
        width: 100%;
        height: 10px;
        position: relative;
        border-radius: 5px;
    }
    
    #contain .progress .p_left {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        background: linear-gradient(90deg, rgba(24, 144, 255, 1), rgba(44, 233, 255, 1));
    }
    
    #contain .progress .p_right {
        position: absolute;
        top: 0;
        right: 0;
        z-index: 2;
        background-color: #E0E0E0;
        height: 100%;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
    }
    .blankDiv{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    .blankDiv img{
        width: 100px;
        height: 100px;
        margin: 50px 0 20px 0;
    }
    .blankDiv span{
        color: #666666;
    }
    .footer {
        width: 100%;
        height: 52px;
        background-color: #FFFFFF;
        position: absolute;
        bottom: 0;
        display: flex;
        justify-content: space-around;
        align-items: center;
        z-index: 999;
    }
    
    .footer>div {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    
    .footer>div:nth-child(2) {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: 1px solid rgba(224, 224, 224, 1);
        box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.1);
        position: relative;
        top: -7px;
        background-color: #FFFFFF;
    }
    
    .footer img {
        width: 20px;
        height: 20px;
    }
    
    .footer span {
        font-size: 10px;
        line-height: 10px;
        margin: 7px 0 0 0;
        color: #CECECE;
    }
</style>
<script>
    export default {
        data() {
            return {
                moreDiv:false,
                queryDate:[],
                userInfo:{
                    loginTime: "2019-09-12 18:09:27",
                    nickName: "admin",
                    password: "111111",
                    phone: "13112345678",
                    types: 3,
                    userId: 0,
                    userName: "admin",
                    works: 1
                },
                haveNewMessage:false,
                query:{
                    style:1,//1 任务 2 我的 
                    giveOrGet:true,//true 我发布的 false 我截取的
                    taskCondition:1,//1 未完成 2 已結束 3 已過期,
                    urgent:0,
                    time:'',
                    userId:0,
                    keywords:""
                },
                cards: {
                    pageNumber: 10,
                    pageSize: 10,
                    page: 1,
                    list: []
                },
                datePage:0,

            }
        },
        computed: {

        },
        watch: {

        },
        mounted() {
            this.init();
            this.dateInit(1);
            this.newMessage();
            this.interval=setInterval(()=>{
                this.newMessage();
            },1000*60*5)
            this.refreshData();
            if(this.$cookie.get("userInfo")){
                this.userInfo= JSON.parse(this.$cookie.get("userInfo")) 
                this.query.userId=this.userInfo.userId
            }
        },
        destroy() {
            clearInterval(this.interval)
        },
        methods: {
            goMessage(){
                this.$router.push({path:'/message'})
            },
            // dateInit(id){
            //     // var dd = new Date();
            //     // dd.setDate(dd.getDate()+6);//获取AddDayCount天后的日期
            //     // console.log(dd)
            //     var dateXiuzhen=0;
            //     if(id==1){
            //         //未完成，该往后推时间
            //     }else{
            //         //已完成，该往前推时间
            //         dateXiuzhen=-5;
            //     }
            //     var queryDate=[];
            //     var selected= false;
            //     for(var i=0;i<5;i++){
            //         var d=new Date();
            //         d.setDate(d.getDate()+dateXiuzhen+i);
            //         var y_value = d.getFullYear();
            //         var m_value = d.getMonth();
            //         var d_value = d.getDate();
                    
            //         var month = (m_value+1)<10 ? '0'+(m_value+1) : (m_value+1);
            //         var day = d_value<10 ? '0'+d_value : d_value;
            //         if(i==0){
            //             selected=true;
            //         }else{
            //             selected=false;
            //         }
            //         var data={id:i,value:'',text:m_value+1+":"+day,selected:selected}
            //         data.value=y_value+"-"+month+"-"+day;
                    
            //         queryDate.push(data);
            //     }
            //     this.queryDate=queryDate;
            //     //初始化查询时间
            //     this.query.time=queryDate[0].value;
            // },

            dateChange(type){
                var datePage=this.datePage
                if(type==1){
                    datePage-=5;
                }else{
                    datePage+=5;
                }
                this.datePage=datePage;
                this.dateInit();
            },
            dateInit(){
                var dateXiuzhen=this.datePage-2;
                var queryDate=[];
                var selected= false;
                for(var i=0;i<5;i++){
                    var d=new Date();
                    d.setDate(d.getDate()+dateXiuzhen+i);
                    var y_value = d.getFullYear();
                    var m_value = d.getMonth();
                    var d_value = d.getDate();
                    
                    var month = (m_value+1)<10 ? '0'+(m_value+1) : (m_value+1);
                    var day = d_value<10 ? '0'+d_value : d_value;
                    if(i==2){
                        selected=true;
                    }else{
                        selected=false;
                    }
                    var data={id:i,value:'',text:m_value+1+"/"+day,selected:selected}
                    data.value=y_value+"-"+month+"-"+day;
                    
                    queryDate.push(data);
                }
                this.queryDate=queryDate;
                this.query.time=this.queryDate[2].value;
            },

            init() {

            },
            newMessage(){
                if(this.$cookie.get("userInfo")){
                    this.userInfo= JSON.parse(this.$cookie.get("userInfo")) 
                    this.query.userId=this.userInfo.userId
                    var params={
                        userId:JSON.parse(this.$cookie.get("userInfo")).userId
                    }
                    this.$http.get("/api/messages/findUnread",params).then((res)=>{
                        if(res.code==1000){
                            this.haveNewMessage=res.data.data;
                            if(res.data.data==true){
                                
                                // if(flag){
                                    this.voiceRemind(res.data.voice);
                                // }else{
                                //     // this.voiceRemind(res.data.voice);
                                // }
                                
                            }
                            
                        }
                    }).catch((err)=>{

                    })
                }
                
            },
            voiceRemind(src){
                this.audio = new Audio();
                this.audio.src = src;
                let playPromise; 
                playPromise = this.audio.play();
                // this.audio.pause();
                var that=this;
            },
            //1 任务 2 我的 
            styleFuc(id){
                this.query.style=id;
                this.refreshData();
            },
            ///1 未完成 2 已結束 3 已過期,
            taskConditionFuc(id){
                this.query.taskCondition=id;
                // this.dateInit(id);
                this.refreshData();
                
            },
            //true 我发布的 false 我截取的
            giveOrGet(flag){
                this.query.giveOrGet=flag;
                this.refreshData();
            },
            //时间
            clickDate(id){
                var queryDate=this.queryDate;
                for(var i=0;i<queryDate.length;i++){
                    if(i==id){
                        queryDate[i].selected=true;
                    }else{
                        queryDate[i].selected=false
                    }
                }
                this.queryDate=queryDate;
                this.query.time=queryDate[id].value;
                this.refreshData();
            },
            refreshData(){
                var params={
                    urgent:this.query.urgent,
                    time:this.query.time,
                    page:1,
                    type:1,
                    userId:this.query.userId,
                    keywords:this.query.keywords
                
                };
                if(this.query.style==2){
                    //我的
                    console.log("wd");
                    // /** 所有未完成 */
                    // public static final int allUnfinished = 1;
                    //  /** 所有已完成 */
                    //  public static final int allFinished = 2;
                    //  /** 所有已过期 */
                    //  public static final int allOverdue = 3;
                    //  /** 我接受的未完成 */
                    //  public static final int myAcceptUnfinished = 4;
                    //  /** 我接受的已完成 */
                    //  public static final int myAcceptFinished = 5;
                    //  /** 我接受的已过期 */
                    //  public static final int myAcceptOverdue = 6;
                    //  /** 我发布的未完成 */
                    //  public static final int myPublisUnfinished = 7;
                    //  /** 我发布的已完成 */
                    //  public static final int myPublisFinished = 8;
                    //  /** 我发布的已过期 */
                    //  public static final int myPublisOverdue = 9;
                    if(this.query.taskCondition==1){
                        // params.type=
                        //未完成
                        if(this.query.giveOrGet){
                            //我发布的
                            params.type=7
                        }else{
                            //我截取的
                            params.type=4
                        }
                    }else if(this.query.taskCondition==2){
                        //已完成
                        if(this.query.giveOrGet){
                            //我发布的
                            params.type=8
                        }else{
                            //我截取的
                            params.type=5
                        }
                    }else if(this.query.taskCondition==3){
                        //已过期
                        if(this.query.giveOrGet){
                            //我发布的
                            params.type=9
                        }else{
                            //我截取的
                            params.type=6
                        }
                    }
                }else{
                    console.log("xt")
                    if(this.query.taskCondition==1){
                        params.type=1
                        //未完成
                    }else if(this.query.taskCondition==2){
                        params.type=2
                        //已完成
                    }else if(this.query.taskCondition==3){
                        params.type=3
                        //已过期
                    }
                }
                this.$http.get("/api/tasks/findTasks",params).then((res)=>{
                    if(res.code==1000){
                        this.cards=res.data
                    }
                    // this.$router.push({path:'/'})
                }).catch((err)=>{

                })
            },
            addTask(){
                this.$router.push({path:'/addTask'})
            },
            cardInfo(id){
                var data={id:id}
                this.$router.push({path:'/taskInfo',query:{id:id,bookmark: false,condition: false}})
            },
            menu(){
                this.moreDiv=!this.moreDiv
            },
            linkTo(num){
                this.moreDiv=!this.moreDiv
                if(num==0){
                    this.$router.go(0)
                }else{
                    this.$router.push({path:'/getCharge'})
                }
            }
        }
    }
</script>