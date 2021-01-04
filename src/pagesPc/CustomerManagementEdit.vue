<template>
  <el-dialog :title="title" :visible.sync="dialogFormVisible">
    <el-form
      :model="dynamicValidateForm"
      ref="dynamicValidateForm"
      label-width="150px"
      class="demo-dynamic"
    >
      <el-form-item prop="name" label="客户名称">
        <el-input v-model="dynamicValidateForm.name"></el-input>
      </el-form-item>
      <el-form-item prop="orderNum" label="客户联系人">
        <el-input v-model="dynamicValidateForm.orderNum"></el-input>
      </el-form-item>

      <el-form-item prop="type" label="联络电话">
        <el-input v-model="dynamicValidateForm.type"></el-input>
      </el-form-item>
      <el-form-item prop="type" label="客户地址">
        <el-input v-model="dynamicValidateForm.type"></el-input>
      </el-form-item>
      <el-form-item prop="type" label="付款方式">
        <el-input v-model="dynamicValidateForm.type"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('dynamicValidateForm')"
          >保存提交</el-button
        >
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  name: "PrivateMoneyEdit",
  data() {
    return {
      title: "客户资料新建",
      dialogFormVisible: false,
      dynamicValidateForm: {
        name: "",
        orderNum: "",
        type: "",
        imageUrl: "",
      },
    };
  },

  methods: {
    openDialo() {
      this.dialogFormVisible = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.dynamicValidateForm);
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
</style>