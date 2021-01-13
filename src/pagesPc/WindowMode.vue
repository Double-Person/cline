<template>
  <div>
    <!-- 左边点某一天，右这个窗口就同步 显示出莱 -->
    <ul v-for="item in list" :key="item.id">
      <li>名称：{{ item.name }}</li>
      <li>订单编号：{{ item.id }}元</li>
    </ul>
  </div>
</template>

<script>
import { eventBus } from "../eventBus";
export default {
  data() {
    return {
      list: []
    }
  },
  mounted() {
    eventBus.$on('taskList', (res) => {
      this.list = res
    })
  },
};
</script>

<style scoped>
ul {
  padding-top: 15px;
  list-style: none;
}
li {
  color: #747474;
  font-size: 12px;
  line-height: 30px;
  padding: 0 15px;
}

</style>