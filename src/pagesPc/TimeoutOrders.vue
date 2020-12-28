<template>
  <div class="time-out-order">
      <h2 class="time-out-order-title">超时订单</h2>
      <ul class="time-out-order-list">
          <li v-for="item in timeOrder" :key="item.id">
              <span>{{ item.time }}</span>
              <span>{{ item.title }}</span>
              <span>查看订单</span>
          </li>
      </ul>
  </div>
</template>

<script>
export default {
    data() {
        return {
            timeOrder: [
                { id: 1, time: '2020.07.10', title: '华为' },
                { id: 2, time: '2020.07.10', title: '中兴' },
                { id: 3, time: '2020.07.10', title: '腾讯' },
            ]
        }
    }

}
</script>

<style lang="scss" scoped>
.time-out-order{
    width: 100%;
    .time-out-order-title{
        font-size: 16px;
    }
    .time-out-order-list{
        li{
            display: flex;
            justify-content: space-between;
        }
    }
}
</style>