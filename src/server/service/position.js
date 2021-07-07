/**
 * 测点相关的后端接口
 */
import { dao_getPositionList, dao_getAllPositionList } from "../dao/position";

// 获取某个机组下的测点表
export const serv_getPositionList = (mac_id) => {
  return dao_getPositionList(mac_id)
}

// 获取所有机组下的测点表
export const serv_getAllPosMap = (macIds, posTypes = []) => {
  return dao_getAllPositionList(macIds, posTypes).then(list => {
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
