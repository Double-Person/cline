<template>
  <div class="list contain" v-infinite-scroll="load"
          infinite-scroll-disabled="disabled">
    <!-- 目前时间参数不传会报错 -->
    <!-- 主要内容 -->
    <div class="main">
      <div class="main-right">
        <div
          class="list cards"
          v-infinite-scroll="load"
          infinite-scroll-disabled="disabled"
        >
          <div
            class="card-item"
            v-for="(item, index) in cards"
            :key="item.index"
            @click.stop="cardInfo(item.id)"
            v-bind:id="item.status && item.status == 7 ? 'shine-box-green' : ''"
            v-bind:class="item.urgent ? 'shine-box-red' : ''"
          >
            <img
              class="check-img"
              v-if="item.status && item.status == 7"
              src="../../static/imgPc/check.svg"
              alt=""
            />
            <div class="creatorName">{{ item.creatorName }}</div>
            <div class="checkIcon" v-show="item.checks != null">
              <img v-bind:src="'./static/imgPc/checkbg-icon.png'" alt />
              <span>查料</span>
            </div>
            <div class="card-item-top">
              <div class="my_delivery">
                <span class="item-num">NO.{{ item.number }}</span>
                <img
                  class="hammer"
                  v-if="item.waixie"
                  src="../../static/imgPc/hammer.png"
                  alt=""
                />
                <img class="hammer" src="../../static/imgPc/logs.png" alt="" />
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
              <el-tooltip
                class="item"
                effect="dark"
                :content="item.steps && item.steps.join('，')"
                placement="top-start"
              >
               <div class="progress-tags" >
                  <span class="tag" v-for='(step, indey) in item.steps' :key="indey">{{ step }}</span>           
                </div>
              </el-tooltip>

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

        <p v-if="loading" class="tips">加载中...</p>
        <p v-if="noMore" class="tips">没有更多了</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchCopy",
  data() {
    return {
      totalRow: -1,
      loading: false,
      query: {
        id: 1,
        style: 1, //1 任务 2 我的
        giveOrGet: 3, //1 我发布的 2 我接取的 3 待接取的 4 被抄送的
        // giveOrGet:true, //true 我发布的 false 我接取的
        taskCondition: 1, //1 未完成 2 已結束 3 已過期
        urgent: 0,
        time: "2020-12-28",
        userId: 7,
        keywords: "",
      },
      upindex: [],
      cards: [],
      page: 1,
    };
  },
  created() {
    console.log(this.$route.query);
    this.query = this.$route.query;
    this.query.time = ''
    this.getData();
  },
  computed: {
    noMore() {
      return this.cards.length == this.totalRow;
    },
    disabled() {
      return this.loading || this.noMore;
    },
  },
  methods: {
    load() {
      this.loading = true;
      this.getData();
    },
    packup(index) {
      // console.log(index);
      this.upindex[index] === index
        ? this.$set(this.upindex, index, "")
        : this.$set(this.upindex, index, index);
    },
    cardInfo(id) {
      this.$router.push({
        path: "/taskInfo",
        query: {
          id,
          bookmark: false,
          condition: false,
          shipmentNo: this.myodd,
        },
      });
    },
    getData() {
      var params = {
        urgent: this.query.urgent,
        time: "", //this.query.time,
        pageNumber: this.page,
        mPageSize: 18,
        type: 12,
        userId: this.query.userId,
        keywords: this.query.keywords,
        searchText: this.query.keywords,
      };
      console.log(params)
      // console.log(this.query.giveOrGet)
      if (this.query.giveOrGet == 1) {  // 我发布的
        params.type = 11;
        this.taskIssuer = true;
      } else if (this.query.giveOrGet == 2) {  //  我接受的
        params.type = 10;
        this.taskIssuer = false;
      } else if (this.query.giveOrGet == 3) {  // 待接收的
        params.type = 12;
        this.taskIssuer = false;
      } else {  // 被抄送的
        params.type = 13;
        this.taskIssuer = true;
      }

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
            // this.cards = res.data
            this.cards.push(...res.data.list);
            this.totalRow = res.data.totalRow;
            this.loading = false;
            this.page += 1;
            console.log(this.cards, "---");
          }
          // this.$router.push({path:'/'})
        })
        .catch((err) => {});
    },
  },
};
</script>

<style scoped>
.my-del {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
}
.tips{
  text-align: center;
  padding: 20px;
}
.main-right{
  border: 2px solid #c0c4cc;
}

.contain {
  width: 1300px;
  height: 100%;
  margin: 0 auto;
  overflow-x: hidden;
  /* overflow-y: auto; */
}
.contain::-webkit-scrollbar {
  width: 0 !important;
}
.contain {
  -ms-overflow-style: none;
  overflow: -moz-scrollbars-none;
}

.my_delivery {
  display: flex;
  justify-content: space-between;
}

.hammer {
  width: 29px;
  height: 29px;
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
  width: 196px;
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

.creatorName {
  position: absolute;
  left: 17px;
  top: 3px;
  color: #b2b2b2;
  font-size: 14px;
}

.cards .card-item .card-item-top {
  /* width: 140px; */
  width: 160px;
  /* height: 137px; */
  height: 155px;
  padding: 15px 30px;
}

#shine-box-green {
  border: 2px solid #57c47a;
  /* animation: glowGreen 500ms ease-out infinite alternate; */
}
.check-img {
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
  width: 196px;
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
  padding-top: 5px;
  font-weight: 800;
  color: rgba(178, 178, 178, 1);
  font-size: 13px;
}
.progress-tags {
  overflow: hidden;
  white-space: nowrap;
  display: flex;
  flex-wrap: nowrap;
}
.progress-tags .tag {
  margin-right: 5px;
  font-size: 12px;
  color: #b2b2b2;
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



