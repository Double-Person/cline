<template>
  <div class="warp">
    <div class="nav-title">加工明细清单</div>
    
    <div class="sub-title">
      <div>
        <span class="active">加工明细清单</span>
        
      </div>
      <div class="search">
        <div class="label">搜索：</div>
        <el-input v-model="searchText" placeholder="请输入客户/物料型号内容" @keyup.enter="getList"></el-input>
        <el-button type="primary" class="btn" @click="getList">查找</el-button>
      </div>
    </div>
    <el-table
      :data="tableData"
      border
      :span-method="objectSpanMethod"
      :row-class-name="tableRowClassName"
      style="width: 100%"
    >
      <el-table-column prop="ordEndTime" width="180" label="订单日期"> </el-table-column>
      <el-table-column prop="customer" label="客户"> </el-table-column>
      <el-table-column prop="orderNo" label="订单号"> </el-table-column>
      <el-table-column prop="matter" label="物料型号"> </el-table-column>
      <el-table-column prop="length" label="长度"> </el-table-column>
      <el-table-column prop="num" label="订单数量"> </el-table-column>

      <el-table-column prop="endNum" label="已经加工">
        <template slot-scope="scope">
          <div @click="editNum(scope.row)" class="drawing"> {{ scope.row.endNum }} </div>
        </template>
      </el-table-column>

      <el-table-column width="100" label="加工规格图">
        <template slot-scope="scope">
          <div class="drawing" @click="previewImg(scope.row.imgUrl)"> 加工图纸 </div>
        </template>
      </el-table-column>

      <el-table-column prop="isFirstCheck" width="150" label="是否首件确认">
        <template slot-scope="scope">
          <div class="drawings" v-if="scope.row.isFirstCheck === 'N'" key="isFirstCheck" >
            <div class="drawing edit" @click="firstConfirm(scope.row)"> 确认 </div>
          </div>
          <div v-else key="isFirstCheck">
            {{ scope.row.isFirstCheck === "N" ? "暂未确认" : "已确认" }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="useTime" width="150" label="加工用时">
      </el-table-column>
      <el-table-column label="加工顺序">
        <template slot-scope="scope">
          <div class="drawings">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-top"
              circle
              @click="moveOrder(scope.row.processId, 1)"
            ></el-button>
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-bottom"
              circle
              @click="moveOrder(scope.row.processId, 2)"
            ></el-button>
          </div>
        </template>
      </el-table-column>

      <el-table-column fixed="right" width="50" label="操作">
        <template slot-scope="scope">
          <div class="drawings">
            <div class="drawing edit" @click="drawings(scope.row)"> 编辑 </div>
          </div>
        </template>
      </el-table-column>

      <el-table-column fixed="right" width="100" label="操作">
        <template slot-scope="scope">
          <div class="drawings">
            <div class="drawing start" @click="start(scope.row)">开始</div>
            <div class="drawing statement" @click="statement(scope.row)"> 结单 </div>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑 -->
    <process-management-edit ref="processEdit" @success="getList" />
    <!-- 修改加工数量 -->
    <process-management-num-edit ref="processNumEdit" @success="getList" />
    <!-- 图片预览 -->
    <preview-picture ref="previewPicture" />
  </div>
</template>

<script>
import ProcessManagementEdit from "./ProcessManagementEdit.vue";
import ProcessManagementNumEdit from "./ProcessManagementNumEdit.vue";
import PreviewPicture from "../components/PreviewPicture";
export default {
  components: {
    ProcessManagementEdit,
    ProcessManagementNumEdit,
    PreviewPicture,
  },
  name: "ProcessManagement",
  data() {
    return {
      searchText: '',
      tableData: [],
    };
  },
  created() {
    // status （0未开始、1已开始、2已结束）
    this.getList();
  },
  methods: {
    // 生产数量大于竺于订单数量就将背景置于绿色，
    tableRowClassName({ row, rowIndex }) {
      if (Number.parseInt(row.endNum) >= Number.parseInt(row.num)) {
        return "warning-row";
      }
      return "";
    },
    // 编辑数量
    editNum(row) {
      if (row.status == 1) {
        this.$refs.processNumEdit.openDialo(row.endNum, row.detailId);
      }else if (row.status == 0) {
        this.$message.error("先开始任务");
      }else if (row.status == 2) {
        this.$message.error("任务已结束");
      }
    },
    // 编辑
    drawings(row) {
      this.$refs.processEdit.openDialo(row.processId);
    },
    // 查询加工进程列表：/api/process/findProcesses   参数：无
    getList() {
      this.$http.get("/api/process/findProcesses", {searchText: this.searchText}).then((res) => {
        if (res.code == 1000) {
          this.tableData = res.data;
          this.setrowspans()
        } else {
          this.$message.error("获取列表失败");
        }
      });
    },
  
    // 修改加工顺序：/api/process/updateProcessOrder     参数：id（加工进程ID）；type（修改顺序类型，1上移、2下移）
    moveOrder(id, type) {
      this.$http
        .get("/api/process/updateProcessOrder", { id, type })
        .then((res) => {
          this.showMsg(res);
        });
    },
    // 首件确认：/api/processDetail/firstCheck     参数：id（详情ID）
    firstConfirm(row) {
      // 1 首件确认
      let { detailId, status } = row;
      if (status == 0) {
        this.$message.error("请先开始任务");
        return false;
      }
      if (status == 2) {
        this.$message.error("任务已结束");
        return false;
      }
      
      this.$http.get("/api/processDetail/firstCheck", { id: detailId }).then((res) => {
        this.showMsg(res);
      });
    },
    // 开始：/api/processDetail/start     参数：id（详情ID）
    start(row) {
      let { detailId, status } = row;
      if (status == 1) {
        this.$message.error("任务已开始");
        return false;
      }
      if (status == 2) {
        this.$message.error("任务已结束");
        return false;
      }
      this.$http
        .get("/api/processDetail/start", { id: detailId })
        .then(res => {
          this.showMsg(res);
        });
    },
    // 结单：/api/processDetail/end     参数：id（详情ID）
    statement(row) {
      let { detailId, status } = row;
      if (status == 0) {
        this.$message.error("任务还未开始");
        return false;
      }
      if (status == 2) {
        this.$message.error("任务已结束");
        return false;
      }
      this.$http.get("/api/processDetail/end", { id: detailId }).then((res) => {
        this.showMsg(res);
      });
    },
    showMsg({ code, msg }) {
      if (code == 1000) {
        this.$message({
          message: "成功",
          type: "success",
        });
        this.getList();
      } else {
        this.$message.error(msg || "失败");
      }
    },
    // 图片预览
    previewImg(img) {
      this.$refs.previewPicture.previewImg(img);
    },

    setrowspans() {
      // 先给所有的数据都加一个v.rowspan = 1
      this.tableData.forEach(v => { v.rowspan = 1 })
      for (let i = 0; i < this.tableData.length; i++) {
        for (let j = i + 1; j < this.tableData.length; j++) {
          if (this.tableData[i].processId === this.tableData[j].processId) {
            this.tableData[i].rowspan++
            this.tableData[j].rowspan--
          }
        }
        // 这里跳过已经重复的数据
        i = i + this.tableData[i].rowspan - 1
      }
    },

    // 跨行跨列
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      const includesCol = [0, 1, 2, 3, 10, 11];
      if (includesCol.includes(columnIndex)) {
        return {
          rowspan: row.rowspan,
          colspan: 1,
        };
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../static/css/common.scss";
.warp {
  /deep/ .el-table .warning-row {
    background: rgb(123, 190, 123);
  }
}
</style>