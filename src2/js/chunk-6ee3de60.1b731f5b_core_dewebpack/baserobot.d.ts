/**
 * 基础机器人类
 * 用于在视图中管理和显示机器人相关的形状对象
 */
export declare class BaseRobot {
  /**
   * 关联的视图实例
   */
  protected view: View;

  /**
   * 形状对象集合
   */
  protected shapes: Shape[];

  /**
   * 虚拟形状对象集合
   */
  protected vshapes: VShape[];

  /**
   * 机器人尺寸（基础尺寸的1.5倍）
   */
  protected rsize: number;

  /**
   * 构造函数
   * @param view - 要附加到的视图实例
   */
  constructor(view: View);

  /**
   * 检查机器人是否可用
   * @returns 当视图的维度管理器处于正常模式时返回true
   */
  checkEnable(): boolean;

  /**
   * 附加到指定元素（带启用检查）
   * @param element - 要附加到的元素
   */
  attachTo(element: unknown): void;

  /**
   * 附加到指定元素
   * @param element - 要附加到的元素
   */
  protected attach(element: unknown): void;

  /**
   * 隐藏所有虚拟形状并恢复其矩阵状态
   */
  hide(): void;
}

/**
 * 视图接口
 */
interface View {
  /**
   * 维度管理器
   */
  dimManager: DimensionManager;
}

/**
 * 维度管理器接口
 */
interface DimensionManager {
  /**
   * 当前维度模式
   */
  mode: DimModeEnum;
}

/**
 * 维度模式枚举
 */
declare enum DimModeEnum {
  normal = 'normal'
}

/**
 * 形状接口
 */
interface Shape {
  // 形状相关属性和方法
}

/**
 * 虚拟形状接口
 */
interface VShape {
  /**
   * 隐藏形状
   */
  hide(): void;
}

/**
 * 绘制参数单例
 */
interface DrawParams {
  /**
   * 机器人基础尺寸
   */
  robotSize: number;
}