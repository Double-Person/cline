<template>
  <div>
    <!-- 左边点某一天，右这个窗口就同步 显示出莱 -->
    <ul v-for="item in list" :key="item.id">
      <li>客户名称：{{ item.name }}</li>
      <li>时间限制：{{ item.startTime }}至{{ item.endTime }}</li>
      <li>任务价格：{{ item.startTime }}元</li>
      <li>任务环节：
        <span v-for="(step, index) in item.steps" :key="index">{{step}}</span>
      </li>
      <li>物料核查：<span v-for="(check, index) in item.checks" :key="index">{{check.name}}</span></li>
      <li>接收人：{{ item.acceptorName }}</li>
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
li, span {
  color: #747474;
  font-size: 12px;
  line-height: 30px;
  padding: 0 15px;
}
span{
  padding: 0 15px 0 0;
}
</style>