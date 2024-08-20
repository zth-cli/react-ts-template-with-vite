import { is } from '.'

/**
 * @description: 是否为浏览器
 */
export const isWindow = (val: unknown): val is Window => {
  return typeof window !== 'undefined' && is(val, 'Window')
}
