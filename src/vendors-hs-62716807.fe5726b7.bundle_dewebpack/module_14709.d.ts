/**
 * 属性描述符接口
 */
interface PropertyDescriptor {
  /** 属性值 */
  value?: unknown;
  /** 是否可写 */
  writable?: boolean;
  /** 是否可枚举 */
  enumerable?: boolean;
  /** 是否可配置 */
  configurable?: boolean;
  /** getter函数 */
  get?(): unknown;
  /** setter函数 */
  set?(v: unknown): void;
  /** 是否为shim/polyfill */
  sham?: boolean;
}

/**
 * 导出配置选项
 */
interface ExportOptions {
  /** 目标对象名称 */
  target: string;
  
  /** 是否为全局导出 */
  global?: boolean;
  
  /** 是否为静态方法导出 */
  stat?: boolean;
  
  /** 是否禁用getter/setter调用 */
  dontCallGetSet?: boolean;
  
  /** 是否为shim/polyfill实现 */
  sham?: boolean;
  
  /** 是否强制覆盖已存在的属性 */
  forced?: boolean;
}

/**
 * 导出属性映射
 * key为属性名,value为要导出的值
 */
interface ExportProperties {
  [key: string]: unknown;
}

/**
 * 核心导出函数
 * 用于向目标对象(全局对象/构造函数/原型)添加属性或方法
 * 
 * @param options - 导出配置选项
 * @param properties - 要导出的属性映射表
 * 
 * @example
 *