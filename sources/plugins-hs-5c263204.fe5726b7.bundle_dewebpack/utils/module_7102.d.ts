/**
 * 扩展的Gizmo视图组件
 * 
 * 该模块导出一个继承自HSApp.View.Base.Gizmo的类，
 * 用于创建带有子Gizmo的复合视图组件。
 */

/**
 * 子Gizmo构造函数参数类型
 */
interface ChildGizmoConstructorParams {
  /** 第一个参数 */
  param1: unknown;
  /** 第二个参数 */
  param2: unknown;
  /** 第三个参数 */
  param3: unknown;
  /** 第四个参数 */
  param4: unknown;
}

/**
 * 扩展Gizmo类的构造函数参数
 */
interface ExtendedGizmoConstructorParams {
  /** 第一个参数 - 传递给基类和子Gizmo */
  param1: unknown;
  /** 第二个参数 - 传递给基类和子Gizmo */
  param2: unknown;
  /** 第三个参数 - 传递给基类和子Gizmo */
  param3: unknown;
  /** 第四个参数 - 仅传递给子Gizmo */
  param4: unknown;
}

/**
 * 基础Gizmo类接口
 * 来自HSApp.View.Base.Gizmo
 */
declare class BaseGizmo {
  /**
   * 构造函数
   * @param param1 - 第一个参数
   * @param param2 - 第二个参数
   * @param param3 - 第三个参数
   */
  constructor(param1: unknown, param2: unknown, param3: unknown);

  /**
   * 添加子Gizmo组件
   * @param childGizmo - 要添加的子Gizmo实例
   */
  addChildGizmo(childGizmo: unknown): void;
}

/**
 * 子Gizmo类
 * 由模块673872提供
 */
declare class ChildGizmo {
  /**
   * 构造函数
   * @param param1 - 第一个参数
   * @param param2 - 第二个参数
   * @param param3 - 第三个参数
   * @param param4 - 第四个参数
   */
  constructor(
    param1: unknown,
    param2: unknown,
    param3: unknown,
    param4: unknown
  );
}

/**
 * 扩展的Gizmo类
 * 
 * 继承自BaseGizmo，在构造时自动添加一个子Gizmo组件。
 * 这是一个复合视图组件，结合了基础Gizmo的功能和额外的子Gizmo。
 * 
 * @example
 *