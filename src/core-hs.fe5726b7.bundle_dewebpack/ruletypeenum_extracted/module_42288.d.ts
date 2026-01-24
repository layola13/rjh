/**
 * 基础规则访问者抽象类
 * 用于在渲染场景中处理和计算灯光规则
 */
declare module 'module_42288' {
  import type { CommonOptions } from './module_22777';

  /**
   * 规则类型枚举
   */
  export enum RuleType {
    // 具体类型需根据实际使用情况定义
  }

  /**
   * 内容类型接口
   */
  export interface ContentType {
    /**
     * 检查是否为指定类型
     * @param types - 目标类型数组
     */
    isTypeOf(types: ContentType[]): boolean;
  }

  /**
   * 几何多边形点
   */
  export interface Point2D {
    x: number;
    y: number;
  }

  /**
   * 3D位置坐标
   */
  export interface Position3D {
    x: number;
    y: number;
    z: number;
  }

  /**
   * 尺寸信息
   */
  export interface Size {
    x: number;
    y: number;
    z?: number;
    length?: number;
    width?: number;
  }

  /**
   * 边缘定义
   */
  export interface Edge {
    p0: THREE.Vector2;
    p1: THREE.Vector2;
  }

  /**
   * 灯光配置结果
   */
  export interface LightConfig {
    /** 灯光类型 */
    type: HSCore.Model.LightTypeEnum;
    /** 色温（开尔文） */
    temperature: number;
    /** 强度 */
    intensity: number;
    /** 位置坐标 */
    position: Position3D;
    /** 高度 */
    height: number;
    /** IES光域文件编号 */
    ies: number;
    /** 规则类型（由visit方法注入） */
    ruleType?: RuleType;
    /** 源内容类型（由visit方法注入） */
    sourceContentType?: ContentType;
    /** 尺寸信息（可选） */
    size?: Size;
  }

  /**
   * 场景对象接口
   */
  export interface SceneObject {
    /**
     * 获取内容类型
     */
    contentType(): ContentType | null;

    /**
     * 获取所属分类
     */
    getCategories(): string[];

    /**
     * 获取几何轮廓
     */
    getGeometry(): Point2D[];

    /**
     * 获取轮廓（用于碰撞检测）
     */
    getOutline(): Point2D[];

    /**
     * 获取位置
     */
    getPosition(): Position3D;

    /**
     * 获取尺寸
     */
    getSize(): Size;

    /**
     * 获取边缘列表
     */
    getEdges(): Edge[];
  }

  /**
   * 场景容器接口
   */
  export interface Scene {
    /**
     * 获取天花板高度
     */
    getCeilingHeight(): number;

    /**
     * 获取场景中的物理灯光列表
     */
    getPhysicalLights(): SceneObject[];

    /**
     * 获取场景分类
     */
    getCategories(): string[];
  }

  /**
   * 渲染选项配置
   */
  export interface RenderOptions {
    /** 渲染模板键名 */
    templateKey: string;
  }

  /**
   * 规则配置
   */
  export interface RuleConfig {
    /** 适用的内容类型列表 */
    contentTypes?: ContentType[];
    /** 适用的分类列表 */
    categories?: string[];
  }

  /**
   * 最近边缘查找结果
   */
  export interface ClosestEdgeResult {
    /** 最近的边缘 */
    closestEdge: Edge | undefined;
    /** 到边缘的距离 */
    distance: number;
  }

  /**
   * 基础规则类
   * 负责根据场景对象和渲染配置计算灯光布置方案
   */
  export default class BaseRule {
    /** 适用的内容类型列表 */
    private _contentTypes: ContentType[];

    /** 适用的分类列表 */
    private _categories: string[];

    /** 规则优先级（默认10） */
    private _priority: number;

    /** 规则配置 */
    private _config: RuleConfig | null;

    /** 规则类型 */
    private _ruleType: RuleType;

    /**
     * 构造函数
     * @param config - 规则配置
     * @param ruleType - 规则类型
     * @param priority - 优先级，默认10
     */
    constructor(config: RuleConfig | null, ruleType: RuleType, priority?: number);

    /**
     * 访问场景对象，计算并返回灯光配置
     * @param sceneObject - 场景对象
     * @param scene - 场景容器
     * @param renderOptions - 渲染选项
     * @param additionalParam - 额外参数（具体类型待定）
     * @returns 灯光配置数组，如果不感兴趣返回null
     */
    visit(
      sceneObject: SceneObject | null,
      scene: Scene,
      renderOptions: RenderOptions,
      additionalParam: unknown
    ): LightConfig[] | null;

    /**
     * 获取规则优先级
     * @returns 优先级数值
     */
    priority(): number;

    /**
     * 获取规则类型
     * @returns 规则类型
     */
    getRuleType(): RuleType;

    /**
     * 设置适用的内容类型
     * @param contentTypes - 内容类型数组
     */
    setContentTypes(contentTypes: ContentType[] | null): void;

    /**
     * 设置适用的分类
     * @param categories - 分类数组
     */
    setCategories(categories: string[] | null): void;

    /**
     * 初始化规则，从配置中加载内容类型和分类
     */
    init(): void;

    /**
     * 检查规则是否对该场景对象感兴趣
     * @param sceneObject - 场景对象
     * @returns 是否感兴趣
     * @private
     */
    private _interested(sceneObject: SceneObject): boolean;

    /**
     * 检查分类是否匹配
     * @param categories - 要检查的分类列表
     * @param sceneObject - 场景对象
     * @returns 是否在分类中
     * @private
     */
    private _isInCategory(categories: string[], sceneObject: SceneObject): boolean;

    /**
     * 计算灯光配置（子类需实现）
     * @param sceneObject - 场景对象
     * @param scene - 场景容器
     * @param renderOptions - 渲染选项
     * @param additionalParam - 额外参数
     * @returns 灯光配置数组
     * @protected
     */
    protected _compute(
      sceneObject: SceneObject | null,
      scene: Scene,
      renderOptions: RenderOptions,
      additionalParam: unknown
    ): LightConfig[] | null;

    /**
     * 调整位置以避免碰撞
     * @param position - 原始位置
     * @param sceneObject - 场景对象
     * @param offset - 偏移量
     * @returns 调整后的位置，如果无需调整返回null
     * @protected
     */
    protected _adjustPosition(
      position: Point2D,
      sceneObject: SceneObject,
      offset: number
    ): Point2D | null;

    /**
     * 验证灯光配置是否有效（避免与现有灯光冲突）
     * @param lightConfig - 灯光配置
     * @param scene - 场景容器
     * @param renderOptions - 渲染选项
     * @returns 是否有效
     * @protected
     */
    protected _isValid(
      lightConfig: LightConfig,
      scene: Scene,
      renderOptions: RenderOptions
    ): boolean;

    /**
     * 获取默认灯光高度
     * @param scene - 场景容器
     * @returns 默认高度值
     * @protected
     */
    protected getDefaultHeight(scene: Scene): number;

    /**
     * 根据场景和渲染选项获取默认灯光配置
     * @param sceneObject - 场景对象
     * @param scene - 场景容器
     * @param renderOptions - 渲染选项
     * @returns 默认灯光配置
     * @protected
     */
    protected getDefaultLight(
      sceneObject: SceneObject,
      scene: Scene,
      renderOptions: RenderOptions
    ): LightConfig;

    /**
     * 获取最近的边缘
     * @param sceneObject - 场景对象
     * @param point - 目标点
     * @param direction - 方向向量
     * @returns 最近边缘及距离
     * @protected
     */
    protected getClosestEdge(
      sceneObject: SceneObject,
      point: THREE.Vector2,
      direction: THREE.Vector2
    ): ClosestEdgeResult;
  }
}