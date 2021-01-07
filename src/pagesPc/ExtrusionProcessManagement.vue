<template>
  <div class="warp">
    <div class="nav-title">挤出进程管理</div>
    <div class="sub-title">
      <div>
        <span class="active">挤出进程管理</span>
        <el-button type="primary" class="btn"
          >新增<i class="el-icon-plus el-icon--right"></i
        ></el-button>
      </div>
    </div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="date" width="100" label="日期"> </el-table-column>
      <el-table-column prop="date" width="100" label="订单流水号">
      </el-table-column>
      <el-table-column prop="name" label="客户"> </el-table-column>
      <el-table-column prop="name" label="订单号"> </el-table-column>
      <el-table-column prop="name" label="物料型号"> </el-table-column>
      <el-table-column prop="name" label="长度"> </el-table-column>
      <el-table-column prop="name" label="订单数量"> </el-table-column>

      <el-table-column prop="name" label="已经加工"> </el-table-column>

      <el-table-column width="100" label="加工规格图">
        <template slot-scope="scope">
          <div class="drawing" @click="drawings(scope.$index, scope.row)">
            加工图纸
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="name" label="是否首件确认"> </el-table-column>
      <el-table-column prop="name" label="加工用时"> </el-table-column>
      <el-table-column prop="name" label="加工顺序"> </el-table-column>

      <el-table-column fixed="right" width="150" label="操作">
        <template slot-scope="scope">
          <div class="drawings">
            <div
              class="drawing edit"
              @click="drawings(scope.$index, scope.row)"
            >
              编辑
            </div>
            <div
              class="drawing start"
              @click="drawings(scope.$index, scope.row)"
            >
              开始
            </div>
            <div
              class="drawing statement"
              @click="drawings(scope.$index, scope.row)"
            >
              结单
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <process-management-edit ref="processEdit" />
  </div>
</template>

<script>
import ProcessManagementEdit from "./ProcessManagementEdit.vue";
export default {
  components: { ProcessManagementEdit },
  name: "ExtrusionProcessManagement",
  data() {
    return {
      selectRow: {},
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
      this.selectRow = row;
      this.$refs.processEdit.openDialo();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../static/css/common.scss";
</style>