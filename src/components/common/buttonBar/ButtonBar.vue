<template>
  <div class="button-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ButtonBar'
}
</script>

<style lang="scss" scoped>
  .button-bar {
    height: 32px;

    display: flex;
    justify-content: center;

    .el-button {
      padding: 0px 20px;
    }
  }
</style>