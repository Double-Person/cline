<template>
  <div class="warp">
    <div class="nav-title">挤出进程管理</div>
    <div class="sub-title">
      <div>
        <span class="active">挤出进程管理</span>
        <el-button type="primary" class="btn" @click="drawings({})"
          >新增<i class="el-icon-plus el-icon--right"></i
        ></el-button>
      </div>
      <div class="search">
        <div class="label">模具号：</div>
        <el-input v-model="searchText" placeholder="请输入内容" @keyup.enter="getList"></el-input>
        <el-button type="primary" class="btn" @click="getList">查找</el-button>
      </div>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      :row-class-name="tableRowClassName"
    >
      <el-table-column prop="createTime" width="180" label="日期">
      </el-table-column>
      <el-table-column prop="orderNo" width="100" label="订单流水号">
      </el-table-column>
      <el-table-column prop="model" label="模具号"> </el-table-column>
      <el-table-column prop="color" label="颜色"> </el-table-column>
      <el-table-column prop="material" label="材质"> </el-table-column>
      <el-table-column prop="length" label="长度"> </el-table-column>
      <el-table-column prop="num" label="订单数量"> </el-table-column>

      <el-table-column prop="yield" width="100" label="实际生产量">
      </el-table-column>
      <el-table-column prop="transm" label="透光比"> </el-table-column>

      <el-table-column width="100" label="加工规格图">
        <template slot-scope="scope">
          <div class="drawing" @click="previewImg(scope.row.imgUrl)">
            加工图纸
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="name" label="产量">
        <template slot-scope="scope">
          <div class="drawings">
            <!-- orderNo -->
            <el-button
              type="primary"
              size="mini"
              class="production-input"
              @click="productionInput(scope.row.id)"
              >产量录入</el-button
            >
          </div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" width="80" label="生产顺序">
        <template slot-scope="scope">
          <div class="drawings">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-top"
              circle
              @click="moveOrder(scope.row.id, 1)"
            ></el-button>
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-bottom"
              circle
              @click="moveOrder(scope.row.id, 2)"
            ></el-button>
          </div>
        </template>
      </el-table-column>

      <el-table-column fixed="right" width="150" label="操作">
        <template slot-scope="scope">
          <div class="drawings">
            <div class="drawing edit" @click="drawings(scope.row)">编辑</div>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑 -->
    <extrusion-process-management-edit ref="extrusionEdit" @success="getList" />
    <extrusion-process-management-logs ref="extrusionLogs" />

    <preview-picture ref="previewPicture" />
  </div>
</template>

<script>
import ExtrusionProcessManagementEdit from "./ExtrusionProcessManagementEdit.vue"; // 编辑
import ExtrusionProcessManagementLogs from "./ExtrusionProcessManagementLogs.vue"; // 产量录入

import PreviewPicture from "../components/PreviewPicture";
export default {
  components: {
    ExtrusionProcessManagementEdit,
    ExtrusionProcessManagementLogs,
    PreviewPicture,
  },
  name: "ExtrusionProcessManagement",
  data() {
    return {
      tableData: [],
      searchText: ''
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 生产数量大于竺于订单数量就将背景置于绿色，
    tableRowClassName({ row, rowIndex }) {
      if (Number.parseInt(row.yield) >= Number.parseInt(row.num)) {
        return "warning-row";
      }
      return "";
    },
    drawings(row) {
      this.$refs.extrusionEdit.openDialo(row);
    },
    // 产量录入
    productionInput(id) {
      this.$refs.extrusionLogs.openDialo(id);
    },
    getList() {
      this.$http.get("/api/squeeze/findSqueezes", {searchText: this.searchText}).then((res) => {
        if (res.code == 1000) {
          this.tableData = res.data;
        } else {
          this.$message.error("获取列表失败");
        }
      })
    },
    // 修改加工顺序：     参数：id（订单ID）；type（修改顺序类型，1上移、2下移）
    moveOrder(id, type) {
      this.$http
        .get("/api/squeeze/updateOrderNum", { id, type })
        .then((res) => {
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
    previewImg(img) {
      this.$refs.previewPicture.previewImg(img);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../static/css/common.scss";
.production-input {
  padding: 0 3px;
  /deep/ span {
    font-size: 12px;
  }
}

.warp {
  /deep/ .el-table .warning-row {
    background: rgb(123, 190, 123);
  }
}
</style>