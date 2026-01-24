import type { HSApp } from '@types/hsapp';
import type { HSCore } from '@types/hscore';
import type { HSCatalog } from '@types/hscatalog';
import type { HSFPConstants } from '@types/hsfp-constants';

/**
 * 鼠标事件参数
 */
interface MouseEventParams {
  /** 关联的实体对象 */
  entity: HSCore.Model.CustomizedModel;
  /** 网格ID */
  meshId: number;
  /** 网格名称 */
  meshName: string;
  /** 原始鼠标事件 */
  event: MouseEvent;
  /** 拾取结果列表 */
  pickResults: PickResult[];
  /** 是否选择组面 */
  selectGroupFace?: boolean;
}

/**
 * 拾取结果
 */
interface PickResult {
  /** 网格ID */
  meshId: number;
  /** 网格名称 */
  meshName: string;
  /** 视图对象 */
  viewObject?: {
    /** 实体对象 */
    entity: HSCore.Model.CustomizedModel;
  };
}

/**
 * 拖拽事件参数
 */
interface DragEventParams {
  /** 标题文本 */
  title?: string;
  /** 鼠标事件 */
  event: MouseEvent;
  /** 拾取结果 */
  pickResults?: PickResult[];
}

/**
 * 材质数据接口
 */
interface MaterialData {
  /** 产品类型 */
  productType: HSCatalog.ProductTypeEnum;
  /** 是否刷新 */
  refresh?: boolean;
  /** 其他材质属性 */
  [key: string]: unknown;
}

/**
 * 材质数据变更事件
 */
interface MaterialDataChangeEvent {
  /** 变更的数据 */
  data?: {
    /** 是否需要刷新 */
    refresh?: boolean;
  };
}

/**
 * 编辑模式枚举
 */
declare const enum EditModeEnum {
  /** 编辑单个面 */
  editFace = 'editFace',
  /** 编辑相同材质的面 */
  editSameFace = 'editSameFace'
}

/**
 * 网格处理器接口
 */
interface MeshHandler {
  /** 命令是否激活 */
  isCmdActive: boolean;
  /** 编辑模式 */
  editMode: EditModeEnum;
  /** 3D实体对象 */
  entity3d: HSApp.View.T3d.Entity3d | null;
  /** 实体模型 */
  entity: HSCore.Model.CustomizedModel;
  /** 高亮的子实体集合 */
  highlightChildEntities: Map<string, HSCore.Model.Entity>;
  /** 选中的子实体集合 */
  selectedChildEntities: Set<HSCore.Model.Entity>;
  /** 网格法线验证映射 */
  meshValidateNormalMap: Map<string, unknown>;
  /** 选中项是否包含组 */
  isSelectedContainsGroup: boolean;
  /** 是否通过拖拽替换材质 */
  isMaterialReplaceByDragging: boolean;
  /** 材质选择变更信号 */
  signalSelectedMaterialChanged: HSApp.Util.Signal<MaterialDataChangeEvent>;
  
  /** 清理资源 */
  onCleanup(): void;
  /** 处理目录项点击 */
  onCatalogItemClicked(material: MaterialData): void;
  /** 处理ESC键 */
  onESC(): void;
  /** 设置编辑模式 */
  setEditMode(mode: EditModeEnum): void;
  /** 根据网格ID高亮相同材质 */
  highLightSameMaterialByMeshId(meshId: number): void;
  /** 根据网格ID选择相同材质 */
  selectSameMaterialByMeshId(meshId: number): void;
  /** 根据网格名称选择相同材质 */
  selectSameMaterialByMeshName(meshName: string): void;
  /** 清除高亮的子实体 */
  clearHighlightChildEntities(): void;
  /** 取消选择网格 */
  unselectMeshes(): void;
  /** 取消选择子对象 */
  unSelectChilds(): void;
  /** 取消组合 */
  unGroup(): void;
  /** 移除多材质顺序 */
  removeMultiMaterialsOrder(): void;
  /** 触发选中材质变更事件 */
  dispatchSelectedMaterialChanged(): void;
  /** 获取选中的网格名称列表 */
  getSelectedMeshNames(): string[];
}

/**
 * 命令处理器接口
 */
interface CommandHandler {
  /** 滑块X坐标 */
  sliderX: number;
  /** 滑块Y坐标 */
  sliderY: number;
}

/**
 * 本地存储键常量
 */
const STORAGE_KEY_DO_NOT_SHOW_LIVEHINT = 'CmdAddMaterial.EnterMaterialEditMode.doNotShowLivehint';

/**
 * 添加材质命令
 * 
 * 负责处理材质添加、替换、编辑等操作，支持拖拽、点击等多种交互方式
 */
export declare class CmdAddMaterial extends HSApp.Cmd.CompositeCommand {
  /** 命令处理器 */
  private readonly _handler: CommandHandler;
  
  /** 网格处理器 */
  private readonly _meshHandler: MeshHandler;
  
  /** 应用实例 */
  private readonly app: HSApp.App;
  
  /** 3D视图画布 */
  private readonly canvas: HSApp.View.Canvas3d;
  
  /** 命令类型 */
  readonly type: HSFPConstants.CommandType.AddMaterial;
  
  /** 迷你图片预览控制器 */
  private miniImagePreviewCtrl?: MiniImagePreviewCtrl;
  
  /** 本地存储实例 */
  private readonly _localStorage: HSApp.Util.Storage;
  
  /** 当前选中的材质 */
  private currentMaterial?: MaterialData;
  
  /**
   * 构造函数
   * @param handler - 命令处理器
   * @param meshHandler - 网格处理器
   */
  constructor(handler: CommandHandler, meshHandler: MeshHandler);
  
  /**
   * 获取上下文工具插件
   */
  get contextualToolsPlugin(): HSApp.Plugin.ContextualTools | undefined;
  
  /**
   * 获取属性栏插件
   */
  get propertyBarPlugin(): HSApp.Plugin.PropertyBar | undefined;
  
  /**
   * 获取材质图片插件
   */
  get materialImagePlugin(): HSApp.Plugin.MaterialImage | undefined;
  
  /**
   * 命令执行时调用
   * 初始化监听器，取消所有选择，并显示材质编辑提示
   */
  onExecute(): void;
  
  /**
   * 是否可以显式挂起命令
   * @returns 始终返回true
   */
  canSuspendExplicitly(): boolean;
  
  /**
   * 是否可以挂起命令
   * @returns 始终返回true
   */
  canSuspend(): boolean;
  
  /**
   * 清理命令资源
   * 移除监听器，销毁预览控制器，恢复默认光标
   */
  onCleanup(): void;
  
  /**
   * 命令挂起时调用
   */
  onSuspend(): void;
  
  /**
   * 命令恢复时调用
   */
  onResume(): void;
  
  /**
   * 更新光标样式
   * @param cursor - 光标类型枚举
   */
  updateCursor(cursor: HSApp.View.CursorEnum): void;
  
  /**
   * 自动点击面组
   * 处理面组材质的批量选择和应用
   * @param params - 鼠标事件参数
   * @returns 处理结果
   */
  autoClickFaceGroup(params: MouseEventParams): boolean;
  
  /**
   * 接收并分发各类事件
   * @param eventType - 事件类型
   * @param eventData - 事件数据
   * @returns 处理结果
   */
  onReceive(eventType: string, eventData: unknown): boolean;
  
  /**
   * 鼠标按下事件处理
   * @param params - 鼠标事件参数
   */
  onMouseDown(params: MouseEventParams): void;
  
  /**
   * 将材质添加到网格
   * 处理拖拽添加材质的最终应用
   */
  addMaterialToMesh(): void;
  
  /**
   * 鼠标移动事件处理
   * 高亮悬停的网格，更新光标状态
   * @param params - 鼠标事件参数
   * @returns 处理结果
   */
  onMouseMove(params: MouseEventParams): boolean;
  
  /**
   * 鼠标移出事件处理
   * @param params - 鼠标事件参数
   * @returns 处理结果
   */
  onMouseOut(params: MouseEventParams): boolean;
  
  /**
   * 鼠标点击事件处理
   * 选择网格面，支持多选和相同材质面选择
   * @param params - 鼠标事件参数
   * @returns 处理结果
   */
  onMouseClick(params: MouseEventParams): boolean;
  
  /**
   * 鼠标双击事件处理
   * 取消组合状态
   * @returns 始终返回true
   */
  onMouseDblClick(): boolean;
  
  /**
   * 按键按下事件处理
   * Ctrl键切换到相同材质编辑模式
   * @param eventType - 事件类型
   * @param event - 键盘事件
   * @returns 始终返回true
   */
  onKeyDown(eventType: string, event: KeyboardEvent): boolean;
  
  /**
   * 按键释放事件处理
   * 退出相同材质编辑模式
   * @param eventType - 事件类型
   * @param event - 键盘事件
   * @returns 处理结果
   */
  onKeyUp(eventType: string, event: KeyboardEvent): boolean;
  
  /**
   * 目录项点击处理
   * @param material - 材质数据
   * @returns 始终返回true
   */
  onCatalogItemClicked(material: MaterialData): boolean;
  
  /**
   * 选中材质数据变更回调
   * @param event - 材质变更事件
   * @private
   */
  private _onCmdSelectedMaterialDataChanged(event: MaterialDataChangeEvent): void;
  
  /**
   * 处理ESC键
   * 取消当前操作，清理拖拽状态
   * @private
   */
  private _onEsc(): void;
  
  /**
   * 取消拖拽添加材质操作
   * @private
   */
  private _onDragAddMaterialCancel(): void;
  
  /**
   * 添加事件监听器
   * 注册快捷键和信号监听
   * @private
   */
  private _addListener(): void;
  
  /**
   * 移除事件监听器
   * @private
   */
  private _removeListener(): void;
  
  /**
   * 判断是否为Ctrl键
   * 兼容Mac的Command键
   * @param keyCode - 键码
   * @returns 是否为Ctrl/Command键
   * @private
   */
  private _isCtrl(keyCode: number): boolean;
  
  /**
   * 创建迷你图片预览控制器
   * @param params - 拖拽事件参数
   * @private
   */
  private _createMiniImagePreview(params: DragEventParams): void;
  
  /**
   * 渲染迷你图片预览
   * @param params - 拖拽事件参数
   * @returns 渲染结果
   * @private
   */
  private _renderMiniImagePreview(params: DragEventParams): boolean;
  
  /**
   * 销毁迷你图片预览控制器
   * @private
   */
  private _destroyMiniImagePreview(): void;
  
  /**
   * 获取提示字符串
   * @returns 提示文本
   * @private
   */
  private _getHintString(): string;
  
  /**
   * 过滤拾取结果
   * 排除不可编辑的实体（如GussetSurface）
   * @param params - 鼠标事件参数
   * @returns 过滤后的拾取结果
   * @private
   */
  private _filterPickResult(params: MouseEventParams): PickResult | undefined;
  
  /**
   * 接收材质数据
   * 验证材质类型并触发相应处理
   * @param material - 材质数据
   * @returns 处理结果
   * @private
   */
  private _onReceiveMaterial(material: MaterialData): boolean;
}

/**
 * 迷你图片预览控制器
 */
declare class MiniImagePreviewCtrl {
  /** 标题文本 */
  title: string;
  
  /**
   * 构造函数
   * @param params - 初始化参数
   */
  constructor(params: DragEventParams);
  
  /**
   * 初始化控制器
   */
  init(): void;
  
  /**
   * 渲染预览
   * @param position - 渲染位置坐标
   */
  render(position: { x: number; y: number }): void;
  
  /**
   * 销毁控制器
   */
  destroy(): void;
}