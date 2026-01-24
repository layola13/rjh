/**
 * 天花板自动照明计算器
 * 负责根据房间几何形状和渲染模板自动生成天花板照明配置
 */

declare module 'ceiling-auto-lighting-calculator' {
  import type { default as BaseCalculator } from './base-calculator';

  /**
   * 二维点坐标
   */
  export interface Point2D {
    x: number;
    y: number;
  }

  /**
   * 线段定义
   */
  export interface LineSegment {
    /** 起点 */
    p0: Point2D;
    /** 终点 */
    p1: Point2D;
    /** 线段长度 */
    length: number;
  }

  /**
   * 分组的线段集合
   */
  export interface LineSegmentGroup {
    /** 同方向的线段集合 */
    lines: LineSegment[];
    /** 总长度 */
    totalLength: number;
  }

  /**
   * 灯光尺寸
   */
  export interface LightSize {
    /** 宽度（米） */
    width: number;
    /** 长度（米） */
    length: number;
  }

  /**
   * 灯光配置
   */
  export interface LightConfig {
    /** 灯光类型 */
    type: HSCore.Model.LightTypeEnum;
    /** 色温（开尔文） */
    temperature: number;
    /** 光强度 */
    intensity: number;
    /** 位置坐标 */
    position: Point2D;
    /** 高度（米） */
    height: number;
    /** 灯光尺寸 */
    size: LightSize;
    /** IES光域文件 */
    ies: string | undefined;
    /** X轴旋转角度（弧度） */
    XRotation: number;
    /** Y轴旋转角度（弧度） */
    YRotation: number;
    /** Z轴旋转角度（弧度） */
    ZRotation: number;
  }

  /**
   * 房间模型接口
   */
  export interface RoomModel {
    /**
     * 获取房间的子多边形区域
     * @returns 多边形顶点数组的数组
     */
    getSubPolygons(): Point2D[][] | null;

    /**
     * 获取天花板高度
     * @returns 高度值（米）
     */
    getCeilingHeight(): number;

    /**
     * 检查天花板面是否隐藏
     * @returns 是否隐藏
     */
    isCeilingFaceHidden(): boolean;

    /**
     * 获取物理灯光列表
     * @returns 灯光对象数组
     */
    getPhysicalLights(): PhysicalLight[];
  }

  /**
   * 物理灯光对象
   */
  export interface PhysicalLight {
    /**
     * 获取内容类型
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
   * 内容类型
   */
  export interface ContentType {
    /**
     * 检查是否为指定类型
     * @param types 类型常量数组
     * @returns 是否匹配
     */
    isTypeOf(types: readonly string[]): boolean;
  }

  /**
   * 渲染配置选项
   */
  export interface RenderOptions {
    /** 渲染模板键名 */
    templateKey: string;
    /** 色温（开尔文） */
    temperature: number;
  }

  /**
   * 天花板自动照明计算器
   * 根据房间几何形状和渲染模板自动生成平面灯光配置
   */
  export default class CeilingAutoLightingCalculator extends BaseCalculator {
    /**
     * 初始化计算器
     */
    init(): void;

    /**
     * 判断是否对当前场景感兴趣（是否需要处理）
     * @param scene 场景对象
     * @returns 始终返回 true，表示总是处理
     */
    protected _interested(scene: unknown): boolean;

    /**
     * 计算房间的自动照明配置
     * @param scene 场景对象
     * @param room 房间模型
     * @param options 渲染配置选项
     * @param additionalParam 额外参数
     * @returns 生成的灯光配置数组
     */
    protected _compute(
      scene: unknown,
      room: RoomModel,
      options: RenderOptions,
      additionalParam: unknown
    ): LightConfig[];

    /**
     * 构建多边形的线段分组
     * 将多边形边缘按方向分组，用于确定主要方向
     * @param polygon 多边形顶点数组
     * @returns 按方向分组的线段，按总长度降序排列
     */
    protected _buildLineSegments(polygon: Point2D[]): LineSegmentGroup[];

    /**
     * 验证生成的灯光配置是否有效
     * 检查是否与现有物理灯光冲突
     * @param lightConfig 待验证的灯光配置
     * @param room 房间模型
     * @param options 渲染配置选项
     * @returns 配置是否有效（无冲突）
     */
    protected _isValid(
      lightConfig: LightConfig,
      room: RoomModel,
      options: RenderOptions
    ): boolean;
  }

  /**
   * 通用配置选项
   */
  export namespace CommonOptions {
    /** 距离天花板的默认间隙（米） */
    export const defaultGapToCeiling: number;
  }
}