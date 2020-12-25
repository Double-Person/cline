<template>
    <div class="contain" style="position: relative">

        <div class="header">
            <img :src="'./static/imgPhone/return-icon.png'" alt="返回" class="return" @click="returnFuc">
            <span class="title">货款管理</span>
            <span></span>
        </div>
        <div class="total">
            <div>
                <span class="total-span">当日总计应收金额：</span>
                <span class="total-money">{{chargeData.total}}元</span>
            </div>
            <div>
                <div style="width: 50%;float:left">
                    <span class="total-span">实收金额：</span>
                    <span class="total-money">{{chargeData.charged}}元</span>
                </div>
                <div style="width: 50%;float:left">
                    <span class="total-span">剩余金额：</span>
                    <span class="total-money">{{chargeData.unCharged}}元</span>
                </div>
            </div>
            
        </div>
        <div class="query">
            <div class="time-condition">
                <span>时间:</span>
                <div class="block">
                    <el-date-picker
                        v-model="query.time"
                        @change="changeData"
                        type="date"
                        placeholder="选择日期时间">
                    </el-date-picker>
                </div>
            </div>
            <div>
                <span>状态:</span>
                <div class="block">
                    <el-select v-model="query.charge" placeholder="请选择" @change="changeType">
                        <el-option
                            v-for="item in charge"
                            
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                
            </div>
        </div>
        <div class="main">
            <div class="item" v-for="item in data.list" :key="item.id">
                <div>
                    <span class="number">NO.{{item.number}}</span>
                </div>
                <div>
                    <span class="name">{{item.name}}</span>
                    <span class="time">{{item.time}}</span>
                </div>
                <div>
                    <span class="money-get money">应收金额: <span>{{item.amount}}</span>元 </span>
                    <span class="money-geted money">实收金额: <span>{{item.charge}}</span>元 </span>
                    <span class="money-release money">剩余金额: <span>{{item.balance}}</span>元 </span>
                </div>
                <div>
                    <span class="beizhu">备注: <span>{{item.desc}}</span> </span>
                    <button class="activebutton" @click="setMoney(item.id)" v-if="item.canAdd==true">设置金额</button>
                    <button class="activebutton" @click="confirm(item.id)" v-if="item.canCharge==true&&item.canAdd==false">确认收款</button>
                    <button class="positivebutton" v-if="item.canCharge==false&&item.canAdd==false">确认收款</button>
                </div>
            </div>
            <div class="pagination">
                <el-pagination
                    @size-change="handleSizeChange"
                    :page-size="30"
                    @current-change="handleCurrentChange"
                    background
                    layout="prev, pager, next"
                    :total="data.totalRow">
            </el-pagination>
            </div>

            
        </div>
        <div class="alert-div" v-show="comfirmShow">
            <span style="margin: 20px 0 0 206px;display: block;color: #BBBBBB" @click="cancel">取消</span>
            <div class="alert-div-item">
                <span>收款</span>
                <div class="money-div">
                    <input type="text" style="width: 100%;height:100%;font-size:16px;padding:0 0 0 3px" v-model="confirmData.charge">
                    <!-- <span>{{confirmData.charge}}</span> -->
                </div>
                
            </div>
            <div class="alert-div-item">
                <span>备注</span>
                <div class="beizhu-div">
                    <textarea name="" id="" cols="30" rows="10" style="width: 100%;height:100%;padding:0 0 0 3px" v-model="confirmData.desc"></textarea>
                    <!-- <span>{{confirmData.desc}}</span> -->
                </div>
            </div>
            <button class="confirm" @click="confirmFuc">确认</button>
        </div>

        <div class="alert-div" style="height: 250px" v-show="moneyShow">
            <span style="margin: 20px 0 0 215px;display: block;color: #BBBBBB" @click="moneyCancel">取消</span>
            <div class="alert-div-item" style="display: flex;justify-content:flex-start;align-items: center">
                <span style="display: block;width:40px">应收</span>
                <div class="money" style="height: 30px">
                    <input type="text" style="width: 100%;height:100%;font-size:16px;padding:0 0 0 3px" v-model="amount">
                    <!-- <span>{{confirmData.charge}}</span> -->
                </div>
                
            </div>
            <button class="confirm" @click="moneyComfirm">确认</button>
        </div>
        <div class="mask" v-show="alertShow">

        </div>
    </div>
</template>

<script>
// import cover1 from '@/assets/images/1.jpg'
export default {
    data() {
        return {
            query:{
                time:'',
                charge:0,
                page:1
            },
            
            data:{
                list:[],
                pageNumber: 1,
                pageSize: 30,
                totalPage: 1,
                totalRow: 6
            },
            chargeData:{
                charged:"",
                total:"",
                unCharged:""
            },
            charge:[{value:0,label:"全部"},{value:17,label:"已收完"},{value:18,label:"未收完"}],
            //page,time,charge  17 已收完，18 未收完
            // data:{
            //     name:"",
            //     createTime:"",
            //     endTime:"",
            //     describes:"",
            //     price:"",
            //     step:[{works:7,name:"",time:""}],//name: "步骤1" ,time: "2019-09-16 21:44:02" ,works: 7
            //     executors:[{faceicon:"",userName:"",userId:""}]
            // },
            comfirmShow:false,
            alertShow:false,
            moneyShow:false,
            tasksId:"",
            amount:"",
            confirmData:{charge:"",desc:'',tasksId:0}
        }
    },
    computed: {

    },
    watch: {

    },
    mounted() {
        this.search();
        this.init();
        
    },
    destroy() {},
    methods: {
        returnFuc(){
            this.$router.go(-1)
        },
        init(){
            // 初始化搜索
            
        },
        addCharge(){
            this.$router.push({path:"/addCharge"})
        },
        search(){
            var params={
                page:this.query.page,
                time:this.query.time,
                charge:this.query.charge
                // tasksId:this.$route.query.id
            }
            this.$http.get("/api/tasks/getCharge",params).then((res)=>{
                
                if(res.code==1000){
                    this.data = res.data.page;
                    this.chargeData.charged=res.data.charged;
                    this.chargeData.total=res.data.total;
                    this.chargeData.unCharged=res.data.unCharged;
                }
                // this.$router.push({path:'/'})
            }).catch((err)=>{

            })
        },
        changeData(){
            var d=this.query.time;
            if(d){
                var year = d.getFullYear();
                var month = (d.getMonth()+1)<10 ? '0'+(d.getMonth()+1) : (d.getMonth()+1);
                var day = d.getDate()<10 ? '0'+d.getDate() : d.getDate();
                this.query.time=year+"-"+month+"-"+day;
            }else{
                this.query.time=""
            }
            
            this.search();
        },
        changeType(){
            this.search();
        },
        handleSizeChange(val) {
            console.log(val)
        },
        handleCurrentChange(val) {
            this.query.page=val;
            this.search();
            console.log(val)
        },
        //设置金额
        setMoney(id){
            this.tasksId=id;
            this.alertShow=true;
            this.moneyShow=true;
        },
        moneyComfirm(){
            var params={
                tasksId:this.tasksId,
                amount:this.amount
            };
            this.$message.closeAll();
            if(params.amount==""){
                this.$message({
                    message: "请输入应收金额",
                    type: 'warning'
                });
            }else{
                this.$http.get("/api/tasks/addCharge",params).then((res)=>{
                    if(res.code==1000){
                        this.search();
                        // this.$parent.maskFuc(false);
                        this.moneyShow=false;
                        this.alertShow=false;
                        this.$message({
                            message: res.msg,
                            type: 'success'
                        });
                    }

                }).catch((err)=>{

                })
            }
        },
        //确认收款
        confirm(id){
            this.alertShow=true;
            this.comfirmShow=true;
            this.confirmData.tasksId=id;
            // confirmData:{charge:0,desc:''}
            
        },
        //确认按钮
        confirmFuc(){
            var params={
                tasksId:this.confirmData.tasksId,
                charge:this.confirmData.charge,
                contents:this.confirmData.desc
            };
            
            this.$http.get("/api/tasks/charge",params).then((res)=>{
                
                if(res.code==1000){
                    this.$message({
                        message: res.msg,
                        type: 'success'
                    });
                    this.cancel();
                    this.search();
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
        cancel(){
            this.confirmData={charge:"",desc:'',tasksId:0};
            this.alertShow=false;
            this.comfirmShow=false;
        },
        moneyCancel(){
            this.alertShow=false;
            this.moneyShow=false;
        }
    }
}
</script>
<style>
.query>div .el-input--suffix .el-input__inner, .query>div .el-range-editor.el-input__inner, .query>div .el-textarea__inner{
    width: 130px;
}
.block .el-date-editor.el-input, .block.el-date-editor.el-input__inner{
    width: 130px;
}
</style>
<style scoped>
.contain{
    position: relative;
    overflow: auto;
    height: 100%;
}
.header {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between !important;
    flex-direction: row !important;
    align-items: center;
    background-color: #FFFFFF;
    border-bottom: 4px solid #ECEFF6;
    position: fixed;
    z-index: 2
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
.total{
    width: calc(100% - 20px);
    padding: 0 10px;
    height: 66px;
    margin: 60px 0 17px 0;
    background-color: #FFFFFF;
}
.total{
    display: flex;
    justify-content: flex-start;
    justify-items: center;
    align-items: flex-start;
    flex-direction: column;
}
.total>div{
    width: 100%;
    height: 50%;
}
.total-span{
    font-size: 12px;
    color: #666666;
}
.total-money{
    font-size: 12px;
    color: #446CEA;
}
.query{
    /* margin: 60px 0 0 0; */
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 54px;
    background-color: #FFFFFF;
    width: calc(100% - 20px);
    padding: 0 10px;
}
.query>div{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.item{
    /* height: 120px; */
    margin: 10px 0 0 0;
    background-color: #FFFFFF;
}
.item>div{
    width: calc(100% - 20px);
    margin: 0 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
}
.item>div:nth-child(3){
    border-bottom: 1px solid #D6D6D6;
}
.item .name{
    display: block;
    overflow:hidden;
    width: 200px;
    text-overflow:ellipsis;
    white-space:nowrap;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-break: break-all;
}
.item .number,.item .time,.item .money,.item .beizhu{
    font-size: 10px;
    color: #666666;
    line-height: 26px;
}
.item .name{
    font-size: 16px;
    color: #333333;
    font-weight: bold;
}
.item .beizhu span{
    font-size: 10px;
    color: #666666;
    width: 250px;
    display: block;
    word-wrap: break-word;
    word-break: break-all;
    white-space: pre-wrap !important;
}
.item .activebutton{
    width:90px;
    height:30px;
    background-color: #FFA939;
    box-shadow:0px 0px 5px 0px rgba(0, 0, 0, 0.05);
    border: 0;
    color: white;
}
.item .positivebutton{
    width:90px;
    height:30px;
    background-color: #d4d4d4;
    box-shadow:0px 0px 5px 0px rgba(0, 0, 0, 0.05);
    border: 0;
    color: white;
}
.item .beizhu{
    line-height: 40px;
}

.alert-div{
    position: fixed;
    top:50%;
    left: 50%;
    margin: -185px 0 0 -131px;
    width: 262px;
    height: 370px;
    background:rgba(255,255,255,1);
    box-shadow:0px 0px 5px 0px rgba(0, 0, 0, 0.05);
    border-radius:5px;
    z-index: 9;
}
.alert-div-item{
    width: calc(100% - 60px);
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin:0 30px;
}
.alert-div-item>span{
    color: #666666;
    line-height: 44px;
}

.money-div{
    width: 165px;
    height: 40px;
    background-color: #9A9A9A
}
.beizhu-div{
    width: 165px;
    height: 140px;
    background-color: #9A9A9A;
    margin: 10px 0;
    
}
.confirm{
    background-color: #FF4824;
    width: 200px;
    height: 50px;
    border-radius: 25px;
    border: 0;
    font-size: 16px;
    color: white;
    margin: 30px;
    outline: none;
}
.mask{
    width: 100%;
    height: 100%;
    position: fixed;
    background-color: #000000;
    top:0;
    left: 0;
    opacity: 0.3;
}
</style>
