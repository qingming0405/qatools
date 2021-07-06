/**
 * 机组相关的sql方法
 */
import { execSQL } from '../db/mysql'

// 查找机组
export const dao_getMachine = (mac_id) => {
  let sql = `select * from c_machine where machine_id=${mac_id}`
  return execSQL(sql).then(rows => {
    if(rows && rows.length > 0) {
      return rows[0]
    }
    return null
  })
}

// 查找某组织下的"直属"机组列表
export const dao_getChildMachineList = (t_id) => {
  let sql = `select machine_id,tree_id,m_type,m_me,status from c_machine where status=0 and tree_id=${t_id} order by m_me`
  return execSQL(sql)
}

// 查找某组织及其子组织下的所有剧组列表
export const dao_getFamilyMachineList = (t_id) => {
  let sql = `select machine_id,tree_id,m_type,m_me,status from c_machine where status=0 and tree_id in 
             (select t_id from c_navigate_tree where t_id=${t_id} or t_pid in 
              (select t_id from c_navigate_tree where t_id=${t_id} or t_pid in 
                (select t_id from c_navigate_tree where t_id=${t_id} or t_pid in 
                  (select t_id from c_navigate_tree where t_id=${t_id} or t_pid=${t_id})))) order by m_me`
  return execSQL(sql)
}