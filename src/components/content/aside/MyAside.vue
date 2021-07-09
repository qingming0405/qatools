<template>
  <div class="my-aside">
    <div class="manager-center">
      中自庆安工具箱
    </div>

    <el-menu
      default-active="2"
      class="el-menu-aside"
      @open="handleOpen"
      @close="handleClose"
      background-color="#30373D"
      text-color="#fff"
      active-text-color="#ffd04b"
      router>
      <el-menu-item index="home" route="home">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu index="import-export">
        <template slot="title">
          <i class="el-icon-sort"></i>
          <span>导入导出</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="IE-offset" route="im-ex-offset">偏移量导入导出</el-menu-item>
          <el-menu-item index="IE-alarm" route="im-ex-alarm">报警导入导出</el-menu-item>
          <!-- <el-menu-item index="IE-data">数据导入导出</el-menu-item> -->
        </el-menu-item-group>
      </el-submenu>
    </el-menu>

    <div class="version-div">
      版本信息{{version}}
    </div>

  </div>
</template>

<script>
import { VERSION } from "common/const.js";

export default {
  name: 'MyAside',
  data() {
    return {
      version: VERSION
    }
  },
  methods: {

    /**事件 */
    handleOpen() {

    },
    handleClose() {

    }
  }
}
</script>

<style lang="scss" scoped>
  .my-aside {
    width: 100%;
    height: 100%;

    .manager-center {
      height: 40px;
      background: #30373D;
      box-shadow: 0px 5px 5px 0px rgba(48, 55, 61, 0.4);

      font-size: 16px;
      font-family: Source Han Sans CN;
      font-weight: 300;
      color: #FFFFFF;
      text-align: center;
      line-height: 40px;
    }

    .version-div {
      height: 40px;

      font-size: 12px;
      font-family: Source Han Sans CN;
      font-weight: 300;
      color: #FFFFFF;
      text-align: center;
      line-height: 40px;
    }

    .el-menu-aside {
      height: calc(100% - 100px);

      .el-menu-item i{
        color: inherit;
      }
    }
  }
</style>