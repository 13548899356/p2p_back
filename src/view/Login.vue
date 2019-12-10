<template>
  <div class="login-wrap">
    <div id="app">
      <vue-particles
        color="#dedede"
        :particleOpacity="0.7"
        :particlesNumber="80"
        shapeType="circle"
        :particleSize="4"
        linesColor="#dedede"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="3"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
      >
      </vue-particles>
    </div>
  <el-container>

       <el-main style="margin-top: -640px;margin-right: 700px">
         <transition name="el-fade-in-linear">
           <div  >
             <el-form class="login-container" label-position="center"  ref="loginForm">
               <h3 class="title">用户登录</h3>
               <br />
               <br />
               <br />
               <br />
               <el-form-item label="" prop="staffAccount">
                 <el-input type="text" style="width: 260px;" placeholder="登录账号"  auto-complete="off"></el-input>
               </el-form-item>
               <el-form-item label="" prop="staffPassword">
                 <el-input type="password" style="width: 260px;" placeholder="登录密码"  auto-complete="off"></el-input>
               </el-form-item>
               <el-form-item>
                 <el-button style="width: 220px;margin-left: 20px;" type="primary" @click="doLogin">登录</el-button>
               </el-form-item>
             </el-form>
           </div>
         </transition>
       </el-main>
     </el-container>
  </div>

</template>

<script>
    export default {
        name: 'Login',
        data: function () {
            return {
                loginForm: {},


            }
        }
    }
</script>

<style scoped>
  .login-wrap {
    /* float: left;
    margin: auto 180px;
    position: absolute;
    z-index: 10; */
    background-image: url(../assets/img/bg.png);
    background-repeat: no-repeat;
    background-size: auto;
    background-position: 130px;
    width: 100%;
    height: 745px;
    background-color: #112346;
  }

  .login-container {
    float: right;
    margin: 50px 120px auto auto;
    border-radius: 10px;
    width: 400px;
    height: 350px;
    box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.1);
    background: #fff;
    text-align: left;
    /* padding: 30px 35px 15px 35px; */
    padding-left: 130px;
  }

  .title {
    margin: -20px auto auto 40px;
    text-align: center;
    color: #505458;
    width: 200px;
    height: 40px;
    line-height: 40px;
    border-radius: 25px;
    box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.1);
    background: white;
    position: fixed;
    z-index: 1;
  }


</style>
