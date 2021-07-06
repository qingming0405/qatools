/**
 * 通用前端接口
 */
import { SuccessModel, ErrorModel } from "../model/responoseModel"
import {serv_getAllFolderList} from '../service/folder'
import {serv_getMachineList} from '../service/machine'

// 获取全部组织
export const api_getAllFolderList = (t_root = -1) => {
  return serv_getAllFolderList(t_root).then(list => {
    return new SuccessModel(list)
  })
}

// 获取机组列表
export const api_getMachineList = (t_id, flag='FAMILY') => {
  return serv_getMachineList(t_id, flag).then(list => {
    return new SuccessModel(list)
  })
}