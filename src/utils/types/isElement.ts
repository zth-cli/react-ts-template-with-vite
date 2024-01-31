// noinspection ES6PreferShortImport

import { isObject } from '.'

export const isElement = (val: unknown): val is Element => {
  return isObject(val) && !!val.tagName
}
