<template>
  <el-menu router :default-active="$route.path" class="el-menu-vertical-demo"  background-color="#334157"
           text-color="#fff" active-text-color="#ffd04b" :collapse="showLeftAside" >
    <div class="logobox">
      <img class="logoimg" src="../assets/img/logo.png" alt="">
    </div>
    <el-menu-item  index="/Home">
      <template slot='title'>
        <i class="el-icon-s-home"></i>
        <span>首页</span>
      </template>

    </el-menu-item>

    <el-submenu v-for="n in treeNodeList" :key="'key'+n.id" :index="'index'+n.id">
      <template slot="title">
        <i :class="n.icon"></i>
        <span>{{n.text}}</span>
      </template>
      <el-menu-item v-for="n1 in n.children" :key="'key'+n1.id" :index="n1.url" >
        {{n1.text}}
      </el-menu-item>
    </el-submenu>

  </el-menu>
</template>

<script>
    export default {
        name: "LeftAside",
        props:['leftCollapsed'],
        data:function () {
            return{
                treeNodeList:[]
            }
        },
        computed:{
            showLeftAside:function(){
                return this.leftCollapsed;
            }

        },
        created:function(){
          let url=this.axios.urls.left_Module_Show;
          this.axios.post(url,{}).then(resp=>{
          console.log(resp.data)
              this.treeNodeList=resp.data.data;
          }).catch(resp=>{

          })

        }
    }
</script>

<style scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 240px;
    height: 755px;

  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    border: none;
    text-align: left;
  }

  .el-menu-item-group__title {
    padding: 0px;

  }

  .el-menu-bg {
    background-color: #1f2d3d !important;
  }

  .el-menu {
    border: none;
  }

  .logobox {
    height: 40px;
    line-height: 40px;
    color: #9d9d9d;
    font-size: 20px;
    text-align: center;
    padding: 20px 0px;
  }

  .logoimg {
    height: 40px;
  }
</style>
