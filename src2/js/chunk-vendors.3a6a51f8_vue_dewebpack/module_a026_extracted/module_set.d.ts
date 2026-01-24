/**
 * Set模块 - 响应式值设置器
 * @module module_set
 * @originalId set
 */

/**
 * 响应式值设置函数
 * 用于更新响应式数据并触发依赖通知
 * 
 * @template T - 值的类型
 * @param newValue - 要设置的新值
 * @returns void
 * 
 * @remarks
 * - 使用严格相等(===)和NaN检测进行值比较
 * - 仅在值实际改变时触发更新
 * - 支持自定义setter函数
 * - 自动处理依赖收集和通知
 */
export declare function set<T>(newValue: T): void;

/**
 * 响应式值设置器配置接口
 */
export interface SetterConfig<T> {
  /** 当前存储的值 */
  currentValue: T;
  
  /** 自定义getter函数(可选) */
  getter?: () => T;
  
  /** 自定义setter函数(可选) */
  setter?: (value: T) => void;
  
  /** 是否只读 */
  readonly?: boolean;
  
  /** 依赖收集器 */
  collector?: DependencyCollector;
}

/**
 * 依赖收集器接口
 */
export interface DependencyCollector {
  /** 通知所有依赖项更新 */
  notify(): void;
  
  /** 收集依赖 */
  collect(target: unknown): void;
}

/**
 * 值比较辅助函数
 * 处理严格相等和NaN情况
 * 
 * @param newValue - 新值
 * @param oldValue - 旧值
 * @returns 值是否相同
 */
export declare function isSameValue<T>(newValue: T, oldValue: T): boolean;