<template>
  <div class="my-header">
    <div class="icon-div"><i class="el-icon-arrow-left"></i></div>
    <div class="space-div"></div>
    <div class="logo-div"><img src="~assets/img/header/logo.png" alt=""></div>
    <div class="icon-div"><i class="el-icon-minus"></i></div>
    <div class="icon-div"><i class="el-icon-close"></i></div>
  </div>
</template>

<script>
export default {
  name: 'MyHeader'
}
</script>

<style lang="scss" scoped>
  .my-header {
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;

    .logo-div {
      width: 150px;
    }

    .icon-div {
      width: 30px;
      height: 30px;
      font-size: 20px;
      color: #666;

      text-align: center;
      line-height: 30px;

      cursor: pointer;
      &:hover {
        border: 1px dashed #666;
      }
    }

    .space-div {
      flex: 1;
    }
  }
</style>