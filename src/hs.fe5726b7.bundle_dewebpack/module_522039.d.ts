/**
 * 值变化事件的回调函数类型
 */
export interface ValueChangeCallbacks {
  /** 值开始变化时触发 */
  onValueChangeStart?: (value: any) => void;
  /** 值变化过程中触发 */
  onValueChanged?: (value: any) => void;
  /** 值变化结束时触发 */
  onValueChangeEnd?: (value: any) => void;
}

/**
 * 值变化信号的数据结构
 */
export interface ValueChangeSignal {
  /** 变化的值 */
  value: any;
}

/**
 * 基础类的接口定义（从模块14199导入）
 */
export interface BaseClass {
  /** 单一值变化信号 */
  singalValueChanged: {
    dispatch: (data: ValueChangeSignal) => void;
  };
}

/**
 * 值控制器类的构造函数参数
 */
export interface ValueControllerOptions extends ValueChangeCallbacks {}

/**
 * 值控制器类
 * 继承自基础类，用于管理值的变化和相关事件回调
 */
export default class ValueController extends BaseClass {
  /**
   * 值开始变化时的回调函数
   */
  onValueChangeStart?: (value: any) => void;

  /**
   * 值变化过程中的回调函数
   */
  onValueChanged?: (value: any) => void;

  /**
   * 值变化结束时的回调函数
   */
  onValueChangeEnd?: (value: any) => void;

  /**
   * 构造函数
   * @param options - 包含值变化回调函数的配置对象
   */
  constructor(options: ValueControllerOptions);

  /**
   * 设置新值并触发值变化信号
   * @param value - 要设置的新值
   */
  setValue(value: any): void;

  /**
   * 停用控制器
   * 当前实现为空方法，可能用于清理资源或取消监听
   */
  deactive(): void;
}