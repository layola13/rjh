/**
 * 编辑模式枚举
 */
export enum EditModeEnum {
  /** 编辑单个面 */
  editFace = 1,
  /** 编辑相同材质的所有面 */
  editSameFace = 2
}

/**
 * 面网格信息
 */
interface FaceMeshInfo {
  /** 实体对象 */
  entity: HSCore.Model.Entity;
  /** 面ID列表 */
  faceIds: string[];
  /** 是否为线条 */
  isMolding?: boolean;
}

/**
 * 高亮子实体信息
 */
interface HighlightChildInfo {
  /** 实体对象 */
  entity: HSCore.Model.Entity;
  /** 选中的网格名称 */
  selectedMeshNames?: string[];
  /** 选中的网格ID */
  selectedMeshIds?: number[];
  /** 所有网格 */
  allMeshes?: any[];
  /** 网格映射表 */
  meshMap?: Map<number, any>;
}

/**
 * 材质变更事件数据
 */
interface MaterialChangedEventData {
  /** 面材质数据 */
  faceMaterial?: HSCore.Material.MaterialData;
  /** 所有选中的材质数据列表 */
  selectedMaterialDatas: HSCore.Material.MaterialData[];
  /** 是否刷新 */
  refresh?: boolean;
}

/**
 * 可执行混合绘制的面信息
 */
interface MixpaintableFace {
  /** 实体对象 */
  entity: HSCore.Model.Entity;
  /** 面ID */
  faceId: string;
}

/**
 * 面网格处理器
 * 负责处理定制模型的面网格选择、材质替换、分组等操作
 */
export declare class FaceMeshHandler {
  /** 应用程序实例 */
  readonly app: HSApp.App;
  
  /** 是否通过拖拽方式替换材质 */
  isMaterialReplaceByDragging: boolean;
  
  /** 材质是否正在加载 */
  materialIsLoading: boolean;
  
  /** 高亮的子实体映射表 (实体ID -> 实体对象) */
  readonly highlightChildEntities: Map<string, HSCore.Model.Entity>;
  
  /** 网格法线贴图验证映射表 */
  readonly meshValidateNormalMap: Map<any, any>;
  
  /** 缓存的材质映射表 */
  cachedMaterialMap?: Map<any, any>;
  
  /** 3D画布对象 */
  canvas?: HSApp.View.T3d.Canvas;
  
  /** 当前编辑的实体对象 */
  entity?: HSCore.Model.Entity;
  
  /** 当前编辑的3D实体对象 */
  entity3d?: any;
  
  /** 当前编辑模式 */
  editMode: EditModeEnum;
  
  /** 选中材质变更信号 */
  readonly signalSelectedMaterialChanged: HSCore.Util.Signal<MaterialChangedEventData>;
  
  /** 工具栏插件实例 */
  private _toolbarPlugin?: any;
  
  /** 目录插件实例 */
  private _catalogPlugin?: any;
  
  /** 3D工具类 */
  private _3dUtil?: any;
  
  /** 临时网格名称列表 */
  private _tmpMeshNames?: string[];
  
  /** 材质刷工具类 */
  MaterialBrushUtil?: any;
  
  /** 定制模型工具类 */
  CustomizedModelUtil?: any;
  
  /** 混合绘制工具类 */
  MixPaintUtil?: any;
  
  /** 替换相同材质的数据映射表 (实体ID -> 面网格信息) */
  readonly replaceSameMaterialData: Map<string, FaceMeshInfo>;

  /**
   * 初始化面网格处理器
   * @param entity - 要编辑的实体对象
   */
  init(entity: HSCore.Model.Entity): void;

  /**
   * 释放资源
   */
  dispose(): void;

  /**
   * 获取选中的子实体列表
   */
  get selectedChildEntities(): HSCore.Model.Entity[];

  /**
   * 判断是否选中了单个分组
   */
  get isSingleGroupSelected(): boolean;

  /**
   * 判断选中的网格是否包含灯槽
   */
  get isSelectedContainsLightSlot(): boolean;

  /**
   * 判断选中的网格是否包含分组
   */
  get isSelectedContainsGroup(): boolean;

  /**
   * 判断选中的网格是否包含线条
   * @param meshNames - 网格名称列表（可选）
   */
  isSelectedContainsMolding(meshNames?: string[]): boolean;

  /**
   * 判断选中的网格是否包含面
   */
  get isSelectedContainsFace(): boolean;

  /**
   * 判断当前是否有添加材质命令正在执行
   */
  get isCmdActive(): boolean;

  /**
   * 清理操作
   * 取消所有高亮和选择状态
   */
  onCleanup(): void;

  /**
   * 处理ESC键按下事件
   */
  onESC(): void;

  /**
   * 取消选择所有网格
   */
  unselectMeshes(): void;

  /**
   * 取消选择所有子实体
   */
  unSelectChilds(): void;

  /**
   * 处理目录项点击事件（应用材质）
   * @param catalogItem - 目录项（材质）
   * @param targetEntity - 目标实体
   * @param isReplaceSame - 是否替换相同材质
   * @param clickPosition - 点击位置坐标
   * @param additionalData - 附加数据
   */
  onCatalogItemClicked(
    catalogItem: HSCatalog.CatalogItem,
    targetEntity: HSCore.Model.Entity,
    isReplaceSame?: boolean,
    clickPosition?: [number, number],
    additionalData?: any
  ): void;

  /**
   * 替换相同材质
   * @param catalogItem - 目录项（材质）
   * @param targetEntity - 目标实体
   */
  replaceSameMaterial(
    catalogItem: HSCatalog.CatalogItem,
    targetEntity: HSCore.Model.Entity
  ): void;

  /**
   * 清空高亮的子实体集合
   */
  clearHighlightChildEntities(): void;

  /**
   * 获取选中的网格名称列表
   * @param entity - 实体对象（可选）
   */
  getSelectedMeshNames(entity?: HSCore.Model.Entity): string[];

  /**
   * 触发选中材质变更事件
   * @param refresh - 是否刷新
   */
  dispatchSelectedMaterialChanged(refresh?: boolean): void;

  /**
   * 取消分组
   * 将分组的面拆分为独立的面
   */
  unGroup(): void;

  /**
   * 通过网格名称选中相同材质的所有面
   * @param meshName - 网格名称
   */
  selectSameMaterialByMeshName(meshName: string): void;

  /**
   * 通过网格ID选中相同材质的所有面
   * @param meshId - 网格ID
   */
  selectSameMaterialByMeshId(meshId: number): void;

  /**
   * 高亮所有特征模型中的相同材质
   * @param sourceEntity - 源实体
   * @param meshName - 网格名称
   */
  highlightAllFeatureModelSameMaterial(
    sourceEntity: HSCore.Model.Entity,
    meshName: string
  ): void;

  /**
   * 通过网格名称高亮相同材质的所有面
   * @param meshName - 网格名称
   */
  highLightSameMaterialByMeshName(meshName: string): void;

  /**
   * 高亮面分组
   * @param faceType - 面类型/ID
   * @param entity - 实体对象
   */
  highlightFaceGroupByMeshId(faceType: string, entity: HSCore.Model.Entity): void;

  /**
   * 通过网格ID高亮相同材质的所有面
   * @param meshId - 网格ID
   */
  highLightSameMaterialByMeshId(meshId: number): void;

  /**
   * 移除多材质选择模式
   */
  removeMultiMaterialsOrder(): void;

  /**
   * 获取选中的材质数据
   * @param meshId - 网格ID（可选）
   */
  getSelectedMaterialData(meshId?: number): HSCore.Material.MaterialData | undefined;

  /**
   * 获取子3D对象列表
   * @param filterEntities - 过滤的实体列表（可选）
   * @param parent3d - 父3D对象（可选）
   */
  getChild3Ds(
    filterEntities?: HSCore.Model.Entity[],
    parent3d?: any
  ): HighlightChildInfo[];

  /**
   * 清除材质
   */
  clearMaterial(): void;

  /**
   * 执行混合绘制
   */
  doMixpaint(): void;

  /**
   * 判断是否可以对面进行分组
   * @param entity - 实体对象（可选）
   */
  canGroupFaces(entity?: HSCore.Model.Entity): boolean;

  /**
   * 判断是否可以取消面分组
   * @param entity - 实体对象（可选）
   */
  canUnGroupFaces(entity?: HSCore.Model.Entity): boolean;

  /**
   * 获取分组的面列表
   * @param entity - 实体对象（可选）
   */
  getGroupFaces(entity?: HSCore.Model.Entity): string[];

  /**
   * 判断是否有面被选中
   */
  hasFaceSelected(): boolean;

  /**
   * 分组混合绘制的面
   * @param entity - 实体对象（可选）
   * @param faceIds - 面ID列表（可选）
   */
  groupMixpaint(entity?: HSCore.Model.Entity, faceIds?: string[]): void;

  /**
   * 取消混合绘制面的分组
   * @param entity - 实体对象（可选）
   * @param faceIds - 面ID列表（可选）
   */
  unGroupMixpaint(entity?: HSCore.Model.Entity, faceIds?: string[]): void;

  /**
   * 设置编辑模式
   * @param mode - 编辑模式
   */
  setEditMode(mode: EditModeEnum): void;

  /**
   * 将选中的材质应用到所有线条
   */
  applySelectedToAllMoldings(): void;

  /**
   * 将选中的材质应用到所有面
   */
  applySelectedToAll(): void;

  /**
   * 获取可执行混合绘制的选中面信息
   */
  selectOnFaceCanDoMixpaint(): MixpaintableFace | undefined;

  /**
   * 获取所有选中面的材质数据列表
   */
  getAllSelectedMaterialDatas(): HSCore.Material.MaterialData[];

  /**
   * 清除高亮的相同材质实体
   */
  clearHighlightSameMaterialEntities(): void;

  /**
   * 私有方法：根据网格ID获取网格名称列表
   * @param meshIds - 网格ID列表
   * @param entity - 实体对象（可选）
   */
  private _getMeshNamesByMeshIds(
    meshIds: number[],
    entity?: HSCore.Model.Entity
  ): string[];

  /**
   * 私有方法：材质替换事件处理
   * @param event - 事件对象
   */
  private _onMaterialReplace(event: any): void;

  /**
   * 私有方法：获取高亮的网格ID列表
   * @param entity - 实体对象（可选）
   */
  private _getHighlightedMeshIds(entity?: HSCore.Model.Entity): number[];

  /**
   * 私有方法：获取选中的网格ID列表
   * @param entity - 实体对象（可选）
   */
  private _getSelectedMeshIds(entity?: HSCore.Model.Entity): number[];

  /**
   * 私有方法：获取选中的网格ID（单个）
   */
  private _getSelectedMeshId(): number | undefined;

  /**
   * 私有方法：命令开始事件处理
   * @param event - 事件对象
   */
  private _onCommandStarted(event: any): void;

  /**
   * 私有方法：命令结束事件处理
   * @param event - 事件对象
   */
  private _onCommandTerminated(event: any): void;

  /**
   * 私有方法：获取需要应用贴图的面ID列表
   * @param faceIds - 面ID列表
   * @param additionalData - 附加数据
   */
  private _getFaceIdsNeedPattern(
    faceIds: string[],
    additionalData?: any
  ): string[];

  /**
   * 私有方法：替换后的处理逻辑
   */
  private _replaceAfterHandle(): void;
}