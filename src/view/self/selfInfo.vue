<template>
  <div class="div-main " v-cloak  >
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" style="padding-top:5px">
      <el-breadcrumb-item :to="{path: '/' }">个人中心</el-breadcrumb-item>
      <el-breadcrumb-item>基本信息</el-breadcrumb-item>
    </el-breadcrumb>
    <div  style="border: 2px solid #E8EFF5;width: 80%;height: 350px; margin-top: 50px;margin-left: 120px;">
      <!--表单 -->
      <el-form :model="powerForm"  style="padding-top:50px" label-width="340px"size="medium">
            <!--<el-hidden prop="pid" v-model="powerForm.pid"></el-hidden>-->
            <el-form-item label="昵称" prop="svrTitle">
              <el-input style="width:200px" v-model="powerForm.nikename"  :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="账户" prop="svrCustName">
              <el-input style="width:200px"  v-model="powerForm.pname"  :disabled="true"></el-input>
            </el-form-item>
             <el-hidden prop="password" v-model="powerForm.password"></el-hidden>
            <el-form-item label="注册时间" prop="svrCustName">
              <el-input  style="width:200px"  v-model="powerForm.createdate"  :disabled="true"></el-input>
            </el-form-item>
        <el-form-item style="padding-top:30px ;padding-right:400px;text-align:center;">
          <el-button type="primary"  @click="dialogFormVisible = true">修改密码</el-button>
          <el-button type="success">返回</el-button>
        </el-form-item>
      </el-form>
      <!--嵌套表单-->
      <el-dialog title="修改密码" :visible.sync="dialogFormVisible" @close="doPowerFormTitleClose" width="25%">
      <el-form :model="passWordForm" ref="ruleForm" :rules="passWordRules"  label-width="80px" >
        <el-hidden prop="pid" v-model="passWordForm.pid"></el-hidden>
        <!--<el-input prop="pid" v-model="passWordForm.pid"></el-input>-->
        <!--<el-hidden prop="password" v-model="passWordForm.password"></el-hidden>-->
        <el-form-item prop="password" label="原密码">
          <el-input v-model="passWordForm.password" placeholder="请输入原密码" type="password" style="width:230px"></el-input>
        </el-form-item>
        <el-form-item prop="password1" label="新密码">
          <el-input v-model="passWordForm.password1" placeholder="请输入新密码" type="password" style="width:230px"></el-input>
        </el-form-item>
        <el-form-item prop="password2" label="确认密码">
          <el-input v-model="passWordForm.password2" placeholder="请确认新密码" type="password" style="width:230px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitPassWordForm">确定</el-button>
          <el-button @click="dialogFormVisible = false">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    </div>
  </div>
</template>

<script>
    export default {
      name: "selfInfo",
      data: function() {
        var validateOldPass = (rule, value, callback) => {
          if (!value) {
            callback(new Error("请输入原密码"));
          }else if(value!=this.powerForm.password){
            callback(new Error('你输入的密码与原密码不相同!'))
          } else {
            callback();
          }
        };
        var validatePass = (rule, value, callback) => {
          if (!value) {
            callback(new Error("请输入新密码"));
          }else if(value==this.passWordForm.password){
            callback(new Error('新密码不能与原密码相同!'))
          } else if (value.toString().length < 6 || value.toString().length > 18) {
            callback(new Error("密码长度为6-18位"));
          } else {
            callback();
          }
        };
        var validatePass2 = (rule, value, callback) => {
          if (value === "") {
            callback(new Error("请再次输入密码"));
          } else if (value !== this.passWordForm.password1) {
            callback(new Error("两次输入密码不一致!"));
          } else {
            callback();
          }
        };
        return {
          //表单
          powerForm: {
            nikename: null,
            pname:null,
            password:null,
            createdate: null
          },
          //嵌套表单
          dialogFormVisible: false,
          passWordForm: {
            pid:null,
            password:null,
            password1:null,
            password2: null
          },
          //验证规则
          passWordRules: {
            password: [{
              required: true,
              validator: validateOldPass,
              trigger: 'blur'
            }],
            password1: [{
              required: true,
              validator: validatePass,
              trigger: 'blur'
            }],
            password2: [{
              required: true,
              validator: validatePass2,
              message: '请填写操作员密码',
              trigger: 'blur'
            }],
          }



        }

      },
      methods:{
        //获得登录者信息
        loadUser:function () {
          let user=this.$store.getters.getUser[0];
          this.powerForm.password=user.password;
          this.powerForm.nikename=user.nikename;
          this.powerForm.pname=user.pname;
          this.powerForm.createdate=this.timeCycle(user.createdate);
        },
        //修改密码
        submitPassWordForm:function () {
          this.$refs["ruleForm"].validate((valid) => {
            if (false === valid) {
              return false;
            }
            console.log("submitPassWordForm....");
            let url = this.axios.urls.POWER_SYSPOWER_UPDATEBYPRIMARYKEYSELECTIVE;
            let params = {
              pid:this.passWordForm.pid,
              password:this.passWordForm.password1
            };
            console.log(params);
            this.axios.post(url, params).then((resp) => {
              // console.log(resp.data)
              if (resp.data.success) {
                this.$message({
                  message: '修改密码成功,即将返回登录页面....',
                  type: 'success'
                });
             // setTimeout(() => {
             //      this.$store.commit("clear",{});
             //      this.$router.push('/');//跳转到登陆页
             //    },3000);
                 let a=0;
                 setInterval(()=>{
                   a++;
                   if(a==3){
                     this.$router.push("/")
                     clearTimeout(this);
                   }
                 },1000)
              }
              this.dialogFormVisible = false;//关闭页面
              console.log("ok....");
            }).catch(() => {
              console.log(error);
            });
          });
        },
        //退出增加员工表单时自动清空值
        doPowerFormTitleClose:function(){
          this.$refs['ruleForm'].resetFields();
          this.passWordForm.password1 = null;
          this.passWordForm.password2 = null;
        },
        //自动获取时间
        timeCycle: function(timestamp) {
          Date.prototype.toLocaleString = function() {
            return this.getFullYear() + "年" +
              (this.getMonth() + 1) + "月" +
              this.getDate() + "日 " +
              this.getHours() + ":" +
              this.getMinutes() + ":" +
              this.getSeconds();
          };
          var timestring = new Date(timestamp); /*传入毫秒数返回东八区中国标准时间*/
          return timestring.toLocaleString();
        }

      },
      created(){
        this.loadUser();
        //先得到用户ID进行密码修改
        let user=this.$store.getters.getUser[0];
        this.passWordForm.pid=user.pid;
      }







    }
</script>

<style scoped>

</style>
