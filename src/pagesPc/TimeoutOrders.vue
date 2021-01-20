<template>
  <div class="time-out-order">
    <h2 class="time-out-order-title">超时订单</h2>
    <ul class="time-out-order-list">
      <li v-for="item in timeOrder" :key="item.id">
        <span class="time">{{ item.createTime }}</span>

        <el-tooltip
          class="item"
          effect="dark"
          :content="item.name"
          placement="top-start"
        >
          <span class="name">{{ item.name }}</span>
        </el-tooltip>
        <span class="view-order" @click="cardInfo(item.tasksId)">查看订单</span>
      </li>
    </ul>

    <div class="pagination" v-if="totalPage > 1">
      <el-pagination
        layout="prev, pager, next"
        :page-size="pageSize"
        :total="totalRow"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  props: ["type"],
  data() {
    return {
      totalPage: 0,  // 总页数
      totalRow: 0,  // 总数
      timeOrder: [],
      types: -1,  // 类型
      page: 1,  // 当前页数
      pageSize: 15,   // 每页条数
    };
  },
  watch: {
    type: {
      immediate: true,
      handler: "watchMethod",
    },
  },

  methods: {
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val;
      this.getList();
    },
    watchMethod(val) {
      this.types = val;
      this.getList();
    },
    /**
     * /api/tasks/unfinishedTasks     参数：userId（用户ID）；type（类型：1我发布的，2我接取的，3待接取的，4被抄送的）
     * @param type {number} 类型：1我发布的，2我接取的，3待接取的，4被抄送的
     */
    getList() {
      var params = {
        userId: JSON.parse(this.$cookie.get("userInfo")).userId,
        type: this.types,
        pageSize: this.pageSize,
        pageNo: this.page
      };
      this.$http.get("/api/tasks/unfinishedTasks", params).then((res) => {
        console.log(res.data);
        if (res.code == 1000) {
          let  { list, totalRow, totalPage } = res.data;
          this.timeOrder = list;
          this.totalRow = totalRow;
          this.totalPage = totalPage
        }
      });
    },
     cardInfo(id) {
      this.$router.push({
        path: "/taskInfo",
        query: {
          id,
          bookmark: false,
          condition: false,
          shipmentNo: '' // this.myodd,
        },
      });
    },
  },
  beforeDestroy() {
    this.page = 1;
  },
};
</script>

<style lang="scss" scoped>
.time-out-order {
  /* width: 100%; */
  width: 310px;
  overflow: auto;

  .time-out-order-title {
    font-size: 12px;
    text-size-adjust: none;
    color: #000000;
    line-height: 24px;
    text-align: center;
    margin: 10px 0 13px 0;
  }
  .time-out-order-list {
    padding: 15px;
    li {
      display: flex;
      flex-wrap: nowrap;
      justify-content: space-between;
      span {
        color: #747474;
        font-size: 9px;
        text-size-adjust: none;
        display: inline-block;
      }
      .time {
        width: 140px;
      }
      .name {
        width: 80px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      span.view-order {
        /* width: 80px; */
        color: #5f82f7;
        cursor: pointer;
      }
    }
  }

  .pagination {
    width: 95%;
    margin: 10px auto;
  }
}
</style>