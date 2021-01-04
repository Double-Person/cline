<template>
  <div>
    <div class="sub-title">
      <div>
        <span class="active">产品管理</span>
        <el-button type="primary" class="btn"
          >新增<i class="el-icon-plus el-icon--right"></i
        ></el-button>
      </div>
    </div>

    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="date" label="序号"> </el-table-column>
      <el-table-column prop="date" label="产品编号"> </el-table-column>
      <el-table-column prop="name" label="产品样图">
         <template slot-scope="scope">
          <div class="drawings">
            <div
              class="drawing edit"
              @click="drawings(scope.$index, scope.row)"
            >
              点击查看
            </div>
          </div>
        </template>
      </el-table-column>

      <el-table-column width="150" label="编辑管理">
        <template slot-scope="scope">
          <div class="drawings">
            <div
              class="drawing edit"
              @click="drawings(scope.$index, scope.row)"
            >
              编辑
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <product-management-edit ref="productManagementEdit" />
  </div>
</template>

<script>
import ProductManagementEdit from './ProductManagementEdit.vue';
export default {
  components: { ProductManagementEdit },
  name: "ProductManagement",
  data() {
    return {
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
      this.$refs.productManagementEdit.openDialo()
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../static/css/common.scss";
</style>