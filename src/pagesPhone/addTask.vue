<template>
    <div class="contain">
        <div class="header">
            <img :src="'./static/imgPhone/return-icon.png'" alt="返回" class="return" @click="returnFuc">
            <span class="title">新建任务</span>
            <span @click="submit">完成</span>
        </div>
        <div class="main">
            <div class="name">
                <p>客户名称</p>
                <input type="text" placeholder="请输入客户名称" v-model="form.name"/>
                <div>
                    <img v-bind:src="form.urgent==5?checkboxTrue:checkbox" alt="选中框" v-model="form.urgent" @click="urgentChange">
                    <span>特殊加急处理</span>
                </div>
            </div>
            <div class="check">
                <p>物料核查</p>
                <ul>
                    <li>
                    <img v-bind:src="form.urgent==5?checkboxTrue:checkbox" alt="选中框" v-model="form.urgent" @click="urgentChange">

                        <span>铝材</span>
                    </li>
                    <li>
                        <img v-bind:src="form.urgent==5?checkboxTrue:checkbox" alt="选中框" v-model="form.urgent" @click="urgentChange">
                        <span>灯罩</span>
                    </li>
                    <li>
                        <img v-bind:src="form.urgent==5?checkboxTrue:checkbox" alt="选中框" v-model="form.urgent" @click="urgentChange">
                        <span>堵头</span>
                    </li>
                    <li>
                        <img v-bind:src="form.urgent==5?checkboxTrue:checkbox" alt="选中框" v-model="form.urgent" @click="urgentChange">
                        <span>卡扣</span>
                    </li>
                    <li>
                        <img v-bind:src="form.urgent==5?checkboxTrue:checkbox" alt="选中框" v-model="form.urgent" @click="urgentChange">
                        <span>弹簧</span>
                    </li>
                    <li>
                        <img v-bind:src="form.urgent==5?checkboxTrue:checkbox" alt="选中框" v-model="form.urgent" @click="urgentChange">
                        <span>卡簧</span>
                    </li>
                    <li>
                        <img v-bind:src="form.urgent==5?checkboxTrue:checkbox" alt="选中框" v-model="form.urgent" @click="urgentChange">
                        <span>吊绳</span>
                    </li>
                    <li>
                        <img v-bind:src="form.urgent==5?checkboxTrue:checkbox" alt="选中框" v-model="form.urgent" @click="urgentChange">
                        <span>其他</span>
                    </li>
                </ul>
            </div>
            <div class="style">
                <p>类型</p>
                <el-select v-model="form.types" placeholder="请选择">
                    <el-option
                        v-for="item in types"
                        :key="item.typesId"
                        :label="item.name"
                        :value="item.typesId">
                    </el-option>
                </el-select>
            </div>
            <div class="time">
                <p>时限</p>
                <div>
                    <!-- <el-date-picker
                        v-model="form.createTime"
                        @change="dateChange(1)"
                        type="date"
                        placeholder="起始年-月-日">
                    </el-date-picker>
                    <span>至</span> -->
                    <el-date-picker
                        v-model="form.endTime"
                        @change="dateChange(2)"
                        type="date"
                        placeholder="结束年-月-日">
                    </el-date-picker>
                </div>
            </div>
            <div class="discribe">
                <p>描述</p>
                <div>
                    <quillEditor v-model="form.describes"></quillEditor> 
                </div>
                
            </div>
            <div class="price">
                <p>价格</p>
                <input type="text" v-model="form.price">
            </div>
            <div>
                <p>环节<span style="font-size: 12px;color:#BCBCBC">(可多选)</span></p>
                <div>
                    <div class="link" v-for="item in steps" :key="item.stepsId">
                        <span>{{item.name}}</span>
                        <img v-bind:src="item.selected?checkboxTrue:checkbox" alt="选中框" @click="selectStep(item.stepsId)">
                    </div>
                </div>
            </div>
            <div>
                <p>执行人<span style="font-size: 12px;color:#BCBCBC">(可多选)</span></p>
                <div>
                    <div class="carry-search">
                        <input type="text" name="" id="" placeholder="可搜索成员名字" v-model="usersKeywords">
                        <img :src="'./static/imgPc/search-icon.png'" alt="搜索" @click="searchUser">
                    </div>
                    <div class="carry-check">
                        <span>已选成员</span>
                        <div class="executive-div">
                            <div class="executive-item" v-for="(item,key) in usersSelect" :key="key">
                                <img v-bind:src="headIcon" alt="head" style="filter: blur(3px)">
                                <span class="check-span">{{item.nickName}}</span>
                                <div class="check-border">
                                    <span>{{key}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="carry-result">
                        <span>搜索结果</span>
                        <div class="executive-div">
                            <div class="executive-item" v-for="item in users" :key="item.userId">
                                <img v-bind:src="headIcon" alt="head" @click="selectUserAct(item.userId)">
                                <span>{{item.nickName}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <p>推送人<span style="font-size: 12px;color:#BCBCBC">(可多选)</span></p>
                <div>
                    <div class="carry-search">
                        <input type="text" name="" id="" placeholder="可搜索成员名字">
                        <img :src="'./static/imgPc/search-icon.png'" alt="搜索" @click="searchUser">
                    </div>
                    <div class="carry-check">
                        <span>已选成员</span>
                        <div class="executive-div">
                            <div class="executive-item" v-for="(item,key) in usersGive" :key="key">
                                <img v-bind:src="headIcon" alt="head" style="filter: blur(3px)">
                                <span class="check-span">{{item.nickName}}</span>
                                <div class="check-border">
                                    <span>{{key}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="carry-result">
                        <span>搜索结果</span>
                        <div class="executive-div">
                            <div class="executive-item" v-for="item in users" :key="item.userId">
                                <img v-bind:src="headIcon" alt="head" @click="selectUserGive(item.userId)">
                                <span>{{item.nickName}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { quillEditor } from 'vue-quill-editor'
    // import cover1 from '@/assets/images/1.jpg'
    import headIcon from '../../static/imgPc/head-icon.png'
    import checkboxTrue from '../../static/imgPc/checkbox-true-icon.png'
    import checkbox from '../../static/imgPc/checkbox-icon.png'
    import search from '../../static/imgPc/search-icon.png'
    export default {
        components: {
            quillEditor
        },
        data() {
            return {
                headIcon:headIcon,
                checkboxTrue:checkboxTrue,
                checkbox:checkbox,
                search:search,

                types:[],//类型字典
                steps:[],//步骤字典
                users:[],//用户字典
                // faceicon: "http://192.168.0.126:8080/tasks/image/tx.jpg"
                // loginTime: "2019-09-12 18:09:27"
                // nickName: "test"
                // password: "111111"
                // phone: "13112345678"
                // types: 3
                // userId: 2
                // userName: "test"
                // works: 1
                form:{
                    name:"",//客户名
                    urgent:6,//加急（5：加急；6：不加急）
                    types:"",//任务类型
                    dateRange:"",//任务时间
                    // createTime:"",//任务开始时间
		            endTime:"",//任务截止时间
                    describes:"",//任务描述
                    price:"",//任务价格
                    linksIds:"",//任务流程（多个步骤id以,分开）
                    executorIds:"",//任务执行人（多个步骤id以,分开）
                    pusherIds:""//任务推送人（多个步骤id以,分开）
                },
                usersKeywords:"",
                usersSelect:[],
                usersGive:[]

            }
        },
        computed: {

        },
        watch: {

        },
        created(){
            this.dictionary();
        },
        mounted() {

        },
        
        destroy() {},
        methods: {
            returnFuc(){
                this.$router.go(-1)
            },
            dictionary(){
                // 
                var params={
                    usersKeywords:"",
                    userId:JSON.parse(this.$cookie.get("userInfo")).userId
                }
                this.$http.get("/api/tasks/findTasksMsg",params).then((res)=>{
                    //类型字典
                    this.types=res.types;
                    //步骤字典
                    var steps=res.steps;
                    var arr=[]
                    for(var i=0;i<steps.length;i++){
                        var stepsItem={
                            name: steps[i].name,
                            stepsId: steps[i].stepsId,
                            time: steps[i].time,
                            works: steps[i].works,
                            selected:false
                        };
                        arr.push(stepsItem);
                    }
                    this.steps=arr;
                    console.log(this.steps)
                    this.users=res.users

                }).catch((err)=>{

                })
            },
            searchUser(){
                var params={
                    usersKeywords:this.usersKeywords
                }
                this.$http.get("/api/tasks/findTasksMsg",params).then((res)=>{
                    
                    this.users=res.users

                }).catch((err)=>{

                })
            },
            selectStep(id){
                var arr=this.steps;
                for(var i=0;i<arr.length;i++){
                    if(arr[i].stepsId==id){
                        arr[i].selected=!arr[i].selected;
                        break;
                    }
                }
                this.steps=arr;
            },
            //紧急任务选择
            urgentChange(){
                var urgent=this.form.urgent;
                if(urgent==5){
                    this.form.urgent=6
                }else{
                    this.form.urgent=5
                }
            },
            //时间选择
            dateChange(type){
                if(type==1){
                    var s_time=this.form.createTime;
                    var s_year = s_time.getFullYear();
                    var s_month = (s_time.getMonth()+1)<10 ? '0'+(s_time.getMonth()+1) : (s_time.getMonth()+1);
                    var s_day = s_time.getDate()<10 ? '0'+s_time.getDate() : s_time.getDate();
                    this.form.createTime=s_year+"-"+s_month+"-"+s_day;
                }else{
                    var e_time=this.form.endTime;
                    var e_year = e_time.getFullYear();
                    var e_month = (e_time.getMonth()+1)<10 ? '0'+(e_time.getMonth()+1) : (e_time.getMonth()+1);
                    var e_day = e_time.getDate()<10 ? '0'+e_time.getDate() : e_time.getDate();
                    this.form.endTime=e_year+"-"+e_month+"-"+e_day;
                }
            },
            //选择执行人
            selectUserAct(id){
                console.log(id)
                var users=this.users;
                var usersSelect=this.usersSelect;
                for(var i=0;i<users.length;i++){
                    if(users[i].userId==id){
                        // console.log(users[i])
                        usersSelect.push(users[i]);
                    }
                }
                this.usersSelect=this.unique(usersSelect)
                console.log(usersSelect)
            },
            //选推送给
            selectUserGive(id){
                console.log(id)
                var users=this.users;
                var usersGive=this.usersGive;
                for(var i=0;i<users.length;i++){
                    if(users[i].userId==id){
                        // console.log(users[i])
                        usersGive.push(users[i]);
                    }
                }
                this.usersGive=this.unique(usersGive)
                console.log(usersGive)
            },
            unique(arr){            
                for(var i=0; i<arr.length; i++){
                    for(var j=i+1; j<arr.length; j++){
                        if(arr[i].userId==arr[j].userId){         //第一个等同于第二个，splice方法删除第二个
                            arr.splice(j,1);
                            j--;
                        }
                    }
                }
                return arr;
            },
            getArrId(arr,id){
                var idArr=[];
                for(var i=0;i<arr.length;i++){
                    idArr.push(arr[i][id])
                }
                return idArr.join();
            },
            submit(){
                var steps=this.steps;
                var arr=[]
                for(var i=0;i<steps.length;i++){
                    if(steps[i].selected){
                        arr.push(steps[i].stepsId)
                    }
                }

                var params={
                    userId:JSON.parse(this.$cookie.get("userInfo")).userId,
                    name:this.form.name,//客户名
                    urgent:this.form.urgent,//加急（5：加急；6：不加急）
                    types:this.form.types,//任务类型
                    // createTime:this.form.createTime,//任务开始时间
		            endTime:this.form.endTime,//任务截止时间
                    describes:this.form.describes,//任务描述
                    price:this.form.price,//任务价格
                    linksIds:arr.join(),//任务流程（多个步骤id以,分开）steps
                    executorIds:this.getArrId(this.usersSelect,"userId"),//任务执行人（多个步骤id以,分开）usersSelect
                    pusherIds:this.getArrId(this.usersGive,"userId")//任务推送人（多个步骤id以,分开）usersGive
                };
                console.log(params)
                this.$message.closeAll();
                if(params.name==""){
                    this.$message({
                        message: "客户名不能为空",
                        type: 'warning'
                    });
                }else if(params.types==""){
                    this.$message({
                        message: "任务类型不能为空",
                        type: 'warning'
                    });
                }
                else if(params.endTime==""){
                    this.$message({
                        message: "时间不能为空",
                        type: 'warning'
                    });
                }
                else if(params.price==""){
                    this.$message({
                        message: "任务价格不能为空",
                        type: 'warning'
                    });
                }
                else if(params.linksIds==""){
                    this.$message({
                        message: "任务流程不能为空",
                        type: 'warning'
                    });
                }
                else if(params.executorIds==""){
                    this.$message({
                        message: "执行人不能为空",
                        type: 'warning'
                    });
                }else{
                    this.$http.post("/api/tasks/creatTasks",params).then((res)=>{
                    
                        if(res.code==1000){
                                this.$router.push({path:'/feedBackResult',query:{from:"addTask"}})
                            }
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
        height: 100%;
    }
    
    .header {
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #FFFFFF;
        border-bottom: 4px solid #ECEFF6;
    }
    
    .return {
        width: 8px;
        height: 14px;
        margin: 0 0 0 10px;
    }
    
    .title {
        font-size: 18px;
    }
    
    .header span:nth-child(3) {
        font-size: 14px;
        margin: 0 10px 0 0;
        color: #666666;
    }
    
    .main {
        width: calc(100% - 20px);
        height: calc(100% - 54px);
        background-color: #FFFFFF;
        padding: 0 10px;
        overflow-y: scroll;
    }
    
    .main>div {
        margin: 30px 0 0 0;
    }
    
    .main>div p {
        font-size: 14px;
        line-height: 34px;
        font-weight: bold;
    }
    
    .name input,
    .price input {
        width: calc(100% - 4px);
        height: 34px;
        font-size: 12px;
        border: 1px solid #E6E8EF;
        padding: 0 0 0 4px;
        outline: none;
    }
    
    .name div {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 34px;
    }
    
    .name div img {
        width: 13px;
        height: 13px;
        margin: 0 6px 0 0;
    }
    
    .name div span {
        color: #343434
    }
    
    .style {
        width: 100%;
    }
    
    .style .el-select {
        width: 100%;
    }
    .discribe{
        /* height: 380px; */
    }
    .discribe>div {
        width: 100%;
        /* height: 233px; */
        /* border: 1px solid #E6E8EF;
        display: flex;
        justify-content: flex-start; */
        /* align-items: center; */
    }
    .link {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: calc(100% - 62px);
        padding: 0 31px;
        height: 46px;
    }
    
    .executive-div {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
        min-height: 90px;
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
        margin: 10px 30px 0 0;
    }
    
    .back {
        width: 240px;
        height: 60px;
        background: rgba(68, 108, 234, 1);
        color: white;
        border: 0;
        border-radius: 30px;
        font-size: 24px;
    }
    
    .carry-search {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 44px;
        width: 100%;
    }
    
    .carry-search input {
        height: 100%;
        width: 420px;
        border: 0;
        outline: none;
        font-size: 14px;
        padding: 0 0 0 10px;
    }
    
    .carry-search img {
        width: 18px;
        /* height: 18px; */
        margin: 0 30px 0 0;
    }
    
    .carry-check>span,
    .carry-result>span {
        font-size: 14px;
        line-height: 74px
    }
    
    .carry-check,
    .carry-result {
        width: calc(100% - 38px);
        padding: 0 0 0 38px;
    }
</style>
<style>
    .time>div .el-date-editor.el-input,
    .time>div .el-date-editor.el-input__inner {
        width: 150px;
    }
    
    .discribe .el-textarea__inner {
        border: 0;
    }
</style>