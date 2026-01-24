/**
 * 参数化吊顶材质管理器
 * 负责管理和更新各种类型参数化吊顶的材质数据
 */
export declare class MaterialManager {
  /**
   * 存储原始材质数据的映射表
   * key: 模型ID
   * value: 材质数据映射 (材质路径 -> 材质信息)
   */
  private _originalMaterials: Map<string, Map<string, MaterialData>>;

  /**
   * 标记是否需要更新线条材质
   */
  private _needUpdateMoldingMaterials: boolean;

  /**
   * 当前需要更新的型材数据类型
   * 可能的值: 'innerProfileData' | 'level1ProfileData' | 'level2ProfileData' | 'level3ProfileData' | 'outerProfileData'
   */
  private _profileDateType?: string;

  constructor();

  /**
   * 初始化材质数据
   * @param models - 需要初始化材质的模型数组
   */
  initMaterialData(models: CeilingModel[]): void;

  /**
   * 更新指定模型的材质数据
   * @param model - 需要更新材质的模型
   */
  updateMaterialData(model?: CeilingModel): void;

  /**
   * 清空所有材质数据
   */
  clearMaterialData(): void;

  /**
   * 移除指定模型的材质数据
   * @param model - 需要移除材质的模型
   */
  removeMaterialData(model?: CeilingModel): void;

  /**
   * 获取指定模型的材质数据
   * @param model - 目标模型
   * @returns 生成的材质数据映射表
   */
  getMaterialData(model: CeilingModel): Map<string, MaterialData> | undefined;

  /**
   * 标记线条材质为脏数据，需要更新
   * @param profileType - 型材数据类型
   */
  setMoldingMaterialDirty(profileType: string): void;

  /**
   * 更新线条材质数据
   * @param model - 需要更新线条材质的模型
   * @returns 更新后的材质数据映射表
   */
  updateMoldingMaterialData(model: CeilingModel): Map<string, MaterialData> | undefined;

  /**
   * 根据模型类型生成对应的材质数据
   * @param model - 目标模型
   * @param originalMaterial - 原始材质数据
   * @returns 生成的材质数据
   */
  private _generateMaterialData(
    model: CeilingModel,
    originalMaterial: Map<string, MaterialData>
  ): Map<string, MaterialData>;

  /**
   * 创建平面吊顶材质
   * @param model - 平面吊顶模型
   * @param material - 原始材质数据
   * @returns 处理后的材质数据
   */
  private _createPlaneCeilingMaterial(
    model: CeilingModel,
    material: Map<string, MaterialData>
  ): Map<string, MaterialData>;

  /**
   * 创建圆角吊顶材质
   * @param model - 圆角吊顶模型
   * @param material - 原始材质数据
   * @returns 处理后的材质数据
   */
  private _createCornerArcCeilingMaterial(
    model: CeilingModel,
    material: Map<string, MaterialData>
  ): Map<string, MaterialData>;

  /**
   * 迁移灯槽材质数据
   * @param model - 目标模型
   * @param material - 材质数据映射表
   */
  private _migrateLightSlot(
    model: CeilingModel,
    material: Map<string, MaterialData>
  ): void;

  /**
   * 创建圆形吊顶材质
   * @param model - 圆形吊顶模型
   * @param material - 原始材质数据
   * @returns 处理后的材质数据
   */
  private _createCircleCeilingMaterial(
    model: CeilingModel,
    material: Map<string, MaterialData>
  ): Map<string, MaterialData>;

  /**
   * 迁移叠级吊顶灯槽材质
   * @param model - 叠级吊顶模型
   * @param material - 材质数据映射表
   * @returns 处理后的材质数据
   */
  private _migrateCascadeCeilingLightSlotMaterial(
    model: CeilingModel,
    material: Map<string, MaterialData>
  ): Map<string, MaterialData>;

  /**
   * 迁移叠级吊顶线条材质
   * @param model - 叠级吊顶模型
   * @param material - 材质数据映射表
   * @returns 处理后的材质数据
   */
  private _migrateCascadeCeilingMoldingMaterial(
    model: CeilingModel,
    material: Map<string, MaterialData>
  ): Map<string, MaterialData>;

  /**
   * 迁移扫掠路径材质
   * @param model - 目标模型
   * @param material - 材质数据映射表
   * @returns 处理后的材质数据
   */
  private _migrateSweepPathMaterial(
    model: CeilingModel,
    material: Map<string, MaterialData>
  ): Map<string, MaterialData>;

  /**
   * 迁移扫掠轮廓材质
   * @param model - 目标模型
   * @param material - 材质数据映射表
   * @returns 处理后的材质数据
   */
  private _migrateSweepProfileMaterial(
    model: CeilingModel,
    material: Map<string, MaterialData>
  ): Map<string, MaterialData>;

  /**
   * 迁移叠级吊顶侧面材质
   * @param model - 叠级吊顶模型
   * @param material - 材质数据映射表
   * @returns 处理后的材质数据
   */
  private _migrateCascadeCeilingSideFaceMaterial(
    model: CeilingModel,
    material: Map<string, MaterialData>
  ): Map<string, MaterialData>;

  /**
   * 创建叠级吊顶材质
   * @param model - 叠级吊顶模型
   * @param material - 原始材质数据
   * @returns 处理后的材质数据
   */
  private _createCascadeCeilingMaterial(
    model: CeilingModel,
    material: Map<string, MaterialData>
  ): Map<string, MaterialData>;

  /**
   * 创建格栅吊顶材质
   * @param model - 格栅吊顶模型
   * @param material - 原始材质数据
   * @returns 处理后的材质数据
   */
  private _createGridCeilingMaterial(
    model: CeilingModel,
    material: Map<string, MaterialData>
  ): Map<string, MaterialData>;

  /**
   * 创建直角边吊顶材质
   * @param model - 直角边吊顶模型
   * @param material - 原始材质数据
   * @returns 处理后的材质数据
   */
  private _createCornerRectCeilingMaterial(
    model: CeilingModel,
    material: Map<string, MaterialData>
  ): Map<string, MaterialData>;

  /**
   * 创建装饰吊顶材质
   * @param model - 装饰吊顶模型
   * @param material - 原始材质数据
   * @returns 处理后的材质数据
   */
  private _createOrnamentCeilingMaterial(
    model: CeilingModel,
    material: Map<string, MaterialData>
  ): Map<string, MaterialData>;

  /**
   * 创建跌级吊顶材质
   * @param model - 跌级吊顶模型
   * @param material - 原始材质数据
   * @returns 处理后的材质数据
   */
  private _createDropDownCeilingMaterial(
    model: CeilingModel,
    material: Map<string, MaterialData>
  ): Map<string, MaterialData>;

  /**
   * 创建过道格栅吊顶材质
   * @param model - 过道格栅吊顶模型
   * @param material - 原始材质数据
   * @returns 处理后的材质数据
   */
  private _createAisleGridCeilingMaterial(
    model: CeilingModel,
    material: Map<string, MaterialData>
  ): Map<string, MaterialData>;

  /**
   * 创建欧式吊顶材质
   * @param model - 欧式吊顶模型
   * @param material - 原始材质数据
   * @returns 处理后的材质数据
   */
  private _createEuropeanStyleCeilingMaterial(
    model: CeilingModel,
    material: Map<string, MaterialData>
  ): Map<string, MaterialData>;

  /**
   * 创建内圆吊顶材质
   * @param model - 内圆吊顶模型
   * @param material - 原始材质数据
   * @returns 处理后的材质数据
   */
  private _createInnerCircleCeilingMaterial(
    model: CeilingModel,
    material: Map<string, MaterialData>
  ): Map<string, MaterialData>;

  /**
   * 创建带横梁方形吊顶材质
   * @param model - 带横梁方形吊顶模型
   * @param material - 原始材质数据
   * @returns 处理后的材质数据
   */
  private _createSquareCeilingWithCrossBeamMaterial(
    model: CeilingModel,
    material: Map<string, MaterialData>
  ): Map<string, MaterialData> | undefined;

  /**
   * 创建带横梁坡屋顶材质
   * @param model - 带横梁坡屋顶模型
   * @param material - 原始材质数据
   * @returns 处理后的材质数据
   */
  private _createPitchedRoofWithCrossBeamMaterial(
    model: CeilingModel,
    material: Map<string, MaterialData>
  ): Map<string, MaterialData> | undefined;

  /**
   * 创建带横梁人字形吊顶材质
   * @param model - 带横梁人字形吊顶模型
   * @param material - 原始材质数据
   * @returns 处理后的材质数据
   */
  private _createHerringboneCeilingWithCrossBeamMaterial(
    model: CeilingModel,
    material: Map<string, MaterialData>
  ): Map<string, MaterialData> | undefined;

  /**
   * 更新线条材质数据（内部实现）
   * @param model - 目标模型
   * @param material - 材质数据映射表
   */
  private _updateMoldingMaterialData(
    model: CeilingModel,
    material: Map<string, MaterialData>
  ): void;

  /**
   * 更新指定线条的材质
   * @param moldingKey - 线条标识符
   * @param newMaterial - 新的材质数据
   * @param materialMap - 材质数据映射表
   * @param model - 目标模型
   */
  private _updateMoldingMaterial(
    moldingKey: string,
    newMaterial: MaterialData,
    materialMap: Map<string, MaterialData>,
    model: CeilingModel
  ): void;

  /**
   * 更新圆形吊顶线条材质
   * @param model - 圆形吊顶模型
   * @param material - 材质数据映射表
   */
  private _updateCircleCeilingMoldingMaterial(
    model: CeilingModel,
    material: Map<string, MaterialData>
  ): void;

  /**
   * 更新平面吊顶线条材质
   * @param model - 平面吊顶模型
   * @param material - 材质数据映射表
   */
  private _updatePlaneCeilingMoldingMaterial(
    model: CeilingModel,
    material: Map<string, MaterialData>
  ): void;

  /**
   * 更新叠级吊顶线条材质
   * @param model - 叠级吊顶模型
   * @param material - 材质数据映射表
   */
  private _updateCascadeCeilingMoldingMaterial(
    model: CeilingModel,
    material: Map<string, MaterialData>
  ): void;

  /**
   * 更新直角边吊顶线条材质
   * @param model - 直角边吊顶模型
   * @param material - 材质数据映射表
   */
  private _updateCornerRectCeilingMoldingMaterial(
    model: CeilingModel,
    material: Map<string, MaterialData>
  ): void;

  /**
   * 更新装饰吊顶线条材质
   * @param model - 装饰吊顶模型
   * @param material - 材质数据映射表
   */
  private _updateOrnamentCeilingMoldingMaterial(
    model: CeilingModel,
    material: Map<string, MaterialData>
  ): void;

  /**
   * 更新跌级吊顶线条材质
   * @param model - 跌级吊顶模型
   * @param material - 材质数据映射表
   */
  private _updateDropDownCeilingMoldingMaterial(
    model: CeilingModel,
    material: Map<string, MaterialData>
  ): void;

  /**
   * 更新格栅吊顶线条材质
   * @param model - 格栅吊顶模型
   * @param material - 材质数据映射表
   */
  private _updateGridCeilingMoldingMaterial(
    model: CeilingModel,
    material: Map<string, MaterialData>
  ): void;

  /**
   * 更新内圆吊顶线条材质
   * @param model - 内圆吊顶模型
   * @param material - 材质数据映射表
   */
  private _updateInnerCircleCeilingMoldingMaterial(
    model: CeilingModel,
    material: Map<string, MaterialData>
  ): void;

  /**
   * 更新欧式吊顶线条材质
   * @param model - 欧式吊顶模型
   * @param material - 材质数据映射表
   */
  private _updateEuropeanStyleCeilingMoldingMaterial(
    model: CeilingModel,
    material: Map<string, MaterialData>
  ): void;
}

/**
 * 材质数据接口
 */
export interface MaterialData {
  /** 材质旋转角度 */
  rotation?: number;
  [key: string]: unknown;
}

/**
 * 吊顶模型基类型
 */
export interface CeilingModel {
  /** 模型唯一标识符 */
  id: string;

  /** 模型元数据 */
  metadata: {
    /** 参数配置 */
    parameters: CeilingParameters;
  };

  /** 参数化路径数据 */
  _pamatricPath: unknown[];

  /**
   * 获取模型的材质数据
   * @returns 材质数据映射表
   */
  getMaterialData(): Map<string, MaterialData>;
}

/**
 * 吊顶参数配置接口
 */
export interface CeilingParameters {
  /** 参数化吊顶类型 */
  parametricCeilingType: number;

  /** 型材类型 */
  profileType?: number;

  /** X方向格栅数量 */
  gridXNum?: number;

  /** Y方向格栅数量 */
  gridYNum?: number;

  /** 格栅总数 */
  gridNum?: number;

  /** 是否添加线条 */
  addMolding?: boolean;

  /** 是否添加内侧线条 */
  addInnerMolding?: boolean;

  /** 是否添加外侧线条 */
  addOuterMolding?: boolean;

  /** 是否添加第二级线条 */
  addMoldingLevel2?: boolean;

  /** 是否添加第三级线条 */
  addMoldingLevel3?: boolean;

  /** 是否添加第二级灯槽 */
  addLightSlotLevel2?: boolean;

  /** 是否添加第三级灯槽 */
  addLightSlotLevel3?: boolean;

  /** 线条型材数据 */
  moldingProfileData?: ProfileData;

  /** 翻转线条型材数据 */
  flippedMoldingProfileData?: ProfileData;

  /** 内侧型材数据 */
  innerProfileData?: ProfileData;

  /** 外侧型材数据 */
  outerProfileData?: ProfileData;

  /** 第一级型材数据 */
  level1ProfileData?: ProfileData;

  /** 第二级型材数据 */
  level2ProfileData?: ProfileData;

  /** 第三级型材数据 */
  level3ProfileData?: ProfileData;
}

/**
 * 型材数据接口
 */
export interface ProfileData {
  /** 材质数据 */
  materialData: MaterialData;
}