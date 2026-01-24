/**
 * 根据行键从扁平化的键值映射中获取对应的数据记录
 * @template RecordType 数据记录的类型
 * @param data 原始数据数组
 * @param childrenColumnName 子节点列名
 * @param getRowKey 获取行键的函数
 * @returns 返回一个函数，该函数接受行键并返回对应的数据记录
 */
export default function useRecordByKey<RecordType extends Record<string, any>>(
  data: readonly RecordType[],
  childrenColumnName: string,
  getRowKey: (record: RecordType, index: number) => React.Key
): [(key: React.Key) => RecordType | undefined];

/**
 * Hook返回值：一个查找函数的元组
 */
type UseRecordByKeyReturn<RecordType> = [
  /**
   * 根据键查找记录
   * @param key 行键
   * @returns 对应的数据记录，如果不存在则返回undefined
   */
  (key: React.Key) => RecordType | undefined
];

/**
 * 缓存引用的数据结构
 * @template RecordType 数据记录的类型
 */
interface CacheRef<RecordType> {
  /** 原始数据数组 */
  data: readonly RecordType[];
  /** 子节点列名 */
  childrenColumnName: string;
  /** 键值映射表：key -> record */
  kvMap: Map<React.Key, RecordType>;
  /** 获取行键的函数 */
  getRowKey: (record: RecordType, index: number) => React.Key;
}

/**
 * 用于通过键快速查找树形数据记录的React Hook
 * 
 * 该Hook会遍历树形结构的数据，将所有节点（包括嵌套子节点）扁平化到一个Map中，
 * 以行键作为索引，实现O(1)时间复杂度的查找。
 * 
 * 仅当data、childrenColumnName或getRowKey发生变化时才会重新构建映射表。
 * 
 * @template RecordType 数据记录的类型，必须是对象类型
 * @param data 树形数据数组
 * @param childrenColumnName 子节点数组的属性名（如'children'）
 * @param getRowKey 从记录和索引提取唯一键的函数
 * @returns 返回包含查找函数的元组
 * 
 * @example
 *