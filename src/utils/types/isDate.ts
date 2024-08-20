import { is } from '.'

/**
 * @description:  是否为时间
 * @example: isDate(new Date()) => true
 */
export function isDate(val: unknown): val is Date {
  return is(val, 'Date')
}
