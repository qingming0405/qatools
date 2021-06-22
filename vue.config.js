module.exports = {
  publicPath: './',
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'config': '@/config',
        'server': '@/server',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
        'pages': '@/pages',
        'controllers': '@/server/controllers',
        'db': '@/server/db',
        'model': '@/server/model',
        'routes': '@/server/routes'
      }
    }
  },
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
        },
      },
      nodeIntegration: true // node集成
    }
  }
}