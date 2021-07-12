module.exports = {
  publicPath: './',
  configureWebpack: {
    devtool: 'source-map',
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
        extraResources: [{
          from: './public/config/',
          to: 'config/'
        }],
        win: {
          icon: './public/favicon.ico', // 设置图标
          target: [
            {
              target: 'nsis', // 使用nsis打包方式
              arch: [
                'x64', // 64位
              ]
            }
          ]
        },
        nsis: {
          oneClick: false, // 取消一键安装
          allowToChangeInstallationDirectory: true, // 允许修改安装目录
          installerIcon: './public/favicon.ico', // 安装图标
          uninstallerIcon: './public/favicon.ico', // 卸载图标
          installerHeaderIcon: './public/favicon.ico', // 安装时头部图标
          createDesktopShortcut: true, // 创建桌面图标
          createStartMenuShortcut: true, // 创建开始菜单图标
          shortcutName: 'qatools', // 图标名称
        },
      },
      nodeIntegration: true // node集成
    }
  }
}