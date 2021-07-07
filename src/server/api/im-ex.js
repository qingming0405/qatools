/**
 * 导入导出前端接口
 */
import { SuccessModel, ErrorModel } from "../model/responoseModel"
import { POS_TYPE } from "common/const.js";
import { getPropFromXmlStr } from "common/util.js";
import { serv_getAllPosMap } from "../service/position";

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