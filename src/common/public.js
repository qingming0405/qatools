/**
 * 通用方法（项目无关）
 * @tianhe
 */
export function downloadFile(content, fileName) {
  let ele = document.createElement('a')
  ele.download = fileName
  ele.style.display = 'none'
  let blob = new Blob([content])
  ele.href = URL.createObjectURL(blob)
  document.body.appendChild(ele)
  ele.click()
  document.body.removeChild(ele)
}