<template>
  <div class="contain">
    <div class="header">
      <img
        :src="'./static/imgPhone/return-icon.png'"
        alt="返回"
        class="return"
        @click="returnFuc"
      />
      <span class="title">新建货款</span>
      <span @click="confirm">完成</span>
    </div>
    <div class="main">
      <div class="style">
        <p>客户名称</p>
        <el-select v-model="form.tasksId" placeholder="请选择">
          <el-option
            v-for="item in tasks"
            :key="item.tasksId"
            :label="item.name"
            :value="item.tasksId"
          >
          </el-option>
        </el-select>
      </div>
      <div class="price">
        <p>应收金额</p>
        <input type="text" v-model="form.amount" />
      </div>
    </div>
  </div>
</template>
    
<script>
import { quillEditor } from "vue-quill-editor";
// import cover1 from '@/assets/images/1.jpg'
// import headIcon from "./../../static/imgPc/head-icon.png";
// import checkboxTrue from "./../../static/imgPc/checkbox-true-icon.png";
// import checkbox from "./../../static/imgPc/checkbox-icon.png";
// import search from "./../../static/imgPc/search-icon.png";
export default {
  components: {
    quillEditor,
  },
  data() {
    return {
      tasks: {
        tasksId: "",
        name: "",
      },
      form: {
        tasksId: "",
        amount: "",
      },
    };
  },
  computed: {},
  watch: {},
  created() {
    this.dictionary();
  },
  mounted() {},

  destroy() {},
  methods: {
    returnFuc() {
      this.$router.go(-1);
    },
    dictionary() {
      this.$http
        .get("/api/tasks/findTasksByCharge", "")
        .then((res) => {
          this.tasks = res.data;
        })
        .catch((err) => {});
    },
    confirm() {
      this.$message.closeAll();
      if (this.form.tasksId == "") {
        this.$message({
          message: "请选择客户名称",
          type: "warning",
        });
      } else if (this.form.amount == "") {
        this.$message({
          message: "请填写金额",
          type: "warning",
        });
      } else {
        this.$http
          .get("/api/tasks/addCharge", this.form)
          .then((res) => {
            if (res.code == 1000) {
              this.$router.push({
                path: "/feedBackResult",
                query: { from: "addCharge" },
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
  width: 100%;
  height: 100%;
}

.header {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  border-bottom: 4px solid #eceff6;
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

.main {
  width: calc(100% - 20px);
  height: calc(100% - 54px);
  background-color: #ffffff;
  padding: 0 10px;
  overflow-y: scroll;
}

.main > div {
  margin: 30px 0 0 0;
}

.main > div p {
  font-size: 14px;
  line-height: 34px;
  font-weight: bold;
}

.name input,
.price input {
  width: calc(100% - 4px);
  height: 34px;
  font-size: 12px;
  border: 1px solid #e6e8ef;
  padding: 0 0 0 4px;
  outline: none;
}

.name div {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 34px;
}

.name div img {
  width: 13px;
  height: 13px;
  margin: 0 6px 0 0;
}

.name div span {
  color: #343434;
}

.style {
  width: 100%;
}

.style .el-select {
  width: 100%;
}
/* .discribe { */
  /* height: 380px; */
/* } */
.discribe > div {
  width: 100%;
  /* height: 233px; */
  /* border: 1px solid #E6E8EF;
            display: flex;
            justify-content: flex-start; */
  /* align-items: center; */
}
.link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(100% - 62px);
  padding: 0 31px;
  height: 46px;
}

.executive-div {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  min-height: 90px;
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
  margin: 10px 30px 0 0;
}

.back {
  width: 240px;
  height: 60px;
  background: rgba(68, 108, 234, 1);
  color: white;
  border: 0;
  border-radius: 30px;
  font-size: 24px;
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
  font-size: 14px;
  padding: 0 0 0 10px;
}

.carry-search img {
  width: 18px;
  /* height: 18px; */
  margin: 0 30px 0 0;
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
</style>
    <style>
.time > div .el-date-editor.el-input,
.time > div .el-date-editor.el-input__inner {
  width: 150px;
}

.discribe .el-textarea__inner {
  border: 0;
}
</style>