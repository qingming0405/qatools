import mysql from 'mysql'
import {MYSQL_CONFIG} from '../../config/db.js'

// 创建连接对象
const connection = mysql.createConnection(MYSQL_CONFIG)

// 开始连接
connection.connect()

// mysql一段时间无动作会自动关闭
connection.on('error', err => {
  console.log('connection', connection);
  connection.connect()
})

function execSQL(sql) {
  const promise = new Promise((resolve, reject) => {
    connection.query(sql, (error, result) => {
      if(error) {
        reject(error)
        return
      }
      resolve(result)
    })
  })
  return promise
}

export {
  execSQL
}