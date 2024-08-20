export const toString = Object.prototype.toString

/**
 * @description: 判断值是否未某个类型
 * @example is(1, 'Number') // true
 */
export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`
}
