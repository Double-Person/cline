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
            <el-popconfirm
              confirm-button-text="确定"
              cancel-button-text="取消"
              icon="el-icon-info"
              icon-color="red"
              title="你确定删除吗？"
              @confirm="confirm(scope.row.customerId)"
            >
            <!--   -->
              <div slot="reference" class="drawing del">
                <!-- @click="delList(scope.row.customerId)" -->
                删除
              </div>
            </el-popconfirm>
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
          if (res.code == 1000) {
            this.tableData = res.data;
          } else {
            this.$message.error("系统错误");
          }
        })
        .catch(() => this.$message.error("系统错误"));
    },
    confirm(customerId) {
      console.log(customerId)
      // this.delList(customerId);
    },
    delList(customerId) {
      this.$http
        .get("/api/customer/deleteCustomer", { customerId })
        .then((res) => {
          if (res.code == 1000) {
            this.$message({
              message: "删除成功",
              type: "success",
            });
            this.getList();
          } else {
            this.$message.error("删除失败");
          }
        })
        .catch(() => this.$message.error("删除失败"));
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../static/css/common.scss";
</style>