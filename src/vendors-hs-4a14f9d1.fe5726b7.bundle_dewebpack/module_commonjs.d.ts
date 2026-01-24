/**
 * 模块依赖配置接口
 * 定义外部依赖的名称到导入路径的映射关系
 * @example
 * {
 *   "lodash": "lodash",
 *   "moment": "moment"
 * }
 */
interface ModuleDependencies {
  [dependencyName: string]: string;
}

/**
 * 模块代码生成选项
 * 用于配置CommonJS模块的生成参数
 */
interface ModuleGenerationOptions {
  /**
   * 模块依赖项映射表
   * 键为模块引用名称,值为实际的require路径
   */
  dependencies: ModuleDependencies;
}

/**
 * 工具对象接口集合
 */
declare namespace Utils {
  /**
   * 对象操作工具
   */
  export interface ObjectUtils {
    /**
     * 获取对象的所有键
     * @param obj - 要提取键的对象
     * @returns 对象键的数组
     */
    keys<T extends object>(obj: T): Array<keyof T>;
  }

  /**
   * 数组操作工具
   */
  export interface ArrayUtils {
    /**
     * 对数组中的每个元素执行映射操作
     * @template T - 输入数组元素类型
     * @template U - 输出数组元素类型
     * @param array - 要映射的数组
     * @param callback - 映射回调函数
     * @returns 映射后的新数组
     */
    map<T, U>(array: readonly T[], callback: (item: T, index: number) => U): U[];
  }

  /**
   * JavaScript字符串处理工具
   */
  export interface JsUtils {
    /**
     * 对字符串进行JavaScript转义处理
     * 转义特殊字符如引号、反斜杠等,使其可以安全地嵌入JavaScript字符串中
     * @param str - 需要转义的原始字符串
     * @returns 转义后的安全字符串
     */
    stringEscape(str: string): string;
  }
}

/**
 * 全局工具对象声明
 */
declare const objects: Utils.ObjectUtils;
declare const arrays: Utils.ArrayUtils;
declare const js: Utils.JsUtils;

/**
 * 生成模块头部代码
 * @returns 模块头部的代码字符串
 */
declare function t(): string;

/**
 * 生成模块主体代码
 * @returns 模块主体的代码字符串
 */
declare function A(): string;

/**
 * 生成模块导出表达式
 * @returns 模块导出值的代码字符串
 */
declare function e(): string;

/**
 * CommonJS模块代码生成器
 * 根据提供的选项生成符合CommonJS规范的模块代码
 * 
 * 生成的代码包含:
 * 1. "use strict" 严格模式声明
 * 2. 依赖项的require语句
 * 3. 模块主体代码
 * 4. module.exports导出语句
 * 
 * @param options - 模块生成选项,包含依赖配置
 * @returns 完整的CommonJS模块代码字符串
 * 
 * @example
 *