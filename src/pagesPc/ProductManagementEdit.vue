<template>
  <el-dialog title="新建产品信息" :visible.sync="dialogFormVisible">
    <el-form
      :model="dynamicValidateForm"
      ref="dynamicValidateForm"
      label-width="150px"
      class="demo-dynamic"
    >
      <el-form-item prop="name" label="产品编号">
        <el-input v-model="dynamicValidateForm.name"></el-input>
      </el-form-item>

      <el-form-item prop="imageUrl" label="产品图样">
        <el-upload
          class="avatar-uploader"
          :action="$httppath"
          :headers="header"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          ><img
            v-if="dynamicValidateForm.imageUrl"
            :src="dynamicValidateForm.imageUrl"
            class="avatar"
          />
          <img
            v-if="dynamicValidateForm.imageUrl"
            :src="dynamicValidateForm.imageUrl"
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
      authorization: "",
      header: {},
      dialogFormVisible: false,
      dynamicValidateForm: {
        name: "",
        imageUrl: "",
      },
    };
  },
  mounted() {
    this.getSession();
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

    //上传物料图片
    handleAvatarSuccess(res, file) {
      // console.log(res)
      this.dynamicValidateForm.imageUrl = res.data.imageUrl;
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
  },
};
</script>

<style lang="scss" scoped>
@import "../../static/css/upLoadFile.scss";
</style>