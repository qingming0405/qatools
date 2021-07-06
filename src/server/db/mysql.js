import mysql from 'mysql'
import {MYSQL_CONFIG} from '../../config/db.js'

// 创建连接对象
const connection = mysql.createConnection(MYSQL_CONFIG)

// 开始连接
connection.connect()

// 执行sql语句
// const sql = `select * from blogs`
// const sql = `insert into blogs (title, content, author, createdAt) values ('标题5', '内容5', '李四', 1234567890111);`
// const sql = `update blogs set title='标题9' where content='内容1';`

// connection.query(sql, (error, result) => {
//   if(error) {
//     console.error('error', error);
//     return
//   }
//   console.log('result', result);
// })

// 执行sql语句
// function execSQL(sql, callback) {
//   connection.query(sql, callback)
// }
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