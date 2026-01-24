/**
 * 自定义模型线条策略类
 * 用于处理自定义模型线条的吸取、应用、撤销和重做操作
 */

/**
 * 线条参数数据接口
 */
export interface MoldingParameters {
  /** 错误码，-1 表示无错误 */
  error?: number;
  /** 轮廓数据 */
  profileData: ProfileData;
  /** 材质数据 */
  materialData?: MaterialData;
}

/**
 * 轮廓数据接口
 */
export interface ProfileData {
  /** 查找ID */
  seekId?: string;
  /** 内容类型 */
  contentType?: string;
  /** 轮廓 */
  profile?: string;
  /** 法线纹理 */
  normalTexture?: string;
  /** 高质量法线纹理 */
  normalTextureHigh?: string;
  /** 缩略图 */
  thumbnail?: string;
  /** 轮廓X方向尺寸 */
  profileSizeX: number;
  /** 轮廓Y方向尺寸 */
  profileSizeY: number;
  /** 轮廓高度 */
  profileHeight: number;
  /** 轮廓宽度 */
  profileWidth: number;
  /** 翻转 */
  flip?: boolean;
  /** 垂直翻转 */
  flipVertical?: boolean;
  /** 水平翻转 */
  flipHorizontal?: boolean;
  /** Y轴偏移 */
  offsetY?: number;
  /** X轴偏移 */
  offsetX?: number;
  /** 材质数据 */
  materialData?: MaterialData;
}

/**
 * 材质数据接口
 */
export interface MaterialData {
  [key: string]: unknown;
}

/**
 * 构造元数据参数接口
 */
export interface ConstructMetaDataParams {
  /** 数据 */
  data: ProfileData;
  /** 材质数据 */
  materialData?: MaterialData;
  /** 法线纹理 */
  normalTexture?: string;
  /** 高质量法线纹理 */
  normalTextureHigh?: string;
  /** 考虑Y射线取反 */
  considerYRayNegate: boolean;
  /** 水平翻转 */
  flipHorizontal?: boolean;
  /** 垂直翻转 */
  flipVertical?: boolean;
}

/**
 * 实体包装接口
 */
export interface EntityWrapper {
  /** 实体对象 */
  entity: HSCore.Model.CustomizedModelMolding | HSCore.Model.CustomizedModel;
}

/**
 * 撤销/重做数据接口
 */
export interface UndoRedoData {
  /** 线条参数 */
  moldingParameters: MoldingParameters;
}

/**
 * 自定义模型线条策略类
 * 继承自基础策略类，实现线条相关的吸取和应用逻辑
 */
export default class CustomizedModelMoldingStrategy {
  /**
   * 类名
   * @returns 策略类名称
   */
  get ClassName(): string;

  /**
   * 判断实体是否可以被吸取
   * @param wrapper - 包含实体的包装对象
   * @returns 如果实体是 CustomizedModelMolding 实例则返回 true
   */
  isSuckable(wrapper: EntityWrapper): boolean;

  /**
   * 从实体吸取参数数据
   * @param wrapper - 包含实体的包装对象
   * @returns 深拷贝的线条参数，如果实体不是 CustomizedModelMolding 则返回 undefined
   */
  suck(wrapper: EntityWrapper): MoldingParameters | undefined;

  /**
   * 判断参数是否可以应用到实体
   * @param wrapper - 包含实体的包装对象
   * @param parameters - 要应用的线条参数
   * @returns 如果实体是 CustomizedModelMolding 且参数有效则返回 true
   */
  isAppliable(wrapper: EntityWrapper, parameters: MoldingParameters | null): boolean;

  /**
   * 将参数应用到实体
   * 更新线条的轮廓数据、材质数据、翻转状态和偏移等属性
   * @param wrapper - 包含实体的包装对象
   * @param parameters - 要应用的线条参数
   */
  apply(wrapper: EntityWrapper, parameters: MoldingParameters | null): void;

  /**
   * 获取撤销操作所需的数据
   * @param wrapper - 包含实体的包装对象
   * @returns 包含当前线条参数的撤销数据
   */
  getUndoData(wrapper: EntityWrapper): UndoRedoData;

  /**
   * 获取重做操作所需的数据
   * @param wrapper - 包含实体的包装对象
   * @returns 包含当前线条参数的重做数据
   */
  getRedoData(wrapper: EntityWrapper): UndoRedoData;

  /**
   * 执行撤销操作
   * @param wrapper - 包含实体的包装对象
   * @param data - 撤销数据
   */
  undo(wrapper: EntityWrapper, data: UndoRedoData): void;

  /**
   * 执行重做操作
   * @param wrapper - 包含实体的包装对象
   * @param data - 重做数据
   */
  redo(wrapper: EntityWrapper, data: UndoRedoData): void;

  /**
   * 获取撤销/重做数据的内部方法
   * @param wrapper - 包含实体的包装对象
   * @returns 包含线条参数的数据对象
   * @private
   */
  private _getUndoRedoData(wrapper: EntityWrapper): UndoRedoData;
}