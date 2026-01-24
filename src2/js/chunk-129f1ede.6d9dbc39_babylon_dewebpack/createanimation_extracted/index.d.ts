/**
 * Data Cache Management Module
 * 提供数据存储、检索、删除等核心功能的类型定义
 */

/**
 * 数据值类型 - 支持任意可序列化的数据
 */
type DataValue = string | number | boolean | object | null | undefined;

/**
 * 数据元信息接口
 */
interface DataMeta {
  /** 创建时间戳 */
  createdAt?: number;
  /** 更新时间戳 */
  updatedAt?: number;
  /** 过期时间戳 */
  expiresAt?: number;
  /** 自定义元数据 */
  [key: string]: unknown;
}

/**
 * 设置数据项
 * @param key - 数据键
 * @param value - 数据值
 * @param meta - 可选的元信息
 * @returns 是否设置成功
 */
export declare function set(key: string, value: DataValue, meta?: DataMeta): boolean;

/**
 * 获取数据项
 * @param key - 数据键
 * @returns 数据值，不存在时返回undefined
 */
export declare function get<T = DataValue>(key: string): T | undefined;

/**
 * 移除数据项
 * @param key - 数据键
 * @returns 是否移除成功
 */
export declare function remove(key: string): boolean;

/**
 * 获取数据项的元信息
 * @param key - 数据键
 * @returns 元信息对象，不存在时返回undefined
 */
export declare function getData(key: string): DataMeta | undefined;

/**
 * 清理/释放资源
 * @param key - 可选的键，不提供则清理所有
 * @returns 清理的项目数量
 */
export declare function dispose(key?: string): number;

/**
 * 转换为JSON格式
 * @returns 所有数据的JSON表示
 */
export declare function toJSON(): Record<string, { value: DataValue; meta?: DataMeta }>;

/**
 * 模块内部工具函数类型
 * @internal
 */
declare namespace Internal {
  /** 验证键的有效性 */
  function validateKey(key: string): boolean;
  
  /** 序列化数据 */
  function serialize(value: DataValue): string;
  
  /** 反序列化数据 */
  function deserialize(data: string): DataValue;
  
  /** 检查是否过期 */
  function isExpired(meta: DataMeta): boolean;
  
  /** 生成时间戳 */
  function timestamp(): number;
  
  /** 深度克隆对象 */
  function deepClone<T>(obj: T): T;
}