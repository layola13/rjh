/**
 * 表单字段存储管理器
 * 用于存储和管理表单字段的键值对，支持嵌套路径匹配
 */

/**
 * 字段项接口
 * @template T 字段值的类型
 */
export interface FieldItem<T = any> {
  /** 字段路径，使用数组表示嵌套结构，如 ['user', 'name'] */
  key: string[];
  /** 字段的值 */
  value: T;
}

/**
 * 字段名称路径类型
 * 可以是字符串、数字或它们的数组
 */
export type NamePath = string | number | (string | number)[];

/**
 * 更新函数类型
 * @template T 字段值的类型
 * @param value 当前字段值
 * @returns 更新后的值，返回 undefined 或 null 将删除该字段
 */
export type UpdateFunction<T = any> = (value: T | undefined) => T | undefined | null;

/**
 * 映射函数类型
 * @template T 字段值的类型
 * @template R 映射结果的类型
 * @param item 字段项
 * @param index 当前索引
 * @param array 完整数组
 * @returns 映射后的结果
 */
export type MapFunction<T = any, R = any> = (
  item: FieldItem<T>,
  index: number,
  array: FieldItem<T>[]
) => R;

/**
 * 表单字段存储类
 * 提供字段的增删改查功能，支持路径匹配和批量操作
 */
export default class FieldStore {
  /**
   * 字段列表
   * 存储所有表单字段的键值对
   */
  list: FieldItem[];

  /**
   * 构造函数
   * 初始化空的字段列表
   */
  constructor();

  /**
   * 设置字段值
   * 如果字段已存在则更新，否则新增
   * @param key 字段路径
   * @param value 字段值
   */
  set<T = any>(key: NamePath, value: T): void;

  /**
   * 获取字段值
   * @param key 字段路径
   * @returns 字段值，如果不存在返回 undefined
   */
  get<T = any>(key: NamePath): T | undefined;

  /**
   * 更新字段值
   * 通过回调函数更新字段，如果回调返回 null/undefined 则删除字段
   * @param key 字段路径
   * @param updater 更新函数，接收当前值返回新值
   */
  update<T = any>(key: NamePath, updater: UpdateFunction<T>): void;

  /**
   * 删除字段
   * @param key 字段路径
   */
  delete(key: NamePath): void;

  /**
   * 映射字段列表
   * 对每个字段执行映射函数
   * @param mapper 映射函数
   * @returns 映射后的数组
   */
  map<R = any>(mapper: MapFunction<any, R>): R[];

  /**
   * 转换为 JSON 对象
   * 将字段列表转换为普通对象，路径用点号连接
   * @returns 字段的 JSON 表示，键为路径字符串（如 "user.name"），值为字段值
   * @example
   * // 输入: [{ key: ['user', 'name'], value: 'John' }]
   * // 输出: { "user.name": "John" }
   */
  toJSON(): Record<string, any>;
}