/** 判断字符串是否是json结构 */
export const isJSON = (str: string): boolean | undefined => {
  if (!str) {
    return false
  }
  try {
    const obj = JSON.parse(str)
    return !!(typeof obj === 'object' && obj)
  } catch (e) {
    return !e
  }
}
