/**
 * 机组相关的sql方法
 */
import { execSQL } from '../db/mysql'

// 获取某个机组下的测点表
export const dao_getPosList = (mac_id) => {
  let sql = `select * from c_machine_position where machine_id=${mac_id} and status=0`
  return execSQL(sql)
}

// 获取某个测点
export const dao_getPos = (mac_id, pos_type, pos_id) => {
  let sql = `select * from c_machine_position where machine_id=${mac_id} and position_type=${pos_type} and position_id=${pos_id} and status=0`
  return execSQL(sql).then(rows => {
    if(rows && rows.length > 0) {
      return rows[0]
    }
    return null
  })
}

// 获取所有机组下的测点表
export const dao_getAllPosList = (macIds, posTypes = []) => {
  let sql = `select * from c_machine_position where machine_id in (${macIds.toString()}) `
  if(posTypes.length > 0) {
    sql += `and position_type in (${posTypes.toString()} )`
  }
  sql += `and status=0 order by machine_id`
  return execSQL(sql)
}

// 修改测点的某个字段
export const dao_updatePosField = (pos, field, value) => {
  let sql = `update c_machine_position set ${field}='${value}' where machine_id=${pos.machine_id} and position_type=${pos.position_type} and position_id=${pos.position_id}`
  // console.log('sql', pos.machine_id + ' - ' + pos.position_id);
  return execSQL(sql).then(res => {
    if(res.affectedRows > 0) {
      return true
    }
    return false
  })
}