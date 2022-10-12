/**
 * @description is Function
 */
export function isFunction(val: unknown): val is Function {
  return typeof val === "function";
}

/**
 * @description get element plus name
 */
export function getPlusName(name: string): string {
  return `El${name.replace(/( |^)[a-z]/g, L => L.toUpperCase())}`;
}
