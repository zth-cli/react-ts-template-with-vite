import { is } from '.'

/**
 * @description:  是否为函数
 */
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function isFunction<T = Function>(val: unknown): val is T {
  return is(val, 'Function')
}
