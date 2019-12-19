<template>
  <div>
    <div>
      <h2 style="text-align: center;">招标认证</h2>

      <!-- 路径导航 面包屑-->
      <el-breadcrumb style="margin-left: 30px;" separator="/">
        <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>招标认证</el-breadcrumb-item>
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

        <el-table-column prop="uname" label="用户名" min-width="15" align="center"></el-table-column>

        <el-table-column prop="returntype" label="还款方式" min-width="15" align="center"></el-table-column>

        <el-table-column prop="bidrequestamount" label="借款金额" min-width="15" align="center"></el-table-column>

        <el-table-column prop="minbidamount" label="借款利率" min-width="15" align="center"></el-table-column>

        <el-table-column prop="title" label="借款标题" min-width="20" align="center"></el-table-column>

        <el-table-column prop="disabledays" label="招标天数(天)" min-width="25" align="center"></el-table-column>

        <el-table-column prop="bidrequesttype" label="贷款类型" min-width="20" align="center">
        </el-table-column>

        <el-table-column prop="bidrequeststate" label="投标的状态" min-width="20" align="center">
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
      <el-dialog :title="title" :visible.sync="dialogMergaFormVisible" @close="dialogClose" style="width:1600px; height:650px">
        <el-form :model="message"  ref="message">
          <tr>
            <td>
              <el-form-item label="用户名称" prop="uname" :label-width="formLabelWidth">
                <el-input v-model="message.uname" autocomplete="off" readonly="readonly" :style="width"></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item label="还款方式" prop="returntype" :label-width="formLabelWidth">
                <el-input v-model="message.returntype" autocomplete="off" readonly="readonly"  :style="width"></el-input>
              </el-form-item>
            </td>
          </tr>

          <tr>
            <td>
              <el-form-item label="借款金额" prop="bidrequestamount" :label-width="formLabelWidth">
                <el-input v-model="message.bidrequestamount" autocomplete="off" readonly="readonly" :style="width"></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item label="借款利率" prop="currentrate" :label-width="formLabelWidth">
                <el-input v-model="message.currentrate" autocomplete="off" readonly="readonly" :style="width"></el-input>
              </el-form-item>
            </td>
          </tr>

          <tr>
            <td>
              <el-form-item label="最小投标金额" prop="minbidamount" :label-width="formLabelWidth">
                <el-input v-model="message.minbidamount" autocomplete="off" readonly="readonly" :style="width"></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item label="借款期限" prop="monthes2return" :label-width="formLabelWidth">
                <el-input v-model="message.monthes2return" autocomplete="off" readonly="readonly" :style="width"></el-input>
              </el-form-item>
            </td>
          </tr>

          <tr>
            <td>
              <el-form-item label="借款次数" prop="bidcount" :label-width="formLabelWidth">
                <el-input v-model="message.bidcount" autocomplete="off" readonly="readonly" :style="width"></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item label="总回报金额" prop="totalrewardamount" :label-width="formLabelWidth">
                <el-input v-model="message.totalrewardamount" autocomplete="off" readonly="readonly" :style="width"></el-input>
              </el-form-item>
            </td>
          </tr>

          <tr>
            <td>
              <el-form-item label="借款总金额" prop="currentsum" :label-width="formLabelWidth">
                <el-input v-model="message.currentsum" autocomplete="off" readonly="readonly" :style="width"></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item label="借款标题" prop="title" :label-width="formLabelWidth">
                <el-input v-model="message.title" autocomplete="off" readonly="readonly" :style="width"></el-input>
              </el-form-item>
            </td>
          </tr>

          <tr>
            <td>
              <el-form-item label="借款描述" prop="description" :label-width="formLabelWidth">
                <!--<el-input v-model="message.description" autocomplete="off" disabled="true" :style="width"></el-input>-->
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" :style="width" readonly="readonly"
                          v-model="message.description"></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item label="风控评审意见" prop="note" :label-width="formLabelWidth">
                <!--<el-input v-model="message.note" autocomplete="off" disabled="true" :style="width"></el-input>-->
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" :style="width" readonly="readonly"
                          v-model="message.note"></el-input>
              </el-form-item>
            </td>
          </tr>

          <tr>
            <td>
              <el-form-item label="招标到期时间" prop="disabledate" :label-width="formLabelWidth">
                <el-input v-model="message.disabledate" autocomplete="off" readonly="readonly" :style="width"></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item label="招标天数" prop="disabledays" :label-width="formLabelWidth">
                <el-input v-model="message.disabledays" autocomplete="off" readonly="readonly" :style="width"></el-input>
              </el-form-item>
            </td>
          </tr>

          <tr>
            <td>
              <el-form-item label="申请时间" prop="applytime" :label-width="formLabelWidth">
                <el-input v-model="message.applytime" autocomplete="off" readonly="readonly" :style="width"></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item label="发布时间" prop="publishtime" :label-width="formLabelWidth">
                <el-input v-model="message.publishtime" autocomplete="off" readonly="readonly" :style="width"></el-input>
              </el-form-item>
            </td>
          </tr>

          <tr>
            <td>
              <el-form-item label="招标的状态" prop="bidrequeststate" :label-width="formLabelWidth">
                <el-input v-model="message.bidrequeststate" autocomplete="off" readonly="readonly"  :style="width"></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item label="贷款类型" prop="bidrequesttype" :label-width="formLabelWidth">
                <el-input v-model="message.bidrequesttype" autocomplete="off" readonly="readonly" :style="width"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>
              <el-form-item label="审核状态" prop="state" :label-width="formLabelWidth">
                <el-input v-model="message.state" autocomplete="off" readonly="readonly" :style="width"></el-input>
              </el-form-item>
            </td>
          </tr>
        </el-form>
      </el-dialog>

    </div>
  </div>
</template>

<script>
    export default {
        name: "bidding",
      data:function () {
        return{
          state: null,
          page: 1,
          rows: 10,
          total: 0,
          data: [],
          types:[],

          formLabelWidth: "100px",
          width: "width:250px",
          dialogMergaFormVisible: false,
          title: "详情界面",

          message: [{
            id: null,
            uname: null,
            returntype:null,
            bidrequestamount:null,
            currentrate:null,
            minbidamount:null,
            monthes2return:null,
            bidcount:null,
            totalrewardamount:null,
            currentsum:null,
            title:null,
            description:null,
            note:null,
            disabledate:null,
            disabledays:null,
            applytime:null,
            publishtime:null,
            bidrequeststate:null,
            bidrequesttype:null,
            state: null
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
            state:this.state,
            page: this.page,
            rows: this.rows
          };
          //请求action路径
          let url = this.axios.urls.Bidding_List_Show;
          this.axios.post(url, params).then(resp => {
            this.data = resp.data.data;
            console.log(this.data)
            this.total = resp.data.total;
            for (var i = 0; i < this.total; i++) {
              this.data[i].uname = resp.data.data[i].sysUser.uname;
              this.data[i].returntype = resp.data.data[i].borrowmoney.returntype;
              this.data[i].bidrequestamount = resp.data.data[i].borrowmoney.bidrequestamount;
              this.data[i].minbidamount = resp.data.data[i].borrowmoney.minbidamount;
              this.data[i].title = resp.data.data[i].borrowmoney.title;
              this.data[i].disabledays = resp.data.data[i].borrowmoney.disabledays;
            }
            for (var i = 0; i < this.total; i++) {
              //投标状态
              this.dobidrequestType(resp.data.data, i);
              // // //贷款类型
              this.doType(resp.data.data, i);
              // //审核状态
              this.doSearchStatus(resp.data.data, i);
            }
          }).catch(function (error) {
            console.log(error);
          });
        },

        //查看详情
        ShowList:function(row) {
          //请求action路径
          let url = this.axios.urls.Bidding_List_Show;
          this.axios.post(url,{id:row.id}).then(resp => {
            this.data = resp.data.data;
            this.total = resp.data.total;
            for (var i = 0; i <this.total; i++) {
              this.message.id=resp.data.data[i].id;
              this.message.uname=row.sysUser.uname;
              this.message.bidrequestamount = row.borrowmoney.bidrequestamount;
              this.message.returntype = row.borrowmoney.returntype;
              this.message.currentrate = row.borrowmoney.currentrate;
              this.message.minbidamount = row.borrowmoney.minbidamount;
              this.message.monthes2return = this.timeCycle(row.borrowmoney.monthes2return);
              this.message.bidcount = row.borrowmoney.bidcount;
              this.message.totalrewardamount = row.borrowmoney.totalrewardamount;
              this.message.title = row.borrowmoney.title;
              this.message.description =row.borrowmoney.description;
              this.message.currentsum = row.borrowmoney.currentsum;
              this.message.note =row.borrowmoney.note;
              this.message.disabledate =this.timeCycle(this.data[i].borrowmoney.disabledate);
              this.message.disabledays =row.borrowmoney.disabledays;
              this.message.applytime =this.timeCycle(this.data[i].borrowmoney.applytime);
              this.message.publishtime =this.timeCycle(this.data[i].borrowmoney.publishtime);

              this.message.bidrequeststate =row.borrowmoney.bidrequeststate==1?'投标中':(row.borrowmoney.bidrequeststate==2?'还款中':'已完成');
              this.message.bidrequesttype=row.borrowmoney.bidrequesttype == 0?'产品项目':'招标项目';
              this.message.state=resp.data.data[i].state==0?'审核中':(resp.data.data[i].state==1?'审核成功':'审核失败');
            }
          }).catch(function(error) {
            console.log(error);
          });
          this.dialogMergaFormVisible=true
          this.doSearch(null);
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
        doType: function(data, index) {
          let params = {
            dicttype: "借款类型",
            dictvalue: data[index].bidrequesttype
          }
          let url = this.axios.urls.Dictionary_Type_Show;
          this.axios.post(url, params).then(resp => {
            this.data[index].bidrequesttype=resp.data.data[index].dictitem;
          }).catch(resp => {
          });
        },

        //数据表格中的贷款类型
        dobidrequestType: function(data,index) {
          let params = {
            dicttype: "标的状态",
            dictvalue: data[index].bidrequeststate
          }
          let url = this.axios.urls.Dictionary_Type_Show;
          this.axios.post(url, params).then(resp => {
            this.data[index].bidrequeststate=resp.data.data[index].dictitem;
            console.log(this.bidrequeststate)
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
          this.axios.post(url , params).then(resp => {
            this.data[index].state=resp.data.data[0].dictitem;
          }).catch(resp => {
          });
        },

        //审核通过
        PlanDanger:function(row){
          let url = this.axios.urls.Bidding_Updatecg;
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

        //审核失败
        Planfailed:function(row){
          let url = this.axios.urls.Bidding_Update;
          this.axios.post(url,{id: row.id}).then((resp) => {
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
