<template>
  <div>
    <el-dialog title="修改金额" :visible="dialogFormVisible" :show-close="false">
      <el-form :model="form" ref="numberValidateForm">
          <el-form-item
          label="总金额"
          :label-width="formLabelWidth"
          prop="amount"
          :rules="[
            { required: true, message: '总金额不能为空' },
            { type: 'number', message: '总金额必须为数字值' },
          ]"
        >
          <el-input
            type="number"
            v-model.number="form.amount"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="备注"
          :label-width="formLabelWidth"
           prop="contents"
          :rules="[
            { required: true, message: '备注不能为空' },
          ]"
        >
          <el-input v-model="form.contents" autocomplete="off"></el-input>
        </el-form-item>
      
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
     
      dialogFormVisible: false,
      tasksId: "",
      form: {
        amount: '',
        contents:''
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
    
      this.tasksId = params.id;
      this.form.amount = params.amount;
      console.log(this.form);
      
    },

    submitForm() {
      this.$refs.numberValidateForm.validate((valid) => {
        if (!valid) {
          return false;
        }
       this.updateCharge()
      });

    },

 
    // /api/tasks/updateCharge      修改
    updateCharge() {
      const params = {
        ...this.form,
        //  amount: this.form.amount,
        // contents:this.form.contents,
        tasksId: this.tasksId,
      };
      console.log(params)
      this.$http
        .get("/api/tasks/updateCharge", params)
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
        .catch((err) => this.$message.error("修改失败"));
    },

  },
};
</script>

<style>
</style>