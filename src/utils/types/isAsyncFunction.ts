import { is } from '.'

/**
 * @description:  是否为AsyncFunction
 * @example const asyncFn = async () => {
      return 'hello world'
    }
    console.log(isAsyncFunction(asyncFn)) // true
 */
export function isAsyncFunction<T = unknown>(val: unknown): val is Promise<T> {
  return is(val, 'AsyncFunction')
}
