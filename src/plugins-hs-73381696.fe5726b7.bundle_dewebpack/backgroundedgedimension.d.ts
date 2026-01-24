/**
 * 背景边缘尺寸标注组件
 * 用于管理和编辑草图中的背景边缘尺寸标注
 */

import { HSApp } from './HSApp';
import { HSCore } from './HSCore';
import { HSConstants } from './HSConstants';
import { MathAlg } from './MathAlg';

/**
 * 线性尺寸标注状态枚举
 */
type LinearDimensionStateEnum = HSApp.View.SVG.LinearDimensionStateEnum;

/**
 * 尺寸标注对象接口
 */
interface DimensionGizmo {
  /** 关联的实体对象 */
  entity: Edge;
  /** 最小值限制 */
  min: number;
  /** 最大值限制 */
  max: number;
  /** 值变化事件 */
  valueChanged?: EventEmitter<DimensionValueChangeEvent>;
  /** 更新状态 */
  updateState(state: LinearDimensionStateEnum, enabled: boolean): void;
  /** 清除标注 */
  clear(): void;
}

/**
 * 边缘对象接口
 */
interface Edge {
  /** 边缘唯一标识符 */
  id: string;
  /** 边缘曲线 */
  curve: Curve;
}

/**
 * 曲线接口
 */
interface Curve {
  /** 起点 */
  from: Point;
  /** 终点 */
  to: Point;
  /** 转换为数学曲线 */
  toMathCurve(): MathCurve;
}

/**
 * 数学曲线接口
 */
interface MathCurve {
  /** 克隆曲线 */
  clone(): MathCurve;
  /** 双向延伸曲线 */
  extendDouble(factor: number): MathCurve;
}

/**
 * 点坐标接口
 */
interface Point {
  x: number;
  y: number;
}

/**
 * 尺寸值变化事件数据
 */
interface DimensionValueChangeEvent {
  data: {
    /** 新值 */
    value: number;
    /** 旧值 */
    oldValue: number;
    /** 触发变化的标注对象 */
    gizmo?: DimensionGizmo;
  };
}

/**
 * 事件发射器接口
 */
interface EventEmitter<T> {
  /** 监听事件 */
  listen(callback: (event: T) => void, context: unknown): void;
  /** 取消所有监听 */
  unlistenAll(): void;
}

/**
 * 画布管理器接口
 */
interface Canvas {
  /** 小控件管理器 */
  gizmoManager: GizmoManager;
}

/**
 * 小控件管理器接口
 */
interface GizmoManager {
  /** 获取所有小控件 */
  getAllGizmos(): DimensionGizmo[];
  /** 移除小控件 */
  removeGizmo(gizmo: DimensionGizmo): void;
}

/**
 * 草图构建器接口
 */
interface SketchBuilder {
  /** 可草图化对象 */
  sketchable: Sketchable;
}

/**
 * 可草图化对象接口
 */
interface Sketchable {
  /** 获取草图 */
  getSketch(): Sketch;
}

/**
 * 草图接口
 */
interface Sketch {
  // 草图相关方法
}

/**
 * 交互模型接口
 */
interface InteractiveModel {
  // 交互模型相关属性
}

/**
 * 背景边缘尺寸标注类
 * 继承自 Line2dDimension，用于处理背景边缘的尺寸标注编辑
 */
export declare class BackgroundEdgeDimension extends HSApp.ExtraordinarySketch2d.Gizmo.Line2dDimension {
  /**
   * 背景尺寸标注缓存列表
   * 用于跟踪已存在的背景标注，避免重复创建
   * @private
   */
  private _backgroundDimensions: DimensionGizmo[];

  /**
   * 当前管理的所有尺寸标注
   * 键为边缘ID，值为对应的标注对象
   */
  dimensions: Record<string, DimensionGizmo>;

  /**
   * 画布对象
   */
  canvas: Canvas;

  /**
   * 当前编辑的边缘
   */
  edge: Edge;

  /**
   * 当前曲线对象
   */
  curve: Curve;

  /**
   * 草图构建器
   */
  sketchBuilder: SketchBuilder;

  /**
   * 交互模型
   */
  interactiveModel: InteractiveModel;

  /**
   * 构造函数
   * @param param1 - 第一个参数
   * @param param2 - 第二个参数
   * @param param3 - 第三个参数
   */
  constructor(param1: unknown, param2: unknown, param3: unknown);

  /**
   * 获取或创建编辑尺寸标注
   * 如果边缘已有标注则复用，否则通过父类方法创建新标注
   * @param edge - 需要标注的边缘对象
   * @returns 尺寸标注对象
   * @private
   */
  private _getOrCreateEditDimension(edge: Edge): DimensionGizmo;

  /**
   * 清理资源
   * 重置所有尺寸标注状态，移除非背景标注
   */
  onCleanup(): void;

  /**
   * 更新所有相关尺寸标注
   * 激活当前编辑边缘及其相邻边缘的标注，移除无用标注
   */
  updateDimensions(): void;

  /**
   * 激活指定边缘的尺寸标注
   * @param edge - 需要激活标注的边缘
   * @param editable - 是否可编辑
   * @private
   */
  private _activeDimension(edge: Edge, editable: boolean): void;

  /**
   * 尺寸值变化提交处理
   * 根据标注值变化计算偏移量并创建修改命令
   * @param event - 尺寸值变化事件
   */
  dimensionValueChangeCommit(event: DimensionValueChangeEvent): void;

  /**
   * 移除未使用的尺寸标注
   * @param activeEdges - 当前活动的边缘列表
   * @private
   */
  private _removeUnusedDimension(activeEdges: Edge[]): void;

  /**
   * 更新尺寸标注位置
   * @param edge - 需要更新位置的边缘
   * @private
   */
  private _updatePositionDimension(edge: Edge): void;

  /**
   * 创建修改命令
   * @param offset - 偏移量 {x, y}
   * @param model - 交互模型
   * @private
   */
  private _createCommand(offset: Point, model: InteractiveModel): void;
}