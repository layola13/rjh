/**
 * 迭代器工具类，用于处理键值集合
 */
interface KeysCollection {
  __keys__: Record<string, string>;
  [key: string]: any;
}

interface IteratorUtil {
  iter<T>(items: T[]): Iterator<T>;
}

/**
 * 从对象的 __keys__ 属性中提取所有自有属性的键值并返回迭代器
 * @returns 包含所有键值的迭代器
 */
function getKeysIterator(this: { h: KeysCollection }, C: IteratorUtil): Iterator<string> {
  const keys: string[] = [];
  
  for (const property in this.h.__keys__) {
    if (this.h.hasOwnProperty(property)) {
      keys.push(this.h.__keys__[property]);
    }
  }
  
  return C.iter(keys);
}

export { getKeysIterator, KeysCollection, IteratorUtil };