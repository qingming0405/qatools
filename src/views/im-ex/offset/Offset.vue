<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="导出工具" name="export">
      <offset-export />
    </el-tab-pane>
    <el-tab-pane label="导入工具" name="import">
      <offset-import />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import OffsetExport from './OffsetExport.vue';
import OffsetImport from './OffsetImport.vue';
export default {
  name: 'Offset',
  components: { 
    OffsetExport,
    OffsetImport,
  },
  data() {
    return {
      activeName: 'export'
    }
  },
  created() {
    console.log('Offset path: ', this.$route.path);
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-tabs {
    height: 100%;

    .el-tab-pane {
      height: calc(100vh - 140px);
      font-size: 20px;
    }
  }
</style>