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

// 获取xml字符串的属性
export function getPropFromXmlStr(xmlStr, prop) {
  let startIndex = xmlStr.indexOf(prop+'=')
  if(startIndex >= 0) {
    let start = xmlStr.indexOf('\"', startIndex) // 属性值的引号索引
    let end = xmlStr.indexOf('\"', start+1)
    return xmlStr.slice(start+1, end)
  }
  return ''
}