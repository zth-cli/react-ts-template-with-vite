/**
 * @description: 是否客户端
 */
export const isClient = () => {
  return typeof window !== 'undefined'
}
