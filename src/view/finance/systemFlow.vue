<template>
  <div>
    <h2 style="text-align: center;">系统账户流水</h2>

    <!-- 路径导航 面包屑-->
    <el-breadcrumb style="margin-left: 30px;" separator="/">
      <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统账户流水</el-breadcrumb-item>
    </el-breadcrumb>
<br/>
    <!-- 数据表格 -->
    <el-table :data="data" style="width: 100%; margin-down:30px;" :border="true" max-height="400px">

      <el-table-column prop="title" label="产品名称" min-width="25" align="center"></el-table-column>

      <el-table-column prop="rangelimit" label="范围额度" min-width="25" align="center"></el-table-column>

      <el-table-column prop="pdate" label="贷款天数" min-width="25" align="center"></el-table-column>

      <el-table-column prop="interest" label="产品利息" min-width="25" align="center"></el-table-column>

      <el-table-column prop="getmoney" label="获取利润" min-width="25" align="center"></el-table-column>

      <el-table-column prop="capital" label="系统总金额" min-width="25" align="center"></el-table-column>

      <el-table-column label="操作" min-width="45" align="center">
        <template slot-scope="scope">
          <el-button round @click="openDrawer(scope.row)" icon="el-icon-plus" size="small" type="info">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页栏 -->
    <el-pagination style="margin-top: 15px; text-align:right;" background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                   :current-page="page" :page-sizes="[10, 20, 30, 40]" :page-size="rows" layout="total, sizes, prev, pager, next, jumper"
                   :total="total">
    </el-pagination>

      <div>
        <!-- 下部抽屉 -->
        <el-drawer title="详情页面" :visible.sync="table" direction="btt" size="50%" :before-close="handleClose">
          <el-table :data="tableData" style="width: 70%;margin-left: 250px;" height="150">
            <el-table-column prop="uname" label="用户名称" ></el-table-column>e
            <el-table-column prop="umname" label="真实姓名" ></el-table-column>
            <el-table-column prop="usex" label="性别" ></el-table-column>
            <el-table-column prop="phonenumber" label="联系电话" ></el-table-column>
            <el-table-column prop="incomegrade" label="收入" ></el-table-column>
            <el-table-column prop="educationbackground" label="学历" ></el-table-column>
            <el-table-column prop="title" label="产品名称"></el-table-column>
            <el-table-column prop="rangelimit" label="范围额度"></el-table-column>
            <el-table-column prop="pdate" label="贷款天数"></el-table-column>
            <el-table-column prop="interest" label="产品利息"></el-table-column>
            <el-table-column prop="getmoney" label="获取利润"></el-table-column>
            <el-table-column prop="capital" label="系统总金额"></el-table-column>
          </el-table>
          <el-divider><i class="el-icon-mobile-phone"></i></el-divider>

        </el-drawer>
      </div>


  </div>

</template>

<script>
    export default {
      data: function() {
        return {
          page: 1,
          rows: 10,
          total: 0,
          data: [],
          types:[],
          tableData:[],
          table: false,

          pid:null,
          formLabelWidth: "100px",
          width: "width:250px",
          dialogMergaFormVisible: false,
          title: "详情界面",

          message: [{
            pid:null,
            uname: null,
            umname:null,
            usex:null,
            phonenumber:null
          }],
        }
      },

      methods:{
        //查询
        doSearch: function (data) {
          if (data == null) {
            this.page = 1;
          }
          let params = {
            page: this.page,
            rows: this.rows
          };
          //请求action路径
          let url = this.axios.urls.Corporate_List;
          this.axios.post(url, params).then(resp => {
            this.data = resp.data.data;
            this.total = resp.data.total;
            for (var i = 0; i < this.total; i++) {
              this.data[i].title = resp.data.data[i].product.title;
              this.data[i].rangelimit = resp.data.data[i].product.rangelimit;
              this.data[i].pdate = resp.data.data[i].product.pdate;
              this.data[i].interest = resp.data.data[i].product.interest;
              console.log(this.pid);
            }
          }).catch(function (error) {
            console.log(error);
          });
        },

        //查看详情
        openDrawer: function(row) { //打开抽屉并赋值
          this.table = true;
          let url = this.axios.urls.Loan_List_Show;
          this.axios.post(url, {pid:row.pid}).then(resp => {
            this.tableData = resp.data.data;
            this.total = resp.data.total;
            for (var i = 0; i <this.total; i++) {
              this.message.pid=resp.data.data[i].pid;
              this.message.uname= resp.data.data[i].sysUser.uname;
              this.message.umname = resp.data.data[i].userMessage.umname;
              this.message.usex = resp.data.data[i].userMessage.usex;
              this.message.phonenumber =  resp.data.data[i].userMessage.phonenumber;
              // this.message.interest =row.product.interest;
            }
            //表格数据
            for (var i = 0; i <this.total; i++) {
              this.tableData[i].pid=resp.data.data[i].pid;
              this.tableData[i].uname= resp.data.data[i].sysUser.uname;
              this.tableData[i].umname = resp.data.data[i].userMessage.umname;
              this.tableData[i].usex = resp.data.data[i].userMessage.usex;
              this.tableData[i].phonenumber =  resp.data.data[i].userMessage.phonenumber;
              this.tableData[i].incomegrade =  resp.data.data[i].userMessage.incomegrade;
              this.tableData[i].educationbackground =  resp.data.data[i].userMessage.educationbackground;
              this.tableData[i].title =row.product.title;
              this.tableData[i].rangelimit =  row.product.rangelimit;
              this.tableData[i].pdate = row.product.pdate;
              this.tableData[i].interest = row.product.interest;
              this.tableData[i].getmoney = resp.data.data[i].corporateDeposit.getmoney;
              this.tableData[i].capital =  resp.data.data[i].corporateDeposit.capital;

              // this.message.interest =row.product.interest;
            }


          }).catch(resp => {})
        },
        handleClose(done) {
          this.$confirm('确认关闭？')
            .then(_ => {
              done();
            })
            .catch(_ => {});
        }

      },
      created: function() {
        this.doSearch(null);
        this.loadItem();
      }

    }
</script>

<style scoped>
  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
