/**
 * @description:  是否为数组
 * @example
 * const arr = [1, 2, 3]
 * console.log(isArray(arr)) // true
 */
export function isArray(val: unknown): val is Array<unknown> {
  return !!val && Array.isArray(val)
}
