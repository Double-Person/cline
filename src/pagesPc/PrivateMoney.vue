<template>
  <div>
    <div class="nav-title">客户私款查询</div>
    <div class="sub-title">
      <div>
        <span class="active">客户私款查询</span>
        <el-button type="primary" class="btn"
          >新增<i class="el-icon-plus el-icon--right"></i
        ></el-button>
      </div>
      <div class="search">
        <div class="label">客户姓名：</div>
        <el-input v-model="userName" placeholder="请输入内容"></el-input>
        <el-button type="primary" class="btn">查找</el-button>
      </div>
    </div>

    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="date" width="100" label="序号"> </el-table-column>
      <el-table-column prop="date" width="100" label="客户姓名">
      </el-table-column>
      <el-table-column prop="name" label="型号"> </el-table-column>
      <el-table-column prop="name" label="颜色"> </el-table-column>
      <el-table-column prop="name" label="模具费用"> </el-table-column>
      <el-table-column prop="name" label="单价"> </el-table-column>
      <el-table-column prop="name" label="MOQ"> </el-table-column>

      <el-table-column prop="name" label="合同编号"> </el-table-column>

      <el-table-column width="100" label="加工规格图">
        <template slot-scope="scope">
          <div class="drawing" @click="drawings(scope.$index, scope.row)">
            加工图纸
          </div>
        </template>
      </el-table-column>

      <el-table-column width="150" label="编辑">
        <template slot-scope="scope">
          <div class="drawing edit" @click="drawings(scope.$index, scope.row)">
            修改
          </div>
        </template>
      </el-table-column>
    </el-table>


    <private-money-edit ref="privateMoneyEdit" />
  </div>
</template>

<script>
import PrivateMoneyEdit from './PrivateMoneyEdit.vue';
export default {
  components: { PrivateMoneyEdit },
  data() {
    return {
      userName: "",
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
      ],
    };
  },

  methods: {
    drawings(index, row) {
      console.log(index, row);
      this.$refs.privateMoneyEdit.openDialo()
    },
  },
};
</script>

<style scoped lang="scss">
@import '../../static/css/common.scss';
</style>