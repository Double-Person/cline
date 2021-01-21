<template>
  <el-dialog title="加工数量" :visible.sync="dialogFormVisible">
    <el-form :model="form" ref="form">
      <el-form-item
        label="加工数量"
        :label-width="formLabelWidth"
        prop="endNum"
        :rules="[
          { required: true, message: '请输入加工数量', trigger: 'blur' },
          { type: 'number', message: '加工数量必须为数字值' },
        ]"
      >
        <el-input v-model.number="form.endNum" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitForm('form')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "ProcessManagementNumEdit",
  data() {
    return {
      dialogFormVisible: false,

      form: {
        id: "",
        endNum: "",
      },
      formLabelWidth: "120px",
    };
  },

  methods: {
    openDialo(endNum, id) {
      console.log("----", endNum, id);
      this.form.id = id;
      this.form.endNum = endNum;
      this.dialogFormVisible = true;
    },
    submitForm(formName) {
      // // 修改加工数量：/api/processDetail/updateEndNum     参数：id（详情ID）；endNum（已经加工数量）
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http
            .get("/api/processDetail/updateEndNum", { ...this.form })
            .then(({ code, msg }) => {
              if (code == 1000) {
                this.$message({
                  message: "成功",
                  type: "success",
                });
                this.$emit("success");
                this.dialogFormVisible = false;
              } else {
                this.$message.error(msg || "失败");
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../static/css/upLoadFile.scss";
.warp {
  .custom-label {
    font-size: 14px;
    color: #606266;
    text-align: right;
    display: inline-block;
    margin-left: -100px;
    width: 100px;
    &::after {
      content: " ";
      margin-right: 5px;
    }
  }

  .add-row {
    display: flex;
    align-items: center;
    /deep/ .el-form-item__content {
      margin-left: 0px !important;
    }
  }
}
</style>