/**
 * 屋顶类型枚举
 * 定义了所有支持的屋顶样式类型
 */
export enum ENParamRoofType {
  /** 平面屋顶 */
  Plane = "Plane",
  /** 坡屋顶 */
  Pitched = "Pitched",
  /** 人字形屋顶 */
  HerringBone = "HerringBone",
  /** 四坡屋顶 */
  Hip = "Hip",
  /** 盐盒式屋顶 */
  SaltBox = "SaltBox",
  /** 箱式山墙屋顶 */
  BoxGable = "BoxGable",
  /** 金字塔屋顶 */
  Pyramid = "Pyramid"
}

/**
 * 选中实体的上下文信息
 */
interface SelectionContext {
  /** 选中的实体对象 */
  entity: unknown;
}

/**
 * 画布显示层配置
 */
interface DisplayLayers {
  /** 临时绘制层 */
  temp: unknown;
}

/**
 * 画布对象接口
 */
interface Canvas {
  /** 画布上下文 */
  context: CanvasContext;
  /** 显示图层配置 */
  displayLayers: DisplayLayers;
}

/**
 * 画布上下文接口
 */
interface CanvasContext {
  /** 是否处于冻结状态（不可编辑） */
  frozen: boolean;
}

/**
 * 交互式模型基类
 */
interface InteractiveModel {
  /** 源模型对象 */
  srcModel: unknown;
  /** 模型构建器 */
  builder: ModelBuilder;
}

/**
 * 模型构建器接口
 */
interface ModelBuilder {
  /** 可草图化对象 */
  sketchable: Sketchable;
}

/**
 * 可草图化对象接口
 */
interface Sketchable {
  /** 屋顶配置（可选） */
  roof?: RoofConfiguration;
}

/**
 * 屋顶配置接口
 */
interface RoofConfiguration {
  /** 屋顶参数 */
  parameters: RoofParameters;
}

/**
 * 屋顶参数接口
 */
interface RoofParameters {
  /** 屋顶类型 */
  roofType: ENParamRoofType;
}

/**
 * Gizmo基类（用于交互式操作手柄）
 */
interface Gizmo {
  // Gizmo基础接口定义
}

/**
 * Gizmo工厂类
 * 负责根据选中的实体创建相应的交互式Gizmo（操作手柄）
 */
export class GizmoFactory {
  /** 应用程序实例 */
  private readonly _app: unknown;
  
  /** 画布实例 */
  private readonly _canvas: Canvas;

  /**
   * 构造函数
   * @param canvas - 画布对象
   * @param app - 应用程序实例
   */
  constructor(canvas: Canvas, app: unknown);

  /**
   * 根据选中的实体创建相应的Gizmo
   * @param selections - 选中的实体上下文数组
   * @returns Gizmo对象数组
   */
  createSelectionGizmo(selections: SelectionContext[]): Gizmo[];

  /**
   * 检查Gizmo工厂是否处于激活状态
   * @returns 当画布上下文未冻结时返回true
   */
  isActive(): boolean;
}