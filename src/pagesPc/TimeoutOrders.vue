<template>
  <div class="time-out-order">
    <h2 class="time-out-order-title">超时订单</h2>
    <ul class="time-out-order-list">
      <li v-for="item in timeOrder" :key="item.id">
        <span>{{ item.time }}</span>
        <span>{{ item.title }}</span>
        <span class="view-order">查看订单</span>
      </li>
    </ul>
    <!-- 分页显示 -->
    <div class="pagination">
      <el-pagination

        layout="prev, pager, next"
        :total="150"
        :pager-count="5"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timeOrder: [
        { id: 1, time: "2020.07.10", title: "华为" },
        { id: 2, time: "2020.07.10", title: "中兴" },
        { id: 3, time: "2020.07.10", title: "腾讯" },
      ],
    };
  },
  methods: {
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.time-out-order {
  width: 100%;
  .time-out-order-title {
    font-size: 12px;
    text-size-adjust: none;
    color: #000000;
    line-height: 24px;
    text-align: center;
    margin: 10px 0 13px 0;
  }
  .time-out-order-list {
    li {
      display: flex;
      justify-content: space-between;
      span {
        color: #747474;
        font-size: 9px;
        text-size-adjust: none;
      }
      span.view-order {
        color: #5f82f7;
        cursor: pointer;
      }
    }
  }

  .pagination{
    margin-top: 15px;
    width: 80%;
    .el-pagination{
      padding: 0;
      width: 90%;
    }
  }
}
</style>