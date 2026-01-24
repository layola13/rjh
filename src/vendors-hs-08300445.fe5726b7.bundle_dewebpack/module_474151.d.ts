/**
 * 表格列和数据处理工具函数集合
 * 提供列键生成、路径取值、对象合并等功能
 */

/**
 * 列的键类型：可以是字符串或数字
 */
type ColumnKey = string | number;

/**
 * 数据索引类型：可以是单个键、键数组或只读键数组
 */
type DataIndex = ColumnKey | ColumnKey[] | readonly ColumnKey[];

/**
 * 列定义接口
 */
interface Column {
  /**
   * 列的唯一标识键
   */
  key?: ColumnKey;
  
  /**
   * 数据索引，用于从数据源中获取值
   */
  dataIndex?: DataIndex;
  
  [key: string]: unknown;
}

/**
 * 默认的表格键名常量
 */
const RC_TABLE_KEY = "RC_TABLE_KEY";

/**
 * 将数据索引标准化为数组形式
 * @param value - 数据索引值
 * @returns 标准化后的数组
 */
function normalizeDataIndex(value: DataIndex | null | undefined): ColumnKey[] {
  if (value == null) return [];
  return Array.isArray(value) ? value : [value];
}

/**
 * 生成列的唯一键数组
 * 确保每个列都有唯一的键，避免重复
 * 
 * @param columns - 列配置数组
 * @returns 唯一键数组
 * 
 * @example
 *