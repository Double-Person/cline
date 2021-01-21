<template>
  <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
    <el-form
      :model="dynamicValidateForm"
      ref="dynamicValidateForm"
      label-width="150px"
      class="demo-dynamic"
    >
      <el-form-item
        prop="createTime"
        label="日期"
        v-if="dynamicValidateForm.id"
      >
        <el-date-picker
          disabled
          type="date"
          placeholder="选择日期"
          v-model="dynamicValidateForm.createTime"
          style="width: 100%"
        ></el-date-picker>
      </el-form-item>

      <el-form-item
        prop="orderNo"
        label="订单流水号"
        v-if="dynamicValidateForm.id"
      >
        <el-input disabled v-model="dynamicValidateForm.orderNo"></el-input>
      </el-form-item>

      <el-form-item
        prop="model"
        label="模具号"
        :rules="[{ required: true, message: '请输入模具号', trigger: 'blur' }]"
      >
        <el-input v-model="dynamicValidateForm.model"></el-input>
      </el-form-item>
      <el-form-item
        label="颜色"
        prop="clolor"
        :rules="[{ required: true, message: '请选择颜色', trigger: 'change' }]"
      >
        <el-select
          v-model="dynamicValidateForm.clolor"
          placeholder="请选择颜色"
        >
          <el-option
            :label="item"
            :value="item"
            v-for="item in clolors"
            :key="item"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="材质"
        prop="material"
        :rules="[{ required: true, message: '请选择材质', trigger: 'change' }]"
      >
        <el-select
          v-model="dynamicValidateForm.material"
          placeholder="请选择材质"
        >
          <el-option
            :label="item"
            :value="item"
            v-for="item in materials"
            :key="item"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        prop="length"
        label="长度"
        :rules="[{ required: true, message: '请输入长度', trigger: 'blur' }]"
      >
        <el-input v-model="dynamicValidateForm.length"></el-input>
      </el-form-item>
      <el-form-item
        prop="num"
        label="数量"
        :rules="[{ required: true, message: '请输入数量', trigger: 'blur' }]"
      >
        <el-input v-model="dynamicValidateForm.num"></el-input>
      </el-form-item>
      <el-form-item
        prop="transm"
        label="透光比"
        :rules="[{ required: true, message: '请输入透光比', trigger: 'blur' }]"
      >
        <el-input v-model="dynamicValidateForm.transm"></el-input>
      </el-form-item>

      <el-form-item prop="imgUrl" label="上传加工规格图" :rules="[{ required: true, message: '规格图不能为空', trigger: 'change' }]">
        <el-upload
          class="avatar-uploader"
          :action="$httppath"
          :headers="header"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          ><img
            v-if="dynamicValidateForm.imgUrl"
            :src="dynamicValidateForm.imgUrl"
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
      dialogTitle: "新建订单基本信息",
      clolors: ["透明", "乳白", "黑色半透", "乳白半透", "浓白"],
      materials: ["PC", "PC磨砂", "PMMA", "pvc"],
      dynamicValidateForm: {
        id: null,
        createTime: "",
        orderNo: "",
        model: "", //（磨具号）
        clolor: "", //（颜色）
        color: '',
        material: "", //（材质）
        length: "", //（长度）
        num: "", //（数量）
        transm: "", //（透光比）
        imgUrl: "", //（产品规格图）
      },
    };
  },
  mounted() {
    this.getSession();
  },
  methods: {
    openDialo(opt) {
      this.dialogFormVisible = true;
      console.log(opt);
      if (opt.id) {
        this.dynamicValidateForm.id = opt.id;
        this.dialogTitle = "编辑订单基本信息";
        this.findProcessById(opt.id);
      } else {
        this.dialogTitle = "新建订单基本信息";
      }
    },
    /**
     * 编辑订单：/api/squeeze/updateOrder
参数：model（磨具号）
clolor（颜色）
material（材质）
length（长度）
num（数量）
transm（透光比）
imgUrl（产品规格图）
     */
    _updateOrder() {
      this.$http
        .post("/api/squeeze/updateOrder", { ...this.dynamicValidateForm })
        .then((res) => {
          this.showMsg(res);
        })
        .catch((err) => this.$message.error("失败"));
    },

    /**
     * 创建订单：/api/squeeze/createOrder
参数：model（磨具号）
clolor（颜色）
material（材质）
length（长度）
num（数量）
transm（透光比）
imgUrl（产品规格图）
     */
    _createOrder() {
      this.$http
        .post("/api/squeeze/createOrder", { ...this.dynamicValidateForm })
        .then((res) => {
          this.showMsg(res);
        })
        .catch((err) => this.$message.error("失败"));
    },
    showMsg(res) {
      if (res.code == 1000) {
        this.$message({
          message: "成功",
          type: "success",
        });
        this.dialogFormVisible = false;
        this.$emit("success");
      } else {
        this.$message.error("失败");
      }
    },
    // 根据ID查询：/api/squeeze/findOrderById     参数：id（订单ID）
    findProcessById(id) {
      this.$http.get("/api/squeeze/findOrderById", { id }).then((res) => {
        if (res.code == 1000) {
          this.dynamicValidateForm = res.data;
          this.dynamicValidateForm.clolor = res.data.color
        }
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          return false;
        }
        if (this.dynamicValidateForm.id) {
          this._updateOrder();
        } else {
          this._createOrder();
        }
      });
    },

    //上传物料图片
    handleAvatarSuccess(res, file) {
      // console.log(res)
      this.dynamicValidateForm.imgUrl = res.data.imageUrl;
    },
    //图片大小限制
    beforeAvatarUpload(file) {
      const isLt5M = file.size / 1024 / 1024 < 5;

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
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../static/css/upLoadFile.scss";
.warp {
  .add-row {
    display: flex;
    align-items: center;
    /deep/ .el-form-item__content {
      margin-left: 0px !important;
    }
  }
}
</style>