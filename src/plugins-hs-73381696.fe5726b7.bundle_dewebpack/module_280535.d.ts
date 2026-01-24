/**
 * 性能指标跟踪插件
 * 用于收集和报告应用加载性能、资源加载和用户交互指标
 */

import { IPlugin } from 'HSApp.Plugin';
import { Signal } from 'HSCore.Util';
import { EventTrack, EventGroupEnum } from 'HSApp.Util';
import { App } from 'HSApp.App';

/**
 * 性能时间数据接口
 */
export interface PerformanceTimeData {
  /** 页面启动时间戳 */
  timePageStartup: number;
  /** 应用就绪时间戳 */
  timeAppReady: number;
  /** 设计文档打开时间戳 */
  timeOpenDesign: number;
  /** 资源加载完成时间戳 */
  timeResoureLoaded: number;
  /** 应用加载耗时（毫秒） */
  loadingApp: number;
  /** 打开设计文档耗时（毫秒） */
  openDesign: number;
  /** 发布版本号 */
  publishVersion?: string;
  /** 按类型分类的发布版本 */
  publishVersionByType?: Record<string, string>;
}

/**
 * 资源性能条目
 */
export interface ResourcePerformanceEntry {
  /** 资源名称/URL */
  name: string;
  /** 开始时间（相对于页面加载） */
  startTime: number;
  /** 持续时间（毫秒） */
  duration: number;
  /** 传输大小（字节） */
  transferSize: number;
  /** 响应结束时间 */
  responseEnd: number;
}

/**
 * 性能数据分类容器
 */
export interface PerformanceDataBucket {
  /** 应用加载阶段的资源 */
  LoadingApp?: ResourcePerformanceEntry[];
  /** 打开设计阶段的资源 */
  OpenDesign?: ResourcePerformanceEntry[];
  /** 时间数据 */
  timeData?: PerformanceTimeData;
}

/**
 * 插件选项配置
 */
export interface PluginOptions {
  /** 插件名称 */
  name: string;
  /** 插件描述 */
  description: string;
  /** 依赖的插件列表 */
  dependencies: string[];
}

/**
 * 性能指标跟踪插件
 * 负责收集应用性能数据、资源加载指标和网络状态
 */
declare class MetricsPlugin extends IPlugin {
  /**
   * 鼠标事件信号
   * 用于分发和监听鼠标交互事件
   */
  signalMouseEvent: Signal<MouseEvent>;

  /**
   * 性能观察器
   * 监控浏览器资源加载性能
   */
  private perfObserver?: PerformanceObserver;

  /**
   * 性能计时器
   * 用于FPS和性能指标采样
   */
  private ticker?: any;

  /**
   * 命令管理器
   * 处理性能相关的命令
   */
  private command?: any;

  /**
   * 网络检测器
   * 检测网络连接状态和质量
   */
  private networkDetect?: any;

  constructor();

  /**
   * 开始性能观察
   * @param performanceEntryList - 浏览器性能条目列表
   */
  private startPerformanceObserver(performanceEntryList: PerformanceObserverEntryList): void;

  /**
   * 插件激活回调
   * 初始化性能监控、事件监听和资源追踪
   * @param options - 插件选项配置
   */
  onActive(options: PluginOptions): void;

  /**
   * 分发鼠标事件
   * @param event - 原生鼠标事件
   */
  private _dispatchMouseEnvent(event: MouseEvent): void;

  /**
   * 检测工具网络连接状态
   * @returns 网络检测结果的Promise
   */
  detectToolNetwork(): Promise<unknown>;

  /**
   * 插件停用回调
   * 清理资源和事件监听器
   */
  onDeactive(): void;
}

/**
 * 获取性能时间数据
 * 收集从页面启动到资源加载完成的各阶段时间指标
 * @returns 性能时间数据对象，如果没有设计ID则返回空对象
 */
declare function getPerformanceTimeData(): PerformanceTimeData | Record<string, never>;

/**
 * 处理资源性能条目
 * 将资源按加载阶段（应用加载/打开设计）分类存储
 * @param entries - 资源性能条目数组
 */
declare function handleResourcePerformanceEntries(entries: PerformanceEntry[]): void;

/**
 * 插件注册
 * 在HSApp插件系统中注册性能指标插件
 */
export function registerPlugin(): void;

export default MetricsPlugin;