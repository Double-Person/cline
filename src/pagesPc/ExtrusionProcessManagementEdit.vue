<template>
  <el-dialog title="" :visible.sync="dialogFormVisible">
    <el-form
      :model="dynamicValidateForm"
      ref="dynamicValidateForm"
      label-width="150px"
      class="demo-dynamic"
    >
      <el-form-item prop="time1" label="预计交期">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="dynamicValidateForm.time1"
          style="width: 100%"
        ></el-date-picker>
      </el-form-item>
      <el-form-item prop="time2" label="订单交期">
        <el-date-picker
          disabled
          type="date"
          placeholder="选择日期"
          v-model="dynamicValidateForm.time2"
          style="width: 100%"
        ></el-date-picker>
      </el-form-item>

      <el-form-item prop="name" label="名称">
        <el-input disabled v-model="dynamicValidateForm.name"></el-input>
      </el-form-item>
      <el-form-item prop="orderNum" label="订单号">
        <el-input v-model="dynamicValidateForm.orderNum"></el-input>
      </el-form-item>
      <el-form-item prop="type" label="材料型号">
        <el-input v-model="dynamicValidateForm.type"></el-input>
      </el-form-item>

      <el-form-item
        class="add-row"
        v-for="(domain, index) in dynamicValidateForm.domains"
        :label="'长度' + index"
        :key="domain.key"
        :prop="'domains.' + index + '.value1'"
      >
        <el-input style="width: 200px" v-model="domain.value1"></el-input>
        数量：
        <el-input style="width: 200px" v-model="domain.value2"></el-input>
        <el-button @click.prevent="removeDomain(domain)">删除</el-button>
        <el-button @click.prevent="addDomain" v-if="index == 0"
          >新增域名</el-button
        >
      </el-form-item>

      <el-form-item prop="imageUrl" label="上传加工规格图">
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
        domains: [
          {
            value1: "",
            value2: "",
          },
        ],
        time1: "",
        time2: "2020-11-30",
        name: "",
        orderNum: "",
        type: "",
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
      console.log(this.$parent.selectRow);
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

    removeDomain(item) {
      var index = this.dynamicValidateForm.domains.indexOf(item);
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1);
      }
    },
    addDomain() {
      this.dynamicValidateForm.domains.push({
        value1: "",
        value2: "",
        key: Date.now(),
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
.warp {
  .add-row {
    display: flex;
    align-items: center;
    /deep/ .el-form-item__content {
      margin-left: 0px !important;
    }
  }
  .drawings {
    height: 10px;
    font-size: 9px;
    -webkit-text-size-adjust: none;
    font-family: Microsoft YaHei;
    font-weight: 400;
    text-decoration: underline;
    color: #446cea;
    line-height: 38px;
  }

  .avatar-uploader{
        display: inline-block;
        border: 1px dashed #d9d9d9;
    }
    .avatar-uploader:hover{
        border: 1px dashed #409EFF;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
}
</style>