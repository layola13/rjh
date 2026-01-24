import { default as BaseClass } from './module_42288';

/**
 * 灯光配置接口
 */
interface LightConfig {
  /** 灯光类型 */
  type: HSCore.Model.LightTypeEnum.SpotLight;
  /** 色温值 */
  temperature: number;
  /** 光照强度 */
  intensity: number;
  /** 灯光位置（2D坐标） */
  position: THREE.Vector2;
  /** 灯光高度 */
  height: number;
  /** IES光域文件配置 */
  ies: unknown;
}

/**
 * 最近边缘查询结果
 */
interface ClosestEdgeResult {
  /** 最近的边缘对象 */
  closestEdge: unknown | null;
  /** 到边缘的距离 */
  distance: number;
}

/**
 * 物体尺寸接口
 */
interface ObjectSize {
  /** X轴尺寸（宽度） */
  x: number;
  /** Y轴尺寸（深度） */
  y: number;
}

/**
 * 物体位置接口
 */
interface ObjectPosition {
  /** X坐标 */
  x: number;
  /** Y坐标 */
  y: number;
}

/**
 * 物体接口
 */
interface ObjectEntity {
  /** 获取物体位置 */
  getPosition(): ObjectPosition;
  /** 获取物体尺寸 */
  getSize(): ObjectSize;
  /** 前方向向量 */
  frontForwardVec: THREE.Vector2;
}

/**
 * 渲染目标接口
 */
interface RenderTarget {
  /** 检查天花板面是否隐藏 */
  isCeilingFaceHidden(): boolean;
}

/**
 * 渲染配置接口
 */
interface RenderConfig {
  /** 渲染模板键名 */
  templateKey: string;
}

/**
 * 照明计算器类
 * 负责根据物体和场景配置计算最优的灯光布局
 */
export default class LightingCalculator extends BaseClass {
  /**
   * 计算灯光配置
   * @param objectEntity - 需要照明的物体实体
   * @param renderTarget - 渲染目标对象
   * @param renderConfig - 渲染配置选项
   * @param additionalParam - 额外参数
   * @returns 灯光配置数组
   */
  protected _compute(
    objectEntity: ObjectEntity,
    renderTarget: RenderTarget,
    renderConfig: RenderConfig,
    additionalParam: unknown
  ): LightConfig[];

  /**
   * 获取默认高度
   * @param renderTarget - 渲染目标对象
   * @returns 默认高度值
   */
  protected getDefaultHeight(renderTarget: RenderTarget): number;

  /**
   * 获取最近的边缘
   * @param renderTarget - 渲染目标对象
   * @param position - 查询位置
   * @param direction - 查询方向向量
   * @returns 最近边缘的查询结果
   */
  protected getClosestEdge(
    renderTarget: RenderTarget,
    position: THREE.Vector2,
    direction: THREE.Vector2
  ): ClosestEdgeResult;

  /**
   * 检查物体是否属于指定分类
   * @param categoryIds - 分类ID数组
   * @param objectEntity - 物体实体
   * @returns 是否属于该分类
   */
  protected _isInCategory(
    categoryIds: string[],
    objectEntity: ObjectEntity
  ): boolean;

  /**
   * 获取默认灯光参数
   * @param objectEntity - 物体实体
   * @param renderTarget - 渲染目标
   * @param renderConfig - 渲染配置
   * @returns 包含强度、色温和IES配置的对象
   */
  protected getDefaultLight(
    objectEntity: ObjectEntity,
    renderTarget: RenderTarget,
    renderConfig: RenderConfig
  ): {
    intensity: number;
    temperature: number;
    ies: unknown;
  };
}