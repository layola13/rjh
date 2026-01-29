/**
 * 自定义特征模型工具类
 * 提供自定义特征模型的复制、粘贴、自动适配等功能
 */
declare module HSCore.Util {
  /**
   * 自定义特征模型工具类
   * 用于处理背景墙、天花板、平台等自定义模型的克隆、粘贴和自动调整
   */
  export class CustomizedFeatureModelUtil {
    /**
     * 从源模型复制创建新的自定义模型
     * @param source - 源自定义特征模型实例
     * @returns 克隆的新模型实例，如果源模型类型不支持则返回 undefined
     */
    static copyFrom(
      source: HSCore.Model.CustomizedFeatureModel
    ): HSCore.Model.CustomizedFeatureModel | undefined;

    /**
     * 从 JSON 数据克隆模型（用于旧版自定义模型）
     * @param dumps - 序列化的模型数据数组
     * @param context - 加载上下文，包含 ID 映射、材质数据等
     * @param target - 目标模型实例
     */
    static cloneFromJSON(
      dumps: Array<SerializedModelData>,
      context: CloneContext,
      target: HSCore.Model.CustomizedFeatureModel
    ): void;

    /**
     * 从新版 JSON 数据克隆模型（用于 N 系列自定义模型）
     * @param dumps - 序列化的模型数据数组
     * @param context - 加载上下文
     * @param target - 目标 N 系列模型实例
     */
    static cloneFromNJSON(
      dumps: Array<SerializedModelData>,
      context: CloneContext,
      target: HSCore.Model.NCustomizedSketchModel
    ): void;

    /**
     * 将自定义模型粘贴到指定宿主对象
     * @param content - 包含内容的容器对象
     * @param background - 背景区域定义（外轮廓和孔洞）
     * @param convert3dMatrix - 3D 转换矩阵
     */
    static pasteTo(
      content: ContentContainer,
      background: BackgroundRegion,
      convert3dMatrix: THREE.Matrix4
    ): void;

    /**
     * 自动适配背景区域
     * @param model - 自定义特征模型实例
     * @param background - 目标背景区域
     * @param convert3dMatrix - 3D 转换矩阵
     * @param options - 可选配置项
     * @returns 是否进行了调整
     */
    static autoFitBackground(
      model: HSCore.Model.CustomizedFeatureModel,
      background: BackgroundRegion,
      convert3dMatrix: THREE.Matrix4,
      options?: AutoFitOptions
    ): boolean;

    /**
     * 收集指定宿主对象上的所有草图模型
     * @param hosts - 宿主对象数组（墙体、天花板等）
     * @returns 所有关联的草图模型数组
     */
    static collectSketchModelsByHost(
      hosts: Array<HSCore.Model.BaseModel>
    ): Array<HSCore.Model.CustomizedFeatureModel | HSCore.Model.NCustomizedSketchModel>;

    /**
     * 自动适配多个草图模型到其宿主表面
     * @param sketchModels - 需要适配的草图模型数组
     */
    static autoFitSketchModels(
      sketchModels: Array<
        HSCore.Model.CustomizedFeatureModel | HSCore.Model.NCustomizedSketchModel
      >
    ): void;

    /**
     * 更新草图模型状态
     * @param model - 需要更新的草图模型
     */
    static updateSketchModel(
      model: HSCore.Model.CustomizedFeatureModel | HSCore.Model.NCustomizedSketchModel
    ): void;

    /**
     * 获取克隆的序列化数据
     * @param source - 源模型实例
     * @returns 包含序列化数据和上下文的对象
     */
    static getClonedDumpData(source: HSCore.Model.CustomizedFeatureModel): ClonedDumpData;

    /**
     * 替换字符串中的旧面 ID 为新 ID
     * @param input - 输入字符串
     * @param idMap - ID 映射表
     * @param additionalReplacements - 额外的替换规则
     * @returns 替换后的字符串，如果输入为空则返回 undefined
     */
    static replaceWithNewFaceId(
      input: string | undefined,
      idMap: Map<string, string>,
      additionalReplacements?: Array<[string, string]>
    ): string | undefined;

    /**
     * 更新灯槽实体的参数（更新面 ID 和验证选项）
     * @param model - 自定义特征模型
     * @param idMap - ID 映射表
     * @returns 灯槽 ID 映射表
     */
    static updateLightSlotParameters(
      model: HSCore.Model.CustomizedFeatureModel,
      idMap: Map<string, string>
    ): Map<string, string>;

    /**
     * 更新灯带实体的参数
     * @param model - 自定义特征模型
     * @param idMap - ID 映射表
     */
    static updateLightBandParameters(
      model: HSCore.Model.CustomizedFeatureModel,
      idMap: Map<string, string>
    ): void;

    /**
     * 更新线条装饰实体的参数
     * @param model - 自定义特征模型
     * @param idMap - ID 映射表
     * @param lightSlotIdMap - 灯槽 ID 映射表
     */
    static updateMoldingParameters(
      model: HSCore.Model.CustomizedFeatureModel,
      idMap: Map<string, string>,
      lightSlotIdMap: Map<string, string>
    ): void;

    /**
     * 更新面材质映射
     * @param model - 自定义特征模型
     * @param idMap - ID 映射表
     * @param lightSlotIdMap - 灯槽 ID 映射表
     */
    static updateFaceMaterial(
      model: HSCore.Model.CustomizedFeatureModel,
      idMap: Map<string, string>,
      lightSlotIdMap: Map<string, string>
    ): void;

    /**
     * 更新背景法线方向
     * @param model - 自定义特征模型
     */
    static updateBackgroundNormal(model: HSCore.Model.CustomizedFeatureModel): void;

    /**
     * 自动调整草图尺寸以适配新的边界
     * @param sketch - 草图实例
     * @param sourceBounds - 源边界 [minX, minY, width, height]
     * @param targetBounds - 目标边界 [minX, minY, width, height]
     */
    static autoAdjustSketch(
      sketch: HSCore.Model.Sketch,
      sourceBounds: [number, number, number, number],
      targetBounds: [number, number, number, number]
    ): void;

    /**
     * 判断两个矩阵是否相同
     * @param matrixA - 矩阵 A
     * @param matrixB - 矩阵 B
     * @param tolerance - 容差值，默认使用 HSCore.Util.Math.defaultTolerance
     * @returns 两矩阵是否相同
     */
    static isSameMatrix(
      matrixA: THREE.Matrix4,
      matrixB: THREE.Matrix4,
      tolerance?: number
    ): boolean;

    /**
     * 更新 N 系列自定义特征模型的子实体（灯槽、灯带、线条等）
     * @param model - N 系列自定义草图模型
     * @param context - 克隆上下文
     */
    static updateNCustomizedFeatureModelChildren(
      model: HSCore.Model.NCustomizedSketchModel,
      context: CloneContext
    ): void;

    /**
     * 更新 N 系列自定义模型的材质映射
     * @param model - N 系列模型实例
     * @param context - 克隆上下文
     */
    static updateNCustomizedModelMaterial(
      model:
        | HSCore.Model.NCustomizedSketchModel
        | HSCore.Model.NCustomizedModelLightSlot,
      context: CloneContext
    ): void;

    /**
     * 获取 N 系列自定义模型的自动分组数据
     * @param entity - N 系列模型实体
     * @param faceIds - 面 ID 数组
     * @returns 包含面网格键数组和实体-面映射数组的元组
     */
    static getNCustomizedModelAutoGroupData(
      entity: HSCore.Model.NCustomizedSketchModel | HSCore.Model.NCustomizedModelLightSlot,
      faceIds: string[]
    ): [string[], Array<FaceMeshMapping>];
  }

  /**
   * 背景区域定义
   */
  interface BackgroundRegion {
    /** 外轮廓坐标点数组 */
    outer: Array<{ x: number; y: number }>;
    /** 孔洞数组 */
    holes: Array<Array<{ x: number; y: number }>>;
  }

  /**
   * 自动适配选项
   */
  interface AutoFitOptions {
    /** 是否保留背景曲线 */
    keepBackgroundCurve?: boolean;
    /** 是否存在背景 */
    hasBackground?: boolean;
  }

  /**
   * 序列化的模型数据
   */
  interface SerializedModelData {
    /** 实体 ID */
    id: string;
    /** 是否忽略生成 Brep */
    ignoreGenerateBrep?: boolean;
    [key: string]: unknown;
  }

  /**
   * 克隆上下文
   */
  interface CloneContext {
    /** 通用数据存储 */
    data: Record<string, SerializedModelData>;
    /** 材质数据映射 */
    materialsData: Map<string, unknown>;
    /** 状态数据存储 */
    statesData: Record<string, unknown>;
    /** 约束数据映射 */
    constraintsData: Map<string, unknown>;
    /** 状态对象映射 */
    states: Record<string, unknown>;
    /** 实体对象映射 */
    entities: Record<string, unknown>;
    /** 材质对象映射 */
    materials: Map<string, unknown>;
    /** 约束对象映射 */
    constraints: Record<string, unknown>;
    /** 产品元数据映射 */
    productsMap: Map<string, unknown>;
    /** 实体 ID 生成器 */
    idGenerator: IDGenerator;
    /** 材质 ID 生成器 */
    materialIdGenerator: IDGenerator;
    /** 状态 ID 生成器 */
    stateIdGenerator: IDGenerator;
    /** 约束 ID 生成器 */
    constraintIdGenerator: IDGenerator;
    /** ID 映射表（旧 ID -> 新 ID） */
    idMap: Map<string, string>;
    /** 是否处于恢复状态 */
    duringRestore: boolean;
  }

  /**
   * 克隆后的序列化数据
   */
  interface ClonedDumpData {
    /** 序列化的模型数据数组 */
    dumps: Array<SerializedModelData>;
    /** 克隆上下文 */
    context: CloneContext;
  }

  /**
   * 内容容器
   */
  interface ContentContainer {
    /** 内容实例 */
    content: HSCore.Model.CustomizedFeatureModel;
  }

  /**
   * 面网格映射
   */
  interface FaceMeshMapping {
    /** 关联实体 */
    entity: HSCore.Model.NCustomizedSketchModel | HSCore.Model.NCustomizedModelLightSlot;
    /** 面网格键 */
    faceMeshKey: string;
  }

  /**
   * ID 生成器接口
   */
  interface IDGenerator {
    (): string;
  }
}