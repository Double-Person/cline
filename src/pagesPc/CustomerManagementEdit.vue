<template>
  <el-dialog :title="title" :visible.sync="dialogFormVisible">
    <el-form
      :model="dynamicValidateForm"
      ref="dynamicValidateForm"
      label-width="150px"
      class="demo-dynamic"
    >
      <el-form-item
        prop="name"
        label="客户名称"
        :rules="[{ required: true, message: '客户名称不能为空' }]"
      >
        <el-input v-model="dynamicValidateForm.name"></el-input>
      </el-form-item>
      <el-form-item
        prop="contacts"
        label="客户联系人"
        :rules="[{ required: true, message: '客户联系人不能为空' }]"
      >
        <el-input v-model="dynamicValidateForm.contacts"></el-input>
      </el-form-item>

      <el-form-item
        prop="phone"
        label="联络电话"
        :rules="[{ required: true, message: '联络电话不能为空' }]"
      >
        <el-input v-model="dynamicValidateForm.phone"></el-input>
      </el-form-item>
      <el-form-item
        prop="address"
        label="客户地址"
        :rules="[{ required: true, message: '客户地址不能为空' }]"
      >
        <el-input v-model="dynamicValidateForm.address"></el-input>
      </el-form-item>
      <el-form-item
        prop="settlement"
        label="付款方式"
        :rules="[{ required: true, message: '付款方式不能为空' }]"
      >
        <el-input v-model="dynamicValidateForm.settlement"></el-input>
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
        name: "", // （客户名称）
        contacts: "", // （联系人）
        phone: "", // （联系电话）
        address: "", // （联系电话）
        settlement: "", // （结款方式）
      },
    };
  },

  methods: {
    openDialo(row) {
      try {
        this.$refs.dynamicValidateForm.resetFields();
      } catch (error) {}
      this.dialogFormVisible = true;
      this.dynamicValidateForm = row;
    },
    /**
     * 编辑接口：/api/customer/addCustomer    参数：customerId（客户ID）；name（客户名称）；contacts（联系人）；phone（联系电话）；address（联系电话）；settlement（结款方式）
     */
    /**
     * 新增接口：/api/customer/addCustomer    参数：name（客户名称）；contacts（联系人）；phone（联系电话）；address（联系电话）；settlement（结款方式）
     */
    editForm() {
      let parmas = { ...this.dynamicValidateForm };

      if (this.dynamicValidateForm.customerId) {
        delete parmas.customerId;
      }
      this.$http.get("/api/customer/addCustomer", parmas).then((res) => {
        console.log(res);
        if (res.code == 1000) {
          this.$message({
            message: "修改成功",
            type: "success",
          });
          this.dialogFormVisible = false;
          this.$emit("success");
        } else {
          this.$message.error("提交失败");
        }
      });
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          return false;
        }
        console.log(this.dynamicValidateForm);
        this.editForm();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../static/css/upLoadFile.scss";
</style>