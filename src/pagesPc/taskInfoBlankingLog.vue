<template>
  <div>
    <el-dialog title="切料日志" :visible.sync="dialogFormVisible">
      <el-button size="mini" type="primary" @click="handleEdit({})"
              >新增</el-button>
      <el-table :data="list" stripe height="500" style="width: 100%">
        <el-table-column prop="time" label="日期">
        </el-table-column>
        <!-- <el-table-column prop="num" label="数量"> </el-table-column> -->
        <el-table-column prop="des" label="备注" show-overflow-tooltip> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    
  <task-info-blanking-log-add-edit ref="taskInfoBlankingLogAddEdit" @success="findCuttingLogs" />
  </div>
</template>

<script>
import taskInfoBlankingLogAddEdit from './taskInfoBlankingLogAddEdit.vue';
export default {
  components: { taskInfoBlankingLogAddEdit },
  data() {
    return {
      dialogFormVisible: false,
      tasksId: "",
      list: [],
      formLabelWidth: "120px",
    };
  },
  methods: {
    openDialog(tasksId) {
      this.dialogFormVisible = true;
      this.tasksId = tasksId;
      this.findCuttingLogs();
    },
    // 查询切料日志列表
    findCuttingLogs() {
      const params = {
        tasksId: this.tasksId,
      };
      this.$http
        .get("/api/cuttingLog/findCuttingLogs", params)
        .then((res) => {
          console.log(res);
          this.list = res && res.data;
        })
        .catch((err) => {});
    },
    handleEdit(row) {
      const params = {
        tasksId: this.tasksId,
        row
      };
      this.$refs.taskInfoBlankingLogAddEdit.openDialog(params)
      
    },
  },
};
</script>

<style lang="scss" scoped>

</style>>
