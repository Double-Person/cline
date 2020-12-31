<template>
  <div class="container">
      <div class="materielName list">
          <span class="container-span">物料名称：</span>
          <input type="text" v-model="data.materielName" placeholder="请输入物料名称">
      </div>
      <div class="materielPic list">
          <span class="container-span">物料图片：</span>
          <el-upload class="avatar-uploader"
           :action="$httppath" :headers="header"
            :show-file-list="true" 
            :on-success="handleAvatarSuccess" 
            :before-upload="beforeAvatarUpload"><img v-if="data.imageUrl" 
            :src="imageUrl" class="avatar"/>
                <img v-if="data.imageUrl" :src="data.imageUrl" class="avatar"/>
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
      </div>
      <div class="describe list">
          <span class="container-span">采购描述：</span>
          <input type="text" placeholder="请输入采购描述" v-model="data.materielDesc">
      </div>
      <div class="urgent list">
          <span class="container-span">紧急程度：</span>
          <ul>
              <li>
                 <img v-bind:src="data.urgent=='备库'?checkboxTrue:checkbox" :index="'备库'" alt="选中框" v-model="data.urgent" @click="urgentChange">
                 <span class="checkSpan">备库</span> 
              </li>
              <li>
                 <img v-bind:src="data.urgent=='订单待出'?checkboxTrue:checkbox" :index="'订单待出'" alt="选中框" v-model="data.urgent" @click="urgentChange">
                 <span class="checkSpan">订单待出</span> 
              </li>
              <li>
                 <img v-bind:src="data.urgent=='加急物料'?checkboxTrue:checkbox" :index="'加急物料'" alt="选中框" v-model="data.urgent" @click="urgentChange">
                 <span class="checkSpan">加急物料</span> 
              </li>
          </ul>
      </div>
      <div class="progress list">
          <span class="container-span">物料生产进度：</span>
          <ul>
              <li>
                <img v-bind:src="data.progress.find(item=>{return item=='1'})?checkboxTrue:checkbox" :index="'1'" alt="选中框" v-model="data.progress" @click="progressChange">
                <span class="checkSpan">挤出</span> 
              </li>
              <li>
                <img v-bind:src="data.progress.find(item=>{return item=='2'})?checkboxTrue:checkbox" :index="'2'" alt="选中框" v-model="data.progress" @click="progressChange">
                <span class="checkSpan">时效</span> 
              </li>
              <li>
                <img v-bind:src="data.progress.find(item=>{return item=='3'})?checkboxTrue:checkbox" :index="'3'" alt="选中框" v-model="data.progress" @click="progressChange">
                <span class="checkSpan">加工</span> 
              </li>
              <li>
                <img v-bind:src="data.progress.find(item=>{return item=='4'})?checkboxTrue:checkbox" :index="'4'" alt="选中框" v-model="data.progress" @click="progressChange">
                <span class="checkSpan">氧化</span> 
              </li>
              <li>
                <img v-bind:src="data.progress.find(item=>{return item=='5'})?checkboxTrue:checkbox" :index="'5'" alt="选中框" v-model="data.progress" @click="progressChange">
                <span class="checkSpan">包装</span> 
              </li>
              <li>
                <img v-bind:src="data.progress.find(item=>{return item=='6'})?checkboxTrue:checkbox" :index="'6'" alt="选中框" v-model="data.progress" @click="progressChange">
                <span class="checkSpan">运输</span> 
              </li>
          </ul>
      </div>
      <!--<div class="starTime list">
        <span class="container-span">排单时间：</span>
        <el-date-picker v-model="data.starTime" type="date" placeholder="年/月/日"></el-date-picker>
      </div> -->
      <div class="endTime list">
        <span class="container-span">完成时间：</span>
        <el-date-picker v-model="data.endTime" type="date" placeholder="年/月/日" value-format="yyyy-MM-dd"></el-date-picker>
      </div>
      <div class="order list">
        <span class="container-span">用于订单：</span>
        <input type="text" v-model="data.order">
      </div>
      <div class="otherDescription list">
          <span class="container-span">其他描述：</span>
          <textarea placeholder="请输入描述" v-model="data.otherDescription"></textarea>
      </div>
      <div class="submit" @click="submit">新建完成</div>
  </div>
</template>

<script>
import checkboxTrue from './../../static/imgPc/checkbox-true-icon.png'
import checkbox from './../../static/imgPc/checkbox-icon.png'
export default {
    data(){
        return {
            data:{
                materielName:"", //物料名称
                materielDesc:"", //物料描述
                imageUrl: '', //上传图片
                starTime: '', //排单时间
                endTime: '', //完成时间
                order:"", //用于订单
                otherDescription: '', //其他描述
                progress: [], // 物料生产进度(7:挤出;8:时效;9:加工;10:氧化;11:包装;12:运输)
                urgent: 0 ,// 加急（0：备库，1：此单待出，2：加急物料）
            },
            checkboxTrue:checkboxTrue,
            checkbox:checkbox,
            authorization:'',
            httppath:"http://www.lsibss.com:8080/tasks/api/purchase/saveImage",
            header:{}
        }
    },
    mounted(){
        this.getSession()
    },
    methods: {
        //紧急程度录入
        urgentChange(e){
            var urgent=e.target.getAttribute('index');
            if(urgent=='备库'){
                this.data.urgent='备库'
            }else if(urgent=='订单待出'){
                this.data.urgent='订单待出'
            }else{
                this.data.urgent='加急物料'
            }
        },

        //获取session
        getSession(){
            this.authorization = localStorage.getItem("Authorization")
           this.header = {
               "Authorization":this.authorization
           }
        },

        //物料生产状态改变
        progressChange(e){
                if(this.data.progress.find(item=>{return item==e.target.getAttribute('index')})){
                    this.data.progress = this.data.progress.filter((item)=>{return item != e.target.getAttribute('index')})
                }else{
                    this.data.progress.push(e.target.getAttribute('index'))
                }
                // console.log(this.data.progress)
                // console.log(this.form.checks)
        },
        //上传物料图片
        handleAvatarSuccess(res, file) {
            // console.log(res)
            this.data.imageUrl = res.data.imageUrl;
            // console.log(this.data.imageUrl)
        },
        //图片大小限制
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt5M = file.size / 1024 / 1024 < 5;

            if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt5M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt5M;
        },

        //自动补零
        addZero(num){
            return (Array(8).join('0') + num).slice(-8);
        },

        //点击上传
        submit(){
            var params = {
                        name:this.data.materielName,
                        describe: this.data.materielDesc,
                        image: this.data.imageUrl,
                        urgent: this.data.urgent,
                        schedule: this.data.progress,
                        endtime: this.data.endTime,
                        orderId: this.data.order,
                        others:this.data.otherDescription
                    }
            ///api/purchase/createPurchase
            // console.log(params)
            this.$http.post("/api/purchase/createPurchase", params).then((res) => {
                    // console.log(this.query.time)
                    if (res.code == 1000) {
                       this.$router.push({path:'/schedule',query:{from:"addProcurement"}})
                    // console.log(res)
                    }
            
            }).catch((err) => {

            })
        }
    },
}
</script>

<style scoped>
    .container{
        width: 100%;
        background-color: #fff;
        padding-top: 69px;
        padding-left: 31px;
        box-shadow:0px 0px 3px 0px rgba(0, 0, 0, 0.1);
        border-radius:5px;
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
    .materielName input{
        width:540px;
        height:44px;
        background:rgba(255,255,255,1);
        border:2px solid rgba(218,226,234,1);
        border-radius:5px;
        font-size:18px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(176,176,176,1);
        padding-left: 10px;
    }
    .urgent{
        display:flex;
    }
    .progress{
        display:flex;
    }
    .progress ul{
        width:381px;
    }
    .progress ul li:nth-child(4),.progress ul li:nth-child(5),.progress ul li:nth-child(6){
        margin-top: 36px;
    }
    .materielPic{
        display:flex;
    }
    .avatar-uploader{
        display: inline-block;
        border: 1px dashed #d9d9d9;
    }
    .avatar-uploader:hover{
        border: 1px dashed #409EFF;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
    .describe input{
        width:540px;
        height:44px;
        background:rgba(255,255,255,1);
        border:2px solid rgba(218,226,234,1);
        border-radius:5px;
        padding-left: 10px;
        font-size:18px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(176,176,176,1);
    }
    li{
        float: left;
        list-style: none;
        padding-right: 60px;
    }
    .checkSpan{
        font-size:18px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(51,51,51,1);
    }
    .order input{
        width:540px;
        height:44px;
        background:rgba(255,255,255,1);
        border:2px solid rgba(218,226,234,1);
        border-radius:5px;
    }
    .otherDescription textarea{
        width:540px;
        height:176px;
        background:rgba(255,255,255,1);
        border:2px solid rgba(218,226,234,1);
        border-radius:5px;
        padding-left: 10px;
        font-size: 16px;
    }
    .submit{
        width:240px;
        height:60px;
        background:rgba(68,108,234,1);
        border-radius:60px;
        margin-left: 98px;
        text-align: center;
        line-height: 60px;
        font-size:24px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(255,255,255,1);
        cursor: pointer;
    }
    .el-icon-arrow-down,.el-icon--right{
        float: right;
        line-height:44px;
    }
</style>