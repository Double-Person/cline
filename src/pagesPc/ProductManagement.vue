<template>
  <div>
    <div class="nav-title">产品管理</div>
    <div class="sub-title">
      <div>
        <span class="active">产品管理</span>
        <el-button type="primary" class="btn" @click="drawings({})"
          >新增<i class="el-icon-plus el-icon--right"></i
        ></el-button>
      </div>
    </div>

    

    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="productId" label="序号"> </el-table-column>
      <el-table-column prop="productCode" label="产品编号"> </el-table-column>
      <el-table-column prop="name" label="产品样图">
         <template slot-scope="scope">
          <div class="drawings">
            <div
              class="drawing edit"
              @click="previewImg(scope.row.productImg)"
            >
              点击查看
            </div>
          </div>
        </template>
      </el-table-column>

      <el-table-column width="150" label="编辑管理">
        <template slot-scope="scope">
          <div class="drawings">
            <div
              class="drawing edit"
              @click="drawings(scope.row)"
            >
              编辑
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <product-management-edit ref="productManagementEdit" />

    <preview-picture ref="previewPicture" @success="getList" />
  </div>
</template>

<script>
import PreviewPicture from '../components/PreviewPicture.vue';
import ProductManagementEdit from './ProductManagementEdit.vue';
export default {
  components: { ProductManagementEdit, PreviewPicture },
  name: "ProductManagement",
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          img: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
           img: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
           img: 'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg'
        },
      ],
    };
  },
  mounted() {
    this.getList()
  },
  methods: {
    /**
     * /api/product/findProducts
     */
    // 列表查询：
    getList() {
      this.$http
        .get("/api/product/findProducts", {  })
        .then((res) => {
          if (res.code == 1000) {
            this.tableData = res.data
          }
          
        })
        .catch((err) => {});
    },
    previewImg(img) {
      this.$refs.previewPicture.previewImg(img)
    },
    drawings( row) {
      this.$refs.productManagementEdit.openDialo(row)
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../static/css/common.scss";
</style>