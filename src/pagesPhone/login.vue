<template>
    <div class="contain">
        <div class="contain-top">

        </div>
        <div class="main">
            <div class="acc-div">
                <img :src="'./static/imgPhone/acc-icon.png'" alt="acc" class="icon">
                <input type="text" placeholder="请输入微信账号" v-model="data.userName"/>
                <span @click="clearData(1)">x</span>
            </div>
            <div class="pwd-div">
                <img :src="'./static/imgPhone/pwd-icon.png'" alt="pwd" class="icon">
                <input type="password" placeholder="请输入微信密码" v-model="data.password"/>
                <span @click="clearData(2)">x</span>
            </div>
            <div class="button-div">
                <button @click="login">登录</button>
                <!-- <div>
                    <img src="/static/imgPhone/dotted.png" alt="" class="dotted">
                    <span class="fastspan">快速登录</span>
                    <img src="/static/imgPhone/dotted.png" alt="" class="dotted">
                </div>
                <div class="wechat-div">
                    <img src="/static/imgPhone/wechat-icon.png" alt="微信登录">
                </div> -->
            </div>
        </div>
        
        <div class="contain-bottom">

        </div>
    </div>

</template>
<script>
    export default {
        data() {
            return {
                data:{
                    userName:"",
                    password:""
                },
                alert:{
                    show:false,
                    success:false
                }
            }
        },
        computed: {

        },
        watch: {

        },
        mounted() {
            
        },
        destroy() {},
        methods: {
            clearData(type){
                if(type==1){
                    this.data.userName=""
                }else{
                    this.data.password=""
                }
            },
            login() {
                // this.$router.push({path:'/index'});
                this.$message.closeAll();
                //静态
                // this.$router.push({path:'/'});
                this.$http.get("/api/userInfo/login",this.data).then((res)=>{
                    
                    if(res.code==1000){
                        // console.log(res.authorization)
                        this.$cookie.set("Authorization",res.authorization,1);
                        
                        this.$cookie.set("userInfo",JSON.stringify(res.data),1);
                        console.log(localStorage.getItem("Authorization"))
                        setTimeout(()=>{
                            this.$router.push({path:'/'});
                        },1000)
                        
                        
                    }else{
                        this.$message({
                            message: res.msg,
                            type: 'warning'
                        });
                    }
                    
                }).catch((err)=>{
                    this.$message({
                        message: "网络连接出错",
                        type: 'warning'
                    });
                })
            }

        }
    }
</script>
<style scoped>
    .contain {
        width: 100%;
        height: 100%;
    }
    
    .contain-top {
        width: 100%;
        height: 76px;
        /* background-image: url('../../static/imgPhone/login-top.png'); */
        background-size: cover;
        position: absolute;
        top: 0;
        left: 0;
    }
    
    .main {
        width: 100%;
        height: calc(100% - 192px);
        background-color: #FFFFFF;
        position: absolute;
        top: 76px;
        left: 0;
    }
    
    .acc-div,
    .pwd-div {
        width: 232px;
        height: 38px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        border: 1px solid #446CEA;
        border-radius: 19px;
        padding: 0 19px;
    }
    
    .acc-div {
        margin: 100px auto 23px auto;
    }
    
    .pwd-div {
        margin: auto;
    }
    
    .icon {
        width: 10px;
        height: 14px;
    }
    
    .main>div input {
        width: 200px;
        height: 100%;
        border: 0;
        outline: 0;
    }
    
    .main>div span {
        font-size: 10px;
        color: #CCCCCC;
    }
    
    .button-div {
        width: 268px;
        margin: 24px auto;
        display: flex;
        justify-content: flex-start;
        justify-items: center;
        flex-direction: column;
        align-items: center;
    }
    
    .button-div>button {
        width: 267px;
        height: 34px;
        background-color: #446CEA;
        color: white;
        border: 0;
        border-radius: 17px;
        outline: none;
    }
    
    .button-div>div:nth-child(2) {
        margin: 67px 0 0 0;
        width: 100%;
        height: 34px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .dotted {
        width: 100px;
        height: 1px;
    }
    
    .fastspan {
        font-size: 18px;
        color: #999999;
    }
    
    .wechat-div {
        height: 40px;
        width: 40px;
        border-radius: 20px;
        background-color: #37B42A;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 20px 0 0 0;
    }
    
    .wechat-div img {
        width: 24px;
        height: 20px;
    }
    
    .contain-bottom {
        width: 100%;
        height: 116px;
        /* background-image: url('../../static/imgPhone/login-bottom.png'); */
        background-size: cover;
        position: absolute;
        bottom: 0;
        left: 0;
    }
</style>