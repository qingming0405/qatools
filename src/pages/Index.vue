<template>
  <el-container id="index">
    <el-aside width="180px">
      <my-aside />
    </el-aside>
    <el-container>
      <el-header height="40px">
        <my-header />
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import MyHeader from "components/content/header/MyHeader.vue";
import MyAside from "components/content/aside/MyAside.vue";

export default {
  name: "Index",
  components: {
    MyHeader,
    MyAside,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
#index {
  width: 100%;
  height: 100vh;

  .el-aside {
    background: #30373d;
  }

  .el-container {
    .el-header {
      background: #f2f6fc;
    }

    .el-main {
      background-color: #e9eef3;
    }
  }
}
</style>