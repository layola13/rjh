/**
 * Window Strategy - 窗口材质处理策略
 * 
 * 用于处理窗户及相关组件（窗台、窗框、窗洞等）的材质吸取和应用
 */

/**
 * 拾取结果接口
 */
interface PickResult {
  /** 视图对象 */
  viewObject: ViewObject;
}

/**
 * 视图对象接口
 */
interface ViewObject {
  /** 场景节点 */
  node: SceneNode;
}

/**
 * 场景节点接口
 */
interface SceneNode {
  /** 实体ID */
  entityId?: string;
}

/**
 * 材质数据接口
 */
interface MaterialData {
  /** 克隆材质数据 */
  clone(): MaterialData;
  
  /** 检查是否为指定类型的实例 */
  instanceOf(modelClass: string): boolean;
  
  /** 获取材质数据（当实例为NgMaterial时） */
  getMaterialData?(): MaterialData;
}

/**
 * 参数化实体参数接口
 */
interface EntityParameters {
  /** 材质数据 */
  materialData?: MaterialData;
  
  /** 内部材质数据（用于墙体、天花板） */
  innerMaterialData?: MaterialData;
  
  /** 侧面材质数据（用于窗洞） */
  sideMaterialData?: MaterialData;
  
  /** 顶部材质数据（用于窗洞） */
  topMaterialData?: MaterialData;
  
  /** 底部材质数据（用于窗洞） */
  bottomMaterialData?: MaterialData;
  
  /** 窗框参数 */
  frame?: {
    materialData: MaterialData;
  };
}

/**
 * 参数化实体接口
 */
interface ParametricEntity {
  /** 实体参数 */
  parameters: EntityParameters;
  
  /** 子实体集合 */
  children?: Record<string, ParametricEntity>;
  
  /** 检查是否为指定类型的实例 */
  instanceOf(modelClass: string): boolean;
  
  /** 获取唯一父实体 */
  getUniqueParent(): ParametricEntity;
  
  /** 参数变更回调 */
  onParametersChanged(): void;
  
  /** 标记材质为脏状态（需要更新） */
  dirtyMaterial(): void;
}

/**
 * 吸取信息接口
 */
interface SuckInfo {
  /** 材质数据 */
  materialData?: MaterialData;
  
  /** 绘制信息 */
  paint?: {
    /** 图案信息 */
    pattern?: unknown;
  };
}

/**
 * 吸取上下文接口
 */
interface SuckContext {
  /** 目标实体 */
  entity: ParametricEntity;
  
  /** 网格ID */
  meshId: string;
  
  /** 视图对象 */
  viewObject?: ViewObject;
  
  /** 拾取结果列表 */
  pickResults?: PickResult[];
}

/**
 * 撤销/重做数据接口
 */
interface UndoRedoData {
  /** 目标实体列表 */
  target: ParametricEntity[];
  
  /** 材质数据列表 */
  material: MaterialData[];
}

/**
 * 材质刷请求结果接口
 */
interface MaterialBrushResult {
  /** 材质数据 */
  materialData: MaterialData;
}

/**
 * 窗口材质策略类
 * 
 * 继承自基础策略类，专门处理窗户及其子组件的材质操作
 * 支持的组件类型：
 * - NgParametricWindow（参数化窗户）
 * - NgParametricWindowSill（窗台）
 * - NgParametricWindowPocket（窗框）
 * - NgParametricWall（墙体）
 * - NgParametricWindowHole（窗洞）
 * - NgParametricWindowCeiling（窗户天花板）
 */
declare class WindowStrategy {
  /** 策略类型标识 */
  readonly type: "WindowStrategy";

  /**
   * 构造函数
   */
  constructor();

  /**
   * 判断指定上下文是否可以吸取材质
   * 
   * @param context - 吸取上下文
   * @returns 如果当前实体存在且有有效的材质数据，返回true
   */
  isSuckable(context: SuckContext): boolean;

  /**
   * 执行材质吸取操作
   * 
   * @param context - 吸取上下文
   * @returns 包含材质数据的对象，如果吸取失败返回null
   */
  suck(context: SuckContext): MaterialBrushResult | null;

  /**
   * 判断材质是否可以应用到指定实体
   * 
   * @param context - 吸取上下文
   * @param suckInfo - 吸取的材质信息
   * @returns 如果实体存在且材质信息有效，返回true
   */
  isAppliable(context: SuckContext, suckInfo: SuckInfo): boolean;

  /**
   * 将材质应用到指定实体列表
   * 
   * @param entities - 目标实体数组
   * @param suckInfo - 要应用的材质信息
   */
  apply(entities: ParametricEntity[], suckInfo: SuckInfo): void;

  /**
   * 获取撤销操作所需的数据
   * 
   * @param entities - 实体数组
   * @returns 包含目标实体和当前材质状态的数据对象
   */
  getUndoData(entities: ParametricEntity[]): UndoRedoData;

  /**
   * 获取重做操作所需的数据
   * 
   * @param entities - 实体数组
   * @returns 包含目标实体和新材质状态的数据对象
   */
  getRedoData(entities: ParametricEntity[]): UndoRedoData;

  /**
   * 执行撤销操作
   * 
   * @param context - 吸取上下文
   * @param undoData - 撤销数据
   */
  undo(context: SuckContext, undoData: UndoRedoData): void;

  /**
   * 执行重做操作
   * 
   * @param context - 吸取上下文
   * @param redoData - 重做数据
   */
  redo(context: SuckContext, redoData: UndoRedoData): void;

  /**
   * 提交材质刷请求
   * 
   * @param context - 吸取上下文
   * @param suckInfo - 吸取的材质信息
   */
  commitRequest(context: SuckContext, suckInfo: SuckInfo): void;

  /**
   * 执行撤销/重做操作的内部实现
   * 
   * @param data - 撤销或重做数据
   * @private
   */
  private _executeUndoRedo(data: UndoRedoData): void;

  /**
   * 检查实体是否为可处理的类型
   * 
   * @param entity - 参数化实体
   * @returns 如果是窗台、窗框或窗户，返回true
   * @private
   */
  private _entityIsAvailed(entity: ParametricEntity): boolean;

  /**
   * 根据网格ID获取当前网格对象
   * 
   * @param meshId - 网格ID
   * @param viewObject - 视图对象
   * @returns 匹配的网格对象或null
   * @private
   */
  private _getCurrentMesh(meshId: string, viewObject: ViewObject): SceneNode | null;

  /**
   * 从上下文中获取当前操作的实体
   * 
   * 根据实体类型和网格信息，查找对应的子实体或实体组
   * 
   * @param context - 吸取上下文
   * @returns 实体数组或false（表示无效）
   * @private
   */
  private _getCurrentEntity(context: SuckContext): ParametricEntity[] | false;

  /**
   * 从实体数组中提取材质数据
   * 
   * @param entities - 实体数组
   * @returns 第一个实体的材质数据或null
   * @private
   */
  private _getMaterialData(entities: ParametricEntity[]): MaterialData | null;

  /**
   * 从吸取信息中提取材质数据
   * 
   * @param suckInfo - 吸取信息
   * @returns 材质数据
   * @private
   */
  private _getMaterialDataFromSuckInfo(suckInfo: SuckInfo): MaterialData | undefined;

  /**
   * 准备砖块图案
   * 
   * @param pattern - 图案信息
   * @param materialData - 材质数据
   * @returns Promise，在图案准备完成后resolve
   * @private
   */
  private _prepareBrickPattern(pattern: unknown, materialData: MaterialData): Promise<void>;

  /**
   * 改变实体的材质
   * 
   * 根据实体类型设置对应的材质属性，并触发更新
   * 
   * @param entity - 目标实体
   * @param materialData - 新材质数据
   * @param parent - 父实体
   * @private
   */
  private _changeMaterial(
    entity: ParametricEntity,
    materialData: MaterialData,
    parent: ParametricEntity
  ): void;
}

export default WindowStrategy;