<template>
  <el-dialog :title="dialoTitle" :visible.sync="dialogFormVisible">
    <el-form
      :model="dynamicValidateForm"
      ref="dynamicValidateForm"
      label-width="150px"
      class="demo-dynamic"
    >
      <el-form-item
        prop="productCode"
        label="产品编号"
        :rules="[{ required: true, message: '产品编号不能为空' }]"
      >
        <el-input v-model="dynamicValidateForm.productCode"></el-input>
      </el-form-item>

      <el-form-item prop="productImg" label="产品图样" :rules="[{ required: true, message: '产品图样不能为空' }]">
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          :action="$httppath"
          :headers="header"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          ><img
            v-if="dynamicValidateForm.productImg"
            :src="dynamicValidateForm.productImg"
            class="avatar"
          />

          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('dynamicValidateForm')"
          >提交</el-button
        >
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  name: "ProcessManagementEdit",
  data() {
    return {
      dialoTitle: "",
      authorization: "",
      header: {},
      dialogFormVisible: false,
      addUrl: "/api/product/addProduct",
      editUrl: "/api/product/editProduct",
      dynamicValidateForm: {
        productId: "",
        productCode: "",
        productImg: "",
      },
    };
  },
  mounted() {
    this.getSession();
  },
  methods: {
    openDialo(row) {
      this.dialogFormVisible = true;
      this.dynamicValidateForm = row;
      if (row.productId) {
        this.dialoTitle = "编辑产品信息";
      } else {
        this.dialoTitle = "新建产品信息";
      }
    },
    /**
     * 新增接口：/api/product/addProduct     参数：productCode（产品编号）；productImg（产品图样）
     */
    /**
     * 编辑接口：/api/product/editProduct    参数：productId（产品接口）；productCode（产品编号）；productImg（产品图样）
     */
    editForm() {
      let url = "";
      if (this.dynamicValidateForm.productId) {
        url = this.editUrl;
      } else {
        url = this.addUrl;
      }
      this.$http
        .get(url, {
          ...this.dynamicValidateForm,
        })
        .then((res) => {
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

    //上传物料图片
    handleAvatarSuccess(res, file) {
      // console.log(res)
      this.dynamicValidateForm.productImg = res.data.imageUrl;
      // console.log(this.data.productImg)
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
  },
};
</script>

<style lang="scss" scoped>
@import "../../static/css/upLoadFile.scss";
</style>