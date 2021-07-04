<template>
  <div class="offset-export">
    <div class="main-view">
      <div class="form-item form-item-folder">
        <span class="form-label">组织：</span>
        <el-select v-model="curT_id" filterable placeholder="请选择组织" @change="folderChange">
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
      <el-button type="primary" @click="checkAll(0)">全选</el-button>
      <el-button type="primary" @click="checkAll(2)">反选</el-button>
      <el-button type="primary" @click="checkAll(1)">全不选</el-button>
      <el-button type="primary">导出</el-button>
    </button-bar>
  </div>
</template>

<script>
import ButtonBar from 'components/common/buttonBar/ButtonBar.vue'
import {getFolder} from 'common/util.js'

export default {
  name: 'OffsetExport',
  components: {
    ButtonBar,
  },
  data() {
    return {
      folderList: [], // 组织列表
      curT_id: '',
      curFolder: {}, // 选中组织
      machineList: [], // 当前机组列表
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.folderList = [
        {t_id: 0, t_name: '组织1'},
        {t_id: 1, t_name: '组织2'},
        {t_id: 2, t_name: '组织3'}
      ]
      this.machineList = []
      for (let i = 0; i < 100; i++) {
        this.machineList.push({
          mac_id: i,
          mac_name: `${this.curFolder.t_name}-风电机组${i}`,
          checked: true
        })
        
      }
    },
    // 组织改变
    folderChange(t_id) {
      this.curFolder = getFolder(this.folderList, t_id)
      this.init()
    },
    // 全选操作
    checkAll(type) {
      for (const item of this.machineList) {
        if(type === 2){
          item.checked = !item.checked
        }
        else if(type === 1) {
          item.checked = false
        }
        else {
          item.checked = true
        }
      }
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
        height: calc(100% - 80px);

        display: flex;

        .list-grid {
          width: 100%;
          height: 100%;
          margin: 0;
          padding: 10px;
          list-style-type: none;
          overflow-y: scroll;
          border: 1px solid #c0c0c0;
          border-radius: 4px;

          display: grid;
          grid-template-columns: repeat(5, 20%);
          grid-row-gap: 20px;
        }
      }
      
    }
  }
</style>