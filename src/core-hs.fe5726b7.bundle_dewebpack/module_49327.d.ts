/**
 * 天花板灯光计算器模块
 * 负责根据房间几何结构和渲染模板自动生成天花板灯光配置
 */

declare module 'ceiling-light-calculator' {
  import { default as BaseCalculator } from 'base-calculator';
  import { CommonOptions } from 'common-options';

  /**
   * 二维坐标点接口
   */
  interface Point2D {
    x: number;
    y: number;
  }

  /**
   * 灯光尺寸配置
   */
  interface LightSize {
    /** 灯光宽度（米） */
    width: number;
    /** 灯光长度（米） */
    length: number;
  }

  /**
   * 灯光配置接口
   */
  interface LightConfig {
    /** 灯光类型 */
    type: HSCore.Model.LightTypeEnum;
    /** 色温（开尔文） */
    temperature: number;
    /** 光强度（流明） */
    intensity: number;
    /** 灯光位置 */
    position: Point2D;
    /** 灯光高度（米） */
    height: number;
    /** 灯光尺寸 */
    size: LightSize;
    /** IES光度文件 */
    ies: string | undefined;
    /** X轴旋转角度（弧度） */
    XRotation: number;
    /** Y轴旋转角度（弧度） */
    YRotation: number;
    /** Z轴旋转角度（弧度） */
    ZRotation: number;
  }

  /**
   * 线段接口
   */
  interface LineSegment {
    /** 起点 */
    p0: Point2D;
    /** 终点 */
    p1: Point2D;
    /** 线段长度（米） */
    length: number;
  }

  /**
   * 线段组接口
   * 包含同一方向的所有线段
   */
  interface LineSegmentGroup {
    /** 该方向的所有线段 */
    lines: LineSegment[];
    /** 该方向线段的总长度（米） */
    totalLength: number;
  }

  /**
   * 渲染配置接口
   */
  interface RenderOptions {
    /** 渲染模板键名 */
    templateKey: string;
    /** 色温（开尔文） */
    temperature: number;
  }

  /**
   * 房间模型接口
   */
  interface RoomModel {
    /**
     * 获取房间的子多边形（处理复杂房间形状）
     * @returns 多边形顶点数组的数组
     */
    getSubPolygons(): Point2D[][];

    /**
     * 获取天花板高度
     * @returns 高度（米）
     */
    getCeilingHeight(): number;

    /**
     * 检查天花板面是否隐藏
     * @returns 如果隐藏返回true
     */
    isCeilingFaceHidden(): boolean;

    /**
     * 获取房间内的物理灯光对象
     * @returns 灯光对象数组
     */
    getPhysicalLights(): PhysicalLight[];
  }

  /**
   * 物理灯光对象接口
   */
  interface PhysicalLight {
    /**
     * 获取灯光内容类型
     * @returns 内容类型对象
     */
    contentType(): ContentType | null;

    /**
     * 获取灯光位置
     * @returns 三维坐标
     */
    getPosition(): { x: number; y: number; z: number };

    /**
     * 获取灯光尺寸
     * @returns 三维尺寸
     */
    getSize(): { x: number; y: number; z: number };
  }

  /**
   * 内容类型接口
   */
  interface ContentType {
    /**
     * 检查是否属于指定类型
     * @param types 类型数组
     * @returns 如果匹配返回true
     */
    isTypeOf(types: string[]): boolean;
  }

  /**
   * 场景上下文接口
   */
  interface SceneContext {
    // 场景相关属性
  }

  /**
   * 天花板灯光计算器类
   * 继承自基础计算器，实现天花板灯光的自动布局算法
   */
  export default class CeilingLightCalculator extends BaseCalculator {
    /**
     * 初始化计算器
     */
    init(): void;

    /**
     * 判断是否对该场景感兴趣（需要计算灯光）
     * @param context 场景上下文
     * @returns 始终返回true，表示对所有场景都计算
     */
    protected _interested(context: SceneContext): boolean;

    /**
     * 计算天花板灯光配置
     * 根据不同的渲染模板使用不同的灯光布局策略：
     * - NATURE_3/CHILLY_3: 使用单个大型平面光源
     * - REALISTIC/GENERAL: 使用网格分布的小型灯光阵列
     * 
     * @param context 场景上下文
     * @param room 房间模型
     * @param options 渲染配置选项
     * @param additionalParam 额外参数
     * @returns 灯光配置数组
     */
    protected _compute(
      context: SceneContext,
      room: RoomModel,
      options: RenderOptions,
      additionalParam: unknown
    ): LightConfig[];

    /**
     * 构建线段分组
     * 将多边形的边按方向分组，用于确定房间的主要朝向
     * 
     * @param polygon 多边形顶点数组
     * @returns 按方向排序的线段组数组（按总长度降序）
     */
    protected _buildLineSegments(polygon: Point2D[]): LineSegmentGroup[];

    /**
     * 验证灯光配置的有效性
     * 检查新灯光是否与现有物理灯光冲突（位置过近）
     * 
     * @param lightConfig 待验证的灯光配置
     * @param room 房间模型
     * @param options 渲染配置选项
     * @returns 如果有效返回true，否则返回false
     */
    protected _isValid(
      lightConfig: LightConfig,
      room: RoomModel,
      options: RenderOptions
    ): boolean;
  }

  /**
   * 常量：默认天花板间隙（米）
   * 灯光距离天花板的默认距离
   */
  export const defaultGapToCeiling: number;

  /**
   * 常量：NATURE_3和CHILLY_3模板的默认色温（开尔文）
   */
  export const DEFAULT_TEMPERATURE_WARM: number;

  /**
   * 常量：REALISTIC和GENERAL模板的默认光强度（流明）
   */
  export const DEFAULT_INTENSITY_REALISTIC: number;

  /**
   * 常量：网格灯光的默认尺寸（米）
   */
  export const DEFAULT_GRID_LIGHT_SIZE_REALISTIC: number;

  /**
   * 常量：房间尺寸判断阈值（米）
   * 用于判断是否需要在某个方向上放置灯光
   */
  export const ROOM_SIZE_THRESHOLD_MIN: number;
  export const ROOM_SIZE_THRESHOLD_MAX: number;
}