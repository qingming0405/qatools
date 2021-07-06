/**
 * 组织相关的后端接口
 */
import {dao_getAllFolderList, dao_getFolder} from '../dao/folder'

// 获取所有组织
export const serv_getAllFolderList = (t_root = -1) => {
  return dao_getAllFolderList(t_root)
}