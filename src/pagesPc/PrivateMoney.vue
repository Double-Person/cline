<template>
  <div>
    <div class="nav-title">客户私款查询</div>
    <div class="sub-title">
      <div>
        <span class="active">客户私款查询</span>
        <el-button type="primary" class="btn" @click="drawings({})"
          >新增<i class="el-icon-plus el-icon--right"></i
        ></el-button>
      </div>
      <div class="search">
        <div class="label">客户姓名：</div>
        <el-input v-model="customerName" placeholder="请输入内容" @keyup.enter="getList"></el-input>
        <el-button type="primary" class="btn" @click="getList">查找</el-button>
      </div>
    </div>

    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="date" label="序号"  type="index">
      </el-table-column>
      <el-table-column prop="customerName" label="客户姓名">
      </el-table-column>
      <el-table-column prop="productCode" label="型号" width="200"> </el-table-column>
      <el-table-column prop="color" label="颜色"> </el-table-column>
      <el-table-column prop="mould" label="模具费用"> </el-table-column>
      <el-table-column prop="price" label="单价"> </el-table-column>
      <el-table-column prop="moq" label="MOQ"> </el-table-column>

      <el-table-column prop="contract" width="200" label="合同编号"> </el-table-column>
      <el-table-column prop="others" width="200" label="其他说明" show-overflow-tooltip> </el-table-column>

      <el-table-column width="100" label="加工规格图">
        <template slot-scope="scope">
          <div class="drawing" @click="previewPicture(scope.row.productImg)">
            加工图纸
          </div>
        </template>
      </el-table-column>

      <el-table-column width="100" label="编辑" fixed="right">
        <template slot-scope="scope">
          <div class="drawing edit" @click="drawings(scope.row)">
            修改
          </div>
        </template>
      </el-table-column>
    </el-table>


    <private-money-edit ref="privateMoneyEdit" @success="getList" />
    <preview-picture ref="previewPicture" />
  </div>
</template>

<script>
import PreviewPicture from '../components/PreviewPicture.vue';
import PrivateMoneyEdit from './PrivateMoneyEdit.vue';
export default {
  components: { PrivateMoneyEdit, PreviewPicture },
  data() {
    return {
      customerName: "",
      tableData: [],
    };
  },

  mounted() {
    this.getList()
  },

  methods: {
    drawings(row) {
      this.$refs.privateMoneyEdit.openDialo(row)
    },
    previewPicture(productImg) {
      this.$refs.previewPicture.previewImg(productImg)
    },
    // /api/privateFunds/findPrivateFunds     参数：customerName（客户名称）
    // 列表查询：
    getList() {
      this.$http
        .get("/api/privateFunds/findPrivateFunds", { customerName: this.customerName })
        .then((res) => {
          if (res.code == 1000) {
            this.tableData = res.data
          }
          
        })
        .catch((err) => {});
    }
  },
};
</script>

<style scoped lang="scss">
@import '../../static/css/common.scss';
</style>