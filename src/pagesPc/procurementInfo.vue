<template>
  <div class="container">
      <div class="materielName list">
          <span class="container-span">物料名称：</span>
          <span class="materiel-span">{{this.data.name}}</span>
      </div>
      <div class="materielPic list">
          <span class="container-span">物料图片：</span>
          <img class="materiel-img" :src="data.image"></img>
      </div>
      <div class="materielDesc list">
          <span class="container-span">采购描述：</span>
          <span class="materiel-span">{{this.data.describe}}</span>
      </div>
      <div class="materielUrgent list">
          <span class="container-span">紧急程度：</span>
          <div class="urgent">
            <span class="materiel-span">{{this.data.urgent}}</span>
          </div>
      </div>
      <div class="materielProgress list">
        <span class="container-span">物料生产进度分类：</span>
        <div>
            <div v-for="(item,index) in data.purchaseSteps">
                <div class="step-circle">
                    <img v-bind:src="item.endStatus==1?'./static/imgPc/step-true-icon.png':'./static/imgPc/step-false-icon.png'" alt="">
                    <span>{{item.name}}</span>
                    <span class="finishTask" v-bind:id="item.endStatus==1||4?'canClick':'cantClick'" @click="endStatus(item.endStatus,item.id,item.name)" v-if="item.endStatus!=1">{{item.endStatus!=1||4?"点击完成":""}}</span>
                </div>
                <div class="step-line" v-if="index!=data.purchaseSteps.length-1">
                    <img v-bind:src="item.endStatus==1?'./static/imgPc/line-true-icon.png':'./static/imgPc/line-false-icon.png'" alt="">
                    <span>{{item.time}}</span>
                </div>
            </div>
        </div>
      </div>
      <div class="starTime list">
        <span class="container-span">排单时间：</span>
        <span class="materiel-span">{{this.data.starttime}}</span>
      </div>
      <div class="endTime list">
        <span class="container-span">完成时间：</span>
        <span class="materiel-span">{{this.data.endtime}}</span>
      </div>
      <div class="order list">
        <span class="container-span">用于订单：</span>
        <span class="materiel-span">NO.{{PrefixInteger(this.data.orderId)}}</span>
      </div>
      <div class="otherDesc list">
        <span class="container-span">其他描述：</span>
        <span class="otherDesc-span materiel-span">{{this.data.others}}</span>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            data:{
                steps:[],//步骤
                urgent:'',//紧急程度
                progress:'', //描述
                step:[{works:7,name:"",time:""}],//name: "步骤1" ,time: "2019-09-16 21:44:02" ,works: 7
            },
            purchaseId:1
        }
    },
    mounted() {
          this.getData()
        },
    methods:{
        getData(){
            this.$http.get("/api/purchase/findByPurchaseId?purchaseId="+this.$route.query.id).then((res) => {
                    // console.log(res)
                    if (res.code == 1000) {
                        this.data = res.data
                        // console.log(this.data)
                    }
                    // this.$router.push({path:'/'})
                }).catch((err) => {

                })
        },

        //点击结束
        endStatus(status,id,step){
            // console.log(status,id,step)
            if(status==4){
                var params={
                    stepsId:id,
                    userId:JSON.parse(this.$cookie.get("userInfo")).userId,
                }
                this.$http.get("/api/purchase/updateSchedule",params).then((res)=>{
                    // console.log(res)
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
                    this.$router.go(0)
                }).catch((err)=>{
                    // console.log(err)
                })
            }
        },

        //自动补零
          PrefixInteger(num) {
            return (Array(8).join(0) + num).slice(-8)
          }
    }
}
</script>

<style scoped>
    .materiel-span{
        font-size:18px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(51,51,51,1);
    }
    .container{
        width: 100%;
        background-color: #fff;
        padding-top: 69px;
        padding-left: 31px;
        box-shadow:0px 0px 3px 0px rgba(0, 0, 0, 0.1);
        border-radius:5px;
    }

    #canClick{
        color: #25b42f;
        cursor: pointer;
        font-size: 12px;
        margin: 0 0 0 20px;
    }

    .container-span{
        font-size:18px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(51,51,51,1);
    }
    .list{
        padding-bottom: 60px;
    }
    .urgent{
        display: inline-block;
    }
    .otherDesc-span{
        display: inline-block;
        width:513px;
        height:81px;
        font-size:18px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:31px;
    }
    .materielProgress{
        display:flex;
    }
    .step-circle{
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
    .step-circle span:nth-child(3){
        width:95px;
        height:30px;
        background:rgba(255,255,255,1);
        border:1px solid rgba(149,214,121,1);
        border-radius:3px;
        font-size:16px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(149,214,121,1);
        line-height:30px;
        text-align: center;
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
    #cantClick{
        color: #25b42f;
        cursor: not-allowed;
        font-size: 12px;
        margin: 0 0 0 20px;
    }
</style>