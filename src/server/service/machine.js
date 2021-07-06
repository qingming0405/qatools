/**
 * 机组相关的后端接口
 */
import {dao_getChildMachineList, dao_getFamilyMachineList} from '../dao/machine'

// 获取机组列表
export const serv_getMachineList = (t_id, flag='FAMILY') => {
  if(flag === 'CHILD') {
    return dao_getChildMachineList(t_id)
  }
  return dao_getFamilyMachineList(t_id)
}