/**
 * 资源性能数据上报参数接口
 */
interface ResourcePerformanceData {
  /** 开始时间戳（毫秒） */
  begin: number;
  /** DOM 解析完成时间 */
  dom: number | string;
  /** 页面加载完成时间 */
  load: number | string;
  /** 资源加载详情数组 */
  res: Array<unknown>;
  /** 下载相关数据 */
  dl: number | string;
}

/**
 * 日志上报选项配置
 */
interface LogOptions {
  /** 采样率 (0-1) */
  sample?: number;
  /** 是否立即发送 */
  sendNow?: boolean;
  /** 自定义标签 */
  tag?: string;
  [key: string]: unknown;
}

/**
 * 资源性能监控模块声明
 * @module module_resource
 * @original-id resource
 */
declare module 'module_resource' {
  /**
   * 上报资源性能数据
   * 
   * @param data - 资源性能数据对象，必须包含 begin/dom/load/res/dl 字段
   * @param options - 日志上报选项配置
   * @returns 返回当前实例以支持链式调用
   * 
   * @example
   *