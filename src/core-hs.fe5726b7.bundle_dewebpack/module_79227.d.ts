/**
 * 导出全局对象（浏览器环境为 window，Node 环境为 global）
 */
declare const global: typeof globalThis;

/**
 * 获取对象属性描述符的函数类型
 */
declare function getOwnPropertyDescriptor(
  target: object,
  property: PropertyKey
): PropertyDescriptor | undefined;

/**
 * 在对象上定义不可枚举属性的函数类型
 */
declare function createNonEnumerableProperty(
  target: object,
  property: PropertyKey,
  value: unknown
): void;

/**
 * 重新定义对象方法或属性的函数类型
 */
declare function redefine(
  target: object,
  property: PropertyKey,
  value: unknown,
  options: ExportOptions
): void;

/**
 * 在目标对象上设置全局命名空间的函数类型
 */
declare function setGlobal(name: string, value: object): object;

/**
 * 复制源对象的属性到目标对象的函数类型
 */
declare function copyConstructorProperties(
  target: object,
  source: object
): void;

/**
 * 检查方法是否需要导出的函数类型
 */
declare function isForced(
  path: string,
  forced: boolean | undefined
): boolean;

/**
 * 导出选项接口
 */
interface ExportOptions {
  /** 目标对象名称（如 Array, Object 等） */
  target: string;
  
  /** 是否为全局导出 */
  global?: boolean;
  
  /** 是否为静态方法导出 */
  stat?: boolean;
  
  /** 是否强制覆盖已有实现 */
  forced?: boolean;
  
  /** 是否为 shim（polyfill） */
  sham?: boolean;
  
  /** 是否禁止调用 getter/setter */
  dontCallGetSet?: boolean;
}

/**
 * 导出方法映射接口
 */
interface ExportMethods {
  [methodName: string]: unknown;
}

/**
 * 核心导出函数：用于向全局对象或构造函数原型上安装方法
 * 
 * @param options - 导出配置选项
 * @param methods - 要导出的方法映射表
 * 
 * @remarks
 * 该函数是 polyfill 系统的核心，负责：
 * 1. 确定导出目标（全局、静态、原型）
 * 2. 遍历方法并检查是否需要覆盖
 * 3. 复制静态属性
 * 4. 标记 shim 方法
 * 5. 重新定义目标方法
 */
declare function exportMethods(
  options: ExportOptions,
  methods: ExportMethods
): void;

export = exportMethods;