import { is } from '.'

/**
 * @description:  是否为boolean类型
 * @example console.log(isBoolean(true)) // true
 */
export function isBoolean(val: unknown): val is boolean {
  return is(val, 'Boolean')
}
