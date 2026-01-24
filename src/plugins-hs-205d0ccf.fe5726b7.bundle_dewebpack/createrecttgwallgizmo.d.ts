import { HSCore } from '@hscore/core';
import { HSApp } from '@hsapp/view';
import { HSPaveSDK } from '@hspave/sdk';
import { PathItem, Dimension, InputBoxType } from '@hsapp/view/svg';
import { Loop, Box2, Line2d, Vector2, Matrix3, MathUtil } from '@hscore/geometry';
import { NormalWallAttr } from '@hsapp/constants';
import { getUnitParam } from '@hsapp/utils';

/**
 * 点位数据结构
 */
export interface PointData {
  /** 起始点坐标 */
  start: Vector2;
  /** 结束点坐标 */
  end: Vector2;
}

/**
 * 信号派发数据
 */
export interface SignalData {
  /** 计算得到的端点坐标，可能为 undefined */
  point?: Vector2;
  /** 触发的键盘按键码 */
  keyCode: HSApp.Util.Keyboard.KeyCodes;
}

/**
 * 尺寸标注配置选项
 */
export interface DimensionOptions {
  /** 输入框类型 */
  type: InputBoxType;
  /** 是否可编辑 */
  editable: boolean;
  /** Enter键回调 */
  onEnter?: (value: number, isValid: boolean) => void;
  /** Tab键回调 */
  onTab?: (value: number, isValid: boolean) => void;
  /** 键盘按下回调 */
  onKeyDown?: (event: KeyboardEvent) => void;
}

/**
 * 应用设置工具类型定义
 */
export interface AppSettingsUtil {
  /** 墙体模式 */
  wallMode: HSCore.Model.WallMode;
  /** 墙体宽度 */
  wallWidth: number;
}

/**
 * 全局应用设置工具实例
 */
declare const appSettingsUtil: AppSettingsUtil;

/**
 * 矩形墙体绘制辅助工具类
 * 
 * 用于在画布上绘制矩形墙体，并提供顶部和左侧的尺寸标注功能。
 * 支持内墙、中墙、外墙三种模式的墙体绘制。
 * 
 * @extends HSApp.View.SVG.Temp
 */
export declare class CreateRectTgWallGizmo extends HSApp.View.SVG.Temp {
  /**
   * 信号对象，用于派发交互事件
   */
  signal: HSCore.Util.Signal<SignalData>;

  /**
   * 顶部尺寸标注对象
   */
  topDimension: Dimension;

  /**
   * 左侧尺寸标注对象
   */
  leftDimension: Dimension;

  /**
   * 私有：点位数据
   */
  private _pointData?: PointData;

  /**
   * 私有：房间路径图形项
   */
  private _roomItem: PathItem;

  /**
   * 构造函数
   * 
   * @param context - 画布上下文
   * @param layer - SVG图层
   * @param options - 配置选项，包含键盘事件回调
   */
  constructor(
    context: unknown,
    layer: unknown,
    options: { onKeyDown?: (event: KeyboardEvent) => void }
  );

  /**
   * 获取所有尺寸标注对象数组
   */
  get dimensions(): Dimension[];

  /**
   * 设置点位数据并标记为脏数据
   */
  set pointData(value: PointData | undefined);

  /**
   * 获取应用设置工具实例
   */
  get setting(): AppSettingsUtil;

  /**
   * 获取当前墙体模式
   * @private
   */
  private get _wallMode(): HSCore.Model.WallMode;

  /**
   * 获取当前墙体宽度
   * @private
   */
  private get _wallWidth(): number;

  /**
   * 获取所有可交互的图形元素
   * @private
   */
  private get _elements(): Array<PathItem | Dimension>;

  /**
   * 根据偏移量获取矩形轮廓曲线
   * 
   * @param offset - 偏移距离，undefined表示无偏移
   * @param endPoint - 可选的结束点，用于覆盖 _pointData.end
   * @returns 曲线数组
   * @private
   */
  private _getOffsetCurves(offset: number | undefined, endPoint?: Vector2): unknown[];

  /**
   * 获取指定墙体模式下的曲线
   * 
   * @param mode - 目标墙体模式
   * @param endPoint - 可选的结束点
   * @returns 转换后的曲线数组
   */
  getModeCurves(mode: HSCore.Model.WallMode, endPoint?: Vector2): unknown[];

  /**
   * 绘制回调函数
   * 更新房间图形和尺寸标注的显示
   */
  onDraw(): void;

  /**
   * 清理资源回调
   * 释放所有图形元素和信号监听
   */
  onCleanup(): void;

  /**
   * 处理房间图形项的路径数据
   * @private
   */
  private _handleRoomItem(): void;

  /**
   * 处理尺寸标注的显示和更新
   * 
   * @param boundingBox - 矩形的边界框
   * @private
   */
  private _handleDimensions(boundingBox: Box2): void;

  /**
   * 根据输入值计算实际的端点坐标
   * 
   * @param inputValue - 用户输入的尺寸值
   * @param dimension - 触发事件的尺寸标注对象
   * @returns 计算后的端点坐标
   * @private
   */
  private _getEndPoint(inputValue: number, dimension: Dimension): Vector2;

  /**
   * 视口变化事件回调
   * @private
   */
  private _onViewBoxChanged(): void;

  /**
   * 顶部尺寸标注 Tab 键回调
   * @private
   */
  private _onTopDimensionTab(value: number, isValid: boolean): void;

  /**
   * 顶部尺寸标注 Enter 键回调
   * @private
   */
  private _onTopDimensionEnter(value: number, isValid: boolean): void;

  /**
   * 左侧尺寸标注 Tab 键回调
   * @private
   */
  private _onLeftDimensionTab(value: number, isValid: boolean): void;

  /**
   * 左侧尺寸标注 Enter 键回调
   * @private
   */
  private _onLeftDimensionEnter(value: number, isValid: boolean): void;
}