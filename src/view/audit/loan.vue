<template>
  <div>
    <h2 style="text-align: center;">货款认证</h2>

    <!-- 路径导航 面包屑-->
    <el-breadcrumb style="margin-left: 30px;" separator="/">
      <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>货款认证</el-breadcrumb-item>
    </el-breadcrumb>


    <!-- 搜索栏 -->
    <el-form :inline="true" style="margin-top: 10px; text-align: right;" class="demo-form-inline" >
      <el-form-item label="审核状态">
      <el-select v-model="state" placeholder="---请选择---" clearable>
        <el-option label="---请选择---" value="" key=""></el-option>
        <el-option v-for="type in types" :label="type.dictitem" :value="type.dictvalue">{{type.dictitem}}</el-option>
      </el-select>
    </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="doSearch(null)" icon="el-icon-search">查询</el-button>
      </el-form-item>
    </el-form>


    <!-- 数据表格 -->
    <el-table :data="data" style="width: 100%; margin-down:30px;" :border="true" max-height="400px">

      <el-table-column prop="uname" label="用户名" min-width="25" align="center"></el-table-column>

      <el-table-column prop="title" label="产品名称" min-width="25" align="center"></el-table-column>

      <el-table-column prop="rangelimit" label="贷款额度" min-width="25" align="center"></el-table-column>

      <el-table-column prop="pdate" label="贷款天数" min-width="25" align="center"></el-table-column>

      <el-table-column prop="interest" label="产品利息" min-width="25" align="center"></el-table-column>

      <el-table-column prop="type" label="贷款类型" min-width="20" align="center">
      </el-table-column>

      <el-table-column prop="state" label="审核状态" min-width="20" align="center">
      </el-table-column>


      <el-table-column label="操作" min-width="45" align="center">
        <template slot-scope="scope">
          <el-button round @click="ShowList(scope.row)" icon="el-icon-plus" size="small" type="info">查看详情</el-button>
          <!--<span v-if="scope.row.state==0">-->
            <el-popover placement="left" width="280" trigger="click">
            <div style="text-align: right; margin: 0">
              <el-button @click="PlanDanger(scope.row)" size="small" type="primary" icon="el-icon-edit">审核通过</el-button>
              <el-button @click="Planfailed(scope.row)" size="small" type="warning" icon="el-icon-edit">审核失败</el-button>
            </div>
            <el-button round slot="reference" size="mini" icon="el-icon-menu">更多</el-button>
          </el-popover>
					<!--</span>-->
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页栏 -->
    <el-pagination style="margin-top: 15px; text-align:right;" background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                   :current-page="page" :page-sizes="[10, 20, 30, 40]" :page-size="rows" layout="total, sizes, prev, pager, next, jumper"
                   :total="total">
    </el-pagination>

    <!--对话框-->
    <el-dialog :title="title" :visible.sync="dialogMergaFormVisible" @close="dialogClose" style="width:1600px;">
      <el-form :model="message"  ref="message">
        <tr>
          <td>
            <el-form-item label="用户名称" prop="uname" :label-width="formLabelWidth">
              <el-input v-model="message.uname" autocomplete="off" disabled="true" :style="width"></el-input>
            </el-form-item>
          </td>
          <td>
            <el-form-item label="产品名称" prop="title" :label-width="formLabelWidth">
              <el-input v-model="message.title" autocomplete="off" disabled="true"  :style="width"></el-input>
            </el-form-item>
          </td>
        </tr>

        <tr>
          <td>
            <el-form-item label="贷款额度" prop="rangelimit" :label-width="formLabelWidth">
              <el-input v-model="message.rangelimit" autocomplete="off" disabled="true" :style="width"></el-input>
            </el-form-item>
          </td>
          <td>
            <el-form-item label="贷款天数(天)" prop="pdate" :label-width="formLabelWidth">
              <el-input v-model="message.pdate" autocomplete="off" disabled="true" :style="width"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
            <el-form-item label="产品利息" prop="interest" :label-width="formLabelWidth">
              <el-input v-model="message.interest" autocomplete="off" disabled="true"  :style="width"></el-input>
            </el-form-item>
          </td>
          <td>
            <el-form-item label="贷款类型" prop="type" :label-width="formLabelWidth">
              <el-input v-model="message.type" autocomplete="off" disabled="true" :style="width"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
            <el-form-item label="审核状态" prop="state" :label-width="formLabelWidth">
              <el-input v-model="message.state" autocomplete="off" disabled="true" :style="width"></el-input>
            </el-form-item>
          </td>
        </tr>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
    export default {
      data: function() {
        return {
          state: null,
          page: 1,
          rows: 10,
          total: 0,
          data: [],
          types:[],
          pid:null,
          formLabelWidth: "100px",
          width: "width:250px",
          dialogMergaFormVisible: false,
          title: "详情界面",
          message: [{
            id: null,
            uname: null,
            title: null,
            rangelimit: null,
            pdate: null,
            interest: null,
            type: null,
            state: null
          }],
        }
      },

      methods: {
        //查询
        doSearch: function (data) {
          if (data == null) {
            this.page = 1;
          }
          let params = {
            state:this.state,
            page: this.page,
            rows: this.rows
          };
          //请求action路径
          let url = this.axios.urls.Loan_List_Show;
          this.axios.post(url, params).then(resp => {
            this.data = resp.data.data;
            this.total = resp.data.total;
            for (var i = 0; i < this.total; i++) {
              this.data[i].uname = resp.data.data[i].sysUser.uname;
              this.data[i].title = resp.data.data[i].product.title;
              this.data[i].rangelimit = resp.data.data[i].product.rangelimit;
              this.data[i].pdate = resp.data.data[i].product.pdate;
              this.data[i].interest = resp.data.data[i].product.interest;
            }
            for (var i = 0; i < this.total; i++) {
              //贷款类型
              this.doSearchType(resp.data.data, i);
              //审核状态
              this.doSearchStatus(resp.data.data, i);
            }
          }).catch(function (error) {
            console.log(error);
          });
        },

        //对话框关闭清空表单数据
        dialogClose: function() {
          //清空表单验证
          this.$refs['message'].resetFields();
          //清空表单
          this.message.uname = null;
          this.message.title = null;
          this.message.state = null;
          this.message.type = null;
          this.message.rangelimit=null;
          this.message.pdate=null;
          this.message.interest=null;
        },

        //模糊查询搜索框
        loadItem:function(){
          let params = {
            dicttype:'审核状态',
          };
          //请求action路径
          let url = this.axios.urls.Dictionary_Show;
          this.axios.post(url, params).then(resp => {
           this.types=resp.data.data;
          }).catch(function(error) {
            console.log(error);
          });
        },

        //数据表格中的贷款类型
        doSearchType: function(data, index) {
          let params = {
            dicttype: "借款类型",
            dictvalue: data[index].type
          }
          let url = this.axios.urls.Dictionary_Type_Show;
          this.axios.post(url, params).then(resp => {
            this.data[index].type=resp.data.data[0].dictitem;
          }).catch(resp => {
          });
        },

        //数据表格中的审核状态
        doSearchStatus: function(data, index) {
          //查询状态
          let params = {
            dicttype: "审核状态",
            dictvalue: data[index].state,
          }
          let url = this.axios.urls.Dictionary_Type_Show;
          this.axios.post(url, params).then(resp => {
            this.items=resp.data.data;
            this.data[index].state=resp.data.data[0].dictitem;
          }).catch(resp => {
          });
        },

        //查看详情
        ShowList:function(row) {
          //请求action路径
          let url = this.axios.urls.Loan_List_Show;
          this.axios.post(url,{id:row.id}).then(resp => {
            this.data = resp.data.data;
            this.total = resp.data.total;
            for (var i = 0; i <this.total; i++) {
              this.message.id=resp.data.data[i].id;
              console.log(this.message.id);
              this.message.uname=row.sysUser.uname;
              this.message.title = row.product.title;
              this.message.rangelimit =row.product.rangelimit;
              this.message.pdate = row.product.pdate;
              this.message.interest =row.product.interest;
              this.message.type=resp.data.data[i].type== 0?'产品项目':'招标项目';
              this.message.state=resp.data.data[i].state==0?'审核中':(resp.data.data[i].state==1?'审核成功':'审核失败');
            }
          }).catch(function(error) {
            console.log(error);
          });
          this.dialogMergaFormVisible=true
          this.doSearch(null);
        },

        //审核通过
        PlanDanger:function(row){
          let url = this.axios.urls.Loan_SHECG;
          this.axios.post(url, {id: row.id}).then((resp) => {
            this.pid=row.pid;
            console.log(this.pid);
            if (resp.data.success) {
              this.$message({
                message: "操作成功",
                type: 'success'
              });
              let parms = {
                pid:this.pid,
                rangelimit:row.rangelimit
              }
              console.log(parms);

              let url=this.axios.urls.Corporate_Show;
              this.axios.post(url,parms).then(resp => {
                }).catch(resp => {
              });
              this.doSearch(null);
            } else {
              this.$message({
                message: "操作失败",
                type: 'error'
              });
            }
          }).catch(function(error) {
            console.log(error);
          });
        },

        //审核失败
        Planfailed:function(row){
          let url = this.axios.urls.Loan_SHE;
          this.axios.post(url, {id: row.id}).then((resp) => {
            if (resp.data.success) {
              this.$message({
                message: "操作成功",
                type: 'success'
              });
              this.doSearch(null);
            } else {
              this.$message({
                message: "操作失败",
                type: 'error'
              });
            }
          }).catch(function(error) {
            console.log(error);
          });
        },

        // 分页
        handleSizeChange: function(rows) {
          this.rows = rows;
          this.page = 1;
          this.doSearch(this.page);
          console.log(this.rows);
        },
        handleCurrentChange: function(page) {
          console.log(page);
          this.page = page;
          this.doSearch(this.page);
        },

        //日期转换格式
        timeCycle: function(timestamp) {
          Date.prototype.toLocaleString = function() {
            return this.getFullYear() + "年" +
              (this.getMonth() + 1) + "月" +
              this.getDate() + "日" +
              this.getHours() + ":" +
              this.getMinutes() + ":" +
              this.getSeconds();
          };
          var timestring = new Date(timestamp); /*传入毫秒数返回东八区中国标准时间*/
          return timestring.toLocaleString();
        }
      },
      created: function() {
        this.doSearch(null);
        this.loadItem();
      }
    }
</script>

<style scoped>

</style>
