<template>
  <div class="contain">
    <!-- 主要内容 -->
    <div class="main">
      <div class="main-right">
        <div class="cards">
          <div
            class="card-item"
            v-for="(item, index) in cards.list"
            :key="item.index"
            @click.stop="cardInfo(item.id)"
            v-bind:id="item.status && item.status == 7 ? 'shine-box-green' : ''"
            v-bind:class="item.urgent ? 'shine-box-red' : ''"
          >
          <img class="check-img" v-if="item.status && item.status == 7" src="../../static/imgPc/check.svg" alt="">
            <div class="checkIcon" v-show="item.checks != null">
              <img v-bind:src="'./static/imgPc/checkbg-icon.png'" alt />
              <span>查料</span>
            </div>
            <div class="card-item-top">
              <div class="my_delivery">
                <span class="item-num">NO.{{ item.number }}</span>
                <div class="delivery" @click.stop="Bacmask(item.id)">
                  {{ item.shipName }}
                </div>
              </div>
              <div class="my-del">
                <p class="item-name" v-bind:title="item.name">
                  {{ item.name }}
                </p>
                <p class="item-delivery">{{ item.shipmentNo }}</p>
              </div>
              <span class="time">
                <span class="time-left">{{ item.startTime }}</span>
                <span class="time-right">{{ item.endTime }}</span>
              </span>
              <div class="progress">
                <div
                  class="p_left"
                  :style="{ width: item.ratio * 100 + '%' }"
                ></div>
                <div
                  class="p_right"
                  :style="{ width: (1 - item.ratio) * 100 + '%' }"
                ></div>
              </div>
              <div>
                <div
                  class="getTask"
                  @click.stop="getTask(item.id)"
                  v-if="item.canAccept"
                  :id="taskIssuer == true ? 'cantClick' : 'canClick'"
                >
                  接受任务
                </div>
                <div class="taskReceive" v-else>
                  任务接受人：{{ item.acceptorName }}
                </div>
              </div>
            </div>
            <img
              :src="
                upindex[index] === index
                  ? './static/imgPc/xia.png'
                  : './static/imgPc/shang.png'
              "
              alt
              @click.stop="packup(index)"
              class="packup"
            />
            <div class="checks" v-show="upindex[index] === index">
              <span class="checks-title">物料核查：</span>
              <ul>
                <li v-for="(items, index) in item.checks" :key="index">
                  <span class="checks-span">{{ items.name }}</span>
                  <img
                    v-bind:src="
                      items.flag == 'true'
                        ? './static/imgPc/step-true-icon.png'
                        : './static/imgPc/default-icon.png'
                    "
                    alt
                    :style="item.checkStatus == '0' ? 'opacity:0' : 'opacity:1'"
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="pagination" v-if="false">
          <el-pagination
            :page-size="30"
            :pager-count="11"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            background
            layout="prev, pager, next"
            :total="cards.totalRow"
          ></el-pagination>
        </div>
      </div>
    </div>
    <div class="my_odd" v-show="mask">
      <div class="close">
        <div @click="close">X</div>
      </div>
      <div class="danhao">
        <span>单号：</span>
        <input type="text" v-model="myodd" />
      </div>
      <div class="enter" @click="enter">确定</div>
    </div>
    <div class="mask" v-show="mask"></div>
  </div>
</template>

<script>
// import checkboxTrue from "../../static/imgPc/checkbox-true-icon.png";
// import checkbox from "../../static/imgPc/default-icon.png";
// import shang from "../../static/imgPc/shang.png";
// import xia from "../../static/imgPc/xia.png";
// import cover1 from '@/assets/images/1.jpg'
export default {
  props: {
    query: {
      type: Object,
      default: "我是默认值，可以不定义",
    },
  },
  data() {
    return {
      routerArr: [
        {
          id: 0,
          router: "/task-unfinished",
          active: true,
        },
        {
          id: 1,
          router: "/task-finished",
          active: true,
        },
        {
          id: 1,
          router: "/task-expired",
          active: true,
        },
      ],
      page: 1,
      cards: {
        pageNumber: 10,
        pageSize: 10,
        page: 1,
        // endTime: "09.23"
        // id: 1
        // name: "任务1"
        // ratio: 0.6666666666666666
        // startTime: "09.23"
        // urgent: true
        list: [
          {
            id: 0,
            name: "客户名称",
            startTime: "8.25",
            endTime: "9:23",
            ratio: 0.7,
          },
        ],
        checks: [],
      },
      taskReceive: "",
      taskIssuer: false,
      mask: false, //遮罩
      myodd: "",
      oddText: "",
      oddTxt: "",
      shipment: "",
      upindex: [],
    };
  },

  computed: {},
  watch: {},
  mounted() {
    this.init();
    this.getData();
  },
  destroy() {},
  beforeMount() {
    this.init();
    this.getData();
  },
  methods: {
    // 展开收起
    packup(index) {
      // console.log(index);
      this.upindex[index] === index
        ? this.$set(this.upindex, index, "")
        : this.$set(this.upindex, index, index);
    },
    Bacmask(id) {
      this.mask = true;
      this.shipment = id;
    },
    close() {
      this.mask = false;
    },
    enter() {
      this.mask = false;
      this.oddText = this.myodd;
      var params = {
        tasksId: this.shipment,
        shipmentNo: this.myodd,
      };
      this.$http.get("/api/tasks/updateShipmentNo", params).then((res) => {});
      this.myodd = "";
      this.getData();
    },
    init() {
      // var data = this.$route.query;
      // this.$emit('init', data)
    },
    getData() {
      // /api/tasks/findAllUnfinishedTasks
      // console.log(this.query)
      var params = {
        urgent: this.query.urgent,
        time: this.query.time,
        page: this.page,
        type: 1,
        userId: this.query.userId,
        keywords: this.query.keywords,
      };
      // console.log(this.query.giveOrGet)
      if (this.query.giveOrGet == 1) {
        params.type = 11;
        this.taskIssuer = true;
      } else if (this.query.giveOrGet == 2) {
        params.type = 10;
        this.taskIssuer = false;
      } else if (this.query.giveOrGet == 3) {
        params.type = 12;
        this.taskIssuer = false;
      } else {
        params.type = 13;
        this.taskIssuer = true;
      }

      // if(this.query.giveOrGet){
      //     params.type = 11
      // }else{
      //     params.type = 10
      // }

      // if (this.query.style == 2) {
      //我的
      // if (this.query.taskCondition == 1) {
      //     // params.type=
      //     //未完成
      //     if (this.query.giveOrGet) {
      //         //我发布的
      //         params.type = 7
      //     } else {
      //         //我截取的
      //         params.type = 4
      //     }
      // } else if (this.query.taskCondition == 2) {
      //     //已完成
      //     if (this.query.giveOrGet) {
      //         //我发布的
      //         params.type = 8
      //     } else {
      //         //我截取的
      //         params.type = 5
      //     }
      // } else if (this.query.taskCondition == 3) {
      //     //已过期
      //     if (this.query.giveOrGet) {
      //         //我发布的
      //         params.type = 9
      //     } else {
      //         //我截取的
      //         params.type = 6
      //     }
      // }
      // }
      // else {
      //     console.log("xt")
      //     if (this.query.taskCondition == 1) {
      //         params.type = 1
      //             //未完成
      //     } else if (this.query.taskCondition == 2) {
      //         params.type = 2
      //             //已完成
      //     } else if (this.query.taskCondition == 3) {
      //         params.type = 3
      //             //已过期
      //     }
      // }
      this.$http
        .get("/api/tasks/findTasks", params)
        .then((res) => {
          // console.log("res", res);
          if (res.code == 1000) {
            res.data.list.forEach((item) => {
              if (item.shipment == "0") {
                item.shipName = "快递";
              } else if (item.shipment == "1") {
                item.shipName = "物流";
              } else {
                item.shipName = "自取";
              }
            });
            this.cards = res.data;
            // console.log(this.cards,"");
          }
          // this.$router.push({path:'/'})
        })
        .catch((err) => {});
    },
    handleSizeChange(val) {
      // console.log(val)
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getData();
      // console.log(val)
    },
    cardInfo(id) {
      console.log(this.myodd);
      var data = {
        id: id,
      };
      this.$router.push({
        path: "/taskInfo",
        query: {
          id: id,
          bookmark: false,
          condition: false,
          shipmentNo: this.myodd,
        },
      });
    },

    //接取任务
    getTask(id) {
      var params = {
        tasksId: id,
        userId: this.query.userId,
      };
      this.$http.get("/api/tasks/acceptTasks", params).then((res) => {
        if (res.code == 1000) {
          this.getData();
        }
      });
    },
  },
};
</script>

<style scoped>
/* 主要部分 */
/* 卡片 */
/* @-webkit-keyframes greenPulse {
            from { background-color: #749a02; -webkit-box-shadow: 0 0 9px #333; }
            50% { background-color: #91bd09; -webkit-box-shadow: 0 0 18px #91bd09; }
            to { background-color: #749a02; -webkit-box-shadow: 0 0 9px #333; }
        } */
.my-del {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
}

.contain {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.mask {
  width: 100%;
  height: 900px;
  position: absolute;
  background-color: #000000;
  top: 0;
  left: 0;
  opacity: 0.3;
  z-index: 998;
}

.my_odd {
  width: 300px;
  background: white;
  padding-bottom: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -150px;
  margin-top: -55px;
  z-index: 999;
}

.close {
  width: 100%;
  height: 40px;
  position: relative;
}

.close > div {
  width: 20px;
  height: 40px;
  position: absolute;
  right: 20px;
  line-height: 40px;
}

.danhao {
  width: 100%;
  height: 100px;
  padding-top: 30px;
  box-sizing: border-box;
}

.danhao > span {
  margin-left: 30px;
}

.enter {
  width: 60px;
  height: 25px;
  background: #446cea;
  color: white;
  text-align: center;
  line-height: 25px;
  border-radius: 2px;
  margin: 0 auto;
}

.my_delivery {
  display: flex;
  justify-content: space-between;
}

.delivery {
  background: #446cea;
  font-size: 14px;
  height: 18px;
  margin-top: 7px;
  padding: 3px;
  color: white;
  letter-spacing: 2px;
  border-radius: 5px;
}

.packup {
  width: 20px;
  height: 20px;
}

.cards {
  width: 100%;
  min-height: 300px;
  display: flex;

  justify-content: flex-start;
  flex-direction: row;
  align-items: start;
  flex-wrap: wrap;
}

.cards .card-item {
  width: 200px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 4px 6px 0px rgba(0, 0, 0, 0.05);
  border-radius: 9px;
  margin: 15px 0 0 15px;
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: left;
  padding-bottom: 10px;
  position: relative;
}

.cards .card-item .card-item-top {
  width: 140px;
  height: 137px;
  padding: 15px 30px;
}

#shine-box-green {
  border: 2px solid #57c47a;
  /* animation: glowGreen 500ms ease-out infinite alternate; */
}
.check-img{
  position: absolute;
  width: 50%;
  top: 70px;
  opacity: 0.6;
}

@keyframes glowGreen {
  0% {
    border-color: #57c47a;
    box-shadow: 0 0 20px rgba(255, 22, 0, 0.2),
      inset 0 0 20px rgba(255, 22, 0, 0.1), 0 2px 0 #ff1600;
  }

  100% {
    border-color: #efefef;
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.6),
      inset 0 0 10px rgba(255, 255, 255, 0.4), 0 2px 0 #efefef;
  }
}

.shine-box-red {
  animation: glowRed 500ms ease-out infinite alternate;
}

@keyframes glowRed {
  0% {
    border-color: #ff1600;
    box-shadow: 0 0 5px rgba(255, 22, 0, 0.2),
      inset 0 0 5px rgba(255, 22, 0, 0.1), 0 1px 0 #ff1600;
  }

  100% {
    border-color: #efefef;
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.6),
      inset 0 0 10px rgba(255, 255, 255, 0.4), 0 1px 0 #efefef;
  }
}

.checks {
  margin-top: 5px;
  border-top: 1px dashed rgba(224, 224, 224, 1);
}

.packup {
  color: rgba(153, 153, 153, 1);
  font-size: 12px;
}

.cards .card-item > span,
.cards .card-item p {
  display: block;
  width: 100%;
  text-align: left;
  line-height: 20px;
}

.time {
  display: block;
  width: 100%;
  text-align: left;
}

.item-num {
  font-size: 14px;
  font-weight: 400;
  color: rgba(178, 178, 178, 1);
}

.item-name {
  font-size: 18px;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: keep-all;
  width: 200px;
}

.time-left {
  background: rgba(255, 195, 72, 1);
  border-radius: 7px 7px 7px 7px;
  color: white;
  font-size: 14px;
  padding: 4px 12px;
}

.time-right {
  font-size: 14px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(178, 178, 178, 1);
}

#canClick {
  cursor: pointer;
}

#cantClick {
  cursor: not-allowed;
}

.progress {
  width: 140px;
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
  background: linear-gradient(
    90deg,
    rgba(24, 144, 255, 1),
    rgba(44, 233, 255, 1)
  );
}

.progress .p_right {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
  /* background-color: #e0e0e0; */
  height: 100%;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}

.pagination {
  margin: 10px 0 0 0;
}

.pagination > div {
  float: right;
}

.checks {
  height: 103px;
  /* border-top: 1px dashed rgba(224,224,224,1); */
  padding: 15px 30px;
  width: 140px;
}

.checks > ul {
  list-style: none;
}

.checks > ul li {
  float: left;
  line-height: 32px;
}

.checks > ul li:nth-child(2n) {
  padding-left: 30px;
}

.checks > ul li img {
  width: 13px;
  height: 13px;
}

.checks-title {
  width: 81px;
  height: 16px;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  /* line-height:75px; */
}

.checks-span {
  width: 29px;
  height: 14px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}

.checkIcon {
  width: 50px;
  height: 22px;
  position: relative;
  left: 75px;
}

.checkIcon img {
  width: 50px;
  height: 22px;
  position: absolute;
  z-index: 0;
}

.checkIcon span {
  display: inline-block;
  width: 50px;
  height: 22px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 22px;
  color: rgba(254, 254, 254, 1);
  position: absolute;
  z-index: 1;
  text-align: center;
}

.getTask {
  margin-top: 5px;
  width: 100%;
  text-align: center;
  height: 30px;
  line-height: 30px;
  background-color: #5488f8;
  border-radius: 8px;
  color: #ffffff;
  cursor: pointer;
  font-weight: 700;
}

.taskReceive {
  width: 100%;
  text-align: center;
  padding-top: 15px;
  font-weight: 800;
  color: rgba(178, 178, 178, 1);
  font-size: 13px;
}
</style>
<style>
.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #5488f8 !important;
}

.el-pagination.is-background .el-pager li:hover {
  color: #5488f8 !important;
}
</style>
