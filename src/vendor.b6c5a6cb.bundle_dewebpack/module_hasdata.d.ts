/**
 * 检查指定对象是否包含数据
 * @description 通过检查对象的 expando 属性来判断是否存在非空数据
 * @param target - 要检查的目标对象
 * @returns 如果对象包含数据则返回 true，否则返回 false
 */
export function hasData(this: { expando: string }, target: Record<string, unknown>): boolean {
  const expandoData = target[this.expando];
  return expandoData !== undefined && !isEmptyObject(expandoData);
}

/**
 * 检查对象是否为空
 * @param obj - 要检查的对象
 * @returns 如果对象没有可枚举属性则返回 true
 */
function isEmptyObject(obj: unknown): boolean {
  if (obj === null || obj === undefined || typeof obj !== 'object') {
    return true;
  }
  
  for (const key in obj as Record<string, unknown>) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return false;
    }
  }
  
  return true;
}