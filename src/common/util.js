/**
 * 通用方法（项目）
 * @tianhe
 */
// 查找组织
export function getFolder(folderList, t_id) {
  return folderList.find(folder => {
    return folder.t_id === t_id
  })
}
// 查找机组
export function getMachine(machineList, mac_id) {
  return machineList.find(mac => {
    return mac.mac_id === mac_id
  })
}