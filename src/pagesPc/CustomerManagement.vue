<template>
  <div>
    <div class="sub-title">
      <div>
        <span class="active">客户管理</span>
        <el-button type="primary" class="btn"
          >新增<i class="el-icon-plus el-icon--right"></i
        ></el-button>
      </div>
      <div class="search">
        <div class="label">查找：</div>
        <el-input v-model="userName" placeholder="请输入内容"></el-input>
        <el-button type="primary" class="btn">查找</el-button>
      </div>
    </div>

    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="date" label="客户姓名："> </el-table-column>
      <el-table-column prop="date" label="联络人">
      </el-table-column>
      <el-table-column prop="name" label="联系电话"> </el-table-column>
      <el-table-column prop="name" label="客户地址"> </el-table-column>
      <el-table-column prop="name" label="结算方式"> </el-table-column>
      <el-table-column width="150" label="操作">
        <template slot-scope="scope">
          <div class="drawings">
              <div class="drawing edit" @click="drawings(scope.$index, scope.row)">
            修改
          </div>
          <div class="drawing del" @click="drawings(scope.$index, scope.row)">
            删除
          </div>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <customer-management-edit ref="customerManagementEdit" />
  </div>
</template>

<script>
import CustomerManagementEdit from './CustomerManagementEdit.vue';
export default {
  components: { CustomerManagementEdit },
  name: "CustomerManagement",
  data() {
    return {
        userName: '',
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
      this.$refs.customerManagementEdit.openDialo()
    },
  },
};
</script>

<style scoped lang="scss">
@import '../../static/css/common.scss';
</style>