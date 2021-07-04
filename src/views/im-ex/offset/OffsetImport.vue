<template>
  <div class="offset-import">
    <div class="main-view">
      <div class="form-item form-item-folder">
        <span class="form-label">组织：</span>
        <el-select v-model="curT_id" filterable placeholder="请选择组织" @change="folderChange">
          <el-option v-for="folder in folderList" :key="folder.t_id" :label="folder.t_name" :value="folder.t_id"></el-option>
        </el-select>
      </div>
      <div class="form-item form-item-mac">
        <span class="form-label">日志：</span>
        <ul class="list-ul">
          <li v-for="item in logList" :key="item.index" :class="{'color-alarm': item.state === 1}">
            {{getLogItem(item)}}
          </li>
        </ul>
      </div>
    </div>
    <button-bar>
      <el-button v-show="isShowReimport" type="danger" @click="reimportHandler()">重新导入</el-button>
      <el-button v-if="importState === 0" type="primary" @click="importHandler()">导入</el-button>
      <el-button v-else-if="importState === 1" type="info" @click="cancelHandler()">取消</el-button>
      <el-button v-else type="success" @click="finishedHandler()">完成</el-button>
    </button-bar>
  </div>
</template>

<script>
import ButtonBar from 'components/common/buttonBar/ButtonBar.vue'
import {getFolder} from 'common/util.js'

export default {
  name: 'OffsetImport',
  components: {
    ButtonBar,
  },
  data() {
    return {
      folderList: [], // 组织列表
      curT_id: '',
      curFolder: {}, // 选中组织
      machineList: [], // 当前机组列表
      logList: [], // 日志列表
      importState: 0, // 导入状态 0=准备导入 1=正在导入 2=导入完成
      isShowReimport: false, // 是否显示重新导入按钮
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
      this.logList = []
      this.isShowReimport = false
      for(let i=0; i<20; i++) {
        let state =  Math.floor(Math.random()*3)
        if(state === 1) {
          this.isShowReimport = true
        }
        this.logList.push({
          index: i,
          mac_name: `${this.curFolder.t_name}-风电机组${i}`,
          state
        })
      }
    },
    // 组织改变
    folderChange(t_id) {
      this.curFolder = getFolder(this.folderList, t_id)
      this.init()
    },
    // 日志项显示
    getLogItem(item) {
      return `${item.index}. ${item.mac_name}${this.importStateDesc(item.state)}`
    },
    // 日主：导入状态描述
    importStateDesc(state) {
      if(state === 2){
        return '正在导入...'
      }
      else if(state === 1) {
        return '导入失败！'
      }
      else {
        return '导入成功。'
      }
    },
    reimportHandler() {

    },
    importHandler() {
      this.importState = 1
    },
    cancelHandler() {
      this.importState = 2
    },
    finishedHandler() {
      this.importState = 0
      this.isShowReimport = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .offset-import {
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

        .list-ul {
          width: 100%;
          height: 100%;
          margin: 0;
          padding: 10px;
          list-style-type: none;
          overflow-y: scroll;
          border: 1px solid #948a8a;
          border-radius: 4px;

          li {
            height: 32px;
          }
        }
      }
      
    }
  }
</style>