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
      <el-button type="primary" @click="onExport">导出</el-button>
    </button-bar>
  </div>
</template>

<script>
import ButtonBar from 'components/common/buttonBar/ButtonBar.vue'
import { downloadFile } from "common/public.js";
import { APPLICATION, VERSION, FILETYPE } from "common/const.js";
import {getFolder} from 'common/util.js'
import { api_getAllFolderList, api_getMachineList } from "server/api/common.js";
import { api_getAllPositionList_offset } from "server/api/im-ex.js";

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
      this.getFolderList()
    },
    // 获取组织列表
    getFolderList() {
      api_getAllFolderList().then(res => {
        if(res.data && res.data.length > 0) {
          this.folderList = res.data.map(folder => {
            return {
              t_id: folder.t_id,
              t_name: folder.t_name
            }
          })
          this.curFolder = this.folderList[0]
          this.curT_id = this.curFolder.t_id
          this.getMachineList()
        }
        else {
          this.curFolder = {}
          this.curT_id = ''
        }
      })
    },
    // 组织改变
    folderChange(t_id) {
      this.curFolder = getFolder(this.folderList, t_id)
      this.getMachineList()
    },
    // 获取机组列表
    getMachineList() {
      this.machineList = []
      api_getMachineList(this.curT_id, 'FAMILY').then(res => {
        if(res.data && res.data.length > 0) {
          this.machineList = res.data.map(mac => {
            return {
              mac_id: mac.machine_id,
              mac_name: mac.m_me,
              checked: true
            }
          })
        }
      })
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
    },
    onExport() {
      let macIds = this.machineList.filter(mac => mac.checked == true).map(mac => mac.mac_id)
      let content = {}
      
      api_getAllPositionList_offset(macIds).then(res => {
        content.info = {
          application: APPLICATION,
          version: VERSION,
          fileType: FILETYPE.OFFSET_CONFIG,
          t_id: this.curT_id
        }
        if(res.data && JSON.stringify(res.data) !== '{}') {
          content.data = res.data
        }
        if(typeof content.data === 'undefined') {
          this.$message('没有数据可以导出')
          return
        }
        let fileName = `偏移量设置-${this.curFolder.t_name}.json`
        downloadFile(JSON.stringify(content), fileName)
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

          display: flex;
          flex-wrap: wrap;
          align-content: flex-start;

          li {
            width: 20%;
            height: 32px;
          }
        }
      }
      
    }
  }
</style>