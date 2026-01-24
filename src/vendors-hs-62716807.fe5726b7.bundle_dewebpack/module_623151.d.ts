/**
 * 性能计时数据收集模块
 * 用于收集和计算页面加载性能指标
 */

/**
 * 性能计时指标接口
 */
export interface PerformanceMetrics {
  /** DNS 查询耗时 (ms) */
  dns?: number;
  /** TCP 连接耗时 (ms) */
  tcp?: number;
  /** SSL 握手耗时 (ms) */
  ssl?: number;
  /** 首字节时间 (ms) */
  ttfb?: number;
  /** 内容传输耗时 (ms) */
  trans?: number;
  /** DOM 解析耗时 (ms) */
  dom?: number;
  /** 资源加载耗时 (ms) */
  res?: number;
  /** 首字节耗时（从导航开始） (ms) */
  firstbyte?: number;
  /** 首次绘制时间 (ms) */
  fpt?: number;
  /** 可交互时间 (ms) */
  tti?: number;
  /** DOM Ready 时间 (ms) */
  ready?: number;
  /** 页面完全加载时间 (ms) */
  load?: number;
  /** 网络连接类型 */
  ct: string;
  /** 网络带宽 (Mbps) */
  bandwidth?: number;
  /** 导航类型 */
  navtype: 'Reload' | 'Other';
  /** 性能数据收集起始时间戳 */
  begin: number;
}

/**
 * 计时索引映射
 * [结束时间索引, 开始时间索引]
 */
type TimingIndexPair = [number, number];

/**
 * 计时指标配置映射
 */
interface TimingConfig {
  dns: TimingIndexPair;
  tcp: TimingIndexPair;
  ssl: TimingIndexPair;
  ttfb: TimingIndexPair;
  trans: TimingIndexPair;
  dom: TimingIndexPair;
  res: TimingIndexPair;
  firstbyte: TimingIndexPair;
  fpt: TimingIndexPair;
  tti: TimingIndexPair;
  ready: TimingIndexPair;
  load: TimingIndexPair;
}

/**
 * 性能导航类型枚举
 */
declare const enum NavigationType {
  /** 正常导航 */
  Navigate = 0,
  /** 页面刷新 */
  Reload = 1,
  /** 前进/后退 */
  BackForward = 2,
  /** 预渲染 */
  Prerender = 3
}

/**
 * 收集并计算页面性能指标
 * 
 * 支持 Performance Timing API Level 1 和 Level 2
 * 计算包括 DNS、TCP、SSL、TTFB、DOM 解析等各项性能指标
 * 
 * @returns 性能指标对象，如果浏览器不支持则返回 null
 * 
 * @example
 *