/**
 * 创建墙体绘制辅助图形的类
 * 用于在墙体创建过程中显示尺寸标注、路径预览等交互元素
 */

import { HSCore } from './HSCore';
import { HSApp } from './HSApp';
import { Line2d, Vector2, Arc2d, Curve2d } from './Geometry';
import { PathItem, Dimension, InputBoxType } from './SVGElements';
import { WallType } from './WallType';
import { getRadianArc, getUnitParam } from './Utils';

/**
 * 墙体捕捉数据接口
 */
interface WallSnapData {
  /** 捕捉的墙体宽度 */
  width: number;
  /** 墙体模式（内侧/中线/外侧） */
  mode: HSCore.Model.WallMode;
}

/**
 * 信号分发数据接口
 */
interface SignalData {
  /** 变更后的点位坐标 */
  point?: Vector2;
  /** 触发的键盘按键码 */
  keyCode: number;
}

/**
 * 尺寸标注配置接口
 */
interface DimensionConfig {
  /** 输入框类型 */
  type: InputBoxType;
  /** 是否可编辑 */
  editable: boolean;
  /** 回车键回调 */
  onEnter: (value: number, isValid: boolean) => void;
  /** Tab键回调 */
  onTab: (value: number, isValid: boolean) => void;
  /** 键盘按下回调 */
  onKeyDown?: (event: KeyboardEvent) => void;
}

/**
 * 曲线范围接口
 */
interface CurveRange {
  /** 最小参数值 */
  min: number;
  /** 最大参数值 */
  max: number;
}

/**
 * 墙体属性样式常量
 */
const NormalWallAttr = {
  stroke: '#000000',
  'stroke-width': 2,
  fill: 'none'
};

const FitWallAttr = {
  stroke: '#FF0000',
  'stroke-width': 2,
  fill: 'none'
};

const DashAttr = {
  stroke: '#999999',
  'stroke-width': 1,
  'stroke-dasharray': '5,5',
  fill: 'none'
};

/**
 * CreateTgWallGizmo 类型定义
 * 用于创建墙体时的图形辅助工具
 * 
 * @extends HSApp.View.SVG.Temp - 继承自SVG临时图形基类
 */
export declare class CreateTgWallGizmo extends HSApp.View.SVG.Temp {
  /**
   * 构造函数
   * @param canvas - SVG画布上下文
   * @param context - 绘图上下文
   * @param cmd - 命令对象，包含墙体创建的相关配置
   */
  constructor(canvas: unknown, context: unknown, cmd: { wallType: WallType; step: number; onKeyDown?: (event: KeyboardEvent) => void });

  // ==================== 公共属性 ====================

  /** 信号对象，用于事件分发 */
  readonly signal: HSCore.Util.Signal<SignalData>;

  /** 直线长度尺寸标注 */
  readonly lineDimension: Dimension;

  /** 角度尺寸标注 */
  readonly curveDimension: Dimension;

  /** 弧高尺寸标注 */
  readonly archHeightDimension: Dimension;

  /**
   * 所有尺寸标注数组
   * @returns 包含直线、角度、弧高三个尺寸标注的数组
   */
  get dimensions(): Dimension[];

  /**
   * 当前曲线对象
   * 可以是直线、圆弧等几何对象
   */
  get curve(): Curve2d | undefined;
  set curve(value: Curve2d | undefined);

  /**
   * 中线曲线对象
   * 根据墙体模式（内侧/中线/外侧）计算偏移后的曲线
   * @returns 偏移后的曲线对象，如果原始曲线不存在则返回undefined
   */
  get middleCurve(): Curve2d | undefined;

  /**
   * 墙体路径数组
   * 根据中线曲线和墙宽生成完整的墙体轮廓路径
   * @returns 路径点数组，如果中线曲线不存在则返回空数组
   */
  get wallPath(): unknown[];

  /**
   * 应用设置工具对象
   * 用于获取全局墙体配置
   */
  get setting(): unknown;

  /**
   * 墙体宽度
   * 优先使用捕捉宽度，否则使用全局设置的墙宽
   * @returns 墙体宽度值
   */
  get wallWidth(): number;

  /**
   * 墙体模式
   * 优先使用捕捉模式，否则使用全局设置的模式
   * @returns 墙体模式枚举值
   */
  get wallMode(): HSCore.Model.WallMode;

  // ==================== 公共方法 ====================

  /**
   * 绘制方法
   * 根据当前状态更新所有图形元素的显示
   * 包括墙体路径、辅助线、各类尺寸标注
   */
  onDraw(): void;

  /**
   * 清理方法
   * 释放所有资源，移除事件监听，销毁图形元素
   */
  onCleanup(): void;

  /**
   * 设置墙体捕捉数据
   * 用于在捕捉到其他墙体时更新当前墙体的显示样式
   * @param data - 包含宽度和模式的捕捉数据
   */
  setWallSnapData(data: WallSnapData): void;

  // ==================== 私有属性 ====================

  /** 墙体路径图形项 */
  private readonly _wallItem: PathItem;

  /** 水平辅助线图形项 */
  private readonly _horizontalItem: PathItem;

  /** 捕捉的墙体宽度 */
  private _snapWidth: number;

  /** 捕捉的墙体模式 */
  private _snapMode: HSCore.Model.WallMode | undefined;

  /** 当前曲线对象（内部存储） */
  private _curve: Curve2d | undefined;

  /**
   * 墙体类型
   * 从命令对象中获取
   */
  private get _wallType(): WallType;

  /**
   * 所有图形元素数组
   * 包括墙体、辅助线和所有尺寸标注
   */
  private get _elements(): Array<PathItem | Dimension>;

  // ==================== 私有方法 ====================

  /**
   * 视图盒变化回调
   * 当画布缩放或平移时触发重绘
   */
  private _onViewBoxChanged(): void;

  /**
   * 直线尺寸标注Tab键回调
   * @param value - 输入的数值
   * @param isValid - 输入是否有效
   */
  private _onLineDimensionTab(value: number, isValid: boolean): void;

  /**
   * 直线尺寸标注Enter键回调
   * @param value - 输入的数值
   * @param isValid - 输入是否有效
   */
  private _onLineDimensionEnter(value: number, isValid: boolean): void;

  /**
   * 角度尺寸标注Tab键回调
   * @param value - 输入的角度值
   * @param isValid - 输入是否有效
   */
  private _onCurveDimensionTab(value: number, isValid: boolean): void;

  /**
   * 角度尺寸标注Enter键回调
   * @param value - 输入的角度值
   * @param isValid - 输入是否有效
   */
  private _onCurveDimensionEnter(value: number, isValid: boolean): void;

  /**
   * 弧高尺寸标注Tab键回调
   * @param value - 输入的弧高值
   * @param isValid - 输入是否有效
   */
  private _onArcHeightDimensionTab(value: number, isValid: boolean): void;

  /**
   * 弧高尺寸标注Enter键回调
   * @param value - 输入的弧高值
   * @param isValid - 输入是否有效
   */
  private _onArcHeightDimensionEnter(value: number, isValid: boolean): void;

  /**
   * 处理墙体图形项显示
   * @param path - 墙体路径数组
   */
  private _handleWallItem(path: unknown[]): void;

  /**
   * 处理水平辅助线显示
   * 仅在非正交直线时显示水平参考线
   * @param curve - 当前曲线对象
   */
  private _handleHorizontalItem(curve: Curve2d): void;

  /**
   * 处理直线长度尺寸标注
   * @param curve - 当前曲线对象
   */
  private _handleLineDimension(curve: Curve2d): void;

  /**
   * 处理角度尺寸标注
   * 仅在非正交直线时显示角度标注
   * @param curve - 当前曲线对象
   */
  private _handleCurveDimension(curve: Curve2d): void;

  /**
   * 处理弧高尺寸标注
   * 仅在圆弧曲线时显示弧高标注
   * @param curve - 当前曲线对象
   */
  private _handleArchHeightDimension(curve: Curve2d): void;

  /**
   * 判断曲线是否为正交线
   * @param curve - 待判断的曲线对象
   * @returns 如果是水平或垂直的直线返回true，否则返回false
   */
  private _isOrtho(curve: Curve2d): boolean;

  /**
   * 根据输入长度计算新的端点
   * @param value - 输入的长度值
   * @returns 更新后的端点坐标
   */
  private _getLineDimChanged(value: number): Vector2;

  /**
   * 根据输入角度计算新的端点
   * @param value - 输入的角度值（度）
   * @returns 更新后的端点坐标
   */
  private _getCurveDimChanged(value: number): Vector2;

  /**
   * 根据输入弧高计算新的端点
   * @param value - 输入的弧高值
   * @returns 更新后的端点坐标
   */
  private _getArchDimChanged(value: number): Vector2;

  /**
   * 更新曲线长度
   * @param curve - 原始曲线对象
   * @param newLength - 新的长度值
   * @returns 更新范围后的曲线对象
   */
  private _getUpdateCurve(curve: Curve2d, newLength: number): Curve2d;
}