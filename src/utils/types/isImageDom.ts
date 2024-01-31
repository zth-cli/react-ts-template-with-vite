// 是否为图片节点
export function isImageDom(o: Element) {
  return o && ['IMAGE', 'IMG'].includes(o.tagName)
}
