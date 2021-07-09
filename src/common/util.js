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

// 修改xml字符串的属性
export function updatePropFromXmlStr(xmlStr, prop, newValue) {
  let startIndex = xmlStr.indexOf(prop+'=')
  if(startIndex >= 0) {
    let start = xmlStr.indexOf('\"', startIndex) // 属性值的引号索引
    let end = xmlStr.indexOf('\"', start+1)
    return xmlStr.slice(0, start+1).concat(newValue).concat(xmlStr.slice(end))
  }
  return xmlStr
}

// 保留有效数字
export function round(num, dig = 255) {
  let val = Math.abs(num);
  // 若数据过大或者过小时
  if (String(num).indexOf('e') !== -1) {
    let stringNum = String(num)
    let [a, b] = stringNum.split('e')
    if (b.indexOf('+') !== -1) {
      let len = 10 ** 3;
      return Math.round(a * len) / len + 'e' + b;
    }
  }
  if (val >= 10 ** 8 || val === 0) {
    return val;
  }
  if (dig === 255) {
    dig = 0;
    let value = val;
    while (value < 1) {
      value *= 10;
      dig++;
    }
    dig += 2;
    val >= 1000 && (dig = 0);
    val >= 10 && (dig = 1);
  }
  let len = 10 ** dig;
  return Math.round(num * len) / len;
}