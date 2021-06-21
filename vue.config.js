module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        // options placed here will be merged with default configuration and passed to electron-builder
        win: {
          target: 'nsis' // 使用nsis打包方式
        },
        nsis: {
          oneClick: false, // 取消一键安装
          allowToChangeInstallationDirectory: true, // 允许修改安装目录
        }
      }
    }
  }
}