import mysql from 'mysql'

import path from 'path'
import fs from 'fs'


const isBuild = process.env.NODE_ENV === 'production'
let fileLocation = path.join(__static, 'config/db.json')
if(isBuild) {
  fileLocation = path.join(__static, '../config/db.json')
}
let fileContents = fs.readFileSync(fileLocation, 'utf-8')
let MYSQL_CONFIG = JSON.parse(fileContents)

function execSQL(sql) {
  const promise = new Promise((resolve, reject) => {
    let connection = mysql.createConnection(MYSQL_CONFIG)
    connection.connect()
    connection.on('error', err => {
      console.log('connection', connection);
      connection = mysql.createConnection(MYSQL_CONFIG)
      connection.connect()
    })

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