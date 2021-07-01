<template>
  <el-container id="index">
    <el-aside width="180px">Aside</el-aside>
    <el-container>
      <el-header height="40px">Header</el-header>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
  #index {
    width: 100%;
    height: 100vh;

    .el-aside {
      width: 180px;
      height: 100%;
      background: #30373D;
    }

    .el-container {
      // width: calc(100% - 180px);
      // height: 100%;

      .el-header {
        // width: 1100px;
        height: 40px;
        background: #F2F6FC;
      }

      .el-main {
        background-color: #E9EEF3;
      }

    }
  }
  
  // .el-header, .el-footer {
  //   background-color: #B3C0D1;
  //   color: #333;
  //   text-align: center;
  //   line-height: 60px;
  // }
  
  // .el-aside {
  //   background-color: #D3DCE6;
  //   color: #333;
  //   text-align: center;
  //   line-height: 200px;
  // }
  
  // .el-main {
  //   background-color: #E9EEF3;
  //   color: #333;
  //   text-align: center;
  //   line-height: 160px;
  // }
</style>