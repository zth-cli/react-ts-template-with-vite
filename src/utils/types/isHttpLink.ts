// 判断是否是http链接
export function isHttpLink(link: string): boolean {
  return link.search(/^http[s]?:\/\//) !== -1
}
