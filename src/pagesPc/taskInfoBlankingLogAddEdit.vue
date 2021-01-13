<template>
  <div>
    <el-dialog :title="titles" :visible="dialogFormVisible" :show-close="false">
      <el-form :model="form" ref="numberValidateForm">
        <el-form-item
          label="备注"
          :label-width="formLabelWidth"
           prop="des"
          :rules="[
            { required: true, message: '备注不能为空' },
          ]"
        >
          <el-input v-model="form.des" autocomplete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item
          label="数量"
          :label-width="formLabelWidth"
          prop="num"
          :rules="[
            { required: true, message: '数量不能为空' },
            { type: 'number', message: '数量必须为数字值' },
          ]"
        >
          <el-input
            type="number"
            v-model.number="form.num"
            autocomplete="off"
          ></el-input>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      titles: "切料日志",
      dialogFormVisible: false,
      tasksId: "",
      form: {
        cuttingLogId: "", //ID（新增不传）
        // tasksId: "", //任务ID（修改不传）
        matterId: "", //物料ID（修改不传）
        // userId: "", //当前用户ID（修改不传）
        num: "", //数量
        des: "", //备注
      },

      formLabelWidth: "120px",
    };
  },
  methods: {
    openDialog(params) {
      try {
        this.$refs.numberValidateForm.resetFields();
      } catch (error) {
        
      }
      this.dialogFormVisible = true;
      this.tasksId = params.tasksId;
      this.form = params.row;
      console.log(this.form);
      if (this.form.cuttingLogId) {
        this.titles = "编辑";
      } else {
        this.titles = "新增";
      }
    },

    submitForm() {
      this.$refs.numberValidateForm.validate((valid) => {
        if (!valid) {
          return false;
        }
        if (this.form.cuttingLogId) {
          this.updateCuttingLog();
        } else {
          this.addCuttingLog();
        }
      });

      // dialogFormVisible = false
    },

    // /api/cuttingLog/addCuttingLog    新增切料日志
    addCuttingLog() {
      const params = {
        ...this.form,
        tasksId: this.tasksId,
        userId: JSON.parse(this.$cookie.get("userInfo")).userId,
      };
      this.$http
        .post("/api/cuttingLog/addCuttingLog", params)
        .then((res) => {
          if (res.code == 1000) {
            this.$message({
              message: "新增成功",
              type: "success",
            });
            this.dialogFormVisible = false;
            this.$emit("success");
          } else {
            this.$message.error("新增失败");
          }
        })
        .catch((err) => {});
    },

    // /api/cuttingLog/updateCuttingLog      修改
    updateCuttingLog() {
      const params = {
        ...this.form,
        tasksId: this.tasksId,
        userId: JSON.parse(this.$cookie.get("userInfo")).userId,
      };
      this.$http
        .post("/api/cuttingLog/updateCuttingLog", params)
        .then((res) => {
          if (res.code == 1000) {
            this.$message({
              message: "修改成功",
              type: "success",
            });
            this.dialogFormVisible = false;
            this.$emit("success");
          } else {
            this.$message.error("修改失败");
          }
        })
        .catch((err) => {});
    },

    // /api/matter/findMatter     物料列表查询接口
    findMatter() {
      this.$http
        .get("/api/matter/findMatter", {})
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {});
    },
  },
};
</script>

<style>
</style>