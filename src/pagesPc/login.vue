<template>
    <div class="contain">
        <!-- <p class="login-p">- 登录 -</p> -->
        <img :src="'./static/imgPc/logo.png'" alt="LOGO" class="logo">
        <div class="item item-acc">
            <img :src="'./static/imgPc/acc-icon.png'" alt="account">
            <input type="text" placeholder="输入微信账号" v-model="data.userName"/>
        </div>
        <div class="item">
            <img :src="'./static/imgPc/pwd-icon.png'" alt="password" >
            <input type="password" placeholder="输入登录密码" v-model="data.password">
        </div>
        <div class="wechat-div">
            <!-- <span class="wechat">微信扫码登录</span> -->
        </div>
        
        <button @click="login">登录</button>
        <div id="alert" v-if="alert.show">
            <img :src="'/static/imgPc/success-icon.png'" alt="" v-if="alert.success">
            <img :src="'/static/imgPc/default-icon.png'" alt="" v-if="!alert.success">
            <span v-if="alert.success">登录成功</span>
            <span v-if="!alert.success">登录失败</span>
        </div>
    </div>

</template>

<script>
    // import cover1 from '@/assets/images/1.jpg'
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
            login() {
                var that=this;
                //静态
                // this.$router.push({path:'/'})
                this.$http.get("/api/userInfo/login",this.data).then((res)=>{
                    
                    if(res.code==1000){
                        that.$cookie.set("Authorization",res.authorization,1);
                        that.$router.push({path:'/'})
                        console.log(JSON.stringify(res.data))
                        that.$cookie.set("userInfo",JSON.stringify(res.data),1);
                    }else{
                        this.$message({
                            message: res.msg,
                            type: 'warning'
                        });
                    }
                    
                }).catch((err)=>{

                })
            }

        }
    }
</script>
<style scoped>
    .contain {
        width: 976px;
        height: 606px;
        background-color: #ffffff;
        box-shadow: 0px 0px 30px 0px rgba(115, 120, 143, 0.2);
        opacity: 0.95;
        border-radius: 20px 20px 20px 20px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin: -303px 0 0 -488px;
    }
    
    /* .login-p {
        color: #446CEA;
        font-size: 30px;
        margin: 130px 0 0 0;
        text-align: center;
    } */
    
    button {
        color: white;
        background-color: #446CEA;
        border-radius: 21px;
        border: 0;
        height: 42px;
        padding: 0 113px;
        display: block;
        margin: 0 auto;
        outline: none;
    }
    
    .contain div {
        width: 255px;
        height: 30px;
        margin: 0 auto;
        border-bottom: 1px solid #E4E4E4;
    }
    
    .contain input {
        width: 200px;
        height: 100%;
        margin: 0 0 0 17px;
        border: 0;
        padding: 0;
        outline: none
    }
    
    .contain img {
        width: 18px;
        height: 20px;
    }
    .contain .logo{
        display: block;
        margin: 140px auto 20px auto;
        width: 200px;
        height: 44px;
    }
    .item {
        display: flex;
        justify-content: flex-start;
        justify-items: center;
        align-items: center;
    }
    
    .item-acc {
        margin: 80px auto 20px auto !important;
    }
    
    .wechat-div {
        margin: 33px auto 35px auto !important;
        border: 0 !important;
    }
    
    .wechat {
        color: #446CEA;
        font-size: 12px;
        display: inline-block;
        width: 100%;
        text-align: right;
    }
    #alert{
        background-color: white;
        display: flex;
        justify-content:space-around;
        align-items: center;
        flex-direction: column;
        width:168px;
        height:136px;
        background:rgba(252,253,254,1);
        box-shadow:0px 0px 3px 0px rgba(0, 0, 0, 0.1);
        border-radius:5px 5px 5px 5px;
        border-radius: 5px;
        position: absolute;
        top:50%;
        left: 50%;

    }
    #alert img{
        width: 90px;
        height: 90px;
    }
</style>