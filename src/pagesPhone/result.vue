<template>
        <div class="contain">
            <div class="header">
                <img :src="'./static/imgPhone/return-icon.png'" alt="返回" class="return">
                <span class="title">反馈成功</span>
                <span>完成</span>
            </div>
            <div class="main">
                <img :src="'./static/imgPc/success-icon.png'" alt="">
                <span>反馈成功，3s后即将返回<a>任务详情</a>...</span>
            </div>
            
        </div>
    </template>

<script>
    // import cover1 from '@/assets/images/1.jpg'
    export default {
        data() {
            return {


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

        }
    }
</script>

<style scoped>
    .contain {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;
        background-color: #FFFFFF;
    }
    
    .main {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;
        background-color: #FFFFFF;
        height: calc(100% - 54px);
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
    
    .main img {
        width: 88px;
        height: 88px;
        border-radius: 50%;
        margin: 66px 0 83px 0;
    }
    
    .main span {
        font-size: 12px;
        line-height: 26px;
        color: #000000;
    }
    
    .main span a {
        color: #2C97FF;
        cursor: pointer;
        text-decoration: underline;
    }
</style>