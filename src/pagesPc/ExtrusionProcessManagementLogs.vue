<template>
  <el-dialog title="录入日志" :visible.sync="dialogFormVisible">
    <ul class="logs">
      <li v-for="item in logs" :key="item.id" class="log">
        录入时间：{{ item.createTime }}, 录入数量： {{ item.num }}, 备注：{{
          item.des
        }}
      </li>
    </ul>

    <el-dialog
      width="30%"
      title="产量录入"
      :visible.sync="innerVisible"
      append-to-body
    >
      <el-form
        :model="dynamicValidateForm"
        ref="dynamicValidateForm"
        label-width="150px"
        class="demo-dynamic"
      >
        <el-form-item
          prop="yield"
          label="产量录入"
          :rules="[
            { required: true, message: '请输入产量录入', trigger: 'blur' },
            { type: 'number', message: '产量录入必须为数字值' },
          ]"
        >
          <el-input v-model.number="dynamicValidateForm.yield"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('dynamicValidateForm')"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-button type="primary" @click="entry" class="entry">录入</el-button>
  </el-dialog>
</template>

<script>
export default {
  name: "ExtrusionProcessManagementLogs",

  data() {
    return {
      dialogFormVisible: false,
      innerVisible: false,
      id: "",
      yield: "",
      logs: [],

      dynamicValidateForm: {
        id: null,
        yield: "", //（实际收款总数量）；
        userId: JSON.parse(this.$cookie.get("userInfo")).userId, //（用户ID）
      },
    };
  },

  methods: {
    openDialo(id) {
      this.dynamicValidateForm.id = id;
      this.dialogFormVisible = true;
      this._findYieldLogs();
    },
    entry() {
      this.innerVisible = true;
      let { yield: yields } = this;
      this.dynamicValidateForm.yield = yields * 1;
    },

    _findYieldLogs(id) {
      // 产量日志列表：/api/squeeze/findYieldLogs     参数：id（订单ID）
      this.$http
        .get("/api/squeeze/findYieldLogs", { id: this.dynamicValidateForm.id })
        .then((res) => {
          if (res.code == 1000) {
            this.logs = res.data.logs;
            this.yield = res.data.squeeze.yield;
          } else {
            this.$message.error("失败");
          }
        })
        .catch((err) => this.$message.error("失败"));
    },

    //

    _updateYield() {
      // 产量日志列表：/api/squeeze/findYieldLogs     参数：id（订单ID）
      this.$http
        .get("/api/squeeze/updateYield", { ...this.dynamicValidateForm })
        .then((res) => {
          if (res.code == 1000) {
            this.$message({
              message: "成功",
              type: "success",
            });
            this.innerVisible = false;
            this._findYieldLogs();
          } else {
            this.$message.error("失败");
          }
        })
        .catch((err) => this.$message.error("失败"));
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          return false;
        }
        this._updateYield();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../static/css/upLoadFile.scss";
.logs{
  list-style: none;
  padding-left: 30px;
  .log{
    margin-bottom: 15px;
    padding-bottom: 5px;
    border-bottom: 1px solid #eee;
  }
}
.entry{
  margin-left: 30px;
}
</style>