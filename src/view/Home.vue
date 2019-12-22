<template>
  <div>

    <h2 style="text-align: center;">首页</h2>

    <img src="../assets/img/banner.jpg" style="width: 100%"/>

    <div style="max-height: 50px">
    <el-calendar v-model="value" ></el-calendar>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Home",
      data() {
        return {
          value: new Date()
        }
      }
    }
</script>

<style scoped>

</style>
