<template>
  <div class="contain" id="addTask">
    <div class="main">
      <div style="margin: 70px 0 70px 32px">
        <div style="line-height: 44px">
          <span>客户名称：</span>
        </div>
        <div class="search-div">
          <!-- <input type="text" placeholder="请输入客户名称" v-model="form.name" /> -->

          <el-select v-model="form.name" placeholder="请选择客户">
            <el-option
              :label="item.name"
              :value="item.customerId"
              v-for="item in customers"
              :key="item.customerId"
            ></el-option>
          </el-select>

          <div>
            <img
              v-bind:src="form.urgent == 5 ? checkboxTrue : checkbox"
              alt="选中框"
              v-model="form.urgent"
              @click="urgentChange"
            />
            <span>特殊加急处理</span>
          </div>
        </div>
      </div>

      <div>
        <div>
          <span>订单关键词：</span>
        </div>
        <div>
          <el-select v-model="form.productId" placeholder="请选择">
            <el-option
              v-for="item in orderKeyWords"
              :key="item.productId"
              :label="item.productCode"
              :value="item.productId"
            ></el-option>
          </el-select>
        </div>
      </div>

      <div>
        <div>
          <span>出货方式：</span>
        </div>
        <div>
          <el-select
            v-model="form.tasksId"
            placeholder="请选择"
            @change="getDelivery"
          >
            <el-option
              v-for="item in delivery"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div v-show="showTypes">
        <div style="line-height: 44px">
          <span>物料核查：</span>
        </div>
        <ul class="checkBox">
          <li class="checkOption">
            <img
              v-bind:src="
                thisChecks.find((item) => {
                  return item.name == '铝材';
                })
                  ? checkboxTrue
                  : checkbox
              "
              :index="'铝材'"
              alt="选中框"
              v-model="thisChecks"
              @click="checkChange"
            />
            <span>铝材</span>
          </li>
          <li class="checkOption">
            <img
              v-bind:src="
                thisChecks.find((item) => {
                  return item.name == '灯罩';
                })
                  ? checkboxTrue
                  : checkbox
              "
              :index="'灯罩'"
              alt="选中框"
              v-model="thisChecks"
              @click="checkChange"
            />
            <span>灯罩</span>
          </li>
          <li class="checkOption">
            <img
              v-bind:src="
                thisChecks.find((item) => {
                  return item.name == '堵头';
                })
                  ? checkboxTrue
                  : checkbox
              "
              :index="'堵头'"
              alt="选中框"
              v-model="thisChecks"
              @click="checkChange"
            />
            <span>堵头</span>
          </li>
          <li class="checkOption">
            <img
              v-bind:src="
                thisChecks.find((item) => {
                  return item.name == '卡扣';
                })
                  ? checkboxTrue
                  : checkbox
              "
              :index="'卡扣'"
              alt="选中框"
              v-model="thisChecks"
              @click="checkChange"
            />
            <span>卡扣</span>
          </li>
          <li class="checkOption">
            <img
              v-bind:src="
                thisChecks.find((item) => {
                  return item.name == '弹簧';
                })
                  ? checkboxTrue
                  : checkbox
              "
              :index="'弹簧'"
              alt="选中框"
              v-model="thisChecks"
              @click="checkChange"
            />
            <span>弹簧</span>
          </li>
          <li class="checkOption">
            <img
              v-bind:src="
                thisChecks.find((item) => {
                  return item.name == '卡簧';
                })
                  ? checkboxTrue
                  : checkbox
              "
              :index="'卡簧'"
              alt="选中框"
              v-model="thisChecks"
              @click="checkChange"
            />
            <span>卡簧</span>
          </li>
          <li class="checkOption">
            <img
              v-bind:src="
                thisChecks.find((item) => {
                  return item.name == '吊绳';
                })
                  ? checkboxTrue
                  : checkbox
              "
              :index="'吊绳'"
              alt="选中框"
              v-model="thisChecks"
              @click="checkChange"
            />
            <span>吊绳</span>
          </li>
          <li class="checkOption">
            <img
              v-bind:src="
                thisChecks.find((item) => {
                  return item.name == '其他';
                })
                  ? checkboxTrue
                  : checkbox
              "
              :index="'其他'"
              alt="选中框"
              v-model="thisChecks"
              @click="checkChange"
            />
            <span>其他</span>
          </li>
        </ul>
      </div>
      <div>
        <div>
          <span>类型</span>
        </div>
        <div>
          <el-select v-model="form.types" placeholder="请选择" @change="getMid">
            <el-option
              v-for="item in types"
              :key="item.typesId"
              :label="item.name"
              :value="item.typesId"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div>
        <div>
          <span>结束时间：</span>
        </div>
        <div>
          <el-date-picker
            v-model="form.dateRange"
            @change="dateChange"
            type="date"
            :picker-options="pickerOptions"
            placeholder="选择日期"
          ></el-date-picker>
        </div>
      </div>
      <div style="height: 400px; border: 1px solid #000">
        <div>
          <span>内容描述：</span>
        </div>
        <div>
          <quillEditor
            v-model="form.describes"
            :options="editorOption"
            @change="onEditorChange($event)"
          >
          </quillEditor>
        </div>
      </div>

      <div class="uploadimg" v-show="false">
        <el-upload
          ref="upload"
          :action="$httppath"
          :headers="headertwo"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-success="handleAvatarSuccess"
          :on-remove="handleRemove"
          v-on:getImgUrl="AddInputUrl"
          class="uploadimg"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <!-- <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog> -->
      </div>

       <div v-show="showTypes">
        <div>
          <span>任务描述：</span>
        </div>
        <div>
          <el-input
            type="textarea"
            :rows="2"
            placeholder="方便右侧使用"
            v-model="form.des">
          </el-input>
        </div>
      </div>

      <div v-show="showTypes">
        <div>
          <span>价格：</span>
        </div>
        <div>
          <input type="text" class="price" v-model="form.price" />
        </div>
      </div>

      

      <div v-show="showTypes">
        <div>
          <span>任务环节：</span>
          <span style="font-size: 12px; color: #b0b0b0; margin-left: 16px"
            >(可多选)</span
          >
        </div>
        <div class="greyBox">
          <div class="link" v-for="item in steps" :key="item.stepsId">
            <span>{{ item.name }}</span>
            <img
              v-bind:src="item.selected ? checkboxTrue : checkbox"
              alt="选中框"
              @click="selectStep(item.stepsId)"
            />
          </div>
        </div>
      </div>
      <div>
        <div>
          <span>执行人：</span>
        </div>
        <div class="greyBox">
          <div class="carry-search">
            <input
              type="text"
              name
              id
              placeholder="可搜索成员名字"
              v-model="usersKeywords"
            />
            <img
              :src="'./static/imgPc/search-icon.png'"
              alt="搜索"
              @click="searchUser"
            />
          </div>
          <div class="carry-check">
            <span>已选成员</span>
            <div class="executive-div">
              <div
                class="executive-item"
                v-for="(item, key) in usersSelect"
                :key="key"
                @click="deleteSelect(key)"
              >
                <img
                  v-bind:src="headIcon"
                  alt="head"
                  style="filter: blur(3px)"
                />
                <span class="check-span">{{ item.nickName }}</span>
                <div class="check-border">
                  <span>{{ key + 1 }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="carry-result">
            <span>搜索结果</span>
            <div class="executive-div">
              <div
                class="executive-item"
                v-for="item in users"
                :key="item.userId"
              >
                <img
                  v-bind:src="headIcon"
                  alt="head"
                  @click="selectUserAct(item.userId)"
                />
                <span>{{ item.nickName }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div>
          <span>抄送给：</span>
        </div>
        <div class="greyBox">
          <div class="carry-search">
            <input
              type="text"
              name
              id
              placeholder="可搜索成员名字"
              v-model="usersKeywords"
            />
            <img :src="search" alt="搜索" @click="searchUser" />
          </div>
          <div class="carry-check">
            <span>已选成员</span>
            <div class="executive-div">
              <div
                class="executive-item"
                v-for="(item, key) in usersGive"
                :key="key"
                @click="deleteGive(key)"
              >
                <img
                  v-bind:src="headIcon"
                  alt="head"
                  style="filter: blur(3px)"
                />
                <span class="check-span">{{ item.nickName }}</span>
                <div class="check-border">
                  <span>{{ key + 1 }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="carry-result">
            <span>搜索结果</span>
            <div class="executive-div">
              <div
                class="executive-item"
                v-for="item in users"
                :key="item.userId"
              >
                <img
                  v-bind:src="headIcon"
                  alt="head"
                  @click="selectUserGive(item.userId)"
                />
                <span>{{ item.nickName }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div></div>
        <div>
          <button class="back" @click="submit">新建完成</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import headIcon from "../../static/imgPc/head-icon.png";
import checkboxTrue from "../../static/imgPc/checkbox-true-icon.png";
import checkbox from "../../static/imgPc/checkbox-icon.png";
import search from "../../static/imgPc/search-icon.png";
// import cover1 from '@/assets/images/1.jpg'
import { quillEditor } from "vue-quill-editor";
let datas = [
  ["bold", "italic", "underline", "strike"], // 加粗，斜体，下划线，删除线
  ["blockquote", "code-block"], // 引用，代码块

  [
    {
      header: 1,
    },
    {
      header: 2,
    },
  ], // 标题，键值对的形式；1、2表示字体大小
  [
    {
      list: "ordered",
    },
    {
      list: "bullet",
    },
  ], // 列表
  [
    {
      script: "sub",
    },
    {
      script: "super",
    },
  ], // 上下标
  [
    {
      indent: "-1",
    },
    {
      indent: "+1",
    },
  ], // 缩进
  [
    {
      direction: "rtl",
    },
  ], // 文本方向
  [
    {
      size: ["small", false, "large", "huge"],
    },
  ], // 字体大小
  [
    {
      header: [1, 2, 3, 4, 5, 6, false],
    },
  ], // 几级标题

  [
    {
      color: [],
    },
    {
      background: [],
    },
  ], // 字体颜色，字体背景颜色
  [
    {
      font: [],
    },
  ], // 字体
  [
    {
      align: [],
    },
  ], // 对齐方式
  ["clean"], // 清除字体样式
  ["image"], // 上传图片、上传视频
];
console.log(quillEditor);
// fontSizeStyle.whitelist = ['10px', '12px', '14px', '16px', '20px', '24px', '36px', false];
export default {
  components: {
    quillEditor,
  },
  data() {
    return {
      customers: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e6;
        },
      },
      imgs: "",
      authorization: "",
      httppath: "http://www.lsibss.com:8080/tasks/api/purchase/saveImage",
      headertwo: {},

      imgUrl: "",

      dialogImageUrl: "",
      dialogVisible: false,

      mytextID: "",
      editorOption: {
        modules: {
          toolbar: {
            container: datas,
            handlers: {
              image: function (value) {
                if (value) {
                  // this.$refs['upload'].click()
                  // this.handleAvatarSuccess()

                  document.querySelector(".el-upload").click();
                  console.log(1111);
                }
              },
            },
          },
        },
        theme: "snow",
      },
      headIcon: headIcon,
      checkboxTrue: checkboxTrue,
      checkbox: checkbox,
      search: search,
      types: [], // 类型字典
      steps: [], // 步骤字典
      users: [], // 用户字典
      orderKeyWords: [], // 订单关键词
      delivery: [
        {
          id: 0,
          name: "快递",
        },
        {
          id: 1,
          name: "物流",
        },
        {
          id: 2,
          name: "自取",
        },
      ], // 快递交付方式
      // faceicon: "http://192.168.0.126:8080/tasks/image/tx.jpg"
      // loginTime: "2019-09-12 18:09:27"
      // nickName: "test"
      // password: "111111"
      // phone: "13112345678"
      // types: 3
      // userId: 2
      // userName: "test"
      // works: 1
      form: {
        des: '', // 任务描述
        productId: "", // 订单关键词
        name: "", // 客户名
        urgent: 6, // 加急（5：加急；6：不加急）
        types: "", // 任务类型
        checks: [], // 核查选中（铝材；灯罩；堵头；卡扣；弹簧；卡簧；吊绳；其他）
        dateRange: "", // 任务时间
        // createTime:"",//任务开始时间
        endTime: "", // 任务截止时间
        describes: "", // 任务描述
        price: "", // 任务价格
        linksIds: "", // 任务流程（多个步骤id以,分开）
        executorIds: "", // 任务执行人（多个步骤id以,分开）
        pusherIds: "", // 任务推送人（多个步骤id以,分开）
        tasksId: "", // 选中出货方式
      },
      usersKeywords: "",
      usersSelect: [],
      usersGive: [],
      thisChecks: [], // 页面自己用的核查选中
      showTypes: true,
    };
  },
  computed: {},
  watch: {},
  created() {
    this.dictionary();
  },
  mounted() {
    this.getSession();
    this.mytextID = Number(this.$route.query.typeId);
    try {
      var params = {
        userId: JSON.parse(this.$cookie.get("userInfo")).userId,
        tasksId: this.mytextID,
      };
      this.$http.get("/api/tasks/toUpdate", params).then((res) => {
        console.log(res);
        this.form.name = res.tasks.name;
      });
    } catch (error) {
    } finally {
      this.findProducts();
      this.findCustomers();
    }
  },
  destroy() {},

  methods: {
    /**
     * 客户列表接口：/api/customer/findCustomers     参数：searchText（）搜索条件
     */
    findCustomers() {
      this.$http
        .get("/api/customer/findCustomers", { searchText: "" })
        .then((res) => {
          console.log(res);
          if (res.code == 1000) {
            this.customers = res.data;
          }
        })
        .catch((err) => {});
    },

    findProducts() {
      this.$http
        .get("/api/product/findProducts", {})
        .then((res) => {
          console.log(res);
          this.orderKeyWords = res.data;
        })
        .catch((err) => {
          // console.log(err)
        });
    },
    AddInputUrl() {
      console.log(2222222222);
    },
    onEditorChange() {
      // console.log(this.form.describes)
      var conten = this.value;
      this.$emit("getText", conten);
    },

    aa() {
      this.form.describes = 11;
    },

    handleRemove(file, fileList) {
      console.log(file, fileList);
      console.log(11);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      console.log(this.dialogImageUrl);
      this.dialogVisible = true;
      console.log(22);
    },
    handleAvatarSuccess(res, file) {
      this.imgUrl = res.data.imageUrl;
      let newData = "<img src=" + this.imgUrl + "></img>";
      this.form.describes += newData;
      console.log(res, 333333333);
    },
    // 获取session
    getSession() {
      this.authorization = localStorage.getItem("Authorization");
      this.headertwo = {
        Authorization: this.authorization,
      };
    },

    dictionary() {
      //
      var params = {
        usersKeywords: "",
        userId: JSON.parse(this.$cookie.get("userInfo")).userId,
      };
      this.$http
        .get("/api/tasks/findTasksMsg", params)
        .then((res) => {
          console.log(res);
          // 类型字典(生产环节，类型)
          this.types = res.types;
          // 步骤字典(任务环节)
          var steps = res.steps;
          var arr = [];
          for (var i = 0; i < steps.length; i++) {
            var stepsItem = {
              name: steps[i].name,
              stepsId: steps[i].stepsId,
              time: steps[i].time,
              works: steps[i].works,
              selected: false,
            };
            arr.push(stepsItem);
          }
          this.steps = arr;
          // console.log(this.steps)
          this.users = res.users;
        })
        .catch((err) => {
          // console.log(err)
        });
    },
    searchUser() {
      var params = {
        usersKeywords: this.usersKeywords,
      };
      this.$http
        .get("/api/tasks/findTasksMsg", params)
        .then((res) => {
          this.users = res.users;
        })
        .catch((err) => {});
    },
    selectStep(id) {
      var arr = this.steps;
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].stepsId == id) {
          arr[i].selected = !arr[i].selected;
          break;
        }
      }
      this.steps = arr;
    },
    // 紧急任务选择
    urgentChange() {
      var urgent = this.form.urgent;
      if (urgent == 5) {
        this.form.urgent = 6;
      } else {
        this.form.urgent = 5;
      }
    },
    // 出货方式

    // 物料核查选择
    checkChange(e) {
      if (
        this.thisChecks.find((item) => {
          return item.name == e.target.getAttribute("index");
        })
      ) {
        this.thisChecks = this.thisChecks.filter((item) => {
          return item.name != e.target.getAttribute("index");
        });
        this.form.checks = this.form.checks.filter((item) => {
          return item != e.target.getAttribute("index");
        });
      } else {
        this.form.checks.push(e.target.getAttribute("index"));
        this.thisChecks.push({
          name: e.target.getAttribute("index"),
          flag: "",
        });
      }
      // console.log(this.thisChecks)
      // console.log(this.form.checks)
    },
    //  类型
    getMid() {
      if (this.form.types == "11") {
        this.showTypes = false;
      } else {
        this.showTypes = true;
      }
    },
    // 时间选择
    dateChange() {
      // var s_time=this.form.dateRange[0];
      var e_time = this.form.dateRange;
      // var s_year = s_time.getFullYear();
      // var s_month = (s_time.getMonth()+1)<10 ? '0'+(s_time.getMonth()+1) : (s_time.getMonth()+1);
      // var s_day = s_time.getDate()<10 ? '0'+s_time.getDate() : s_time.getDate();
      var e_year = e_time.getFullYear();
      var e_month =
        e_time.getMonth() + 1 < 10
          ? "0" + (e_time.getMonth() + 1)
          : e_time.getMonth() + 1;
      var e_day =
        e_time.getDate() < 10 ? "0" + e_time.getDate() : e_time.getDate();
      // this.form.createTime=s_year+"-"+s_month+"-"+s_day;
      this.form.endTime = e_year + "-" + e_month + "-" + e_day;
      // console.log(this.form.createTime,this.form.endTime)
    },
    // 选择执行人
    selectUserAct(id) {
      // console.log(id)
      var users = this.users;
      var usersSelect = this.usersSelect;
      for (var i = 0; i < users.length; i++) {
        if (users[i].userId == id) {
          // console.log(users[i])
          usersSelect.push(users[i]);
        }
      }
      this.usersSelect = this.unique(usersSelect);
      // console.log(usersSelect)
    },
    // 删除执行人
    deleteSelect(index) {
      var usersSelect = this.usersSelect;
      usersSelect.splice(index, 1);
    },
    // 删除推送人
    deleteGive(index) {
      var usersGive = this.usersGive;
      usersGive.splice(index, 1);
    },
    // 选推送给
    selectUserGive(id) {
      // console.log(id)
      var users = this.users;
      var usersGive = this.usersGive;
      for (var i = 0; i < users.length; i++) {
        if (users[i].userId == id) {
          // console.log(users[i])
          usersGive.push(users[i]);
        }
      }
      this.usersGive = this.unique(usersGive);
      // console.log(usersGive)
    },
    unique(arr) {
      for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
          if (arr[i].userId == arr[j].userId) {
            // 第一个等同于第二个，splice方法删除第二个
            arr.splice(j, 1);
            j--;
          }
        }
      }
      return arr;
    },
    getArrId(arr, id) {
      var idArr = [];
      for (var i = 0; i < arr.length; i++) {
        idArr.push(arr[i][id]);
      }
      return idArr.join();
    },
    getDelivery() {
      console.log(this.form.tasksId);
    },

    submit() {
      console.log(this.mytextID);
      var steps = this.steps;
      var arr = [];
      for (var i = 0; i < steps.length; i++) {
        if (steps[i].selected) {
          arr.push(steps[i].stepsId);
        }
      }

      var params = {
        userId: JSON.parse(this.$cookie.get("userInfo")).userId,
        name: this.form.name, // 客户名
        customerId: this.form.name, // 客户名id
        urgent: this.form.urgent, // 加急（5：加急；6：不加急)
        productId: this.form.productId,
        checks: this.thisChecks, // 物料核查
        types: this.form.types, // 任务类型
        // createTime:this.form.createTime,//任务开始时间
        endTime: this.form.endTime, // 任务截止时间
        describes: this.form.describes, // 任务描述
        price: this.form.price, // 任务价格
        linksIds: arr.join(), // 任务流程（多个步骤id以,分开）steps
        executorIds: this.getArrId(this.usersSelect, "userId"), // 任务执行人（多个步骤id以,分开）usersSelect
        pusherIds: this.getArrId(this.usersGive, "userId"), // 任务推送人（多个步骤id以,分开）usersGive，
        shipment: this.form.tasksId,
        des: this.form.des,
      };
      // console.log(params.checks)
      this.$message.closeAll();
      // console.log(this.$message)
      if (params.name == "") {
        this.$message({
          message: "客户名不能为空",
          type: "warning",
        });
      } else if (params.types == "") {
        this.$message({
          message: "任务类型不能为空",
          type: "warning",
        });
      } else if (params.endTime == "") {
        this.$message({
          message: "时间不能为空",
          type: "warning",
        });
      } else if (params.price == "" && params.types == 10) {
        this.$message({
          message: "任务价格不能为空",
          type: "warning",
        });
      } else if (params.linksIds == "" && params.types == 10) {
        this.$message({
          message: "任务流程不能为空",
          type: "warning",
        });
      } else if (params.executorIds == "") {
        this.$message({
          message: "执行人不能为空",
          type: "warning",
        });
      } else {
        this.$http
          .post("/api/tasks/creatTasks", params)
          .then((res) => {
            console.log(res);
            if (res.code == 1000) {
              this.$router.push({
                path: "/feedBackResult",
                query: {
                  from: "addTask",
                },
              });
            }
          })
          .catch((err) => {});
      }
    },
  },
};
</script>

<style scoped>
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

.button-div button {
  width: 132px;
  height: 44px;
  background: rgba(84, 136, 248, 1);
  border: 2px solid rgba(68, 108, 234, 1);
  border-radius: 5px 5px 5px 5px;
  color: white;
  margin: 30px 30px 0 0;
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

.main > div > div:nth-child(2) {
  width: 494px;
}

.greyBox {
  border: 2px solid #dae2ea;
}

.link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(100% - 62px);
  padding: 0 31px;
  height: 46px;
}

.search-div input,
.price {
  width: 540px;
  height: 44px;
  font-size: 20px;
  padding: 0 0 0 3px;
  border: 2px solid #dae2ea;
  outline: none;
}

.search-div div {
  height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.search-div div img {
  margin: 0 9px 0 0;
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

.check-border {
  position: absolute;
  top: 0;
  left: 1px;
  width: 36px;
  height: 36px;
  background-color: #e0e0e0;
  border-radius: 50%;
  border: 1px solid #2c97ff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.check-border span {
  color: #2c97ff !important;
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
  width: 40px;
  margin: 0 43px 0 0;
  position: relative;
}

.back {
  width: 240px;
  height: 60px;
  background: rgba(68, 108, 234, 1);
  color: white;
  border: 0;
  border-radius: 30px;
  font-size: 24px;
  cursor: pointer;
}

.carry-search {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 44px;
  width: 100%;
}

.carry-search input {
  height: 100%;
  width: 420px;
  border: 0;
  outline: none;
  font-size: 20px;
  padding: 0 0 0 10px;
}

.carry-search img {
  width: 18px;
  height: 18px;
  margin: 0 30px 0 0;
}

.carry-check {
  border-bottom: 2px solid #dae2ea;
}

.carry-check > span,
.carry-result > span {
  font-size: 14px;
  line-height: 74px;
}

.carry-check,
.carry-result {
  width: calc(100% - 38px);
  padding: 0 0 0 38px;
}

.carry-check .check-span {
  color: #2c97ff;
}

.quill-editor {
  height: 270px;
}

.checkOption {
  height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  display: inline-block;
  padding-left: 59px;
  float: left;
  list-style: none;
  line-height: 50px;
}

.checkOption:nth-child(1),
.checkOption:nth-child(5) {
  padding-left: 0px;
}

.checkBox {
  width: 444px;
}
</style>
<style>
#addTask.el-range-editor .el-input__inner,
#addTask.el-input--suffix .el-input__inner,
#addTask.el-textarea__inner {
  border: 2px solid #dae2ea;
  width: 540px;
  outline: none;
}

#addTask .ql-container {
  font-size: 16px;
}

#addTask .quill-editor {
  width: 800px;
}
</style>
