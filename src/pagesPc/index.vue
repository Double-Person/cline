<template>
  <div class="contain">
    <div class="header">
      <div class="header-contain">
        <div class="header-left">
          <img
            :src="'./static/imgPc/logo.png'"
            alt
            class="logo"
            @click="linkTo(5)"
          />
          <span>LSIBSS支撑系统欢迎您,{{ userInfo.nickName }}</span>
        </div>
        <div class="header-right">
          <div style="margin: 0 20px 0 0; cursor: pointer" @click="linkTo(10)">
            <span>加工进程管理</span>
          </div>
          <div style="margin: 0 20px 0 0; cursor: pointer" @click="linkTo(11)">
            <span>挤出进程管理</span>
          </div>
          <div style="margin: 0 20px 0 0; cursor: pointer" @click="linkTo(12)">
            <span>私款管理</span>
          </div>

          <div
            style="margin: 0 20px 0 0; cursor: pointer"
            @click="linkTo(6)"
            v-show="userInfo.chargePower"
          >
            <span>货款管理</span>
          </div>
          <div style="margin: 0 20px 0 0; cursor: pointer" @click="linkTo(8)">
            <span>物料生产进度</span>
          </div>
          <div
            style="margin: 0 20px 0 0; cursor: pointer"
            @click="linkTo(5)"
            v-show="userInfo.tasksPower"
          >
            <span>任务安排</span>
          </div>

          <div
            style="margin: 0 20px 0 0; cursor: pointer"
            @click="linkTo(13)"
            v-show="userInfo.tasksPower"
          >
            <span>客户管理</span>
          </div>
          <div
            style="margin: 0 20px 0 0; cursor: pointer"
            @click="linkTo(14)"
            v-show="userInfo.tasksPower"
          >
            <span>产品管理</span>
          </div>

          <div class="message-div" @click="linkTo(0)">
            <img
              :src="'./static/imgPc/message-icon.png'"
              alt="message"
              class="message"
            />
            <div class="circle-red" v-if="haveNewMessage"></div>
          </div>
          <div class="head-div" @mouseenter="usershowfuc(true)">
            <img
              :src="'./static/imgPc/head-icon.png'"
              alt="head"
              class="head"
            />
            <span style="margin-left: 8px">{{ userInfo.nickName }}</span>
          </div>
          <img
            :src="'./static/imgPc/loginOut-icon.png'"
            alt
            class="loginout"
            @click="loginout"
          />
        </div>
        <div class="userInfo" v-if="usershow" @mouseleave="usershowfuc(false)">
          <div>
            <span>用户名称：</span>
            <span style="color: #446cea">{{ userInfo.nickName }}</span>
          </div>
          <div>
            <span>微信ID ：</span>
            <span>{{ userInfo.userName }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="custom-contain">
      <div class="custom-left">
        {{ query.giveOrGet }} ==
        <!-- 超时订单  被抄送的 -->
        <timeout-orders v-if="query.giveOrGet == 4" />
      </div>

      <div class="main" style="background: pink">
        <slot name="title"> </slot>
        <!-- 任务列表 -->
        <p class="title" v-if="model == 0">
          任务列表
          <span
            v-if="model == 0"
            v-bind:class="query.giveOrGet == 1 ? 'active' : ''"
            style="font-size: 16px; cursor: pointer"
            @click="giveOrGetFuc(1)"
            >我发布的</span
          >
          <span v-if="model == 0" style="font-size: 16px">/</span>
          <span
            v-if="model == 0"
            v-bind:class="query.giveOrGet == 2 ? 'active' : ''"
            style="font-size: 16px; cursor: pointer"
            @click="giveOrGetFuc(2)"
            >我接取的</span
          >
          <span v-if="model == 0" style="font-size: 16px">/</span>
          <span
            v-if="model == 0"
            v-bind:class="query.giveOrGet == 3 ? 'active' : ''"
            style="font-size: 16px; cursor: pointer"
            @click="giveOrGetFuc(3)"
            >待接取的</span
          >
          <span v-if="model == 0" style="font-size: 16px">/</span>
          <span
            v-if="model == 0"
            v-bind:class="query.giveOrGet == 4 ? 'active' : ''"
            style="font-size: 16px; cursor: pointer"
            @click="giveOrGetFuc(4)"
            >被抄送的</span
          >
          <!-- <span v-if="model==0" v-bind:class="query.giveOrGet?'active':''" style="font-size: 16px;cursor: pointer;" @click="giveOrGetFuc(true)"> 我发布的</span>
                <span v-if="model==0" style="font-size: 16px">/</span>
        <span v-if="model==0" v-bind:class="query.giveOrGet?'':'active'" style="font-size: 16px;cursor: pointer;" @click="giveOrGetFuc(false)">我接取的</span>-->
        </p>
        <!-- <p class="title" v-if="model==0">任务列表 <span v-if="model==0&&query.style==2" v-bind:class="query.giveOrGet?'active':''" style="font-size: 16px;cursor: pointer;" @click="giveOrGetFuc(true)"> 我发布的</span><span v-if="model==0&&query.style==2" style="font-size: 16px">/</span><span v-if="model==0&&query.style==2" v-bind:class="query.giveOrGet?'':'active'" style="font-size: 16px;cursor: pointer;" @click="giveOrGetFuc(false)">我接取的</span></p> -->
        <!-- 消息列表 -->
        <p class="title goodsManage" v-if="model == 1">
          <span class="title">消息列表</span>
          <button @click="changeVoice">修改音乐</button>
        </p>
        <p class="title" v-if="model == 2">任务详情</p>
        <p class="title" v-if="model == 3">物料反馈</p>
        <p class="title" v-if="model == 4">新建任务</p>
        <p class="title goodsManage" v-if="model == 5">
          <span class="title">货款管理</span>
        </p>
        <p class="title" v-if="model == 6">新建采购</p>
        <div class="title" v-if="model == 7" style="height: 75px">
          <p class="title" style="float: left">材料采购</p>
          <div class="new" @click="linkTo(9)">新建采购</div>
          <div class="title-searchBox" style="float: right">
            <div class="title-searchBox-left" style="float: left">
              <img
                v-bind:src="'./static/imgPc/list-icon.png'"
                @click="listShow"
              />
            </div>
            <div class="title-searchBox-mid" style="float: left">
              <input
                type="text"
                @keyup.13="searchList(searchText)"
                v-model="searchText"
              />
            </div>
            <div class="title-searchBox-right" style="float: left">
              <img
                v-bind:src="'./static/imgPc/search-icon.png'"
                @click="searchList(searchText)"
              />
            </div>
            <ul class="searchLisst" v-if="this.listShowFlag">
              <li>
                <span class="listLeft">NO.87654321</span>
                <span class="listRight">铝材</span>
              </li>
            </ul>
          </div>
        </div>
        <p class="title" v-if="model == 8">新建采购</p>

        <p class="title" v-if="model == 10">加工明细清单</p>

        <p class="title" v-if="model == 12">客户私款查询</p>
        <p class="title" v-if="model == 13">客户管理</p>
        <p class="title" v-if="model == 14">产品管理</p>

        <span v-if="model == 1" class="active">消息列表</span>
        <span v-if="model == 2" @click="linkTo(5)" style="cursor: pointer">
          任务列表
          <span class="active">->任务详情</span>
        </span>
        <span v-if="model == 3" @click="linkTo(5)" style="cursor: pointer">
          任务列表
          <span>->任务详情</span>
          <span class="active">->物料反馈</span>
        </span>
        <span v-if="model == 4" @click="linkTo(5)" style="cursor: pointer">
          任务列表
          <span class="active">->新建任务</span>
        </span>
        <span v-if="model == 6" @click="linkTo(6)" style="cursor: pointer">
          货款管理
          <span class="active">->新建货款</span>
        </span>
        <span v-if="model == 8" @click="linkTo(8)" style="cursor: pointer">
          物料采购
          <span class="active">->新建采购</span>
        </span>

        <span v-if="model == 10" @click="linkTo(10)" style="cursor: pointer">
          <span class="active">加工明细清单</span>
        </span>

        <!-- 页签部分 -->
        <div class="bookmark-div" v-show="bookmark.show">
          <div class="bookmark">
            <!-- <div class="item" v-bind:class="query.taskCondition==1?'item-active':''" @click="changeStyle(1,1)">
                        <img v-bind:src="query.taskCondition==1?'./static/imgPc/unfinished-active-icon.png':'./static/imgPc/unfinished-icon.png'" alt="">
                        <span>未完成</span>
                    </div>
                    <div class="item" v-bind:class="query.taskCondition==2?'item-active':''" @click="changeStyle(1,2)">
                        <img v-bind:src="query.taskCondition==2?'./static/imgPc/finished-active-icon.png':'./static/imgPc/finished-icon.png'" alt="">
                        <span>已结束</span>
                    </div>
                    <div class="item" v-bind:class="query.taskCondition==3?'item-active':''" @click="changeStyle(1,3)">
                        <img v-bind:src="query.taskCondition==3?'./static/imgPc/expired-active-icon.png':'./static/imgPc/expired-icon.png'" alt="">
                        <span>已过期</span>
          </div>-->
            <div class="item item-active">
              <!-- <img v-bind:src="query.taskCondition==3?'./static/imgPc/expired-active-icon.png':'./static/imgPc/expired-icon.png'" alt=""> -->
              <span>任务列表</span>
            </div>
          </div>
          <div class="search">
            <div>
              <input
                type="text"
                v-model="query.keywords"
                placeholder="请输入关键字搜索"
              />
              <img
                :src="'./static/imgPc/search-icon.png'"
                alt
                class="search-icon"
                @click="isSearch()"
              />
            </div>

            <img
              :src="'./static/imgPc/add-task-icon.png'"
              alt="添加任务"
              class="add-task-icon"
              @click="linkTo(4)"
            />
          </div>
        </div>

        <div class="index">
          <!-- <div class="index-left" v-show="indexLeft">
                    <div>
                        <div @click="changeStyle(2,1)" v-bind:class="query.style==1?'activediv':''" title="全部任务">
                            <img v-bind:src="query.style==1?'./static/imgPc/task-public-active-icon.png':'./static/imgPc/task-public-icon.png'" alt="">
                        </div>
                        <div @click="changeStyle(2,2)" v-bind:class="query.style==2?'activediv':''" title="我的任务">
                            <img v-bind:src="query.style==2?'./static/imgPc/task-mine-active-icon.png':'./static/imgPc/task-mine-icon.png'" alt="">
                        </div>
                    </div>

        </div> -->
          <div class="index-right">
            <div class="condition" v-show="condition.show">
              <div class="urgent-condition">
                <img
                  v-bind:src="
                    query.urgent == 0
                      ? './static/imgPc/checkbox-icon.png'
                      : './static/imgPc/checkbox-true-icon.png'
                  "
                  alt
                  @click="clickUrgent"
                />
                <span>仅浏览紧急任务</span>
              </div>
              <div class="time-condition">
                <span>时间筛选</span>
                <div class="block">
                  <img
                    :src="'./static/imgPc/left-icon.png'"
                    alt="left"
                    @click="dateChange(1)"
                  />
                  <!-- <el-date-picker
                                    v-model="query.time"
                                    @change="changeData"
                                    type="date"
                                    placeholder="选择日期时间">
                </el-date-picker>-->
                  <div>
                    <div
                      v-for="(item, index) in dateArr"
                      @click="changeData(item.id, item)"
                      v-bind:id="item.selected ? 'activeDate' : ''"
                      class="timer"
                      :key="index"
                    >
                      {{ item.text }}

                      <!-- <img :src="'./static/imgPc/gantan.png'" alt  /> -->
                      <!-- <span v-show="item.timer.status">!</span> -->
                      <img
                        :src="'./static/imgPc/gantan.png'"
                        alt
                        v-show="item.status"
                      />
                    </div>
                  </div>
                  <img
                    :src="'./static/imgPc/right-icon.png'"
                    alt="left"
                    @click="dateChange(2)"
                  />
                </div>
              </div>
            </div>
            <div class="cards">
              <router-view :key="key" :query="query" ref="child"></router-view>
            </div>
          </div>
        </div>
      </div>

      <div class="custom-right">right</div>
    </div>

    <div class="voice" v-show="voiceMask">
      <span class="cancel" @click="closeVoice(false)">取消</span>
      <div>
        <span>文件路径:</span>
        <el-select v-model="voiceId" placeholder="请选择" @change="voicePlay()">
          <el-option
            v-for="item in voiceArr"
            :key="item.voiceId"
            :label="item.name"
            :value="item.voiceId"
          ></el-option>
        </el-select>
      </div>
      <button class="confirm" @click="voiceConfirm">确认修改</button>
    </div>
    <div class="mask" v-show="mask"></div>
  </div>
</template>
<script>
import TimeoutOrders from "./TimeoutOrders.vue";

export default {
  components: { TimeoutOrders },
  data() {
    return {
      haveNewMessage: false,
      indexLeft: true,
      usershow: false,
      listShowFlag: false,
      gantan: [],
      userInfo: {
        loginTime: "2019-09-12 18:09:27",
        nickName: "admin",
        password: "111111",
        phone: "13112345678",
        types: 3,
        userId: 2,
        userName: "admin",
        works: 1,
      },
      condition: {
        time: "",
        show: true,
      },
      bookmark: {
        show: true,
      },
      router: [
        {
          id: 0,
          name: "/message",
          data: {
            bookmark: false,
            condition: false,
          },
        },
        {
          id: 1,
          name: "/feedBack",
          data: {
            bookmark: false,
            condition: false,
          },
        },
        {
          id: 2,
          name: "/feedBackResult",
          data: {
            bookmark: false,
            condition: false,
          },
        },
        {
          id: 3,
          name: "/taskInfo",
          data: {
            bookmark: false,
            condition: false,
          },
        },
        {
          id: 4,
          name: "/addTask",
          data: {
            bookmark: false,
            condition: false,
          },
        },
        {
          id: 5,
          name: "/task",
          data: {
            bookmark: true,
            condition: true,
          },
        },
        {
          id: 6,
          name: "/getCharge",
          data: {
            bookmark: false,
            condition: false,
          },
        },
        {
          id: 7,
          name: "/addCharge",
          data: {
            bookmark: false,
            condition: false,
          },
        },
        {
          id: 8,
          name: "/schedule",
          data: {
            bookmark: false,
            condition: false,
          },
        },
        {
          id: 9,
          name: "/addProcurement",
          data: {
            bookmark: false,
            condition: false,
          },
        },
        // 加工进程管理
        {
          id: 10,
          name: "/process-management",
          data: {
            bookmark: false,
            condition: false,
          },
        },
        // 挤出进程管理
        {
          id: 11,
          name: "/extrusion-process-management",
          data: {
            bookmark: false,
            condition: false,
          },
        },
        // 私款管理
        {
          id: 12,
          name: "/private-money",
          data: {
            bookmark: false,
            condition: false,
          },
        },
        // 客户管理
        {
          id: 13,
          name: "/customer-management",
          data: {
            bookmark: false,
            condition: false,
          },
        },
        // 产品管理
        {
          id: 14,
          name: "/product-management",
          data: {
            bookmark: false,
            condition: false,
          },
        },
      ],
      query: {
        // /** 所有未完成 */
        // public static final int allUnfinished = 1;
        //  /** 所有已完成 */
        //  public static final int allFinished = 2;
        //  /** 所有已过期 */
        //  public static final int allOverdue = 3;
        //  /** 我接受的未完成 */
        //  public static final int myAcceptUnfinished = 4;
        //  /** 我接受的已完成 */
        //  public static final int myAcceptFinished = 5;
        //  /** 我接受的已过期 */
        //  public static final int myAcceptOverdue = 6;
        //  /** 我发布的未完成 */
        //  public static final int myPublisUnfinished = 7;
        //  /** 我发布的已完成 */
        //  public static final int myPublisFinished = 8;
        //  /** 我发布的已过期 */
        //  public static final int myPublisOverdue = 9;

        id: 1,
        style: 1, //1 任务 2 我的
        giveOrGet: 1, //1 我发布的 2 我接取的 3 待接取的 4 被抄送的
        // giveOrGet:true, //true 我发布的 false 我接取的
        taskCondition: 1, //1 未完成 2 已結束 3 已過期
        urgent: 0,
        time: "",
        userId: 0,
        keywords: "",
      },

      mask: false,
      voiceMask: false,
      datePage: 0,
      dateArr: [],
      voiceArr: [],
      voiceId: "",
      interval: "",
      searchText: "",
      timerId: "",
      // 0 任务安排  7 物料生产进度
      model: 0,
      typeStatus: {
        task: { value: 0 }, // 任务安排
        message: { value: 1 },
        taskInfo: { value: 2 },
        feedBack: { value: 3 },
        addTask: { value: 4 },
        getCharge: { value: 5 },
        addCharge: { value: 6 },
        schedule: { value: 7 }, // 物料生产进度
        addProcurement: { value: 8 },

        ProcessManagement: { value: 10 }, // 加工进程管理
        ExtrusionProcessManagement: { value: 11 }, // 挤出进程管理
        PrivateMoney: { value: 12 }, // 私款管理
        CustomerManagement: { value: 13 }, // 客户管理
        ProductManagement: { value: 14 }, // 产品管理
      },
    };
  },
  watch: {
    $route(to, name) {
      this.init();

      // if (to.name == "task") {
      //   this.model = 0;
      //   // this.init();
      // }
      // if (to.name == "message") {
      //   this.model = 1;
      // }
      // if (to.name == "taskInfo") {
      //   this.model = 2;
      //   this.condition.show = false;
      //   this.bookmark.show = false;
      // }
      // if (to.name == "feedBack") {
      //   this.model = 3;
      // }
      // if (to.name == "addTask") {
      //   this.model = 4;
      // }
      // if (to.name == "getCharge") {
      //   this.model = 5;
      // }
      // if (to.name == "addCharge") {
      //   this.model = 6;
      // }
      // if (to.name == "schedule") {
      //   this.model = 7;
      // }
      // if (to.name == "addProcurement") {
      //   this.model = 8;
      // }
      console.log("-------", to);
      try {
        this.model = this.typeStatus[to.name].value;
      } catch (error) {}
      if (to.name == "taskInfo") {
        this.condition.show = false;
        this.bookmark.show = false;
      }
      let names = [
        "message",
        "addTask",
        "taskInfo",
        "getCharge",
        "addCharge",
        "schedule",
        "addProcurement",
      ];
      let isIncludes = names.includes("addTask");
      isIncludes ? (this.indexLeft = false) : (this.indexLeft = true);

      // if (
      //   to.name == "message" ||
      //   to.name == "addTask" ||
      //   to.name == "taskInfo" ||
      //   to.name == "getCharge" ||
      //   to.name == "addCharge" ||
      //   to.name == "schedule" ||
      //   to.name == "addProcurement"
      // ) {
      //   this.indexLeft = false;
      // } else {
      //   this.indexLeft = true;
      // }
    },
  },
  computed: {
    key() {
      return this.$route.name !== undefined
        ? this.$route.name + new Date()
        : this.$route + new Date();
    },
  },
  created() {
    if (this.$cookie.get("userInfo")) {
      this.userInfo = JSON.parse(this.$cookie.get("userInfo"));
    }
  },
  mounted() {
    this.init();
    this.changeCrumbs();
    this.routeChange();
    this.dateInit();
    this.getVoice();
    this.newMessage();
    // this.getTimer()
    this.interval = setInterval(() => {
      this.newMessage();
    }, 1000 * 60 * 5);
  },

  destroy() {
    clearInterval(this.interval);
  },
  methods: {
    //面包屑修改
    changeCrumbs() {
      var crumbs = this.$route.path.slice(1);

      this.model = this.typeStatus[crumbs].value;

      // switch (crumbs) {
      //   case "task":
      //     this.model = 0;
      //     break;
      //   case "message":
      //     this.model = 1;
      //     break;
      //   case "taskInfo":
      //     this.model = 2;
      //     break;
      //   case "feedBack":
      //     this.model = 3;
      //     break;
      //   case "addTask":
      //     this.model = 4;
      //     break;
      //   case "getCharge":
      //     this.model = 5;
      //     break;
      //   case "addCharge":
      //     this.model = 6;
      //     break;
      //   case "schedule":
      //     this.model = 7;
      //     break;
      //   case "addProcurement":
      //     this.model = 8;
      //     break;
      //   default:
      //     break;
      // }
    },

    //搜索列表
    searchList(text) {
      this.$refs.child.getSearchData(text);
      this.searchText = "";
    },

    //修改音乐
    getVoice() {
      this.$http
        .get("/api/voice/findAll", "")
        .then((res) => {
          if (res.code == 1000) {
            this.voiceArr = res.data;
          }
        })
        .catch((err) => {});
    },
    changeVoice() {
      this.voiceMask = true;
      this.maskFuc(true);
    },
    voiceConfirm() {
      this.$message.closeAll();
      if (this.voiceId == "") {
        this.$message({
          message: "请选择声音",
          type: "warning",
        });
      } else {
        var params = {
          userId: JSON.parse(this.$cookie.get("userInfo")).userId,
          voiceId: this.voiceId,
        };
        this.$http
          .get("/api/voice/updateUserVoice", params)
          .then((res) => {
            if (res.code == 1000) {
              this.$message({
                message: res.msg,
                type: "success",
              });
              this.maskFuc(false);
              this.voiceMask = false;
            }
          })
          .catch((err) => {});
      }
    },
    voicePlay() {
      var voiceArr = this.voiceArr;
      var src = "";
      for (var i = 0; i < voiceArr.length; i++) {
        if (voiceArr[i].voiceId == this.voiceId) {
          src = voiceArr[i].url;
          break;
        }
      }
      this.audio = new Audio();
      this.audio.src = src;
      let playPromise;
      playPromise = this.audio.play();
      // if (playPromise) {
      //     playPromise.then(() => {
      //         // 音频加载成功
      //         // 音频的播放需要耗时
      //     this.tiemr = setInterval(() => {
      //         second--;
      //         if (second <= 0) {
      //             this.audio.pause()
      //             clearInterval(this.tiemr);
      //         }
      //     }, 1000);
      //     }).catch((e) => {
      //     // 音频加载失败
      //         console.error(e);
      //     });
      // }
    },
    closeVoice() {
      this.mask = false;
      this.voiceMask = false;
    },
    dateChange(type) {
      var datePage = this.datePage;
      if (type == 1) {
        datePage -= 7;
      } else {
        datePage += 7;
      }
      this.datePage = datePage;
      this.dateInit();
    },
    dateInit() {
      var dateXiuzhen = this.datePage - 3;
      var queryDate = [];
      var selected = false;
      for (var i = 0; i < 7; i++) {
        var d = new Date();
        d.setDate(d.getDate() + dateXiuzhen + i);
        var y_value = d.getFullYear();
        var m_value = d.getMonth();
        var d_value = d.getDate();
        var month = m_value + 1 < 10 ? "0" + (m_value + 1) : m_value + 1;
        var day = d_value < 10 ? "0" + d_value : d_value;
        if (i == 3) {
          selected = true;
        } else {
          selected = false;
        }
        var data = {
          id: i,
          value: "",
          text: m_value + 1 + "/" + day,
          selected: selected,
        };
        data.value = y_value + "-" + month + "-" + day;

        queryDate.push(data);
      }
      // console.log(queryDate,"----------")
      queryDate.forEach((i) => {
        // console.log(i,"-----------",i.timer)
      });

      this.query.time = queryDate[3].value;
      // console.log(this.dateArr)
      this.timerId = this.query.time;
      //   console.log(this.timerId);
      var params = {
        userId: JSON.parse(this.$cookie.get("userInfo")).userId,
        dayStr: this.query.time,
        type: this.query.giveOrGet,
      };
      this.$http.get("/api/tasks/findUnfinishedTasks", params).then((res) => {
        // console.log(res.data,"--------------");
        this.gantan = res.data;
        for (var i = 0; i < queryDate.length; i++) {
          queryDate[i].status = this.gantan[i].status;
        }
        this.dateArr = queryDate;
        // console.log(this.dateArr,"----------------------");
        this.search();
      });
    },
    usershowfuc(flag) {
      // console.log(flag);
      this.usershow = flag;
      setTimeout(() => {
        this.usershow = false;
      }, 3000);
    },
    newMessage() {
      if (this.$cookie.get("userInfo")) {
        this.userInfo = JSON.parse(this.$cookie.get("userInfo"));
        this.query.userId = this.userInfo.userId;
        var params = {
          userId: JSON.parse(this.$cookie.get("userInfo")).userId,
        };
        this.$http
          .get("/api/messages/findUnread", params)
          .then((res) => {
            if (res.code == 1000) {
              this.haveNewMessage = res.data.data;
              //如果为true就播放音乐
              if (res.data.data == true) {
                this.voiceRemind(res.data.voice);
              } else {
              }
            }
          })
          .catch((err) => {});
      }
    },
    //声音提醒
    voiceRemind(src) {
      this.audio = new Audio();
      this.audio.src = src;
      let playPromise;
      // playPromise = this.audio.play();
      var that = this;
      // console.log(that.audio.duration)
      // if (playPromise) {
      //     playPromise.then(() => {
      //         // 音频加载成功
      //         // 音频的播放需要耗时
      //     console.log(that.audio.duration)
      //     this.tiemr = setInterval(() => {
      //         second--;
      //         if (second <= 0) {
      //             this.audio.pause()
      //             clearInterval(this.tiemr);
      //         }
      //     }, 1000);
      //     }).catch((e) => {
      //     // 音频加载失败
      //         console.error(e);
      //     });
      // }
    },
    init() {
      var path = this.$route.path;
      if (path == "/message" || path == "/addTask" || path == "/addCharge") {
        this.indexLeft = false;
      }
      // if(path)
      var router = this.router;
      for (var i = 0, l = router.length; i < l; i++) {
        if (router[i].name == path) {
          this.bookmark.show = router[i].data.bookmark;
          this.condition.show = router[i].data.condition;
        }
      }
    },
    isSearch() {
      let routeUrl = this.$router.resolve({
        path: "/search-copy",
        query: this.query, // query.keywords
      });
      window.open(routeUrl.href, "_blank");
      return false;
      if (this.query.giveOrGet == 4) {
        let routeUrl = this.$router.resolve({
          path: "/search-copy",
          query: this.query, // query.keywords
        });
        window.open(routeUrl.href, "_blank");
      } else {
        this.search();
      }
    },
    //刷新表格
    search() {
      console.log("搜索-------");
      if (this.$refs.child.getData) {
        this.$refs.child.getData();
      } else {
      }
    },

    linkTo(id) {
      // console.log("初始化")
      var router = this.router;
      this.$router.push({
        path: router[id].name,
        query: router[id].data,
      });
      let { condition, bookmark } = router[id].data;
      this.condition.show = condition; //router[id].data.condition;
      this.bookmark.show = bookmark; // router[id].data.bookmark;
    },

    changeData(id, dele) {
      var dateArr = this.dateArr;
      for (var i = 0; i < dateArr.length; i++) {
        if (i == id) {
          dateArr[i].selected = true;
        } else {
          dateArr[i].selected = false;
        }
      }
      this.dateArr = dateArr;
      this.query.time = dateArr[id].value;
      this.search();
    },
    //修改查询参数
    changeStyle(style, data) {
      //完成情况
      if (style == 1) {
        //未完成
        this.query.taskCondition = data;
      } else {
        //我的
        this.query.style = data;
        this.query.userId = this.userInfo.userId;
      }
      this.search();
    },
    giveOrGetFuc(flag) {
      this.query.giveOrGet = flag;

      for (var i = 0; i < this.dateArr.length; i++) {
        this.dateArr[i].timer = this.gantan[i];
      }

      var params = {
        userId: JSON.parse(this.$cookie.get("userInfo")).userId,
        dayStr: this.query.time,
        type: this.query.giveOrGet,
      };
      this.$http.get("/api/tasks/findUnfinishedTasks", params).then((res) => {
        this.gantan = res.data;
        for (var i = 0; i < this.dateArr.length; i++) {
          this.dateArr[i].status = this.gantan[i].status;
        }
      });
      this.search();
    },
    clickUrgent() {
      if (this.query.urgent == 0) {
        this.query.urgent = 1;
      } else {
        this.query.urgent = 0;
      }
      this.search();
    },
    loginout() {
      this.$cookie.delete("Authorization");
      this.$cookie.delete("userInfo");
      this.$router.push({
        path: "/login",
      });
    },
    routeChange() {
      var to = this.$route;
      if (to.name == "task") {
        this.model = 0;
        // this.init();
      }
      if (to.name == "message") {
        this.model = 1;
      }
      if (to.name == "taskInfo") {
        this.model = 2;
      }
      if (to.name == "feedBack") {
        this.model = 3;
      }
      if (to.name == "addTask") {
        this.model = 4;
      }
      if (to.name == "getCharge") {
        this.model = 5;
      }
      if (to.name == "addCharge") {
        this.model = 6;
      }
      if (
        to.name == "message" ||
        to.name == "addTask" ||
        to.name == "taskInfo" ||
        to.name == "getCharge" ||
        to.name == "addCharge"
      ) {
        this.indexLeft = false;
      } else {
        this.indexLeft = true;
      }
    },
    //遮罩层
    maskFuc(flag) {
      this.mask = flag;
    },
    //列表展示
    listShow() {
      if (this.listShowFlag == false) {
        this.listShowFlag = true;
      } else {
        this.listShowFlag = false;
      }
      setTimeout(() => {
        this.listShowFlag = false;
      }, 3000);
    },
  },
};
</script>
<style scoped>
.header {
  width: 100%;
  height: 61px;
  background: white;
}
.header {
  position: sticky;
  top: 0;
  z-index: 1;
}
.title {
  position: sticky;
  top: 61px;
  background: rgb(240, 241, 243);
  /* z-index: 1; */
}

.header-contain {
  /* max-width: 1089px; */
  max-width: 1600px;
  min-width: 752px;
  /* width: 55%; */
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  position: relative;
}

.header-left,
.header-right {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.header span {
  font-size: 18px;
  font-weight: 400;
  color: rgba(68, 108, 234, 1);
  line-height: 60px;
}

.header-left span {
  margin: 0 0 0 43px;
}

.logo {
  width: 110px;
  height: 26px;
}

.message-div {
  position: relative;
}

.circle-red {
  position: absolute;
  top: -2px;
  right: -2px;
  width: 10px;
  height: 10px;
  background-color: #ff1a25;
  border-radius: 50%;
  z-index: 2;
}

.message {
  width: 17px;
  height: 20px;
  cursor: pointer;
}

.head-div {
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: 30px;
}

.head {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

.loginout {
  width: 18px;
  height: 18px;
  margin-left: 30px;
  cursor: pointer;
}

.userInfo {
  width: 208px;
  height: 89px;
  background: rgba(255, 255, 255, 1);
  border: 2px solid rgba(240, 241, 245, 1);
  box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.05);
  border-radius: 5px 5px 5px 5px;
  position: absolute;
  right: 0;
  top: 58px;
  z-index: 999 !important;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.userInfo > div {
  height: 50%;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.userInfo > div span {
  line-height: 40px;
  font-size: 12px;
  color: #666666;
}

.userInfo > div span:nth-child(1) {
  display: block;
  text-align-last: right;
  width: 120px;
}

.custom-contain {
  display: flex;
  justify-content: center;
}
.custom-left {
  width: 240px;
  margin-right: 4px;
  background: skyblue;
}
.custom-right {
  width: 240px;
  margin-left: 4px;
  background: skyblue;
}

/* 主要部分 */

.main {
  /* max-width: 1089px;
  min-width: 752px; */
  /* margin: 0 auto; */
  width: 1089px;
}

.title {
  font-size: 30px;
  font-weight: bold;
  color: rgba(9, 34, 56, 1);
  line-height: 75px;
}

.goodsManage {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.goodsManage > button {
  width: 130px;
  height: 40px;
  background-color: #446cea;
  color: white;
  border: 0;
  outline: none;
  font-size: 18px;
  cursor: pointer;
  border-radius: 5px;
}

.active {
  color: #446cea;
}

.bookmark-div {
  height: 75px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #e3e6ee;
}

.bookmark {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.bookmark .item {
  margin: 0 60px 0 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 70px;
  cursor: pointer;
}

.bookmark .item img {
  width: 24px;
  height: 24px;
  margin: 0 8px 0 0;
}

.bookmark .item span {
  font-size: 18px;
  color: rgba(103, 135, 171, 1);
  line-height: 75px;
}

.bookmark .item-active {
  border-bottom: 6px solid #446cea;
}

.bookmark .item-active span {
  color: #446cea;
}

.search {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 328px;
}

.search > div {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.search input {
  outline: none;
  border: 2px solid rgba(218, 226, 234, 1);
  border-radius: 5px;
  height: 28px;
  padding: 0 0 0 5px;
  font-size: 16px;
  line-height: 28px;
  border-right: 0;
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
  width: 250px;
}

.search .search-icon {
  width: 14px;
  height: 14px;
  padding: 7px;
  border: 2px solid rgba(218, 226, 234, 1);
}

.add-task-icon {
  width: 32px;
  height: 32px;
}

.index {
  margin: 30px 0 0 0;
  display: flex;
  justify-content: flex-start;
}

.index-left {
  width: 100px;
}

.index-left > div {
  width: 70px;
  height: 136px;
  background: rgba(252, 253, 254, 1);
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.1);
  border-radius: 5px 5px 5px 5px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
}

.index-left > div > div {
  width: 64px;
  height: 22px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  border-left: 6px solid #ffffff;
}

.index-left > div .activediv {
  border-left: 6px solid #446cea;
}

.index-left > div > div img {
  width: 22px;
  height: 22px;
}

.index-right {
  width: 100%;
}

/* 条件 */

.condition {
  width: 100%;
  height: 54px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.condition > div {
  display: flex;
  justify-content: space-around;
  align-content: center;
  align-items: center;
}

.urgent-condition {
  width: 190px;
  margin: 0 0 0 8px;
}

.urgent-condition img {
  width: 24px;
  height: 24px;
}

.urgent-condition span,
.time-condition span {
  font-size: 18px;
  font-weight: 400;
  color: rgba(103, 135, 171, 1);
}

.time-condition {
  width: 720px;
}

.time-condition .block {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 620px;
}

.time-condition .block > div {
  width: 575px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.time-condition .block img {
  width: 11px;
  height: 16px;
}

.time-condition .block .timer {
  width: 80px;
  height: 30px;
  background: rgba(240, 241, 243, 1);
  border-radius: 15px;
  text-align: center;
  cursor: pointer;
  line-height: 30px;
}

#activeDate {
  background-color: #f58d1d;
  color: white;
}

.voice {
  width: 700px;
  height: 314px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -162px 0 0 -350px;
  background-color: white;
  z-index: 999;
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}

.voice .cancel {
  font-size: 14px;
  color: #999999;
  margin: 20px 0 0 630px;
  display: block;
}

.voice > div {
  width: 340px;
  height: 50px;
  margin: 30px auto;
}

.voice button {
  width: 140px;
  height: 40px;
  background-color: #446cea;
  color: white;
  border: 0;
  outline: none;
  font-size: 18px;
  cursor: pointer;
  border-radius: 5px;
  display: block;
  margin: 30px auto;
  cursor: pointer;
}

.mask {
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #000000;
  top: 0;
  left: 0;
  opacity: 0.3;
}

.cancel {
  font-size: 14px;
  color: #999999;
  margin: 20px 0 0 630px;
  display: block;
  cursor: pointer;
}

.title-searchBox {
  margin-top: 34px;
  width: 370px;
  height: 44px;
  background: rgba(255, 255, 255, 1);
  border: 2px solid rgba(218, 226, 234, 1);
  border-radius: 5px;
}

.title-searchBox-left {
  box-sizing: border-box;
  width: 44px;
  height: 44px;
  border-right: 2px solid rgba(218, 226, 234, 1);
  padding-left: 10px;
  padding-top: 13px;
}

.title-searchBox-left img {
  width: 24px;
  height: 19px;
  float: left;
}

.title-searchBox-mid {
  width: 280px;
  height: 44px;
}

.title-searchBox-mid input {
  float: left;
  border: none;
  width: 280px;
  height: 44px;
}

.title-searchBox-right {
  box-sizing: border-box;
  width: 44px;
  height: 44px;
  border-left: 2px solid rgba(218, 226, 234, 1);
  background-color: rgba(244, 248, 251, 1);
  padding-left: 12px;
  padding-top: 12px;
}

.title-searchBox-right img {
  width: 18px;
  height: 19px;
  float: left;
  cursor: pointer;
}

.new {
  margin-top: 34px;
  margin-left: 15px;
  float: right;
  width: 102px;
  height: 44px;
  background: rgba(84, 136, 248, 1);
  border: 2px solid rgba(68, 108, 234, 1);
  border-radius: 5px 5px 5px 5px;
  font-size: 18px;
  line-height: 44px;
  text-align: center;
  font-weight: 500;
  color: #ffffff;
  cursor: pointer;
}

.searchLisst {
  width: 348px;
  position: absolute;
  background: rgba(255, 255, 255, 1);
  border: 2px solid rgba(218, 226, 234, 1);
  border-top: 0;
  border-radius: 5px;
  padding: 10px;
  top: 142px;
}

.searchLisst li {
  list-style: none;
  height: 42px;
  border-bottom: 1px solid rgb(238, 241, 243);
}

.searchLisst li span {
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(103, 135, 171, 1);
  line-height: 42px;
}

.listLeft {
  float: left;
}

.listRight {
  float: right;
  padding-right: 39px;
}

.avatar-uploader {
  border: 1px dashed #000000;
}
</style>
