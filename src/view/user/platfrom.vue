<template>
  <div>
    <h2 style="text-align: center;">平台用户管理</h2>

    <!-- 路径导航 面包屑-->
    <el-breadcrumb style="margin-left: 30px;" separator="/">
      <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>平台用户管理</el-breadcrumb-item>
    </el-breadcrumb>


    <!-- 搜索栏 -->
    <el-form :inline="true" class="searchBox" style="text-align: right;">
      <el-form-item label="用户名称">
        <el-input v-model="uname" placeholder="请输入用户名称" clearable autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="doSearch(null)" icon="el-icon-search">查询</el-button>
      </el-form-item>
    </el-form>

    <!-- 数据表格 -->
    <el-table :data="data" style="width: 100%; margin-down:30px;" :border="true" max-height="500px">

      <el-table-column prop="uname" label="用户名称" min-width="15" align="center"></el-table-column>

      <el-table-column prop="umname" label="真实姓名" min-width="15" align="center"></el-table-column>

      <el-table-column prop="usex" label="性别" min-width="15" align="center"></el-table-column>

      <el-table-column prop="educationbackground" label="学历" min-width="15" align="center"></el-table-column>

      <el-table-column prop="phonenumber" label="联系电话" min-width="20" align="center"></el-table-column>

      <el-table-column prop="score" label="信用积分" min-width="15" align="center"></el-table-column>

      <el-table-column prop="borrowlimit" label="可借款额度" min-width="17" align="center"></el-table-column>

      <el-table-column prop="usableamount" label="可用金额" min-width="15" align="center"></el-table-column>

      <el-table-column prop="unreturnamount" label="待还金额" min-width="15" align="center"></el-table-column>

      <el-table-column prop="locked" label="状态" min-width="20" align="center">
        <template slot-scope="scope">
					<span v-if="scope.row.locked==0">
						<el-tag type="warning">未锁定</el-tag>
					</span>
          <span v-if="scope.row.locked==1">
						<el-tag type="success">已锁定</el-tag>
					</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" min-width="45" align="center">
        <template slot-scope="scope">
          <el-button round @click="ShowList(scope.row)" icon="el-icon-plus" size="small" type="info">查看详情</el-button>
          <!--<el-button round @click="lockUser(scope.row)" size="small" icon="el-icon-edit" type="danger">锁定</el-button>-->

          <el-button round  type="warning" icon="el-icon-unlock" @click="lockUser(scope.row,true)"  size="small"  v-if="scope.row.locked!=0">解除锁定</el-button>
          <el-button round type="danger" icon="el-icon-lock" @click="lockUser(scope.row,false)"  size="small"  v-if="scope.row.locked==0">设为锁定</el-button>


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
      <el-form :model="message">
        <tr>
          <td>
            <el-form-item label="用户名称" prop="uname" :label-width="formLabelWidth">
              <el-input v-model="message.uname" autocomplete="off" readonly="readonly" :style="width"></el-input>
            </el-form-item>
          </td>
          <td>
            <el-form-item label="真实姓名" prop="umname" :label-width="formLabelWidth">
              <el-input v-model="message.umname" autocomplete="off" readonly="readonly"  :style="width"></el-input>
            </el-form-item>
          </td>
        </tr>

        <tr>
          <td>
            <el-form-item label="性别" prop="usex" :label-width="formLabelWidth">
              <el-input v-model="message.usex" autocomplete="off" readonly="readonly" :style="width"></el-input>
            </el-form-item>
          </td>
          <td>
            <el-form-item label="联系电话" prop="phonenumber" :label-width="formLabelWidth">
               <el-input v-model="message.phonenumber" autocomplete="off" readonly="readonly" :style="width"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
            <el-form-item label="信誉积分" prop="score" :label-width="formLabelWidth">
              <el-input v-model="message.score" autocomplete="off" readonly="readonly"  :style="width"></el-input>
            </el-form-item>
          </td>
          <td>
            <el-form-item label="个人收入" prop="incomegrade" :label-width="formLabelWidth">
              <el-input v-model="message.incomegrade" autocomplete="off" readonly="readonly" :style="width"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
            <el-form-item label="婚姻" prop="marriage" :label-width="formLabelWidth">
              <el-input v-model="message.marriage" autocomplete="off" readonly="readonly" :style="width"></el-input>
            </el-form-item>
          </td>
          <td>
            <el-form-item label="子女" prop="kidcount" :label-width="formLabelWidth">
              <el-input v-model="message.kidcount" autocomplete="off" readonly="readonly" :style="width"></el-input>
            </el-form-item>
          </td>
        </tr>

        <tr>
          <td>
            <el-form-item label="学历" prop="educationbackground" :label-width="formLabelWidth">
              <el-input v-model="message.educationbackground" readonly="readonly" autocomplete="off" :style="width"></el-input>
            </el-form-item>
          </td>
          <td>
            <el-form-item label="借款额度" prop="borrowlimit" :label-width="formLabelWidth">
              <el-input v-model="message.borrowlimit" autocomplete="off" readonly="readonly" :style="width"></el-input>
            </el-form-item>
          </td>
        </tr>

        <tr>
          <td>
            <el-form-item label="可用金额" prop="usableamount" :label-width="formLabelWidth">
              <el-input v-model="message.usableamount" autocomplete="off" readonly="readonly" :style="width"></el-input>
            </el-form-item>
          </td>
          <td>
            <el-form-item label="冻结金额" prop="freezedamount" :label-width="formLabelWidth">
              <el-input v-model="message.freezedamount" autocomplete="off" readonly="readonly" :style="width"></el-input>
            </el-form-item>
          </td>
        </tr>

        <tr>
          <td>
            <el-form-item label="代收利息" prop="unreceiveinterest" :label-width="formLabelWidth">
              <el-input v-model="message.unreceiveinterest" autocomplete="off" readonly="readonly" :style="width"></el-input>
            </el-form-item>
          </td>
          <td>
            <el-form-item label="代收本金" prop="unreceiveprincipal" :label-width="formLabelWidth">
              <el-input v-model="message.unreceiveprincipal" autocomplete="off" readonly="readonly" :style="width"></el-input>
            </el-form-item>
          </td>
        </tr>

        <tr>
          <td>
            <el-form-item label="待还金额" prop="unreturnamount" :label-width="formLabelWidth">
              <el-input v-model="message.unreturnamount" autocomplete="off" readonly="readonly" :style="width"></el-input>
            </el-form-item>
          </td>
          <td>
            <el-form-item label="剩余授信额度" prop="remainborrowlimit" :label-width="formLabelWidth">
              <el-input v-model="message.remainborrowlimit" autocomplete="off" readonly="readonly" :style="width"></el-input>
            </el-form-item>
          </td>
        </tr>

        <tr>
          <td>
            <el-form-item label="状态" prop="locked" :label-width="formLabelWidth">
              <el-input v-model="message.locked" autocomplete="off" readonly="readonly" :style="width"></el-input>
            </el-form-item>
          </td>
          <td>
            <el-form-item label="注册日期" prop="createDate" :label-width="formLabelWidth">
              <el-input v-model="message.createDate" autocomplete="off" readonly="readonly" :style="width"></el-input>
            </el-form-item>
          </td>
        </tr>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'platform',
    data: function() {
      return {
        uname: null,
        page: 1,
        rows: 10,
        total: 0,
        data:[],

        formLabelWidth: "100px",
        width: "width:250px",
        dialogMergaFormVisible: false,
        title:"详情界面",

       message:[{
          uid:null,
         educationbackground:null,
         phonenumber:null,
         score:null,
         umname:null,
         usex:null,
         uname:null,
         locked:null,
         createDate:null,
         usableamount:null,
         freezedamount:null,
         unreceiveinterest:null,
         unreceiveprincipal:null,
         unreturnamount:null,
         remainborrowlimit:null,
         borrowlimit:null,
         incomegrade:null,
         marriage:null,
         kidcount:null,
         educationbackground:null,
         houseCondition:null
       }],

      }

    },
    methods: {
      //查询
      doSearch:function(data) {
        if(data==null){
          this.page=1;
        }
        let params = {
          uname: this.uname,
          page: this.page,
          rows: this.rows
        };
        //请求action路径
        let url = this.axios.urls.sysUsre_List_Show;
        this.axios.post(url, params).then(resp => {
          this.data = resp.data.data;
          this.total = resp.data.total;
          console.log(resp.data.data[0])
          for (var i = 0; i <this.total; i++) {
            this.data[i].umname=resp.data.data[i].userMessage.umname;
            this.data[i].usex=resp.data.data[i].userMessage.usex;
            this.data[i].educationbackground=resp.data.data[i].userMessage.educationbackground;
            this.data[i].phonenumber=resp.data.data[i].userMessage.phonenumber;
            this.data[i].score=resp.data.data[i].userMessage.score;
            this.data[i].borrowlimit=resp.data.data[i].userAccount.borrowlimit;
            this.data[i].usableamount=resp.data.data[i].userAccount.usableamount;
            this.data[i].unreturnamount=resp.data.data[i].userAccount.unreturnamount;
          }
        }).catch(function(error) {
          console.log(error);
        });
      },

      //锁定与解锁
      lockUser: function(data, falg) {
          let params = {
            locked: 1,
            uid: data.uid
          }
          let url = this.axios.urls.sysUser_Update_Locked;
          if (falg) {
            //解除锁定
            params = {
              locked: 0,
              uid: data.uid
            }
          }
          this.axios.post(url, params).then(resp => {
            if (resp.data.success) {
              this.$message({
                message: "操作成功",
                type: 'success'
              });
              //刷新表格数据
              this.doSearch(null);
            } else {
              this.$message({
                message: "操作失败",
                type: 'error'
              });
            }
          }).catch(rsp => {})

      },
      //查看详情
      ShowList:function(row) {
        //请求action路径
        let url = this.axios.urls.sysUsre_List_Show;
        this.axios.post(url,{uid:row.uid}).then(resp => {
          this.data = resp.data.data;
          this.total = resp.data.total;
          console.log(resp.data.data[0])
          for (var i = 0; i <this.total; i++) {
            this.message.uid = resp.data.data[i].uid;
            this.message.createDate = this.timeCycle(this.data[i].createdate);
            this.message.uname=resp.data.data[i].uname;
            this.message.locked=resp.data.data[i].locked== 0 ? '未锁定' : '已锁定';
            this.message.umname=resp.data.data[i].userMessage.umname;
            this.message.usex=resp.data.data[i].userMessage.usex;
            this.message.educationbackground=resp.data.data[i].userMessage.educationbackground;
            this.message.phonenumber=resp.data.data[i].userMessage.phonenumber;
            this.message.score=resp.data.data[i].userMessage.score;
            this.message.houseCondition=resp.data.data[i].userMessage.houseCondition;
            this.message.kidcount=resp.data.data[i].userMessage.kidcount;
            this.message.marriage=resp.data.data[i].userMessage.marriage;
            this.message.incomegrade=resp.data.data[i].userMessage.incomegrade;
            this.message.freezedamount=resp.data.data[i].userAccount.freezedamount;
            this.message.unreceiveinterest=resp.data.data[i].userAccount.unreceiveinterest;
            this.message.unreceiveprincipal=resp.data.data[i].userAccount.unreceiveprincipal;
            this.message.remainborrowlimit=resp.data.data[i].userAccount.remainborrowlimit;
            this.message.borrowlimit=resp.data.data[i].userAccount.borrowlimit;
            this.message.usableamount=resp.data.data[i].userAccount.usableamount;
            this.message.unreturnamount=resp.data.data[i].userAccount.unreturnamount;
          }
        }).catch(function(error) {
          console.log(error);
        });
        this.dialogMergaFormVisible=true
        this.doSearch(null);
      },

      //对话框关闭清空表单数据
      dialogClose: function() {
        //清空表单验证
        this.$refs['message'].resetFields();
        //清空表单
        this.message.createDate = null;
        this.message.uname = null;
        this.message.locked = null;
        this.message.umname = null;
        this.message.usex=null;
        this.message.educationbackground=null;
        this.message.phonenumber=null;
        this.message.score=null;
        this.message.houseCondition=null;
        this.message.kidcount=null;
        this.message.marriage=null;
        this.message.incomegrade=null;
        this.message.freezedamount=null;
        this.message.unreceiveinterest=null;
        this.message.unreceiveprincipal=null;
        this.message.remainborrowlimit=null;
        this.message.borrowlimit=null;
        this.message.usableamount=null;
        this.message.unreturnamount=null;
        // 	//重置dialog标题
        this.title = "详情界面";
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

      //转换日期格式
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
    }
  }
</script>

<style scoped>
  .searchBox {
    margin-top: 20px;
  }
</style>
