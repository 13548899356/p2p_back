<template>
  <div>
    <h2 style="text-align: center;">系统字典</h2>

    <!-- 路径导航 面包屑-->
    <el-breadcrumb style="margin-left: 30px;" separator="/">
      <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统字典</el-breadcrumb-item>
    </el-breadcrumb>


    <!-- 搜索栏 -->
    <el-form :inline="true" style="margin-top: 10px; text-align: right;" class="demo-form-inline" >
      <el-form-item label="字典类型">
        <el-select v-model="dicttype" placeholder="---请选择---" clearable>
          <el-option label="---请选择---" value="" key=""></el-option>
          <el-option v-for="item in types" :key="item.dicttype" :value="item.dicttype" :label="item.dicttype">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="doSearch(null)" icon="el-icon-search">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="doAdd" icon="el-icon-plus">新增字典</el-button>
      </el-form-item>
    </el-form>


    <!-- 数据表格 -->
    <el-table :data="data" style="width: 100%; margin-down:30px;" :border="true" max-height="400px">

      <el-table-column prop="dicttype" label="数据类型" min-width="25" align="center"></el-table-column>

      <el-table-column prop="dictitem" label="字典条目" min-width="25" align="center"></el-table-column>

      <el-table-column prop="dictvalue" label="字典值" min-width="25" align="center"></el-table-column>

      <el-table-column prop="dictiseditable" label="是否可编辑" min-width="20" align="center">
        <template slot-scope="scope">
					<span v-if="scope.row.dictiseditable==0">
						<el-tag type="warning">不可编辑</el-tag>
					</span>
          <span v-if="scope.row.dictiseditable==1">
						<el-tag type="success">可编辑</el-tag>
					</span>
        </template>
      </el-table-column>


      <el-table-column label="操作" min-width="45" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.dictiseditable==0">
            <el-button round @click="handleEdit(scope.row)" icon="el-icon-edit"  size="small" :disabled="button" type="primary">编辑</el-button>
						<el-button round type="danger" @click="handleDelete(scope.row)" size="small" :disabled="button" icon="el-icon-delete">删除</el-button>
					</span>
          <span v-if="scope.row.dictiseditable==1">
            <el-button round @click="handleEdit(scope.row)" icon="el-icon-edit"  size="small"  type="primary">编辑</el-button>
						<el-button round type="danger" @click="handleDelete(scope.row)" size="small" icon="el-icon-delete">删除</el-button>
					</span>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页栏 -->
    <el-pagination background style="margin-top: 15px; text-align:right;" @size-change="handleSizeChange" @current-change="handleCurrentChange"
                   :current-page="page" :page-sizes="[10, 20, 30, 40]" :page-size="rows" layout="total, sizes, prev, pager, next, jumper"
                   :total="total">
    </el-pagination>


    <!--对话框-->
    <el-dialog :title="title" :visible.sync="dialogMergaFormVisible" @close="dialogClose" style="width:1600px;">
      <el-form :model="message" :rules="rules" ref="message">
        <tr>
          <td>
            <el-form-item label="数据类型" prop="dicttype" :label-width="formLabelWidth">
            <el-input v-model="message.dicttype" autocomplete="off" :style="width"></el-input>
          </el-form-item>

            <!--<el-form-item label="数据类型" prop="dicttype" :label-width="formLabelWidth">-->
              <!--<el-select v-model="message.dicttype">-->
                <!--<el-option v-for="item in types" :key="item.dicttype" :value="item.dicttype" :label="item.dicttype"></el-option>-->
              <!--</el-select>-->
            <!--</el-form-item>-->
          </td>
          <td>
            <el-form-item label="字典条目" prop="dictitem" :label-width="formLabelWidth">
              <el-input v-model="message.dictitem" autocomplete="off" :style="width"></el-input>
            </el-form-item>
          </td>
        </tr>

        <tr>
          <td>
            <el-form-item label="字典值" prop="dictvalue" :label-width="formLabelWidth">
              <el-input v-model="message.dictvalue" autocomplete="off" :style="width"></el-input>
            </el-form-item>
          </td>
          <td>
            <el-form-item label="是否可编辑" prop="dictiseditable" :label-width="formLabelWidth">
              <!--<el-input v-model="message.dictiseditable" autocomplete="off":style="width"></el-input>-->
              <el-select v-model="message.dictiseditable" placeholder="请选择" :style="width" autocomplete="off">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>

            </el-form-item>
          </td>
        </tr>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogMergaFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="doAddSubmit">确 定</el-button>
      </div>

    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'dictionary',
    data: function() {
      return {
        dicttype: null,
        page: 1,
        rows: 10,
        total: 0,
        data:[],
        button:true,
        types:[],

        options: [{
          value: '0',
          label: '不可编辑'
        }, {
          value: '1',
          label: '可编辑'
        }],

        formLabelWidth: "100px",
        width: "width:250px",
        dialogMergaFormVisible: false,
        title:"新增信息",

        message:{
          id:null,
          dicttype:null,
          dictitem:null,
          dictvalue:null,
          dictiseditable:'1'
        },

      }

    },
    methods: {
      //查询
      doSearch:function(data) {
        if(data==null){
          this.page=1;
        }
        let params = {
          dicttype: this.dicttype,
          page: this.page,
          rows: this.rows
        };
        //请求action路径
          let url = this.axios.urls.Dictionary_Show;
        this.axios.post(url, params).then(resp => {
          this.data = resp.data.data;
          this.total = resp.data.total;
          for (var i = 0; i <this.total; i++) {
            this.data[i].dicttype=resp.data.data[i].dicttype;
            this.data[i].dictitem=resp.data.data[i].dictitem;
            this.data[i].dictvalue=resp.data.data[i].dictvalue;
            this.data[i].dictiseditable=resp.data.data[i].dictiseditable;
          }
        }).catch(function(error) {
          console.log(error);
        });
      },

      //类型查询
      loadListType: function() { //加载同类型的数据（抽屉里）
        let url = this.axios.urls.Dictionary_TypeList;
        this.axios.post(url, {}).then(resp => {
          this.types = resp.data.data;
        }).catch(resp => {
        });
      },

      //新增
      doAdd: function() {
        //新增字典
        this.dialogMergaFormVisible = true;
      },

      //对话框关闭清空表单数据
      dialogClose: function() {
        //清空表单验证
        this.$refs['message'].resetFields();
        //清空表单
        this.message.dicttype = null;
        this.message.dictitem = null;
        this.message.dictvalue = null;
        this.message.dictiseditable = null;
        // 	//重置dialog标题
        this.title = "新增信息";
      },

      //确认
      doAddSubmit: function() {
        this.$refs['message'].validate((valid) => {
          if (valid) {
            let url = this.axios.urls.Dictionary_Add;
            if (this.title == '字典编辑') {
              url = this.axios.urls.Dictionary_Update;
            }
            //获取表单数据
            let params = {
              id: this.message.id,
              dicttype: this.message.dicttype,
              dictitem: this.message.dictitem,
              dictvalue: this.message.dictvalue,
              dictiseditable: this.message.dictiseditable,
            };
            //发送请求
            this.axios.post(url,params).then((resp) => {
              if (resp.data.success) {
                this.$message({
                  message:"操作成功",
                  type: 'success'
                });
                this.doSearch(null);
                this.dialogMergaFormVisible = false;
              } else {
                this.$message({
                  message: "操作失败",
                  type: 'error'
                });
              }
            }).catch(function(error) {
          console.log(error);
        });
      } else {
        console.log('error submit!!');
      return false;
    }
        });
      },

      //Table表格的操作事件
      //修改
      handleEdit: function(row) {
        this.message.id = row.id;
        this.message.dicttype = row.dicttype;
        this.message.dictitem = row.dictitem;
        this.message.dictvalue = row.dictvalue;
        this.message.dictiseditable = row.dictiseditable;

        this.title = '字典编辑';
        this.dialogMergaFormVisible = true;
      },

      handleDelete: function(row) {
        this.$confirm('确认删除当前信息嘛, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let url = this.axios.urls.Dictionary_Delete;
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
        }).catch(() => {})

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
      this.loadListType();
    }
  }
</script>

<style scoped>
  .searchBox {
    margin-top: 20px;
  }
</style>
