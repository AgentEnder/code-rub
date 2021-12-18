/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { assertType } from './typescript';

/**
 * @description Produces a deep clone (no references to original object or child objects) of the provided object or array.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function deepClone<T = any>(obj: Array<unknown> | Object): T {
  const ret = Array.isArray(obj) ? [] : {};
  for (const key in obj) {
    if (obj[key] === null) {
      ret[key] = null;
    } else if (obj[key] instanceof Date) {
      //typeof date = [object Object], results in empty object.
      const value = obj[key];
      assertType<Date>(value);
      ret[key] = new Date(value.valueOf());
    } else if (typeof obj[key] === 'object') {
      ret[key] = deepClone(obj[key]);
    } else {
      ret[key] = obj[key];
    }
  }
  assertType<T>(ret);
  return ret;
}

export function deepMerge<T1, T2>(obj1: T1, obj2: T2): T1 & T2 {
  const result: any = {};
  if (obj1 === null) {
    return obj2 === null ? null : deepClone(obj2);
  }
  Object.entries(obj1).forEach(([key, value]) => {
    if (key in obj2) {
      // potential overwrite
      if (typeof value !== typeof obj2[key]) {
        // value type mismatch, always take obj2's values.
        result[key] = obj2[key];
      } else if (typeof value == 'object') {
        result[key] = deepMerge(value, obj2[key]);
      } else {
        result[key] = obj2[key];
      }
    } else {
      result[key] = value;
    }
  });
  Object.entries(obj2)
    .filter(([key]) => !(key in obj1))
    .forEach(([key, value]) => {
      result[key] = value;
    });
  return result;
}
