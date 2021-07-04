<template>
  <div class="offset-export">
    <div class="main-view">
      <div class="form-item form-item-folder">
        <span class="form-label">组织：</span>
        <el-select v-model="curFolder.t_id" filterable placeholder="请选择组织">
          <el-option v-for="folder in folderList" :key="folder.t_id" :label="folder.t_name" :value="folder.t_id"></el-option>
        </el-select>
      </div>
      <div class="form-item form-item-mac">
        <span class="form-label">机组：</span>
        <ul class="list-grid">
          <li v-for="mac in machineList" :key="mac.mac_id">
            <el-checkbox v-model="mac.checked">{{mac.mac_name}}</el-checkbox>
          </li>
        </ul>
      </div>
    </div>
    <button-bar>
      <el-button type="primary">全选</el-button>
      <el-button type="primary">反选</el-button>
      <el-button type="primary">全不选</el-button>
      <el-button type="primary">导出</el-button>
    </button-bar>
  </div>
</template>

<script>
import ButtonBar from 'components/common/buttonBar/ButtonBar.vue'
export default {
  name: 'OffsetExport',
  components: {
    ButtonBar,
  },
  data() {
    return {
      folderList: [], // 组织列表
      curFolder: {}, // 选中组织
      machineList: [], // 当前机组列表
    }
  },
  created() {
    this.folderList = [
      {t_id: 0, t_name: '组织1'},
      {t_id: 1, t_name: '组织2'},
      {t_id: 2, t_name: '组织3'}
    ]
    for (let i = 0; i < 100; i++) {
      this.machineList.push({
        mac_id: i,
        mac_name: `风电机组大风机${i}`,
        checked: true
      })
      
    }
  }
}
</script>

<style lang="scss" scoped>
  .offset-export {
    height: 100%;

    .main-view {
      height: calc(100% - 40px);

      .form-item {
        font-size: 14px;

        margin-bottom: 10px;

        .form-label {
          display: inline-block;
          width: 60px;
        }
      }

      .form-item-folder {
        height: 40px;

        /deep/.el-select {
          .el-input__inner {
            height: 36px;
            line-height: 36px;
          }
        }
      }

      .form-item-mac {
        .list-grid {
          display: grid;
          grid-template-columns: repeat(5, 20%);
          grid-row-gap: 20px;
        }
      }
      
    }
  }
</style>