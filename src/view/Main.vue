<template>
  <el-container class="main-container">
    <el-aside v-bind:class="showLeftAside">
      <LeftAside :left-collapsed="collapsed"></LeftAside>
    </el-aside>
    <el-container>
      <el-header class="main-header">
        <TopNav @topnav-collapsed="openCollapsed"></TopNav>
      </el-header>
      <el-main class="main-center">
        <router-view />
        <br />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
    // 导入组件
    import TopNav from '@/components/TopNav.vue'
    import LeftAside from '@/components/LeftAside.vue'
    export default {
        name: "Main",
        data: function() {
            return {
                // asideClass:'main-aside',
                collapsed: null
            }
        },
        methods: {
            openCollapsed: function(collapsed) {
                if (collapsed === true) {
                    setTimeout(() => {
                        this.collapsed = true;
                        console.log(this.collapsed);
                    }, 0)

                } else {
                    this.collapsed = false;
                }

            }
        },

        components: {
            // 注册组件
            TopNav,
            LeftAside
        },
        computed: {
            showLeftAside: function() {
                return !this.collapsed ? 'main-aside' : 'main-aside-collapsed';

            }
        }
    }
</script>

<style scoped>
  .main-container {
    height: 100%;
    width: 100%;

    box-sizing: border-box;
  }

  .main-aside-collapsed {
    /* 在CSS中，通过对某一样式声明! important ，可以更改默认的CSS样式优先级规则，使该条样式属性声明具有最高优先级 */
    width: 64px !important;
    height: 100%;
    background-color: #334157;
    margin: 0px;
  }

  .main-aside {
    width: 240px !important;
    height: 100%;
    background-color: #334157;
    margin: 0px;
  }

  .main-header,
  .main-center {
    padding: 0px;
    border-left: 2px solid #333;
  }
</style>
