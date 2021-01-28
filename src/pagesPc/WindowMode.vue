<template>
  <div>
    <!-- 左边点某一天，右这个窗口就同步 显示出莱 -->
    <ul v-for="item in list" :key="item.id" class="win-model">
      <li>名称：{{ item.name }}</li>
      <li>订单编号：{{ item.number }}</li>
      <li v-if="item.des">任务描述：{{ item.des }}</li>
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
      console.log(res)
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
  width: 90%;
  margin: 0 auto;
  /* padding: 0 15px; */
}
li:last-child{
  border-bottom: 1px dotted #666;
}

</style>