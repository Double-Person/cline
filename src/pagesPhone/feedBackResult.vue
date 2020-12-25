<template>
        <div class="contain">
            <div class="header">
                <img :src="'./static/imgPhone/return-icon.png'" alt="返回" class="return" @click="returnFuc">
                <span class="title">{{data.name}}成功</span>
                <span> </span>
            </div>
            <img :src="'./static/imgPc/success-icon.png'" alt="">
            <span>{{data.name}}成功，{{data.second}}s后即将返回<a @click="returnHistory">{{data.returnName}}</a>...</span>
        </div>
    </template>

<script>
    // import cover1 from '@/assets/images/1.jpg'
    export default {
        data() {
            return {
                data:{
                    name:"反馈",
                    returnName:"任务详情" ,
                    second:3
                },
                interval:""

            }
        },
        computed: {

        },
        watch: {

        },
        created(){
            var params=this.$route.query;
            this.data.name=params.from=="feedBack"?'反馈':'新建'
            this.data.returnName=params.from=="feedBack"?'任务详情':'任务页面';
            if(params.from=="addCharge"){
                this.data.returnName="货款管理"
            }
            console.log(params);
        },
        mounted() {
            this.setIntervalFuc()
        },
        destroy() {},
        methods: {
            setIntervalFuc(){
                this.interval=setInterval(()=>{
                    var second=this.data.second;
                    if(second>0){
                        second--;
                        this.data.second=second;
                        if(second==0){
                            //执行跳转
                            clearInterval(this.interval);
                            this.returnHistory()
                        }
                    }
                },1000)
            },
            returnHistory(){
                clearInterval(this.interval);
                var params=this.$route.query;
                if(params.from=="feedBack"){
                    this.$router.go(-2)
                }else if(params.from=="addCharge"){
                    this.$router.go(-2)
                }
                else{
                    this.$router.push({path:'/'})
                }
                
            },
            returnFuc(){
                this.$router.go(-1)
            }

        }
    }
</script>

<style scoped>
    .contain {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;
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
    .contain>img {
        width: 88px;
        height: 88px;
        border-radius: 50%;
        margin: 66px 0 83px 0;
    }
    
    .contain>span {
        font-size: 12px;
        line-height: 26px;
        color: #000000;
    }
    
    .contain>span a {
        color: #2C97FF;
        cursor: pointer;
        text-decoration: underline;
    }
</style>