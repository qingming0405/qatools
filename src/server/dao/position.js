/**
 * 机组相关的sql方法
 */
import { execSQL } from '../db/mysql'

// 获取某个机组下的测点表
export const dao_getPositionList = (mac_id) => {
  let sql = `select * from c_machine_position where machine_id=${mac_id} and status=0`
  return execSQL(sql)
}

// 获取所有机组下的测点表
export const dao_getAllPositionList = (macIds, posTypes = []) => {
  let sql = `select * from c_machine_position where machine_id in (${macIds.toString()}) `
  if(posTypes.length > 0) {
    sql += `and position_type in (${posTypes.toString()} )`
  }
  sql += `and status=0 order by machine_id`
  console.log('sql', sql);
  return execSQL(sql)
}