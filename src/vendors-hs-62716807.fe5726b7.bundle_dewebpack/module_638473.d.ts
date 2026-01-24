/**
 * First Meaningful Paint (FMP) 监控模块
 * 用于检测和报告页面首次有意义绘制的性能指标
 */

import type { RetcodeInstance, RetcodeConfig } from './retcode';
import type { UtilityModule } from './utility';

/**
 * 元素评分记录
 */
interface ScoreRecord {
  /** 当前DOM树的复杂度评分 */
  score: number;
  /** 相对于页面加载开始的时间戳（毫秒） */
  t: number;
}

/**
 * FMP候选时间点
 */
interface FmpCandidate {
  /** 候选时间点（毫秒） */
  t: number;
  /** 评分增长率 */
  rate: number;
}

/**
 * 性能数据上报接口
 */
interface PerformanceData {
  /** First Meaningful Paint 时间（毫秒） */
  fmp?: number;
}

/**
 * Retcode实例扩展方法
 */
declare module './retcode' {
  interface RetcodeInstance {
    /** 配置对象 */
    _conf?: RetcodeConfig;
    /** 页面加载开始时间戳 */
    _startTime: number;
    /** FMP检测延迟定时器 */
    fmpTimmer?: number | null;

    /**
     * 初始化FMP观察器
     * @param timeout - 超时时间（毫秒）
     * @returns MutationObserver实例或null
     */
    initFmpObserver(timeout: number): MutationObserver | null;

    /**
     * 结束观察并计算FMP
     * @param timeout - 超时时间（毫秒）
     * @param isBeforeUnload - 是否在页面卸载前触发
     */
    endObserving(timeout: number, isBeforeUnload?: boolean): void;

    /**
     * 发送性能数据
     * @param data - 性能指标数据
     */
    sendPerformance(data?: PerformanceData): void;

    /**
     * 页面准备就绪时执行回调
     * @param callback - 回调函数
     */
    onReady(callback: () => void): void;
  }

  interface RetcodeConfig {
    /** 是否启用FMP监控 */
    useFmp?: boolean;
  }
}

/**
 * 工具模块接口
 */
interface UtilityModule {
  /**
   * 扩展对象属性
   * @param target - 目标对象
   * @param source - 源对象
   */
  ext(target: any, source: any): void;

  /**
   * 延迟执行函数
   * @param fn - 待执行函数
   * @param delay - 延迟时间（毫秒）
   * @returns 定时器ID
   */
  delay(fn: () => void, delay: number): number;

  /**
   * 绑定事件监听器
   * @param target - 事件目标
   * @param event - 事件名称
   * @param handler - 事件处理函数
   */
  on(target: EventTarget, event: string, handler: EventListener): void;

  /**
   * 输出警告信息
   * @param message - 警告消息
   */
  warn(message: string): void;
}

/**
 * 导出模块工厂函数
 * @param utilModule - 工具模块
 * @param window - 窗口对象
 * @param document - 文档对象
 */
export default function (
  utilModule: UtilityModule,
  window: Window,
  document: Document
): void;