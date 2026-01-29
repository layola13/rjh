/**
 * 参数化开口计算尺寸模块
 * 提供参数化门窗开口的尺寸计算、显示和交互控制功能
 */

import { HSCore } from './635589';
import { HSApp } from './518193';
import { OpeningCalculatedDimensionBase } from './514659';
import { SVGDimensionType } from './478346';

/**
 * 参数化门窗系统变量名称常量
 */
declare const HSConstants: {
  ParametricDoorWindowSystemVariablesName: {
    /** 普通窗宽度变量名 */
    OrdinaryWindowWidth: string;
  };
};

/**
 * 命令类型常量
 */
declare const HSFPConstants: {
  CommandType: {
    /** 移动开口命令 */
    MoveOpening: string;
    /** 编辑参数化开口命令 */
    EditParametricOpening: string;
  };
};

/**
 * 实时提示工具
 */
declare const LiveHint: {
  /**
   * 显示提示信息
   * @param message - 提示消息内容
   * @param duration - 显示时长（毫秒）
   * @param target - 目标元素（可选）
   * @param options - 额外选项
   */
  show(
    message: string,
    duration: number,
    target: unknown,
    options: { canclose: boolean }
  ): void;
};

/**
 * 资源管理器
 */
declare const ResourceManager: {
  /**
   * 获取国际化字符串
   * @param key - 资源键名
   * @returns 对应的本地化字符串
   */
  getString(key: string): string;
};

/**
 * 数学工具库
 */
declare const HSMath: {
  /** 3x3矩阵类 */
  Matrix3: {
    new (): {
      /**
       * 从数组初始化矩阵
       * @param arr - 矩阵元素数组
       */
      fromArray(arr: number[]): HSMath.Matrix3;
    };
  };
};

/**
 * 属性节点接口
 */
interface PropertyNode {
  /** 属性值 */
  value: number;
}

/**
 * 2D曲线接口
 */
interface Curve2D {
  /** 曲线数据 */
  [key: string]: unknown;
}

/**
 * 2D轮廓接口
 */
interface Profile2D {
  /**
   * 应用变换矩阵
   * @param matrix - 变换矩阵
   */
  transformed(matrix: HSMath.Matrix3): {
    /**
     * 获取所有曲线
     * @returns 曲线数组
     */
    getAllCurves(): Curve2D[];
  };
}

/**
 * 参数化开口实体接口
 */
interface ParametricOpeningEntity {
  /** X坐标 */
  x: number;
  /** Y坐标 */
  y: number;

  /**
   * 获取2D变换矩阵
   * @returns 4x4矩阵对象
   */
  get2DMatrix(): {
    toArray(): number[];
  };

  /**
   * 获取2D孔洞轮廓
   * @returns 轮廓数组
   */
  getHole2D(): Profile2D[];

  /**
   * 获取属性节点
   * @param propertyName - 属性名称
   * @returns 属性节点
   */
  getPropertiesNode(propertyName: string): PropertyNode;

  /**
   * 检查实体标志位
   * @param flag - 标志枚举值
   * @returns 是否设置了该标志
   */
  isFlagOn(flag: HSCore.Model.EntityFlagEnum): boolean;
}

/**
 * 尺寸视图小控件接口
 */
interface DimensionGizmo {
  /** 方向向量 */
  direction: {
    x: number;
    y: number;
    /**
     * 向量乘法
     * @param scalar - 标量值
     */
    multiplied(scalar: number): { x: number; y: number };
  };

  /**
   * 获取当前值
   * @returns 当前尺寸值
   */
  getValue(): number;
}

/**
 * 值变更事件数据
 */
interface ValueChangeEventData {
  /** 新值 */
  value: number;
  /** 旧值 */
  oldValue: number;
  /** 触发事件的小控件 */
  gizmo: DimensionGizmo | null;
}

/**
 * 值变更提交事件
 */
interface ValueChangeCommitEvent {
  /** 事件数据 */
  data: ValueChangeEventData;
}

/**
 * 调度参数接口
 */
interface DispatchParams {
  /** 原始事件对象 */
  event: ValueChangeCommitEvent;
  /** 属性标志（可选） */
  flag?: string;
}

/**
 * 参数化开口计算尺寸类
 * 继承自开口计算尺寸基类，提供参数化门窗的尺寸标注和编辑功能
 */
export declare class ParametricOpeningCalculatedDimension extends OpeningCalculatedDimensionBase {
  /** 是否显示自身 */
  private _isShowSelf: boolean;

  /** 控制器实例 */
  private controller: ParametricOpeningCalculatedDimensionController;

  /** 2D尺寸视图小控件数组 */
  protected dimensionView2d: DimensionGizmo[];

  /** 关联的参数化开口实体 */
  protected entity: ParametricOpeningEntity;

  /**
   * 构造函数
   * @param entity - 参数化开口实体
   * @param param2 - 第二个参数（类型待确认）
   * @param param3 - 第三个参数（类型待确认）
   * @param isShowSelf - 是否显示自身，默认为true
   */
  constructor(
    entity: ParametricOpeningEntity,
    param2: unknown,
    param3: unknown,
    isShowSelf?: boolean
  );

  /**
   * 获取尺寸类型
   * @returns 参数化开口计算尺寸类型
   */
  type(): SVGDimensionType;

  /**
   * 获取唯一类型标识
   * @returns 类型枚举值
   */
  static uniqueType(): SVGDimensionType;

  /**
   * 激活时的回调
   */
  onActivate(): void;

  /**
   * 停用时的回调
   */
  onDeactivate(): void;

  /**
   * 清理资源时的回调
   */
  onCleanup(): void;

  /**
   * 值变更提交时的回调
   * @param event - 值变更事件对象
   */
  onValueChangeCommit(event: ValueChangeCommitEvent): void;

  /**
   * 获取关联的参数化开口实体
   * @returns 参数化开口实体
   */
  get parametricOpening(): ParametricOpeningEntity;

  /**
   * 获取工作实体的2D轮廓曲线
   * @returns 曲线数组
   */
  getWorkingEntityProfile(): Curve2D[];

  /**
   * 获取实体长度（单位：米）
   * @returns 长度值
   */
  getEntityLength(): number;

  /**
   * 更新子控件
   */
  updateChildGizmo(): void;

  /**
   * 格式化尺寸视图
   * @param param1 - 第一个参数（类型待确认）
   * @param param2 - 第二个参数（类型待确认）
   */
  formatDimensionView(param1: unknown, param2: unknown): void;
}

/**
 * 命令管理器接口
 */
interface CommandManager {
  /**
   * 创建命令
   * @param commandType - 命令类型
   * @param targets - 目标实体数组
   * @returns 命令对象或null
   */
  createCommand(commandType: string, targets: unknown[]): Command | null;

  /**
   * 执行命令
   * @param command - 命令对象
   */
  execute(command: Command): void;

  /**
   * 接收命令消息
   * @param action - 动作类型
   * @param data - 消息数据
   */
  receive(action: string, data: unknown): void;

  /**
   * 完成命令
   */
  complete(): void;
}

/**
 * 命令接口
 */
interface Command {
  /**
   * 接收命令消息
   * @param action - 动作类型
   * @param data - 消息数据
   */
  receive(action: string, data: unknown): void;
}

/**
 * 参数化开口计算尺寸控制器
 * 负责处理用户交互和命令分发
 */
declare class ParametricOpeningCalculatedDimensionController extends HSApp.View.Base.DisplayController {
  /** 当前命令对象 */
  private _cmd: Command | undefined;

  /** 关联的尺寸小控件 */
  private gizmo: ParametricOpeningCalculatedDimension;

  /** 命令管理器 */
  protected _cmdMgr: CommandManager;

  /** 关联的实体 */
  protected entity: ParametricOpeningEntity;

  /**
   * 构造函数
   * @param param1 - 第一个参数（类型待确认）
   * @param entity - 参数化开口实体
   * @param gizmo - 尺寸小控件实例
   */
  constructor(
    param1: unknown,
    entity: ParametricOpeningEntity,
    gizmo: ParametricOpeningCalculatedDimension
  );

  /**
   * 分发命令
   * @param action - 动作类型（'valueChanged' | 'openingLengthChanged'）
   * @param entity - 目标实体
   * @param params - 附加参数
   */
  dispatch(
    action: 'valueChanged' | 'openingLengthChanged',
    entity: ParametricOpeningEntity,
    params: DispatchParams
  ): void;
}