/**
 * 多楼层管理器模块
 * 负责楼层的显示、编辑、增删改查等操作
 */

/** 楼层编辑栏参数配置 */
interface LayerEditBarParams {
  /** 包含的楼层列表 */
  includedLayers?: Layer[];
  /** 是否显示所有楼层的可见性控制 */
  showAllLayersVisibility?: boolean;
  /** 切换楼层确认回调 */
  switchLayerConfirm?: () => void;
  /** 切换楼层开始回调 */
  switchLayerStart?: () => void;
  /** 切换楼层结束回调 */
  switchLayerEnd?: () => void;
}

/** 楼层数据 */
interface SlabData {
  /** 楼层显示文本（如"F1层"或"B1层"） */
  text: string;
  /** 楼层名称 */
  name: string;
  /** 是否为激活状态 */
  status: boolean;
  /** 楼层索引（地上为正数，地下为负数） */
  index: number;
  /** 楼层对象引用 */
  layer: Layer;
  /** 是否在2D视图中显示 */
  show2d: boolean;
  /** 是否在3D视图中显示 */
  show3d: boolean;
}

/** 激活楼层数据 */
interface ActiveData {
  /** 楼层显示文本 */
  text: string;
  /** 楼层名称 */
  name: string;
  /** 楼层高度 */
  height: number;
  /** 楼板厚度 */
  thickness: number;
  /** 楼层面积 */
  area: number;
  /** 楼层对象引用 */
  layer: Layer;
}

/** 布局位置更新参数 */
interface LayoutPositionUpdate {
  /** 是否更新左侧位置 */
  updateLeft?: boolean;
  /** 左侧偏移量 */
  left?: number;
  /** 是否更新底部位置 */
  updateBottom?: boolean;
  /** 底部偏移量 */
  bottom?: number;
}

/** 命令处理器映射 */
interface CommandHandlers {
  [HSFPConstants.CommandType.InsertLayer]: (direction: 'up' | 'down', callback?: () => void) => void;
  [HSFPConstants.CommandType.AddNewLayer]: (layerType: LayerTypeEnum, callback?: () => void) => void;
  [HSFPConstants.CommandType.DeleteLayer]: (layer: Layer, confirmationCode: number) => void;
  [HSFPConstants.CommandType.ChangeLayerVisibility3d]: (layer: Layer, visible: boolean, silent?: boolean) => void;
  [HSFPConstants.CommandType.ActiveLayer]: (layer: Layer) => void;
  [HSFPConstants.CommandType.RenameLayer]: (layer: Layer, newName: string) => void;
  [HSFPConstants.CommandType.ResetLayerIndex]: (layer: Layer, targetIndex: number, direction: 'up' | 'down') => void;
  ToggleCeiling: (visible: boolean) => void;
}

/** 楼层类型枚举 */
declare enum LayerTypeEnum {
  LayerTypeNormal = 'normal',
  LayerTypeBasement = 'basement'
}

/** 楼层对象 */
interface Layer {
  /** 显示名称 */
  displayName: string;
  /** 楼层高度 */
  height: number;
  /** 楼板厚度 */
  slabThickness: number;
  /** 下一个楼层 */
  next: Layer | null;
  /** 上一个楼层 */
  prev: Layer | null;
}

/** 应用程序实例 */
interface App {
  floorplan: {
    scene: {
      /** 根楼层 */
      rootLayer: Layer;
      /** 激活的楼层 */
      activeLayer: Layer;
      /** 天花板楼层 */
      ceilingLayer: Layer;
    };
  };
  /** 命令管理器 */
  cmdManager: CommandManager;
  /** 选择管理器 */
  selectionManager: SelectionManager;
  /** 布局管理器 */
  layoutMgr: LayoutManager;
  /** 应用参数 */
  appParams: {
    /** 语言环境 */
    locale: string;
  };
}

/** 命令管理器 */
interface CommandManager {
  cancel(): void;
  createCommand(type: string, args: unknown[]): Command;
  execute(command: Command): void;
  complete(): void;
  receive(message: string): void;
}

/** 命令对象 */
interface Command {}

/** 选择管理器 */
interface SelectionManager {
  unselectAll(): void;
}

/** 布局管理器 */
interface LayoutManager {
  register(id: string, element: HTMLElement): void;
  addConstrain(target: string, source: string, callback: (update: LayoutPositionUpdate) => void): void;
}

/**
 * 多楼层编辑器类
 * 管理多楼层的显示、编辑和交互功能
 */
export default class MultiLayerEditor {
  /** 应用程序实例 */
  private app: App;
  
  /** 楼层编辑栏参数配置 */
  private _layerEditBarParams?: LayerEditBarParams;
  
  /** 是否显示右键菜单 */
  private _showRightMenu: boolean;
  
  /** 是否自动复制墙体到新楼层 */
  public autoCopyWall: boolean;
  
  /** 是否存在地下室楼层 */
  public hasBasementLayer: boolean;
  
  /** 是否禁用楼层编辑 */
  public disabled: boolean;
  
  /** 根DOM元素 */
  private _rootElement: JQuery<HTMLElement> | null;
  
  /** 是否为编辑模式 */
  private _editMode: boolean;
  
  /** 是否为暗色模式 */
  private _darkMode: boolean;
  
  /** 是否为只读模式 */
  private _readonlyMode: boolean;
  
  /** 左侧偏移量（像素） */
  private offsetLeft: number;
  
  /** 底部偏移量（像素） */
  private offsetBottom: number;

  constructor();

  /**
   * 初始化多楼层编辑器
   * @param app - 应用程序实例
   */
  init(app: App): void;

  /**
   * 禁用楼层编辑功能
   */
  disableLayerEdit(): void;

  /**
   * 启用楼层编辑功能
   */
  enableLayerEdit(): void;

  /**
   * 设置楼层编辑栏参数
   * @param params - 楼层编辑栏参数配置
   */
  setlayerEditBarParams(params: LayerEditBarParams): void;

  /**
   * 显示多楼层面板
   * @returns 是否成功显示
   */
  show(): boolean;

  /**
   * 渲染多楼层组件
   * @param slabData - 楼层数据数组
   * @param activeData - 激活楼层数据
   */
  showMultiLayer(slabData: SlabData[], activeData: ActiveData): void;

  /**
   * 重置多楼层面板位置到默认值
   */
  resetMultiLayerPosition(): void;

  /**
   * 设置编辑模式
   * @param enabled - 是否启用编辑模式
   */
  setEditMode(enabled: boolean): void;

  /**
   * 设置暗色模式
   * @param enabled - 是否启用暗色模式
   */
  setDarkMode(enabled: boolean): void;

  /**
   * 设置只读模式
   * @param enabled - 是否启用只读模式
   */
  setReadonlyMode(enabled: boolean): void;

  /**
   * 改变多楼层面板位置
   * @param update - 位置更新参数
   */
  changeMultiLayerPosition(update: LayoutPositionUpdate): void;

  /**
   * 更新多楼层面板位置
   * @param shouldShow - 是否显示面板，默认true
   */
  updateMultiLayerPos(shouldShow?: boolean): void;

  /**
   * 获取楼层数据
   * @param slabDataArray - 用于填充的楼层数据数组
   * @param activeData - 用于填充的激活楼层数据对象
   */
  getSlabData(slabDataArray: SlabData[], activeData: ActiveData): void;

  /**
   * 插入楼层（上方或下方）
   * @param direction - 插入方向：'up'为上方，'down'为下方
   * @param callback - 完成后的回调函数
   * @private
   */
  private _onInsertLayer(direction: 'up' | 'down', callback?: () => void): void;

  /**
   * 添加新楼层
   * @param layerType - 楼层类型（普通楼层或地下室）
   * @param callback - 完成后的回调函数
   * @private
   */
  private _onAddNewLayer(layerType: LayerTypeEnum, callback?: () => void): void;

  /**
   * 添加GrowingIO事件追踪
   * @param type - 事件类型（楼层类型或方向）
   */
  addGrowingIoEvent(type: LayerTypeEnum | 'up' | 'down'): void;

  /**
   * 删除楼层
   * @param layer - 要删除的楼层对象
   * @param confirmationCode - 确认码（0表示确认删除）
   * @private
   */
  private _onDeleteLayer(layer: Layer, confirmationCode: number): void;

  /**
   * 执行删除楼层操作
   * @param layer - 要删除的楼层对象
   * @param confirmationCode - 确认码
   * @private
   */
  private _deleteLayer(layer: Layer, confirmationCode: number): void;

  /**
   * 切换天花板可见性
   * @param visible - 是否可见
   * @private
   */
  private _onToggleCeiling(visible: boolean): void;

  /**
   * 改变楼层在3D视图中的可见性
   * @param layer - 楼层对象
   * @param visible - 是否可见
   * @param silent - 是否静默执行（不触发事件），默认false
   * @private
   */
  private _onChangeLayerVisibility3d(layer: Layer, visible: boolean, silent?: boolean): void;

  /**
   * 激活指定楼层
   * @param layer - 要激活的楼层对象
   */
  onActivateLayer(layer: Layer): void;

  /**
   * 修改楼层名称
   * @param layer - 楼层对象
   * @param newName - 新名称
   * @private
   */
  private _onLayerNameChange(layer: Layer, newName: string): void;

  /**
   * 重置楼层索引（调整楼层顺序）
   * @param layer - 要移动的楼层对象
   * @param targetIndex - 目标索引
   * @param direction - 移动方向
   * @private
   */
  private _onLayerIndexReset(layer: Layer, targetIndex: number, direction: 'up' | 'down'): void;

  /**
   * 执行重置楼层索引操作
   * @param layer - 要移动的楼层对象
   * @param targetIndex - 目标索引
   * @param direction - 移动方向
   * @private
   */
  private _resetLayerIndex(layer: Layer, targetIndex: number, direction: 'up' | 'down'): void;

  /**
   * 获取命令处理器映射
   * @returns 命令处理器对象
   */
  get handlers(): CommandHandlers;

  /**
   * 楼板选择改变处理（取消所有选择）
   * @private
   */
  private _slabSelectionChange(): void;

  /**
   * 隐藏多楼层面板
   */
  hide(): void;

  /**
   * 显示右键菜单
   */
  showRightMenu(): void;

  /**
   * 隐藏右键菜单
   */
  hideRightMenu(): void;
}