/**
 * glTF 扩展名称常量
 * KHR_lights_punctual 是 glTF 2.0 规范中用于定义点光源、方向光和聚光灯的官方扩展
 */
declare const EXTENSION_NAME = "KHR_lights_punctual";

/**
 * 光源类型枚举
 * 定义 glTF 支持的三种标准光源类型
 */
export type LightType = "point" | "directional" | "spot";

/**
 * 聚光灯特定属性
 * 定义聚光灯的内外锥角
 */
export interface IKHRLightsPunctualSpot {
  /**
   * 内锥角（弧度），光照完全强度的范围
   * @default 0
   */
  innerConeAngle?: number;

  /**
   * 外锥角（弧度），光照衰减到零的边界
   * @default Math.PI / 4
   */
  outerConeAngle?: number;
}

/**
 * glTF 光源定义
 * 描述场景中的一个光源及其所有属性
 */
export interface IKHRLight {
  /**
   * 光源类型
   */
  type: LightType;

  /**
   * 光源颜色（RGB，线性空间）
   * @default [1.0, 1.0, 1.0]
   */
  color?: [number, number, number];

  /**
   * 光照强度（坎德拉 cd）
   * @default 1.0
   */
  intensity?: number;

  /**
   * 光源影响范围（米）
   * 超出此距离光照强度为零
   * @default Infinity
   */
  range?: number;

  /**
   * 聚光灯特定属性
   * 仅当 type 为 "spot" 时使用
   */
  spot?: IKHRLightsPunctualSpot;

  /**
   * 光源名称（可选）
   */
  name?: string;
}

/**
 * glTF 扩展数据结构
 * 包含场景中所有光源的定义列表
 */
export interface IKHRLightsPunctual {
  /**
   * 光源数组
   */
  lights: IKHRLight[];
}

/**
 * glTF 节点扩展引用
 * 在 glTF 节点上引用光源索引
 */
export interface IKHRLightReference {
  /**
   * 光源在 lights 数组中的索引
   */
  light: number;
}

/**
 * KHR_lights_punctual 导出器扩展类
 * 负责将 Babylon.js 场景中的光源导出为 glTF 2.0 KHR_lights_punctual 扩展格式
 * 
 * @remarks
 * 此扩展支持以下 Babylon.js 光源类型：
 * - PointLight → "point"
 * - DirectionalLight → "directional"
 * - SpotLight → "spot"
 * 
 * 其他光源类型（如 HemisphericLight）不受支持，导出时会发出警告
 */
export declare class KHR_lights_punctual {
  /**
   * 扩展名称
   */
  readonly name: typeof EXTENSION_NAME;

  /**
   * 是否启用该扩展
   * @default true
   */
  enabled: boolean;

  /**
   * 扩展是否为必需项
   * 如果为 true，不支持该扩展的 glTF 加载器将无法加载该文件
   * @default false
   */
  required: boolean;

  /**
   * glTF 导出器实例引用
   * @internal
   */
  private readonly _exporter: any;

  /**
   * 存储导出的光源数据
   * 仅在有光源被导出时才会初始化
   * @internal
   */
  private _lights: IKHRLightsPunctual | null;

  /**
   * 构造函数
   * @param exporter - glTF 导出器实例
   */
  constructor(exporter: any);

  /**
   * 释放资源
   * 清理内部光源数据引用
   */
  dispose(): void;

  /**
   * 检查扩展是否已被使用
   * @returns 如果至少有一个光源被导出则返回 true
   */
  get wasUsed(): boolean;

  /**
   * 导出完成前的钩子
   * 将收集的光源数据写入 glTF 扩展字段
   * @internal
   */
  onExporting(): void;

  /**
   * 节点导出后的异步处理钩子
   * 处理关联到节点的光源，将其转换为 glTF 格式并添加必要的变换
   * 
   * @param context - 导出上下文路径（用于日志）
   * @param node - 导出的 glTF 节点对象
   * @param babylonNode - 原始 Babylon.js 节点
   * @param nodeMap - 节点唯一 ID 到 glTF 节点索引的映射
   * @returns Promise，resolve 时返回修改后的节点或 null
   * 
   * @remarks
   * 此方法会执行以下操作：
   * 1. 检查节点是否为 ShadowLight（可导出的光源基类）
   * 2. 将光源类型映射到 glTF 标准类型
   * 3. 转换坐标系统（Babylon 左手系 → glTF 右手系）
   * 4. 处理光源属性（颜色、强度、范围等）
   * 5. 对于父节点只有一个子节点的情况，优化变换层级
   * 6. 将光源引用添加到节点扩展中
   */
  postExportNodeAsync(
    context: string,
    node: any,
    babylonNode: any,
    nodeMap: Record<number, number>
  ): Promise<any>;
}

/**
 * 模块导出
 * 自动注册扩展到 glTF 导出器
 */
declare module "@babylonjs/serializers" {
  interface IGLTFExporterExtension {
    KHR_lights_punctual: typeof KHR_lights_punctual;
  }
}