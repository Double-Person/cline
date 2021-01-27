<template>
  <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
    <el-form
      :model="dynamicValidateForm"
      ref="dynamicValidateForm"
      label-width="150px"
      class="demo-dynamic"
      v-loading="loading"
    >
      <el-form-item
        prop="customerId"
        label="客户名称"
        :rules="[
          { required: true, message: '请选择客户名称', trigger: 'change' },
        ]"
      >
        <!-- <el-input v-model="dynamicValidateForm.customerId"></el-input> -->
        <el-select
          v-model="dynamicValidateForm.customerId"
          placeholder="请选择客户"
        >
          <el-option
            :label="item.name"
            :value="item.customerId"
            v-for="item in customers"
            :key="item.customerId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        prop="productId"
        label="客户型号"
        :rules="[
          { required: true, message: '请选择客户型号', trigger: 'change' },
        ]"
      >
        <!-- <el-input v-model="dynamicValidateForm.productId"></el-input> -->
        <el-select
          v-model="dynamicValidateForm.productId"
          placeholder="请选择客户型号"
        >
          <el-option
            :label="item.productCode"
            :value="item.productId"
            v-for="item in products"
            :key="item.productId"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        prop="productImg"
        label="上传加工规格图"
        :rules="[{ required: true, message: '请上传规格图' }]"
      >
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          :action="$httppath"
          :headers="header"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
           v-loading="imgLoading"
        >
          <img
            v-if="dynamicValidateForm.productImg"
            :src="dynamicValidateForm.productImg"
            class="avatar"
          />

          <i v-if="!dynamicValidateForm.productImg" class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item
        prop="color"
        label="颜色"
        :rules="[{ required: true, message: '颜色不能为空' }]"
      >
        <el-input v-model="dynamicValidateForm.color"></el-input>
      </el-form-item>
      <el-form-item
        prop="mould"
        label="模具费用"
        :rules="[{ required: true, message: '模具费用不能为空' }]"
      >
        <el-input v-model="dynamicValidateForm.mould"></el-input>
      </el-form-item>
      <el-form-item
        prop="price"
        label="单价"
        :rules="[{ required: true, message: '单价不能为空' }]"
      >
        <el-input v-model="dynamicValidateForm.price"></el-input>
      </el-form-item>
      <el-form-item
        prop="moq"
        label="MOQ"
        :rules="[{ required: true, message: 'MOQ不能为空' }]"
      >
        <el-input v-model="dynamicValidateForm.moq"></el-input>
      </el-form-item>
      <el-form-item
        prop="contract"
        label="合同编号"
        :rules="[{ required: true, message: '合同编号不能为空' }]"
      >
        <el-input v-model="dynamicValidateForm.contract"></el-input>
      </el-form-item>
      <el-form-item
        prop="others"
        label="其他说明"
        :rules="[{ required: true, message: '其他说明不能为空' }]"
      >
        <el-input v-model="dynamicValidateForm.others"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('dynamicValidateForm')"
          >提交</el-button
        >
        <el-button @click="resetForm('dynamicValidateForm')"
          >重新输入</el-button
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
      imgLoading: false,
      loading: true,
      dialogTitle: "",
      authorization: "",
      header: {},
      customers: [],
      products: [],
      addUrl: "/api/privateFunds/addPrivateFunds",
      editUrl: "/api/privateFunds/editPrivateFunds",
      dialogFormVisible: false,
      dynamicValidateForm: {
        // privateFundsId: "", //（客户私款ID）；
        customerId: "", //（客户）；
        productId: "", //（产品）；
        productImg: "", //（产品图样）；
        color: "", //（颜色）；
        mould: "", //（模具费用）；
        price: "", //（价格）
        moq: "", //（MOQ）
        contract: "", // （合同编号）；
        others: "", // （其他说明）
      },
    };
  },
  mounted() {
    this.getSession();
  },
  methods: {
    async openDialo(row) {
      this.dialogFormVisible = true;
      this.dynamicValidateForm = row;
      if (row.privateFundsId) {
        this.dialogTitle = "编辑客户私款基本信息管理";
      } else {
        this.dialogTitle = "新建客户私款基本信息管理";
      }
      await this.findCustomers();
      await this.findProducts();
      this.loading = false;
    },
    /**
     * 新增接口：/api/privateFunds/addPrivateFunds
     *  参数：customerId（客户）；productId（产品）；productImg（产品图样）；color（颜色）；mould（模具费用）；price（价格）；moq（MOQ）；contract（合同编号）；others（其他说明）
     */

    /**
     * 编辑接口：/api/privateFunds/addPrivateFunds
     *  参数：privateFundsId（客户私款ID）；customerId（客户）；productId（产品）；productImg（产品图样）；color（颜色）；mould（模具费用）；price（价格）；moq（MOQ）；
     * contract（合同编号）；others（其他说明）
     */
    editForm() {
      let url = "";
      let {
        privateFundsId,
        customerId,
        productId,
        productImg,
        color,
        mould,
        price,
        moq,
        contract,
        others,
      } = this.dynamicValidateForm;
      let parmas = {
        customerId,
        productId,
        productImg,
        color,
        mould,
        price,
        moq,
        contract,
        others,
      };
      if (this.dynamicValidateForm.privateFundsId) {
        url = this.editUrl;
        parmas.privateFundsId = privateFundsId;
      } else {
        url = this.addUrl;
      }

      this.$http.get(url, parmas).then((res) => {
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
      }).catch(() => this.$message.error("系统错误"))
    },
    /**
     * 客户列表接口：/api/customer/findCustomers     参数：searchText（）搜索条件
     */
    findCustomers() {
      this.$http
        .get("/api/customer/findCustomers", { searchText: "" })
        .then((res) => {
          console.log(res);
          if (res.code == 1000) {
            this.customers = res.data;
          }
        })
        .catch((err) => {});
    },
    /**
     * 产品列表接口：/api/product/findProducts
     */
    findProducts() {
      this.$http
        .get("/api/product/findProducts", {})
        .then((res) => {
          console.log(res);
          if (res.code == 1000) {
            this.products = res.data;
          }
        })
        .catch((err) => {});
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          return false;
        }
        this.editForm();
      });
    },
    resetForm(formName) {
      try {
        this.$refs[formName].resetFields();
      } catch (error) {}
      this.dynamicValidateForm = {
        customerId: "", //（客户）；
        productId: "", //（产品）；
        productImg: "", //（产品图样）；
        color: "", //（颜色）；
        mould: "", //（模具费用）；
        price: "", //（价格）
        moq: "", //（MOQ）
        contract: "", // （合同编号）；
        others: "", // （其他说明）
      };
    },

    //上传物料图片
    handleAvatarSuccess(res, file) {
      // console.log(res)
      this.dynamicValidateForm.productImg = res.data.imageUrl;
      this.imgLoading = false;
      console.log(this.dynamicValidateForm.productImg)
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
      this.imgLoading = true;
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

.avatar-uploader {
  display: inline-block;
  border: 1px dashed #d9d9d9;
}
.avatar-uploader:hover {
  border: 1px dashed #409eff;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
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
</style>