<template>
  <div class="contain" style="position: relative">
    <div class="total">
      <div>
        <span class="total-span">当日总计应收金额：</span>
        <span class="total-money">{{chargeData.total}}元</span>
      </div>
      <div>
        <span class="total-span">实收金额：</span>
        <span class="total-money">{{chargeData.charged}}元</span>
      </div>
      <div>
        <span class="total-span">剩余金额：</span>
        <span class="total-money">{{chargeData.unCharged}}元</span>
      </div>
    </div>
    <div class="query">
      <div class="time-condition">
        <span>时间筛选:</span>
        <div class="block">
          <el-date-picker
            v-model="query.time"
            @change="changeData"
            type="date"
            placeholder="选择日期时间"
          ></el-date-picker>
        </div>
      </div>
      <div style="display:flex; justify-content: space-between;">
        <span style="width: 130px; text-align: right;">客户查找:</span>
        <el-input v-model="query.name" autocomplete="off" @input="search"></el-input>
      </div>
      <div>
        <span>任务状态:</span>
        <el-select v-model="query.charge" placeholder="请选择" @change="changeType">
          <el-option
            v-for="item in charge"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
    </div>
    <div class="main">
      <div class="table-header">
        <div v-for="item in tableHeader" :key="item.id" :style="{width:item.width+'px'}">
          <span>{{item.name}}</span>
        </div>
      </div>
      <div
        class="table-body"
        v-for="item in data.list"
        :key="item.id"
        v-bind:class="item.canCharge?'':'little-green'"
      >
        <div class="item">
          <!-- // data
                            // amount: 2000
                            // balance: 2000
                            // charge: 0
                            // desc: "我发布的已完成"
                            // id: 2
                            // name: "我发布的未完成"
                            // time: "2019/09/25 23:18"
          // worksName: "未收完"-->
          <div class="item-first">
            <div style="width: 180px">
              <span>NO.{{item.number}}</span>
            </div>
            <div style="width: 262px">
              <span style="color: #446CEA" class="item-name">{{item.name}}</span>
            </div>
            <div style="width: 156px">
              <span>{{item.worksName}}</span>
            </div>
            <div style="width: 160px">
              <span>{{item.amount}}元</span>
            </div>
            <div style="width: 160px">
              <span>{{item.charge}}元</span>
            </div>
            <div style="width: 170px">
              <span>{{item.balance}}元</span>
            </div>
            <div style="width: 90px">
               <a
                style="color: #446CEA;cursor: pointer;"
                @click="updateMoney(item)"
              >修改金额</a>
              <a
                style="color: #446CEA;cursor: pointer;"
                @click="setMoney(item.id)"
                v-if="item.canAdd==true"
              >设置金额</a>
              <a
                style="color: #446CEA;cursor: pointer;"
                @click="confirm(item.id)"
                v-if="item.canCharge==true&&item.canAdd==false"
              >确认收款</a>
              <a
                style="color: #999999;cursor: not-allowed;"
                v-if="item.canCharge==false&&item.canAdd==false"
              >确认收款</a>
            </div>
          </div>
          <div class="item-second">
            <div class style="width: 147px;height: 100%;"></div>
            <div
              class
              style="width: calc(100% - 147px);border-bottom: 1px solid #DAE2EA;height: 100%;"
            >
              <span style="font-size: 12px;color:#BCBCBC">发送时间：{{item.time}}</span>
            </div>
          </div>
          <div class="item-third">
            <div class style="width: 147px;height: 100%;"></div>
            <div style="width: 820px">
              <span
                style="font-size: 14px;color:#BCBCBC;white-space:pre"
                class="desc"
              >备注:{{item.desc}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          :page-size="30"
          @current-change="handleCurrentChange"
          background
          layout="prev, pager, next"
          :total="data.totalRow"
        ></el-pagination>
      </div>
    </div>
    <div class="alert-div" v-show="alertShow">
      <span style="margin: 49px 0 0 430px;display: block;color: #BBBBBB" @click="cancel">取消</span>
      <div class="alert-div-item">
        <span>收款</span>
        <div class="money">
          <input
            type="text"
            style="width: 100%;height:100%;font-size:16px;padding:0 0 0 3px"
            v-model="confirmData.charge"
          />
          <!-- <span>{{confirmData.charge}}</span> -->
        </div>
      </div>
      <div class="alert-div-item">
        <span>备注</span>
        <div class="beizhu">
          <textarea
            name
            id
            cols="30"
            rows="10"
            style="width: 100%;height:100%;padding:0 0 0 3px"
            v-model="confirmData.desc"
          ></textarea>
          <!-- <span>{{confirmData.desc}}</span> -->
        </div>
      </div>
      <button class="confirm" @click="confirmFuc">确认</button>
    </div>

    <div class="alert-div" style="height: 350px" v-show="moneyShow">
      <span style="margin: 49px 0 0 430px;display: block;color: #BBBBBB;" @click="moneyCancel">取消</span>
      <div class="alert-div-item">
        <span>应收</span>
        <div class="money">
          <input
            type="text"
            style="width: 100%;height:100%;font-size:16px;padding:0 0 0 3px"
            v-model="amount"
          />
          <!-- <span>{{confirmData.charge}}</span> -->
        </div>
      </div>
      <button class="confirm" @click="moneyComfirm">确认</button>
    </div>
    <!-- <div class="mask">

    </div>-->
    <get-charge-update-money ref="getChargeUpdateMoney" @success="search" />
  </div>
</template>

<script>
import GetChargeUpdateMoney from "./GetChargeUpdateMoney"
// import cover1 from '@/assets/images/1.jpg'
export default {
  data() {
    return {
      query: {
        time: "",
        charge: 0,
        page: 1,
        name:''
      },
      tableHeader: [
        {
          id: 0,
          name: "任务编号",
          width: 180,
        },
        {
          id: 1,
          name: "客户名称",
          width: 262,
        },
        {
          id: 2,
          name: "任务状态",
          width: 156,
        },
        {
          id: 3,
          name: "应收金额",
          width: 160,
        },
        {
          id: 4,
          name: "实收金额",
          width: 160,
        },
        {
          id: 5,
          name: "剩余金额",
          width: 170,
        },
        {
          id: 6,
          name: "操作",
          width: 70,
        },
      ],

      data: {
        list: [],
        pageNumber: 1,
        pageSize: 30,
        totalPage: 1,
        totalRow: 6,
      },
      charge: [
        {
          value: 0,
          label: "全部",
        },
        {
          value: 17,
          label: "已收完",
        },
        {
          value: 18,
          label: "未收完",
        },
      ],
      chargeData: {
        charged: "",
        total: "",
        unCharged: "",
      },
      //page,time,charge  17 已收完，18 未收完
      // data:{
      //     name:"",
      //     createTime:"",
      //     endTime:"",
      //     describes:"",
      //     price:"",
      //     step:[{works:7,name:"",time:""}],//name: "步骤1" ,time: "2019-09-16 21:44:02" ,works: 7
      //     executors:[{faceicon:"",userName:"",userId:""}]
      // },
      alertShow: false,
      moneyShow: false,
      amount: "",
      tasksId: "",
      confirmData: {
        charge: "",
        desc: "",
        tasksId: 0,
      },
    };
  },
  computed: {},
  components: {GetChargeUpdateMoney},
  watch: {},
  mounted() {
    this.search();
    this.init();
  },
  destroy() {},
  methods: {
    init() {
      // 初始化搜索
    },
    search() {
      var params = {
        // page: this.query.page,
        // time: this.query.time,
        // charge: this.query.charge,
        // name: this.query.name
        ...this.query

        // tasksId:this.$route.query.id
      };
      this.$http
        .get("/api/tasks/getCharge", params)
        .then((res) => {
          if (res.code == 1000) {
            this.data = res.data.page;
            this.chargeData.charged = res.data.charged;
            this.chargeData.total = res.data.total;
            this.chargeData.unCharged = res.data.unCharged;
          }
          // this.$router.push({path:'/'})
        })
        .catch((err) => {});
    },
    changeData() {
      var d = this.query.time;
      var year = d.getFullYear();
      var month =
        d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1;
      var day = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
      this.query.time = year + "-" + month + "-" + day;
      this.search();
    },
    changeType() {
      this.search();
    },
    handleSizeChange(val) {
      console.log(val);
    },
    handleCurrentChange(val) {
      this.query.page = val;
      this.search();
    },
    //确认收款
    confirm(id) {
      this.alertShow = true;
      this.confirmData.tasksId = id;
      this.$parent.maskFuc(true);
      // confirmData:{charge:0,desc:''}
    },
    setMoney(id) {
      this.moneyShow = true;
      this.tasksId = id;
      this.$parent.maskFuc(true);
    },
    updateMoney(row) {
      console.log(row)
      this.$refs.getChargeUpdateMoney.openDialog(row)
    },
    moneyCancel() {
      this.$parent.maskFuc(false);
      this.moneyShow = false;
    },
    moneyComfirm() {
      var params = {
        tasksId: this.tasksId,
        amount: this.amount,
      };
      this.$message.closeAll();
      if (params.amount == "") {
        this.$message({
          message: "请输入应收金额",
          type: "warning",
        });
      } else {
        this.$http
          .get("/api/tasks/addCharge", params)
          .then((res) => {
            if (res.code == 1000) {
              this.search();
              this.$parent.maskFuc(false);
              this.moneyShow = false;
              this.$message({
                message: res.msg,
                type: "success",
              });
            }
          })
          .catch((err) => {});
      }
    },
    //确认按钮
    confirmFuc() {
      var params = {
        tasksId: this.confirmData.tasksId,
        charge: this.confirmData.charge,
        contents: this.confirmData.desc,
      };

      this.$http
        .get("/api/tasks/charge", params)
        .then((res) => {
          if (res.code == 1000) {
            console.log(111);
            this.$message({
              message: res.msg,
              type: "success",
            });
            this.cancel();
            this.search();
          }
          // this.$router.push({path:'/'})
        })
        .catch((err) => {});
    },
    cancel() {
      this.alertShow = false;
      this.$parent.maskFuc(false);
    },
  },
};
</script>
<style>
.query > div .el-input--suffix .el-input__inner,
.query > div .el-range-editor.el-input__inner,
.query > div .el-textarea__inner {
  width: 200px;
}

.block .el-date-editor.el-input,
.block.el-date-editor.el-input__inner {
  width: 240px;
}
</style>
<style scoped>
.total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(100% - 40px);
  height: 54px;
  padding: 0 20px;
  background-color: #ffffff;
}
.total-span {
  font-size: 20px;
  color: #6787ab;
}
.total-money {
  font-size: 20px;
  color: #446cea;
}

.alert-div {
  /* position: absolute; */
  position: fixed;
  /* top: 200px; */
  top: 400px;
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
}

.alert-div div > div {
  background-color: #f2f6fc;
  margin: 0 0 0 30px;
}

.money {
  width: 330px;
  height: 60px;
  line-height: 60px;
}

.beizhu {
  width: 330px;
  height: 182px;
  line-height: 60px;
}

.money span,
.beizhu span {
  margin: 0 0 0 20px;
}

.confirm {
  width: 400px;
  height: 59px;
  background-color: #ff4824;
  border-radius: 30px;
  outline: none;
  border: 0;
  color: white;
  font-size: 20px;
  margin: 20px 0 0 40px;
  display: block;
}

.mask {
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #000000;
  opacity: 0.3;
}
.contain {
  display: flex;
  justify-content: flex-end;
  align-items: right;
  flex-direction: column;
  background-color: #f0f2f3;
  height: 100%;
  min-width: 989px;
  /* flex-wrap: */
}

.query {
  width: 100%;
  height: 54px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  margin: 17px 0;
}

.query > div {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.query > div > span {
  font-size: 18px;
  color: rgba(103, 135, 171, 1);
  margin: 0 21px;
}

.query > div:nth-child(2) {
  margin: 0 20px 0 0;
}

.main {
  width: 100%;
}
.main .little-green {
  background-color: #ddfff1;
}
.table-header {
  width: calc(100% - 44px);
  padding: 0 20px 0 20px;
  height: 58px;
  background: rgba(244, 248, 251, 1);
  border: 2px solid rgba(218, 226, 234, 1);
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.table-header span {
  font-size: 18px;
  color: #333333;
}

.table-body {
  width: calc(100% - 24px);
  padding: 0 0 0 20px;
  border: 2px solid rgba(218, 226, 234, 1);
  border-top: 0;
}

.item {
  width: 100%;
}

.item-first {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.item-first span {
  font-size: 16px;
  color: #666666;
}

.item-second {
  height: 40px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.item-third {
  /* height: 50px; */
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.desc {
  word-wrap: break-word;
  word-break: break-all;
  white-space: pre-wrap !important;
  width: 500px;
}
.item-name {
  display: block;
  overflow: hidden;
  width: 200px;
  text-overflow: ellipsis;
  white-space: nowrap;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  word-break: break-all;
}
</style>