/**
 * 测点相关的后端接口
 */
import { updatePropFromXmlStr } from 'common/util.js'
import { dao_getPos, dao_getPosList, dao_getAllPosList, dao_updatePosField } from "../dao/position";

// 获取某个机组下的测点表
export const serv_getPositionList = (mac_id) => {
  return dao_getPosList(mac_id)
}

// 获取所有机组下的测点表
export const serv_getAllPosMap = (macIds, posTypes = []) => {
  return dao_getAllPosList(macIds, posTypes).then(list => {
    let posMap = {}
    list.forEach(pos => {
      let key = pos.machine_id + '_' + pos.position_type + '_' + pos.position_id
      if(!posMap.hasOwnProperty(pos.machine_id)) {
        posMap[pos.machine_id] = {}
      }
      posMap[pos.machine_id][key] = pos
    });
    return posMap
  })
}

// 修改测点的某个字段值
export const serv_updatePosField = (pos, field, value) => {
  return dao_updatePosField(pos, field, value)
}

// 修改测点字段（xml）中的某个属性值
export const serv_updatePosProp = (pos, field, prop, value) => {
  return dao_getPos(pos.machine_id, pos.position_type, pos.position_id).then(res_pos => {
    if(res_pos) {
      return updatePropFromXmlStr(res_pos[field], prop, value)       
    }
  }).then(xml_config => {
    return dao_updatePosField(pos, field, xml_config)
  })
}
