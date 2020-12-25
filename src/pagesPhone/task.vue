<template>
    <div class="contain">
        <div class="search">
            <div>
                <img :src="'./static/imgPhone/search-icon.png'" alt="search">
                <input type="text" placeholder="搜索"/>
            </div>
        </div>
        <div class="date">
            <span>8.25</span>
            <span>8.25</span>
            <span>8.25</span>
            <span>8.25</span>
            <span>8.25</span>
            <span>8.25</span>
            <span>8.25</span>
        </div>
        <div class="cards">
            <div class="card-item" v-for="item in cards.data" :key="item.id">
                <span class="item-num">NO.{{item.num}}</span>
                <p class="item-name" v-bind:title="item.name">{{item.name}}</p>
                <span class="time">
                    <span class="time-left">{{item.l_time}}</span>
                    <span class="time-right">{{item.r_time}}</span>
                </span>
                <div class="progress">
                    <div class="p_left" :style="{width:item.progress*100+'%'}"></div>
                    <div class="p_right" :style="{width:(1-item.progress)*100+'%'}"></div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        props:{
            query:{
                type:Object,
                default:'我是默认值，可以不定义'
            }
        },
        data() {
            return {
                cards: {
                    pageNum: 10,
                    pageSize: 10,
                    page: 1,
                    data: [{
                        id: 0,
                        num: "00000001",
                        name: "客户名称",
                        l_time: "8.25",
                        r_time: "9:23",
                        progress: 0.7
                    }, {
                        id: 1,
                        num: "00000001",
                        name: "客户名称",
                        l_time: "8.25",
                        r_time: "9:23",
                        progress: 0.85
                    }, {
                        id: 2,
                        num: "00000001",
                        name: "客户名称",
                        l_time: "8.25",
                        r_time: "9:23",
                        progress: 0.59
                    }, {
                        id: 3,
                        num: "00000001",
                        name: "客户名称",
                        l_time: "8.25",
                        r_time: "9:23",
                        progress: 0.6
                    }, {
                        id: 4,
                        num: "00000001",
                        name: "客户名称",
                        l_time: "8.25",
                        r_time: "9:23",
                        progress: 0.5
                    }, {
                        id: 5,
                        num: "00000001",
                        name: "客户名称",
                        l_time: "8.25",
                        r_time: "9:23",
                        progress: 0.5
                    }, {
                        id: 6,
                        num: "00000001",
                        name: "客户名称",
                        l_time: "8.25",
                        r_time: "9:23",
                        progress: 0.5
                    }, {
                        id: 7,
                        num: "00000001",
                        name: "客户名称",
                        l_time: "8.25",
                        r_time: "9:23",
                        progress: 0.5
                    }, {
                        id: 8,
                        num: "00000001",
                        name: "客户名称",
                        l_time: "8.25",
                        r_time: "9:23",
                        progress: 0.5
                    }, {
                        id: 10,
                        num: "00000001",
                        name: "客户名称",
                        l_time: "8.25",
                        r_time: "9:23",
                        progress: 0.7
                    }, {
                        id: 11,
                        num: "00000001",
                        name: "客户名称",
                        l_time: "8.25",
                        r_time: "9:23",
                        progress: 0.85
                    }, {
                        id: 12,
                        num: "00000001",
                        name: "客户名称",
                        l_time: "8.25",
                        r_time: "9:23",
                        progress: 0.59
                    }, {
                        id: 13,
                        num: "00000001",
                        name: "客户名称",
                        l_time: "8.25",
                        r_time: "9:23",
                        progress: 0.6
                    }, {
                        id: 14,
                        num: "00000001",
                        name: "客户名称",
                        l_time: "8.25",
                        r_time: "9:23",
                        progress: 0.5
                    }, {
                        id: 15,
                        num: "00000001",
                        name: "客户名称",
                        l_time: "8.25",
                        r_time: "9:23",
                        progress: 0.5
                    }, {
                        id: 16,
                        num: "00000001",
                        name: "客户名称",
                        l_time: "8.25",
                        r_time: "9:23",
                        progress: 0.5
                    }, {
                        id: 17,
                        num: "00000001",
                        name: "客户名称",
                        l_time: "8.25",
                        r_time: "9:23",
                        progress: 0.5
                    }, {
                        id: 18,
                        num: "00000001",
                        name: "客户名称",
                        l_time: "8.25",
                        r_time: "9:23",
                        progress: 0.5
                    }]
                }

            }
        },
        computed: {

        },
        watch: {

        },
        mounted() {
            this.init();
            // this.getData();
        },
        destroy() {},
        methods: {
            init() {
                
            },
            getData(){
                console.log(this.params)
                // var params={
                //     urgent:this.query.urgent,
                //     time:this.query.time,
                //     page:1,
                //     type:1,
                //     userId:this.query.userId,
                //     keywords:this.query.keywords
                
                // };
                // this.$http.get("/api/tasks/findTasks",params).then((res)=>{
                //     if(res.code==1000){
                //         this.haveNewMessage=res.data
                //     }
                // }).catch((err)=>{

                // })
            }
        }
    }
</script>
<style scoped>
    .contain {
        width: calc(100% - 20px);
        height: calc(100% - 20px);
        padding: 10px;
    }
    
    .search {
        width: 100%;
        height: 34px;
        border-radius: 17px;
        background-color: #FFFFFF;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    
    .search div {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    
    .search img {
        width: 15px;
        height: 15px;
    }
    
    .search input {
        width: 80%;
        height: 100%;
        border: 0;
        outline: 0;
    }
    
    .date {
        width: 100%;
        height: 40px;
        display: flex;
        justify-content: space-between;
        align-content: center;
        align-items: center;
    }
    
    .date span {
        display: block;
        width: 47px;
        height: 20px;
        border-radius: 10px;
        background-color: #FFFFFF;
        text-align: center;
    }
    
    .cards {
        width: 100%;
        /* display: flex; */
        /* justify-content: flex-start;
        flex-direction: row;
        align-items: center;
        flex-wrap: wrap; */
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        flex-direction: row;
        flex-wrap: wrap;
    }
    
    .cards .card-item {
        width: 96px;
        height: 79px;
        padding: 7px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(224, 224, 224, 1);
        box-shadow: 0px 4px 6px 0px rgba(0, 0, 0, 0.05);
        border-radius: 9px;
        margin: 0 0 10px 0;
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-direction: column;
        text-align: left;
    }
    
    .cards .card-item>span,
    .cards .card-item p {
        display: block;
        width: 100%;
        text-align: left;
        line-height: 16px;
    }
    
    .time {
        display: block;
        width: 100%;
        text-align: left;
    }
    
    .item-num {
        font-size: 6px;
        font-weight: 400;
        color: rgba(178, 178, 178, 1);
    }
    
    .item-name {
        font-size: 12px;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        
    }
    
    .time-left {
        background: rgba(255, 195, 72, 1);
        border-radius: 7px 7px 7px 7px;
        color: white;
        font-size: 12px;
        padding: 4px 4px;
        line-height: 12px;
    }
    
    .time-right {
        font-size: 12px;
        font-weight: 400;
        color: rgba(178, 178, 178, 1);
    }
    
    .progress {
        width: 100%;
        height: 10px;
        position: relative;
        border-radius: 5px;
    }
    
    .progress .p_left {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        background: linear-gradient(90deg, rgba(24, 144, 255, 1), rgba(44, 233, 255, 1));
    }
    
    .progress .p_right {
        position: absolute;
        top: 0;
        right: 0;
        z-index: 2;
        background-color: #E0E0E0;
        height: 100%;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
    }
</style>