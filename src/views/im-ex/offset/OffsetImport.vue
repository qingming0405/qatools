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
          <li v-for="item in logList" :key="item.count" :class="{'color-alarm': item.state === 1}">
            {{getLogItem(item)}}
          </li>
        </ul>
      </div>
    </div>
    <div class="progress-div">
      <el-progress v-show="importState !== 0" :text-inside="true" :stroke-width="16" :percentage="percentage"></el-progress>
    </div>
    <button-bar class="button-bar">
      <el-button v-show="isShowReimport" type="danger" @click="reimportHandler()">重新导入</el-button>
      <el-button v-if="importState === 0" type="primary" @click="importHandler()">导入</el-button>
      <el-popconfirm v-else-if="importState === 1" title="您确定取消导出过程吗？ 点击确定后已导入的配置会被还原" icon="el-icon-info" icon-color="red" 
        @confirm="cancelHandler()">
        <el-button type="info" slot="reference">取消</el-button>
      </el-popconfirm>
      <el-button v-else type="success" @click="finishedHandler()">完成</el-button>
      <input ref="offsetFile" type="file" style="display:none" @change="uploadFile">
    </button-bar>
  </div>
</template>

<script>
import ButtonBar from 'components/common/buttonBar/ButtonBar.vue'
import { APPLICATION, VERSION, FILETYPE } from "common/const.js";
import { round, getFolder, getMachine } from 'common/util.js'
import { api_getAllFolderList, api_getMachineList } from "server/api/common.js";
import { api_updateOffset } from "server/api/im-ex.js";

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
      percentage: 0 // 导入进度
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
      this.logList = []
      this.importState = 0
      this.isShowReimport = false
    },
    folderChangeHandler() {
      
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
    // 日志项显示
    getLogItem(item) {
      return `${item.count}. ${item.mac_name}${this.importStateDesc(item.state)}`
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
    // 重新导入
    reimportHandler() {
      this.doUploadFile()
      
    },
    // 导入
    importHandler() {
      this.doUploadFile()
    },
    // 取消
    cancelHandler() {
      this.importState = 0
    },
    // 完成
    finishedHandler() {
      this.importState = 0
      this.isShowReimport = false
    },
    // 上传文件响应
    doUploadFile() {
      this.$refs.offsetFile.click()
    },
    // 上传文件
    uploadFile(event) {
      // 初始化
      if(typeof event.target.files === 'undefined' || event.target.files.length === 0) {
        return
      }   
      //文件操作
      let file = event.target.files[0]
      if(!(/json/i).test(file.type)) {
        event.target.value = ''
        this.$message.error('导入文件类型应该为JSON')
        return
      }
      this.logList = []
      this.importState = 1
      this.isShowReimport = false
      let fr = new FileReader()
      fr.readAsText(file)
      fr.onload = (e) => {
        let fc = JSON.parse(e.target.result)
        if(fc && fc.info && fc.data && this.isValidFile(fc.info)) {
          let macIds = Object.keys(fc.data)
          if(macIds && macIds.length>0) {
            let sum = macIds.length
            this.updateOffset(macIds, sum, fc.data)
          }
        }
        else {
          this.$message.error('文件格式不正确或内容不匹配')
        }
        event.target.value = ''
      }
    },
    // 验证文件信息
    isValidFile(info) {
      if(info && info.application === APPLICATION && info.fileType === FILETYPE.OFFSET_CONFIG && info.t_id === this.curT_id) {
        return true
      }
      return false
    },
    updateOffset(macIds, sum, fcData) {
      let mac_id = macIds.shift()
      let count = sum - macIds.length
      this.updateLog(mac_id, count, 2)
      api_updateOffset(mac_id, fcData[mac_id]).then(res => {
        this.percentage = round(count*100/sum)
        if(res.data) { // 返回更新成功
          this.updateLog(mac_id, count, 0)
        }
        else {
          this.isShowReimport = true // 有机组更新失败，则显示
          this.updateLog(mac_id, count, 1)
        }
        if(this.importState === 1 && macIds.length > 0) {
          this.updateOffset(macIds, sum, fcData)
        }
        else if(macIds.length === 0) {
          this.importState = 2
        }
      })
      
    },
    // 更新日志
    updateLog(mac_id, count, state) {
      let mac = getMachine(this.machineList, mac_id)
      this.logList[count-1] = {
        count,
        mac_name: mac.mac_name,
        state
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .offset-import {
    height: 100%;

    .main-view {
      height: calc(100% - 80px);

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

    .progress-div {
      padding: 10px 5px 0px 65px;
      height: 30px;

      .el-progress {
        height: 100%;
      }
    }
    
  }
  // /deep/.el-popconfirm {
  //   font-size: 15px;

  //   .el-popconfirm__main {
  //     padding: 5px;
  //     max-width: 280px;
  //     font-size: 12px;
  //   }
  // }
</style>