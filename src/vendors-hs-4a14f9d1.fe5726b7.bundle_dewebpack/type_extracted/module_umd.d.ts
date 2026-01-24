/**
 * UMD 模块包装器生成器的类型定义
 * @module module_umd
 */

/**
 * 模块选项配置接口
 */
interface ModuleOptions {
  /** 模块依赖项映射，键为内部名称，值为模块路径 */
  dependencies: Record<string, string>;
  /** 导出的全局变量名，null 表示不导出全局变量 */
  exportVar: string | null;
}

/**
 * 工具对象集合接口
 */
interface Utils {
  /** 对象操作工具 */
  objects: {
    /** 提取对象的所有值 */
    values<T>(obj: Record<string, T>): T[];
    /** 提取对象的所有键 */
    keys<T>(obj: Record<string, T>): string[];
  };
  /** 数组操作工具 */
  arrays: {
    /** 数组映射函数 */
    map<T, R>(array: T[], mapper: (item: T) => R): R[];
  };
  /** JavaScript 工具 */
  js: {
    /** 转义字符串中的特殊字符用于 JS 代码 */
    stringEscape(str: string): string;
  };
}

/**
 * 模块生成器函数类型
 */
interface ModuleGenerator {
  /** 获取模块头部代码 */
  t(): string;
  /** 获取模块体代码 */
  A: string;
  /** 获取模块导出表达式 */
  e(): string;
}

/**
 * 生成 UMD 模块包装代码
 * 
 * 此函数生成兼容 AMD、CommonJS 和浏览器全局变量的通用模块定义包装器。
 * 
 * @returns 完整的 UMD 包装器代码字符串
 * 
 * @example
 *