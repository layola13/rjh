/**
 * 日志工具类
 * 提供条件化的控制台日志输出功能，仅在非生产环境下输出日志
 */
declare class Logger {
  /**
   * 检查是否可以输出日志
   * @returns 当满足以下条件时返回true：
   * - 存在HSApp.Config.ENV配置
   * - ENV不等于"prod"
   * - 不在Node.js环境中运行
   */
  static canOutput(): boolean;

  /**
   * 内部日志方法，根据日志级别调用相应的console方法
   * @param level - console对象的方法名（如'log', 'info', 'warn'等）
   * @param args - 要输出的参数列表
   */
  static _log(level: string, args: unknown[]): void;

  /**
   * 输出普通日志信息
   * @param args - 要记录的内容
   */
  static log(...args: unknown[]): void;

  /**
   * 输出信息级别日志
   * @param args - 要记录的内容
   */
  static info(...args: unknown[]): void;

  /**
   * 输出警告级别日志
   * @param args - 要记录的内容
   */
  static warn(...args: unknown[]): void;

  /**
   * 输出错误级别日志
   * @param args - 要记录的内容
   */
  static error(...args: unknown[]): void;

  /**
   * 以表格形式输出数据
   * @param args - 要以表格形式展示的数据
   */
  static table(...args: unknown[]): void;

  /**
   * 创建一个新的内联分组
   * @param args - 分组标签
   */
  static group(...args: unknown[]): void;

  /**
   * 退出当前内联分组
   * @param args - 可选参数
   */
  static groupEnd(...args: unknown[]): void;

  /**
   * 启动一个计时器
   * @param args - 计时器标签
   */
  static time(...args: unknown[]): void;

  /**
   * 停止一个计时器并输出经过的时间
   * @param args - 计时器标签
   */
  static timeEnd(...args: unknown[]): void;
}

export default Logger;