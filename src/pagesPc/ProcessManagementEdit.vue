<template>
  <el-dialog title="" :visible.sync="dialogFormVisible">
    <el-form
      :model="dynamicValidateForm"
      ref="dynamicValidateForm"
      label-width="150px"
      class="demo-dynamic"
    >
      <el-form-item prop="ordEndTime" label="订单交期">
        <el-date-picker
          disabled
          type="date"
          placeholder="选择日期"
          v-model="dynamicValidateForm.ordEndTime"
          style="width: 100%"
        ></el-date-picker>
      </el-form-item>

      <el-form-item prop="customer" label="名称">
        <el-input disabled v-model="dynamicValidateForm.customer"></el-input>
      </el-form-item>
      <el-form-item
        prop="orderNo"
        label="订单号"
        :rules="[{ required: true, message: '请输入订单号', trigger: 'blur' }]"
      >
        <el-input v-model="dynamicValidateForm.orderNo"></el-input>
      </el-form-item>
      <el-form-item
        prop="matter"
        label="材料型号"
        :rules="[
          { required: true, message: '请输入材料型号', trigger: 'blur' },
        ]"
      >
        <el-input v-model="dynamicValidateForm.matter"></el-input>
      </el-form-item>

      <el-form-item
        class="add-row"
        v-for="(domain, index) in dynamicValidateForm.details"
        label=" "
        :key="domain.key"
        :prop="'details.' + index + '.num'"
        :rules="{
          required: true,
          message: '数量不能为空',
          trigger: 'blur',
        }"
      >
        <div>
          <span class="custom-label">长度 {{ index + 1 }}</span>
          <el-input style="width: 200px" v-model="domain.length"></el-input>
          数量：
          <el-input style="width: 200px" v-model="domain.num"></el-input>
          <el-button @click.prevent="removeDomain(domain)" v-if="dynamicValidateForm.details.length > 1">删除</el-button>
          <el-button @click.prevent="addDomain" v-if="index == 0"
            >新增</el-button
          >
        </div>
        <div @click="checkIndex = index">
          <span class="custom-label">加工规格图</span>
          <el-upload
            class="avatar-uploader"
            :action="$httppath"
            :headers="header"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            ><img v-if="domain.imgUrl" :src="domain.imgUrl" class="avatar" />

            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
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
        details: [
          {
            id: 0,
            length: "",
            num: "",
            imgUrl: "",
          },
        ],
        ordEndTime: "",
        customer: "",
        orderNo: "",
        matter: "",
        id: "",
      },
    };
  },
  mounted() {
    this.getSession();
  },
  methods: {
    checkisNull() {
      let { details } = this.dynamicValidateForm;
      for(let i = 0; i < details.length; i++) {
        let obj = details[i];
       let list = Object.values(obj);
       let [id, leng, num, imgUrl] = list;
       if(leng == '') {
         this.$message.error(`第${i + 1}次长度不能为空`);
         return 'empt';
       }
       if(num == '') {
         this.$message.error(`第${i + 1}次数量不能为空`);
          return 'empt';
       }
       if(imgUrl == '') {
         this.$message.error(`第${i + 1}次加工规格图不能为空`);
          return 'empt';
       }
 
      
      }
    },
    // 查询详情：/api/process/findProcessById     参数：id（进程ID）
    findProcessById(id) {
      this.$http.get("/api/process/findProcessById", { id }).then((res) => {
        if (res.code == 1000) {
          this.dynamicValidateForm = res.data;
          if (!res.data.details.length) {
            this.dynamicValidateForm.details = [
              {
                id: 0,
                length: "",
                num: "",
                imgUrl: "",
              },
            ];
          }
          // let { customer, ordEndTime, id, matter, orderNo } = res.data;
          // this.dynamicValidateForm.customer = customer;
          // this.dynamicValidateForm.id = id;
          // this.dynamicValidateForm.ordEndTime = ordEndTime;
          // this.dynamicValidateForm.matter = matter;
          // this.dynamicValidateForm.orderNo = orderNo;
        }
      });
    },
    openDialo(id) {
      this.dialogFormVisible = true;
      this.findProcessById(id);
    },
    submitForm(formName) {      
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(this.checkisNull() == 'empt') {
            return false;
          }
          /**
         *   修改详情：/api/process/updateProcess     参数：id（进程ID） orderNo（订单号） matter（物料型号）  details（详情列表）{
                                                     id(详情ID，修改传ID，新增传0)  length（长度） num（数量）
         */

          this.$http
            .post("/api/process/updateProcess", { ...this.dynamicValidateForm })
            .then((res) => {
              // console.log(this.query.time)
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
            })
            .catch((err) => this.$message.error("失败"));
        } else {
          return false;
        }
      });
    },

    // 删除详情
    _deleteDetail(id) {
      this.$http.get("/api/processDetail/deleteDetail", { id }).then((res) => {
        if (res.code == 1000) {
          this.$message({
            message: "删除成功",
            type: "success",
          });
          this.$emit("success");
        } else {
          this.$message.error("删除失败");
        }
      });
    },

    removeDomain(item) {
      var index = this.dynamicValidateForm.details.indexOf(item);
      if (index !== -1) {
        this.dynamicValidateForm.details.splice(index, 1);
        if (item.id != 0) {
          this._deleteDetail(item.id);
        }
      }
    },
    addDomain() {
      this.dynamicValidateForm.details.push({
        id: 0,
        length: "",
        num: "",
        imgUrl: "",
        key: Date.now(),
      });
    },

    //上传物料图片
    handleAvatarSuccess(res, file) {
      this.dynamicValidateForm.details[this.checkIndex].imgUrl =
        res.data.imageUrl;
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