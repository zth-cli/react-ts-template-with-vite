/**
 * @description: 是否客户端
 * @example isClient() // true
 */
export const isClient = () => {
  return typeof window !== 'undefined'
}
