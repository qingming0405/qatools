/**
 * 组织相关的sql方法
 */
import {execSQL} from '../db/mysql.js'

// 查找组织
export const dao_getFolder = (t_id) => {
  let sql = `select * from c_navigate_tree where t_id=${t_id} `
  return execSQL(sql).then(rows => {
    if(rows && rows.length > 0) {
      return rows[0]
    }
    return null
  })
}

// 查找当前组织的“直属”子组织列表
export const dao_getChildFolderList = (t_id, itself = false) => {
  let sql = `select t_id,t_name,t_root,t_pid from c_navigate_tree where t_pid=${t_id} `
  if(itself) {
    sql += `or t_id=${t_id}`
  }
  return execSQL(sql)
}

// 查找当前组织及其所有子组织列表
export const dao_getFamilyFolderList = (t_id) => {
  let sql = `select t_id,t_name,t_root,t_pid from c_navigate_tree where t_id=${t_id} or t_pid in 
            (select t_id from c_navigate_tree where t_id=${t_id} or t_pid in 
              (select t_id from c_navigate_tree where t_id=${t_id} or t_pid in 
                (select t_id from c_navigate_tree where t_id=${t_id} or t_pid in
                  (select t_id from c_navigate_tree where t_id=${t_id} or t_pid=${t_id}))))`
  return execSQL(sql)
}

// 获取全部组织
export const dao_getAllFolderList = (t_root = -1) => {
  let sql = `select t_id,t_name,t_root,t_pid from c_navigate_tree where 1=1 `
  if(t_root >= 0) {
    sql += `and t_root=${t_root}`
  }
  return execSQL(sql)
}