/**
 * 导入导出前端接口
 */
import { SuccessModel, ErrorModel } from "../model/responoseModel"
import { POS_TYPE } from "common/const.js";
import { getPropFromXmlStr } from "common/util.js";
import { serv_getAllPosMap, serv_updatePosProp } from "../service/position";

// 获取选中机组的偏移量
export const api_getAllPositionList_offset = (macIds) => {
  let posTypes = [POS_TYPE.TYPE_ANGLE]
  return serv_getAllPosMap(macIds, posTypes).then(map => {
    let newMap = {}
    let pos = {}
    for (const mac_id in map) {
      newMap[mac_id] = {}
      for (const key in map[mac_id]) {
        pos = map[mac_id][key]
        newMap[mac_id][key] = {
          mac_id,
          pos_type: pos.position_type,
          pos_id: pos.position_id,
          pos_name: pos.position_name,
          offset: getPropFromXmlStr(pos.pos_xml_config, 'offset')
        }
      }
    }
    return new SuccessModel(newMap)
  })
}

// 更新某机组的偏移量设置
export const api_updateOffset = (mac_id, offsetMap) => {
  // let keys = Object.keys(offsetMap)
  // let key = keys.pop()
  // let pos = {
  //   machine_id: offsetMap[key].mac_id,
  //   position_type: offsetMap[key].pos_type,
  //   position_id: offsetMap[key].pos_id
  // }
  // let offset = offsetMap[key].offset
  // return serv_updatePosProp(pos, 'pos_xml_config', 'offset', offset).then(res => {
  //   return new SuccessModel(res) 
  // })

  let promiseArr = []
  for (let key in offsetMap) {
    let pos = {
      machine_id: offsetMap[key].mac_id,
      position_type: offsetMap[key].pos_type,
      position_id: offsetMap[key].pos_id
    }
    let offset = offsetMap[key].offset
    promiseArr.push(serv_updatePosProp(pos, 'pos_xml_config', 'offset', offset))
  }
  
  return Promise.all(promiseArr).then(results => {
    let result = results.every(value => value) // 检查是否每个测点都设置成功
    return new SuccessModel(result)
  })
}