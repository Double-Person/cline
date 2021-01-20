<template>
  <div class="warp">
    <div class="nav-title">加工明细清单</div>
    <div class="sub-title">
      <span class="active">加工明细清单</span>
    </div>
    <el-table
      :data="tableData"
      stripe
      border
      :span-method="objectSpanMethod"
      style="width: 100%"
    >
      <el-table-column prop="ordEndTime" width="180" label="订单日期">
      </el-table-column>
      <el-table-column prop="customer" label="客户"> </el-table-column>
      <el-table-column prop="orderNo" label="订单号"> </el-table-column>
      <el-table-column prop="matter" label="物料型号"> </el-table-column>
      <el-table-column prop="length" label="长度"> </el-table-column>
      <el-table-column prop="num" label="订单数量"> </el-table-column>

      <el-table-column prop="endNum" label="已经加工"> </el-table-column>

      <el-table-column width="100" label="加工规格图">
        <template slot-scope="scope">
          <!-- imgUrl -->
          <div class="drawing" @click="previewImg(scope.row.imgUrl)">
            加工图纸
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="isFirstCheck" width="150" label="是否首件确认">
      </el-table-column>
      <el-table-column prop="useTime" label="加工用时"> </el-table-column>
      <el-table-column label="加工顺序">
        <template slot-scope="scope">
          <div class="drawings">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-top"
              circle
              @click="moveOrder(scope.row.id, 1)"
            ></el-button>
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-bottom"
              circle
              @click="moveOrder(scope.row.id, 2)"
            ></el-button>
          </div>
        </template>
      </el-table-column>

      <el-table-column fixed="right" width="150" label="操作">
        <template slot-scope="scope">
          <div class="drawings">
            <div
              class="drawing edit"
              @click="drawings(scope.$index, scope.row)"
            >
              编辑
            </div>
            <div class="drawing start" @click="start(scope.row.id)">开始</div>
            <div class="drawing statement" @click="statement(scope.row.id)">
              结单
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <process-management-edit ref="processEdit" @success="getList" />
    <preview-picture ref="previewPicture" />
  </div>
</template>

<script>
import ProcessManagementEdit from "./ProcessManagementEdit.vue";
import PreviewPicture from "../components/PreviewPicture";
export default {
  components: { ProcessManagementEdit, PreviewPicture },
  name: "ProcessManagement",
  data() {
    return {
      tableData: [],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 编辑
    drawings(index, row) {
      this.$refs.processEdit.openDialo(row.id);
    },
    // 查询加工进程列表：/api/process/findProcesses   参数：无
    getList() {
      this.$http.get("/api/process/findProcesses", {}).then((res) => {
        if (res.code == 1000) {
          let warpList = [];
          res.data.forEach((ele) => {
            ele.hasChild = !!ele.details.length;
            ele.child = ele.details.map((item) => {
              return {
                id: ele.id,
                ordEndTime: ele.ordEndTime,
                orderNo: ele.orderNo,
                customer: ele.customer,
                matter: ele.matter,
                col: ele.details.length,

                length: item.length,
                num: item.num,
                imgUrl: item.imgUrl,
                isFirstCheck: item.isFirstCheck,
                useTime: item.useTime,
                endNum: item.endNum,
                hierarchy: "child",
                hasChild: false
              };
            });
          });
          let children = res.data.map(ele => ele.child)
          let list = [];
          // 将每个详情数据展开
          for(let i = 0; i < children.length; i++) {
            list.push(...children[i])
          }

          // warpList = res.data;
          // 将展开的详情数据放入列表中
          warpList.push(...list, ...res.data);
          // 通过id排序，将相同id数据放在一起，将对应的列表数据与详情数据放在一起
          warpList.sort((a, b) => a.id - b.id);

          
        //  let ids = warpList.map(item => item.id);
        //  let newIds = [...new Set(ids)]
          // 过滤
          let filterList = warpList.filter(item => !item.hasChild);
          // console.log(filterList);

          this.tableData = filterList
          this.setrowspans()
          
         
          console.log(this.tableData);

        } else {
          this.$message.error("获取列表失败");
        }
      });
    },
    // 修改加工顺序：/api/process/updateProcessOrder     参数：id（加工进程ID）；type（修改顺序类型，1上移、2下移）
    moveOrder(id, type) {
      this.$http
        .get("/api/process/updateProcessOrder", { id, type })
        .then((res) => {
          this.showMsg(res);
        });
    },
    // 首件确认：/api/processDetail/firstCheck     参数：id（详情ID）
    firstConfirm(id) {
      this.$http.get("/api/processDetail/firstCheck", { id }).then((res) => {
        this.showMsg(res);
      });
    },
    // 开始：/api/processDetail/start     参数：id（详情ID）
    start(id) {
      this.$http.get("/api/processDetail/start", { id }).then((res) => {
        this.showMsg(res);
      });
    },
    // 结单：/api/processDetail/end     参数：id（详情ID）
    statement(id) {
      this.$http.get("/api/processDetail/end", { id }).then((res) => {
        this.showMsg(res);
      });
    },
    showMsg({ code, msg }) {
      if (code == 1000) {
        this.$message({
          message: "成功",
          type: "success",
        });
        this.getList();
      } else {
        this.$message.error(msg || "失败");
      }
    },
    previewImg(img) {
      this.$refs.previewPicture.previewImg(img);
    },

     setrowspans() {
      // 先给所有的数据都加一个v.rowspan = 1
      this.tableData.forEach(v => {
        v.rowspan = 1
      })
      // 双层循环
      for (let i = 0; i < this.tableData.length; i++) {
        // 内层循环，上面已经给所有的行都加了v.rowspan = 1
        // 这里进行判断
        // 如果当前行的id和下一行的id相等
        // 就把当前v.rowspan + 1
        // 下一行的v.rowspan - 1
        for (let j = i + 1; j < this.tableData.length; j++) {
          if (this.tableData[i].id === this.tableData[j].id) {
            this.tableData[i].rowspan++
            this.tableData[j].rowspan--
          }
        }
        // 这里跳过已经重复的数据
        i = i + this.tableData[i].rowspan - 1
      }
    },
  
  

    // 跨行跨列
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      console.log('行', row.col)
      console.log('列', column.col)
      // console.log(row, column, rowIndex, columnIndex)
      // 当前行row、当前列column、当前行号rowIndex、当前列号columnIndex四个属性
      // 该函数可以返回一个包含两个元素的数组，第一个元素代表rowspan，第二个元素代表colspan。 也可以返回一个键名为rowspan和colspan的对象
      if (columnIndex < 4) {
        return {
          rowspan: row.rowspan,
          colspan: 1
        }
        // if (rowIndex % 2 === 0) {
        //     return {
        //       rowspan: 2,
        //       colspan: 1
        //     };
        //   } else {
        //     return {
        //       rowspan: 0,
        //       colspan: 0
        //     };
        //   }


          // if (row.col) {
          //   return { 
          //     rowspan:  row.col || 0,  // 行
          //     colspan:  row.col ? 1 : 0  // lie
          //   };
          // } else {
          //   return {
          //     rowspan: 0,
          //     colspan: 0
          //   };
          // }
      }
      
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../static/css/common.scss";
</style>