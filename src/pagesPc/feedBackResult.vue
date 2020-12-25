<template>
  <div class="contain">
    <img :src="'./static/imgPc/success-icon.png'" alt />
    <span>
      {{data.name}}成功，{{data.second}}s后即将返回
      <a @click="returnHistory">{{data.returnName}}</a>...
    </span>
  </div>
</template>

<script>
// import cover1 from '@/assets/images/1.jpg'
export default {
  data() {
    return {
      data: {
        name: "反馈",
        returnName: "任务详情",
        second: 3,
      },
      interval: "",
    };
  },
  computed: {},
  watch: {},
  created() {
    var params = this.$route.query;
    this.data.name = params.from == "feedBack" ? "反馈" : "新建";
    if (params.from == "addCharge") {
      this.data.returnName = "货款管理";
    }
    console.log(params);
  },
  mounted() {
    this.setIntervalFuc();
  },
  destroy() {},
  methods: {
    setIntervalFuc() {
      this.interval = setInterval(() => {
        var second = this.data.second;
        if (second > 0) {
          second--;
          this.data.second = second;
          if (second == 0) {
            //执行跳转
            clearInterval(this.interval);
            this.returnHistory();
          }
        }
      }, 1000);
    },
    returnHistory() {
      clearInterval(this.interval);
      this.$router.go(-2);
    },
  },
};
</script>

<style scoped>
.contain {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
}

.contain img {
  width: 88px;
  height: 88px;
  border-radius: 50%;
  margin: 66px 0 83px 0;
}

.contain span {
  font-size: 24px;
  line-height: 26px;
  color: #000000;
}

.contain span a {
  color: #2c97ff;
  cursor: pointer;
  text-decoration: underline;
}
</style>