<template>
  <div class="">
    <el-dialog
      :visible.sync="dialogVisible"
      :width="width"
      :before-close="handleClose"
    >
      <el-image :src="src">
        <div slot="placeholder" class="image-slot">
          加载中<span class="dot">...</span>
        </div>
      </el-image>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'PreviewPicture',
  props: {
    width: {
      type: String,
      default: "50%",
    },
  },
  data() {
    return {
      dialogVisible: false,
      src: "",
    };
  },
  methods: {
    //   关闭
    handleClose(done) {
      done();
    },
    // 预览图片
    previewImg(src) {
      this.dialogVisible = true;
      this.src = src || "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg";
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/ .el-image {
  width: 100%;
  img {
    width: 100%;
  }
}
</style>>
