// const http = require('http')
// const serverHandler = require('./serverHandler.js')

// const port = 5000

// const server = http.createServer(serverHandler)
// // server.use()

// server.listen(port, () => {
//     console.log('server running at port 5000 ...');
// })

const express = require('express')
const app = express()

// 在路由之前，配置解析表单数据的中间件
app.use(
    express.urlencoded({
        extended: true
    })
)

// 在路由之前，配置cors中间件，解决跨域问题
const cors = require('cors')
app.use(cors())

// 导入路由模块
const router = require('./routes/apiRouter')
// 把路由模块，注册到 app 上
app.use('/api', router)

// app.use(express.json())

app.listen(5000, () => {
    console.log('server running at port 5000 ...');
})