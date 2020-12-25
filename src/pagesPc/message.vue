<template>
        <div class="contain">
            
            <div class="item" v-for="item in cards.list">
                <div>
                    <span>{{item.title}}</span>
                    <span>{{item.time}}</span>
                </div>
                <div>
                    <span>{{item.content}}点击跳转至<span style="color: #446CEA;cursor: pointer;" @click="taskInfo(item.tasksId)">任务详情</span>页</span>
                </div>
            </div>
                    
            <div class="pagination">
                <el-pagination
                @size-change="handleSizeChange"
                :page-size="10"
                @current-change="handleCurrentChange"
                background
                layout="prev, pager, next"
                :total="cards.totalRow">
            </el-pagination>
            </div>
        </div>
    </template>

<script>
    // import cover1 from '@/assets/images/1.jpg'
    export default {
        data() {
            return {
                routerArr: [{
                    id: 0,
                    router: '/task-unfinished',
                    active: true,
                }, {
                    id: 1,
                    router: '/task-finished',
                    active: true

                }, {
                    id: 1,
                    router: '/task-expired',
                    active: true
                }],
                condition: {
                    time: "",
                    show: false
                },
                cards: {
                    totalPage:1,
                    pageNumber: 1,
                    pageSize: 10,
                    list: [{
                        content: "11111wwww11",
                        id: 5,
                        tasksId: 1,
                        time: "2019/09/17 16:34",
                        title: "任务已被接取",
                        worksName: "已查看",
                    }]
                },
                page:1

            }
        },
        computed: {

        },
        watch: {

        },
        mounted() {
            this.init();
        },
        destroy() {},
        methods: {
            init() {
                // 
                var params={
                    userId:(JSON.parse(this.$cookie.get("userInfo"))).userId,
                    page:this.page
                };
                this.$http.get("/api/messages/findMyMessages",params).then((res)=>{
                    
                    if(res.code==1000){
                        this.cards=res.data;
                        //消除红点
                        this.clearRed()
                    }
                }).catch((err)=>{

                })
            },
            handleSizeChange(val) {
                console.log(val)
            },
            handleCurrentChange(val) {
                this.page=val;
                this.init();
            },
            taskInfo(id){
                var data={id:id}
                this.$router.push({path:'/taskInfo',query:data})
            },
            clearRed(){
                this.$parent.newMessage();
            }
        }
    }
</script>

<style scoped>
    .title {
        font-size: 30px;
        font-weight: bold;
        color: rgba(9, 34, 56, 1);
        line-height: 75px;
    }
    /* 主要部分 */
    /* 主要内容 */
    
    .item {
        width: calc(100% - 60px);
        height: 211px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        padding: 0 30px;
        margin: 0 0 20px 0;
    }
    
    .item>div:nth-child(1) {
        height: 86px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 2px solid #F0F1F3;
    }
    
    .item>div:nth-child(1)>span:nth-child(1) {
        font-size: 24px;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
    }
    
    .item>div:nth-child(1)>span:nth-child(2) {
        font-size: 14px;
        font-weight: 400;
        color: rgba(176, 176, 176, 1);
    }
    
    .item>div:nth-child(2)>span {
        font-size: 18px;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 40px;
    }
    
    .pagination {
        margin: 10px 0 0 0;
    }
    
    .pagination>div {
        float: right;
    }
</style>
<style>
    .el-pagination.is-background .el-pager li:not(.disabled).active {
        background-color: #5488F8 !important;
    }
    
    .el-pagination.is-background .el-pager li:hover {
        color: #5488F8 !important;
    }
</style>