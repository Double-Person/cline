<template>
  <div class="container">
      <div class="title-screen">
        <div class="title-screen-left">
          <span>时间筛选：</span>
          <img v-bind:src="'./static/imgPc/left-icon.png'">
          <el-date-picker v-model="data.chooseTime" type="date" placeholder="年/月/日" value-format="yyyy-MM-dd" @change="chooseTime"></el-date-picker>
          <img v-bind:src="'./static/imgPc/right-icon.png'">
        </div>      
        <div class="title-screen-right">
          <span>排序方式：</span>
          <input type="text" placeholder="时间由近及远">
        </div>
      </div>
      <div class="list-title">
        <div class="number">
          <span>物料编号</span>
        </div>
        <div class="name">
          <span>物料名称</span>
        </div>
        <div class="type">
          <span>物料类型</span>
        </div>
        <div class="starTime">
          <span>排单时间</span>
        </div>
        <div class="endTime">
          <span>完成时间</span>
        </div>
        <div class="operation">
          <span>操作</span>
        </div>
      </div>
      <div class="list">
        <ul class="listUl">
          <li v-for="(item,index) in resData" :key="index" v-bind:class="item.urgent=='加急物料' && item.status == '8'?'shine-box-red scheduleList':'scheduleList'">
            <div class="endSchedule" @click="endSchedule(item.purchaseId)" v-if="item.status == '8'">结单</div>
            <div class="number li-number">
              <span class="li-number li-top-title">NO.{{PrefixInteger(item.purchaseId)}}</span>
              <img v-bind:src="item.image">
            </div>
            <div class="name li-name">
              <div class="li-name-top li-top">
                <p class="li-name-spanName" :style="item.overdue?'color:green':'color:#faba1f'">{{item.name}}</p>
                <span class="li-name-usesSpan">用于订单：{{item.orderId}}</span>
              </div>
              <div class="li-name-bottom li-bottom">
                <div class="li-name-bottomLeft">
                  <span>更新日志：</span>
                </div>
                <div class="li-name-bottomRight">
                  <p class="update-log" v-for="(items,index) in item.purchaseLogs">{{items.updatetime}} : {{items.content}}</p>
                </div>
              </div>
            </div>
            <div class="type li-type">
              <div class="li-top">
                <span class="li-top-title" v-if="item.urgent=='备库'">备库</span>
                <span class="li-top-title" v-if="item.urgent=='订单待出'">订单待出</span>
                <span class="li-top-title" v-if="item.urgent=='加急物料'">加急物料</span>
              </div>
            </div>
            <div class="starTime">
              <div class="li-top">
                <span class="li-top-title">{{item.starttime.substring(0,10)}}</span>
              </div>
            </div>
            <div class="endTime">
              <div class="li-top">
                <span class="li-top-title">{{item.endtime.substring(0,10)}}</span>
              </div>
            </div>
            <div class="operation">
              <div class="li-top">
                <a @click="examine(item.purchaseId)">查看</a>
                <a @click="updateLog(item.purchaseId)">更新日志</a>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
      <div class="alert-div" v-show="logShow" :style="'margin-top:'+scrollTop+'px'">
        <span style="margin: 49px 0 0 430px;display: block;color: #BBBBBB" @click="logCancel">取消</span>
        <div class="alert-div-item">
            <span>日志日期：</span><span>{{this.nowDate}}</span>
        </div>
        <div class="money">
            <span>日志描述：</span>
            <textarea v-model="logDesc"></textarea>
            <!-- <span>{{confirmData.charge}}</span> -->
        </div>
        <button class="confirm" @click="logComfirm">确认</button>
    </div>
    <div class="mask" v-show="mask">

    </div>
  </div>
</template>

<script>
export default {
  
        props: {
            query: {
            }
        },
        data() {
            return {
                logShow:false, //模态框
                logDesc:'', //描述
                mask:false, //遮罩
                data:{
                  chooseTime:''
                },
                page:1, //分页
                resData:'',
                logId:'', //更新日志的ID
                nowDate:'',
                scrollTop:1 //滚动条高度
            }
        },

        computed: {

        },
        watch: {

        },
        mounted() {
          this.getData()
          window.addEventListener('scroll', this.handleScroll, true)

        },
        destroy() {},
        methods: {
          //获取数据
          getData() {
                // /api/tasks/findAllUnfinishedTasks
                // console.log(this.query)
                // var params = {
                //     urgent: this.query.urgent,
                //     time: this.query.time,
                //     page: this.page,
                //     type: 1,
                //     userId: this.query.userId,
                //     keywords: this.query.keywords,
                //     page:this.page
                // }
                // if(this.query.giveOrGet){
                //     params.type = 11
                // }else{
                //     params.type = 10
                // }
                this.$http.get("/api/purchase/purchaseList").then((res) => {
                    // console.log(res)
                    if (res.code == 1000) {
                        this.resData = res.data.list
                        console.log(this.resData)
                        this.nowDate = new Date(datetime).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
                    }
                    // this.$router.push({path:'/'})
                }).catch((err) => {

                })
            },
          //搜索显示
          getSearchData(text){
            var params = {
              name:text
            }
            this.$http.get("/api/purchase/findByName",params).then((res)=>{
                    // console.log(res)
                    if(res.code==1000){
                      this.resData = res.data.list
                    }
                })
          },

          //获取滚动条高度
           handleScroll() {
            this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop+200;
            // console.log('scrollTop',this.scrollTop)
        },

          //采购查看
          examine(id){
            this.$router.push({
                path: '/procurementInfo',
                query: {
                    id: id,
                    bookmark: false,
                    condition: false
                }
            })
          },

          //选择日期
          chooseTime(){
            var params = {
              time:this.data.chooseTime
            }
            // console.log(params)
            this.$http.get("/api/purchase/findByDate",params).then((res)=>{
              // console.log(res)
              if(res.code == 1000){
                this.resData= res.data.list
              }
            })
          },

          //更新日志
          updateLog(id){
            this.logId = id
            this.logShow=true;
            this.mask=true;
            var now=new Date()
            var year = now.getFullYear()
            var month = now.getMonth()+1
            var day = now.getDate()
            this.nowDate = year+"-"+month+"-"+day
            // console.log(this.nowDate)
          },

          //更新确认
          logComfirm(){
            // this.logShow=false;
            // this.mask=false;
            var params = {
              purchaseId:this.logId,
              content:this.logDesc
            }
            this.$http.post("/api/purchase/updateLog",params).then((res)=>{
              // console.log(res)
              if(res.code == 1000){
                this.logDesc = ''
                this.$router.go(0)
              }
            })
          },

          //取消更新
          logCancel(){
            this.logShow=false;
            this.mask=false;
          },

          //自动补零
          PrefixInteger(num) {
            return (Array(8).join(0) + num).slice(-8)
          },

          //结单
          endSchedule(id) {
            var params ={
              purchaseId:id
            }
            // console.log(params.purchaseId)
            this.$http.get("/api/purchase/endByPurchaseId",params).then((res)=>{
              if(res.code == 1000){
                this.$router.go(0)
              }
            })
          }
        }
}
</script>

<style scoped>
  .title-screen{
    width: 100%;
    height: 54px;
    background-color: #fff;
    box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    line-height: 54px;
  }
  .title-screen span{
    font-size:18px;
    font-family:Microsoft YaHei;
    font-weight:400;
    color:rgba(103,135,171,1);
  }
  .mask{
        width: 100%;
        height: 6300px;
        position: absolute;
        background-color: #000000;
        top:0;
        left: 0;
        opacity: 0.3;
    }
  .title-screen-left{
    height:54px;
    float: left;
  }
  .title-screen-left span{
    display: inline-block;
    height: 54px;
    line-height: 54px;
  }
  ul,li{
    list-style:none;
  }
  .title-screen-left img{
    padding-top: 15px;
    width:10.3px;
    height: 20.1px;
  }
  .title-screen-left input{
    width:260px;
    height:36px;
    background:rgba(255,255,255,1);
    border:2px solid rgba(218,226,234,1);
    border-radius:5px;
  } 
  .title-screen-right{
    float:right;
    padding-right: 24px;
  }
  .title-screen-right input{
    width:188px;
    height:36px;
    background:rgba(255,255,255,1);
    border:2px solid rgba(218,226,234,1);
    border-radius:4px;
    font-size:16px;
    font-family:Microsoft YaHei;
    font-weight:400;
    color:rgba(103,135,171,1);
    padding-left: 10px;
  }
  .list-title{
    margin-top: 17px;
    width:100%;
    height:58px;
    background:rgba(244,248,251,1);
    border:2px solid rgba(218,226,234,1);
  }
  .list-title span{
    font-size:18px;
    font-family:Microsoft YaHei;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height: 58px;
  }
  .list-title>div{
    box-sizing: border-box;
  }
  .number{
    float: left;
    width:16.56%;
    padding-left: 20px;
  }
  .name{
    float: left;
    width:28.04%;
  }
  .type{
    float: left;
    width:13.06%;
  }
  .starTime{
    float: left;
    width:13.31%;
  }

  .shine-box-red {
        animation: glowRed 500ms ease-out infinite alternate;
  }

  @keyframes glowRed {
      0% {
          border-color: #ff1600;
          box-shadow: 0 0 5px rgba(255, 22, 0, .2), inset 0 0 5px rgba(255, 22, 0, .1), 0 2px 0 #ff1600;
      }
      100% {
          border-color: #efefef;
          box-shadow: 0 0 20px rgba(255, 255, 255, .6), inset 0 0 10px rgba(255, 255, 255, .4), 0 2px 0 #efefef;
      }
  }

  .endTime{
    float: left;
    width:15.22%;
  }
  .operation{
    float: left;
    width:13.81%;
  }
  .listUl{
    width:100%;
  }
  .listUl li{
    margin-bottom: 10px;
    width:100%;
    height:195px;
    background:rgb(255, 255, 255);
    border:2px solid rgba(218,226,234,1);
    box-sizing: border-box;
    padding-top: 21px;  
  }
  .listUl li>div{
    box-sizing: border-box;
    height:195px;
  }
  .li-number{
    font-size:16px;
    font-family:Microsoft YaHei;
    font-weight:400;
    color:rgba(102,102,102,1);
  }
  .li-top-title{
    font-size:16px;
    font-family:Microsoft YaHei;
    font-weight:400;
    color:rgba(102,102,102,1);
  }
  .li-number>img{
    width:120px;
    height: 120px;
    background:rgba(244,248,251,1);
    border-radius:5px;
    border: none;
  }
  .li-top{
    height: 65px;
    border-bottom: 1px solid rgba(218,226,234,1);
  }
  .scheduleList{
    position: relative;
  }
  .endSchedule{
    position: absolute;
    top: 46px;
    left: 410px;
    display: block;
    width:102px;
    height:40px!important;
    background: rgba(84,136,248,1);
    border: 2px solid rgba(68,108,234,1);
    border-radius: 5px 5px 5px 5px;
    font-size: 18px;
    line-height: 44px;
    text-align: center;
    font-weight: 500;
    color: #FFFFFF;
    cursor: pointer;
  }


  .li-bottom{
    box-sizing: border-box;
    padding-top: 17px;
  }
  .li-name-spanName{
    font-size:16px;
    font-family:Microsoft YaHei;
    font-weight:400;
    color:rgba(68,108,234,1);
  }
  .li-name-usesSpan{
    font-size:12px;
    font-family:Microsoft YaHei;
    font-weight:400;
    color:rgba(170,170,170,1);
  }
  .li-name-bottomLeft{
    float: left;
    height: 19px;
    width:83px;
  }
  .li-name-bottomRight{
    float: left;
    overflow: auto;
    height: 65px;
    width:900px;
  }
  .li-name-bottomLeft span{
    font-size:14px;
    font-family:Microsoft YaHei;
    font-weight:400;
    color:rgba(102,102,102,1);
    line-height:19px;
  }
  .li-name-bottomRight p{
    font-size:12px;
    font-family:Microsoft YaHei;
    font-weight:400;
    color:blue;
    padding-bottom: 10px;
  }
  .operation a{
    font-size:16px;
    font-family:Microsoft YaHei;
    font-weight:400;
    text-decoration:underline;
    color:rgba(68,108,234,1);
    cursor: pointer;
    display: inline;
  }
  .operation a:nth-child(1){
    margin-right: 36px;
  }
  .alert-div {
        position: absolute;
        top: 200px;
        left: 50%;
        margin: -166px 0 0 -260px;
        width: 520px;
        height: 532px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.05);
        border-radius: 5px;
        z-index: 9;
    }
    
    .alert-div-item {
        width: 400px;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        margin: 30px 0 0 40px;
    }
    
    .alert-div-item span {
        color: #666666;
        line-height: 60px;
        font-size: 16px;
    }
    
    .alert-div div>div {
        background-color: #F2F6FC;
        margin: 0 0 0 30px;
    }
    
    .money {
        margin: 0;
        width: 100%;
        padding-left: 40px;
        height: 60px;
        line-height: 60px;
        display:flex;
        justify-content: flex-start;
        align-items: flex-start;
    }
    
    .money span {
        font-size:16px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(102,102,102,1);
    }
    .money textarea{
      width:345px;
      height:182px;
      background:rgba(255,255,255,1);
      border-radius:5px;
      border:1px solid #ccc;
      font-size: 20px;
      color:black;
    }
    
    .el-date-editor{
      width:240px;
    }

    .confirm {
        width: 400px;
        height: 59px;
        background-color: #FF4824;
        border-radius: 30px;
        outline: none;
        border: 0;
        color: white;
        font-size: 20px;
        margin: 20px 0 0 40px;
        margin-top: 144px;
        display: block;
        cursor: pointer;
    }
</style>