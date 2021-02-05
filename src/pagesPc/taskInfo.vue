<template>
  <div class="contain">
    <div class="button-div">
      <button class="abled" :class="data.canUpdate == true ? 'abled' : 'disabled'" @click="delTask">删除任务</button>
      <button class="abled" @click="blankingLog">切料日志</button>
      <button class="abled" @click="checkFigure()">查看产品图样</button>
      <!-- <button @click="amendTasks" class="amend">修改任务</button> -->
      <button
        @click="stopTasks"
        :class="data.canEndPower == true ? 'abled' : 'disabled'"
      >
        结束任务
      </button>


      <button
        @click="amendTasks"
        v-if="data.canUpdate"
        :class="data.canUpdate == true ? 'abled' : 'disabled'"
      >
        修改任务
      </button>
      <button
        @click="revokeTasks"
        v-if="data.canRevoke"
        :class="data.canRevoke == true ? 'abled' : 'disabled'"
      >
        撤回任务
      </button>
      <button
        @click="feedBack"
        v-if="data.canFeedback"
        :class="data.canFeedback == true ? 'abled' : 'disabled'"
      >
        物料反馈
      </button>
      <!-- <button v-if="!data.canAccept">修改任务</button> -->
      <button
        v-if="!data.canUpdate"
        :class="data.canUpdate == true ? 'abled' : 'disabled'"
      >
        修改任务
      </button>
      <button
        v-if="!data.canRevoke"
        :class="data.canRevoke == true ? 'abled' : 'disabled'"
      >
        撤回任务
      </button>
      <button
        v-if="!data.canFeedback"
        :class="data.canFeedback == true ? 'abled' : 'disabled'"
      >
        物料反馈
      </button>
    </div>
    <div class="main">
      <div>
        <div>
          <span>客户名称：</span>
        </div>
        <div>
          <span>{{ data.name }}</span>
        </div>
      </div>
      <div>
        <div>
          <span>时间限制：</span>
        </div>
        <div>
          <span style="color: #000000">
            {{ data.createTime }}
            <span style="margin: 0 22px; color: #333333">至</span>
            {{ data.endTime }}
          </span>
        </div>
      </div>
      <div>
        <div>
          <span>任务描述：</span>
        </div>
        <div
          v-html="data.describes"
          style="
            word-wrap: break-word;
            overflow: scroll;
            width: 1000px;
            height: 400px;
            margin-top: 7px;
          "
        ></div>
      </div>
      <div>
        <div>
          <span>任务价格：</span>
        </div>
        <div>
          <span>{{ data.price }} 元</span>
        </div>
      </div>
      <div>
        <div>
          <span>任务环节：</span>
        </div>
        <div>
          <div v-for="(item, index) in data.steps" :key="index">
            <div class="step-circle">
              <img
                v-bind:src="
                  item.endStatus == 1
                    ? './static/imgPc/step-true-icon.png'
                    : './static/imgPc/step-false-icon.png'
                "
                alt
              />
              <span>{{ item.name }}</span>
              <span
                class="finishTask"
                v-bind:id="item.endStatus == 2 ? 'canClick' : 'cantClick'"
                @click="
                  endStatus(item.endStatus, item.id, item.name.substring(2))
                "
                v-if="item.endStatus != 1"
                >{{
                  item.endStatusText == "未完成"
                    ? "点击完成"
                    : item.endStatusText
                }}</span
              >
            </div>
            <div class="step-line" v-if="index != data.steps.length - 1">
              <img
                v-bind:src="
                  item.endStatus == 1
                    ? './static/imgPc/line-true-icon.png'
                    : './static/imgPc/line-false-icon.png'
                "
                alt
              />
              <span>{{ item.time }}</span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <span>出货留存：</span>
        <el-popover
          placement="right"
          width="400"
          trigger="hover">
          <div style="height: 400px; background: #fff;" v-if="sourseImg">
            <img   
              :src="sourseImg"
              class="popover-avatar"
            />
          </div>
          <el-upload
            slot="reference"
            class="avatar-uploader"
            :action="$httppath"
            :headers="header"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :show-file-list="false"
            ><img
              v-if="sourseImg"
              :src="sourseImg"
              class="avatar"
            />
          
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-popover>
        
      </div>
     
      <div>
        <div>
          <span>物料核查：</span>
        </div>
        <ul class="checkUl">
          <li v-for="(item, index) in data.checks" :key="index">
            <div class="changeDiv">
              <span>{{ item.name }}</span>
              <select id="choose" v-model="item.flag">
                <option class="" value=""></option>
                <option class="success" value="true">√</option>
                <option class="default" value="false">x</option>
              </select>
            </div>
          </li>
        </ul>
      </div>
      <div style="margin-left: 140px" v-if="data.canDeal">
        <button class="back" @click="submit" style="cursor: pointer">
          提交
        </button>
      </div>
      <div>
        <div>
          <span>执行人：</span>
        </div>
        <div
          class="executive-div"
          v-for="item in data.executors"
          :key="item.userName"
        >
          <div class="executive-item">
            <img v-bind:src="'./static/imgPc/head-icon.png'" alt="head" />
            <span>{{ item.userName }}</span>
          </div>
        </div>
      </div>
      <div>
        <div></div>
        <div>
          <button class="back" @click="back">返回</button>
        </div>
      </div>
    </div>

    <!-- 切料日志 -->
    <task-info-blanking-log ref="taskInfoBlankingLog" />
    <!-- 查看产品图样 -->
    <preview-picture ref="previewPicture" />
  </div>
</template>

<script>
import taskInfoBlankingLog from "./taskInfoBlankingLog.vue";
import PreviewPicture from '../components/PreviewPicture.vue';
// import cover1 from '@/assets/images/1.jpg'
export default {
  components: { taskInfoBlankingLog, PreviewPicture },
  data() {
    return {
      data: {
        canEndPower: false,
        productImg: '',
        canAccept: false,
        canFeedback: false,
        canUpdate: false,
        canRevoke: false,
        name: "",
        createTime: "",
        endTime: "",
        describes: "",
        price: "",
        step: [{ works: 7, name: "", time: "" }], //name: "步骤1" ,time: "2019-09-16 21:44:02" ,works: 7
        executors: [{ faceicon: "", userName: "", userId: "" }],
        checks: "",
        canDeal: true, //true 有权限修改 false 无权限修改
        types: "",
        typeId: "",
        shipmentNo: "",
      },
      authorization: "",
      header: {},
      sourseImg: '',
      checksList: [],
      checkParams: [],
    };
  },
  mounted() {
    this.getSession();
    this.init();
    // this.data.shipmentNo=this.$route.query.tasks.shipmentNo;
    // console.log(this.tasksshipmentNo);
  },
  destroy() {},
  methods: {
    // 出货留存
    shipmentRetention() {
      let params = {
        sourseImg: this.sourseImg ,tasksId: this.$route.query.id
      }
      this.$http
        .get("/api/tasks/shipmentRetention", params)
        .then((res) => {
          console.log(res.data);
          if (res.code == 1000) {
            this.$message({
              message: "存档成功",
              type: "success",
            });
          } else {
            this.$message.error("存档失败");
          }
        
        })
        .catch((err) => {});
    },
     //上传物料图片
    handleAvatarSuccess(res, file) {
      console.log(res)
      this.sourseImg = res.data.imageUrl;
      this.shipmentRetention()
      // console.log(this.data.imageUrl)
    },
    //图片大小限制
    beforeAvatarUpload(file) {
      // const isJPG = file.type === 'image/jpeg';
      const isLt5M = file.size / 1024 / 1024 < 5;

      // if (!isJPG) {
      // this.$message.error('上传头像图片只能是 JPG 格式!');
      // }
      if (!isLt5M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt5M;
      return isJPG && isLt5M;
    },
    //获取session
    getSession() {
      this.authorization = localStorage.getItem("Authorization");
      this.header = {
        Authorization: this.authorization,
      };
      console.log(this.header);
    },
  
    // 删除任务
    delTask() {
      let params = {
        tasksId: this.$route.query.id,
      };
      this.$http
        .get("/api/tasks/deleteTasks", params)
        .then((res) => {
          console.log(res.data);
          if (res.code == 1000) {
            this.$message({
              message: "删除成功",
              type: "success",
            });
             this.$router.go(-1)
            // /task?bookmark=true&condition=true
          } else {
            this.$message.error("删除失败");
          }
        
        })
        .catch((err) => {});
    },
    // 切料日志
    blankingLog() {
      this.$refs.taskInfoBlankingLog.openDialog(this.$route.query.id);
    },
    // 查看产品图样
    checkFigure(productImg) {
      console.log(this.data.productImg)
      this.$refs.previewPicture.previewImg(this.data.productImg);
    },
    init() {
      console.log(this.$route)
      var params = {
        tasksId: this.$route.query.id,
        userId: JSON.parse(this.$cookie.get("userInfo")).userId,
      };
      this.$http
        .get("/api/tasks/findTasksById", params)
        .then((res) => {
          console.log(res.data);
          if (res.code == 1000) {
            var resData = res.data;
            var data = {
              name: "",
              createTime: "",
              endTime: "",
              describes: "",
              price: "",
              steps: "",
              executors: "",
              checks: [],
              canDeal: false,
              types: "",
              typeId: "",
              shipmentNo: "",
            };
            console.log(resData);
            data.canAccept = resData.canAccept;
            data.canEndPower = resData.canEndPower;
            
            data.productImg = resData.productImg;
            data.canFeedback = resData.canFeedback;
            data.canUpdate = resData.canUpdate;
            (data.canRevoke = resData.canRevoke),
              (data.name = resData.tasks.name);
            data.createTime = resData.tasks.createTime;
            data.endTime = resData.tasks.endTime;
            data.describes = resData.tasks.describes;
            data.price = resData.tasks.price;
            data.checks = resData.checks;
            data.canDeal = resData.canDeal;
            data.types = resData.tasks.types;
            data.typeId = resData.tasks.tasksId;
            data.shipmentNo = resData.tasks.shipmentNo;
            this.sourseImg = resData.tasks.sourseImg
            var steps = resData.steps;

            // console.log(data.checks)

            var endStatus = ["已完成", "点击完成", "未完成", "已过期"];
            var stepsArr = [];
            for (var i = 0; i < steps.length; i++) {
              var stepItem = {
                canEnd: steps[i].canEnd,
                endStatusText: endStatus[steps[i].endStatus - 1],
                endStatus: steps[i].endStatus,
                id: steps[i].id,
                name: steps[i].name,
                works: steps[i].works,
              };
              stepsArr.push(stepItem);
            }
            data.steps = stepsArr;
            // console.log(data.steps)
            data.executors = resData.executors;
            this.data = data;
            // console.log(this.data)
            for (var i = 0; i < data.checks.length; i++) {
              this.checks.find((item) => {
                if (item.name == data.checks[i]) {
                  item.flag = true;
                }
              });
            }
          }
          // console.log(this.data.checks)
          // this.$router.push({path:'/'})
        })
        .catch((err) => {});
    },
    feedBack() {
      this.$router.push({
        path: "/feedBack",
        query: { id: this.$route.query.id },
      });
    },
    //接取任务
    acceptTasks() {
      var params = {
        tasksId: this.$route.query.id,
        userId: JSON.parse(this.$cookie.get("userInfo")).userId,
      };
      this.$http
        .get("/api/tasks/acceptTasks", params)
        .then((res) => {
          if (res.code == 1000) {
            this.$message({
              message: res.msg,
              type: "success",
            });
          } else if (res.code == 1001) {
            this.$message({
              message: res.msg,
              type: "warning",
            });
          }
          setTimeout(() => {
            this.$router.go(0);
          }, 2000);
        })
        .catch((err) => {});
    },
    //物料变化提交
    submit() {
      // console.log(this.data.checks)
      // this.checksList = this.checks.filter((item)=>item.flag=="true")
      // // console.log(this.checksList)
      // for(var i = 0;i<this.checksList.length;i++){
      //         this.data.checks.push(this.checksList[i].name)
      // }
      // console.log(this.data.checks)
      var params = {
        tasksId: this.$route.query.id,
        checks: this.data.checks,
      };
      this.$http.post("/api/tasks/updateTasksMetter", params).then((res) => {
        if (res.code == 1000) {
          this.$message({
            message: res.msg,
            type: "success",
          });
        } else if (res.code == 1001) {
          this.$message({
            message: res.msg,
            type: "warning",
          });
        }
        this.$router.go(0);
      });
      // console.log(this.checkParams)
    },

    //撤回任务
    revokeTasks() {
      var params = {
        tasksId: this.$route.query.id,
      };
      this.$http
        .get("/api/tasks/revokeTasks", params)
        .then((res) => {
          if (res.code == 1000) {
            this.$message({
              message: res.msg,
              type: "success",
            });
          } else if (res.code == 1001) {
            this.$message({
              message: res.msg,
              type: "warning",
            });
          }
          // this.$router.push({path:'/'})
        })
        .catch((err) => {});
    },
    // 修改任务
    amendTasks() {
      this.$router.push({
        path: "/amendTask",
        query: this.data,
      });
    },
    // 结束任务
    stopTasks() {
      if(!this.data.canEndPower) {
        return false;
      }
      this.$http
          .get("/api/tasks/endTasks", {tasksId: this.$route.query.id})
          .then((res) => {
            if (res.code == 1000) {
              this.$message({
                message: res.msg,
                type: "success",
              });
              setTimeout(() => {
                this.$router.go(0);
              }, 1000);
            } else if (res.code == 1001) {
              this.$message({
                message: res.msg,
                type: "warning",
              });
            }
            // this.$router.go(0);
          })
          
    },
    //点我结束
    endStatus(status, id, step) {
      if (status == 2) {
        var params = {
          linksId: id,
          userId: JSON.parse(this.$cookie.get("userInfo")).userId,
          step: step,
          work: 7,
        };
        this.$http
          .get("/api/links/updateLinks", params)
          .then((res) => {
            // console.log(res)
            if (res.code == 1000) {
              this.$message({
                message: res.msg,
                type: "success",
              });
              setTimeout(() => {
                this.$router.go(0);
              }, 2000);
            } else if (res.code == 1001) {
              this.$message({
                message: res.msg,
                type: "warning",
              });
            }
            this.$router.go(0);
          })
          .catch((err) => {
            // console.log(err)
          });
      }
    },
    // /api/tasks/revokeTasks
    // /api/tasks/acceptTasks
    back() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
@import "../../static/css/upLoadFile.scss";
.popover-avatar{
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.contain {
  display: flex;
  justify-content: flex-end;
  align-items: right;
  flex-direction: column;
  background-color: #ffffff;
  /* flex-wrap: */
}

.button-div {
  /* width: 100%; */
  height: 78px;
  display: flex;
  justify-content: flex-end;
  overflow: hidden;
}

.button-div .abled {
  width: 132px;
  height: 44px;
  background: rgba(84, 136, 248, 1);
  border: 2px solid rgba(68, 108, 234, 1);
  border-radius: 5px 5px 5px 5px;
  color: white;
  margin: 30px 30px 0 0;
  cursor: pointer;
}
.button-div .disabled {
  width: 132px;
  height: 44px;
  background-color: #f6f6f6;
  border: 2px solid #bbbbbb;
  border-radius: 5px 5px 5px 5px;
  color: #bbbbbb;
  margin: 30px 30px 0 0;
  cursor: not-allowed;
  outline: none;
}
.main span {
  color: #333333;
  font-size: 18px;
}

.main > div {
  margin: 0 0 70px 32px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}

.main > div > div:nth-child(1) {
  width: 115px;
}

#canClick {
  color: #25b42f;
  cursor: pointer;
  font-size: 12px;
  margin: 0 0 0 20px;
}
#cantClick {
  color: #25b42f;
  cursor: not-allowed;
  font-size: 12px;
  margin: 0 0 0 20px;
}
.step-circle {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.step-circle img {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin: 0 10px 0 0;
}
.step-circle span:nth-child(3) {
  width: 95px;
  height: 30px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(149, 214, 121, 1);
  border-radius: 3px;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(149, 214, 121, 1);
  line-height: 30px;
  text-align: center;
}
.step-line {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 0 0 8px 0;
}

.step-line img {
  width: 3px;
  height: 35px;
  margin: 0 19px 0 8px;
}

.step-line span {
  font-size: 10px;
  color: #bcbcbc;
  line-height: 10px;
}

.executive-div {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
}

.executive-div img {
  width: 38px;
  height: 38px;
  border-radius: 50%;
}

.executive-div span {
  font-size: 12px;
  color: #bcbcbc;
}

.executive-item {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0 43px 0 0;
}
.back {
  width: 240px;
  height: 60px;
  background: rgba(68, 108, 234, 1);
  color: white;
  border: 0;
  border-radius: 30px;
  font-size: 24px;
  outline: none;
}
.checkUl {
  list-style: none;
  width: 525px;
  line-height: 32px;
}
.checkUl > li {
  float: left;
  padding-left: 60px;
  /* margin-top: 30px; */
}
/* .checkUl>li:nth-child(1),.checkUl>li:nth-child(2),.checkUl>li:nth-child(3){
        margin-top: 0;
    } */
/* .checkUl>li:nth-child(1){
        padding-left: 0px;
    } */
.success {
  width: 14px;
  height: 12px;
  color: #95d679;
  font-weight: 800;
  font-size: 16px;
}
.default {
  width: 14px;
  height: 12px;
  color: #eb5a5a;
  font-weight: 800;
  font-size: 16px;
}
#choose {
  width: 72px;
  height: 24px;
  background: rgba(255, 255, 255, 1);
  border: 2px solid rgba(218, 226, 234, 1);
  border-radius: 3px;
}
.amend {
  width: 132px;
  height: 44px;
  background: rgba(84, 136, 248, 1);
  border: 2px solid rgba(68, 108, 234, 1);
  border-radius: 5px 5px 5px 5px;
  color: white;
  margin: 30px 30px 0 0;
  cursor: pointer;
}
</style>
