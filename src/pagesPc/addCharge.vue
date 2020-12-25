<template>
    <div class="contain">
        <div>
            <span>客户名称:</span>
            <el-select v-model="form.tasksId" placeholder="请选择">
                <el-option
                    v-for="item in tasks"
                    :key="item.tasksId"
                    :label="item.name"
                    :value="item.tasksId">
                </el-option>
            </el-select>
        </div>
        <div>
            <span>应收金额:</span>
            <input type="text" placeholder="请输入" class="money" v-model="form.amount"/>
        </div>
        <button class="confirm" @click="confirm">新建完成</button>
    </div>
</template>

<script>
    // import cover1 from '@/assets/images/1.jpg'
    export default {
        data() {
            return {
                tasks:{
                    tasksId:"",
                    name:""
                },
                form:{
                    tasksId:"",
                    amount:""
                }
            }
        },
        computed: {

        },
        watch: {

        },
        created() {
            this.init();

        },
        destroy() {},
        methods: {

            init() {
                this.$http.get("/api/tasks/findTasksByCharge","").then((res)=>{
                    if(res.code==1000){
                        this.tasks=res.data
                    }

                }).catch((err)=>{

                })

            },
            confirm() {
                this.$message.closeAll();
                if(this.form.tasksId==""){
                    this.$message({
                        message: "请选择客户名称",
                        type: 'warning'
                    });
                }else if(this.form.amount==""){
                    this.$message({
                        message: "请填写金额",
                        type: 'warning'
                    });
                }else{
                    this.$http.get("/api/tasks/addCharge",this.form).then((res)=>{
                        if(res.code==1000){
                            this.$router.push({path:"/feedBackResult",query:{from:"addCharge"}})

                        }

                    }).catch((err)=>{

                    })
                }
            }
        }
    }
</script>
<style scoped> 
.contain{
    width: 100%;
    height: 462px;
    background-color: white;
    overflow: hidden;
}
.contain span{
    font-size: 20px;
    color: #333333;
}
.contain>div{
    display: flex;
    justify-content: flex-start;
    align-content: center;
    margin: 60px 0 60px 32px;
}
.money{
    width: 212px;
    height: 36px;
    outline: none;
    border: 1px solid #999999;
    border-radius: 3px;
    padding: 0 0 0 3px;
}
.confirm{
    width: 154px;
    height: 54px;
    background-color: #446CEA;
    color: white;
    border: 0;
    outline: none;
    font-size: 20px;
    cursor: pointer;
    border-radius: 5px;
    margin: 0 0 0 32px;
}
</style>
