<template>
  <div>
    <div class="nav-title">客户管理</div>
    <div class="sub-title">
      <div>
        <span class="active">客户管理</span>
        <el-button type="primary" class="btn" @click="drawings({})"
          >新增<i class="el-icon-plus el-icon--right"></i
        ></el-button>
      </div>
      <div class="search">
        <div class="label">查找：</div>
        <el-input v-model="searchText" placeholder="请输入内容"></el-input>
        <el-button type="primary" class="btn" @click="getList">查找</el-button>
      </div>
    </div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="name" label="客户姓名："> </el-table-column>
      <el-table-column prop="contacts" label="联络人"> </el-table-column>
      <el-table-column prop="phone" label="联系电话"> </el-table-column>
      <el-table-column prop="address" label="客户地址"> </el-table-column>
      <el-table-column prop="settlement" label="结算方式"> </el-table-column>
      <el-table-column width="150" label="操作">
        <template slot-scope="scope">
          <div class="drawings">
            <div class="drawing edit" @click="drawings(scope.row)">修改</div>
            <div class="drawing del">删除</div>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <customer-management-edit ref="customerManagementEdit" @success="getList" />
  </div>
</template>

<script>
import CustomerManagementEdit from "./CustomerManagementEdit.vue";
export default {
  components: { CustomerManagementEdit },
  name: "CustomerManagement",
  data() {
    return {
      searchText: "",
      tableData: [],
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    drawings(row) {
      this.$refs.customerManagementEdit.openDialo(row);
    },
    /**
     * 列表接口：/api/customer/findCustomers     参数：searchText（）搜索条件
     */
    // 列表查询：
    getList() {
      this.$http
        .get("/api/customer/findCustomers", { searchText: this.searchText })
        .then((res) => {
          console.log(res);
          if (res.code == 1000) {
            this.tableData = res.data;
          }
        })
        .catch((err) => {});
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../static/css/common.scss";
</style>