/**
 * 材质编辑插件类型定义
 * 用于处理内容部件的材质替换和UV调整功能
 */

import { HSCore } from '635589';
import { CommandManager } from 'HSApp';

/**
 * 材质缩放数据
 */
interface MaterialScaleData {
  /** 水平方向平铺缩放 */
  scalingTileSize_x?: number;
  /** 垂直方向平铺缩放 */
  scalingTileSize_y?: number;
}

/**
 * 材质UV变换数据
 */
interface MaterialUVData extends MaterialScaleData {
  /** 旋转角度 */
  rotation: number;
  /** 水平偏移百分比 */
  percentOffsetX: number;
  /** 垂直偏移百分比 */
  percentOffsetY: number;
}

/**
 * 命令消息 - UV变换
 */
interface ChangeUVMessage {
  msg: 'changeUV';
  data: MaterialUVData;
}

/**
 * 下拉选项数据
 */
interface DropdownOption {
  /** 选项ID */
  id: string;
  /** 显示标签 */
  label: string;
}

/**
 * 内容部件数据
 */
interface ContentPartData {
  /** 模型部件ID */
  modelPartId: string;
  /** 模型部件名称 */
  modelPartName: string;
}

/**
 * 属性栏数据项基类
 */
interface PropertyBarItemBase {
  /** 唯一标识 */
  id: string;
  /** 显示标签 */
  label: string;
  /** 父节点ID */
  parentId?: string;
  /** 排序权重 */
  order?: number;
  /** CSS类名 */
  className?: string;
}

/**
 * 属性栏 - 根节点
 */
interface PropertyBarRoot extends PropertyBarItemBase {
  type: typeof HSFPConstants.PropertyBarType.PropertyBar;
  /** 是否启用详情信息 */
  enableDetailsInfo: boolean;
}

/**
 * 属性栏 - 一级节点
 */
interface PropertyBarFirstLevel extends PropertyBarItemBase {
  type: typeof HSFPConstants.PropertyBarType.FirstLevelNode;
  /** 子项列表 */
  items: PropertyBarItem[];
}

/**
 * 属性栏 - 二级节点
 */
interface PropertyBarSecondLevel extends PropertyBarItemBase {
  type: typeof HSFPConstants.PropertyBarType.SecondLevelNode;
  /** 子项列表 */
  items: PropertyBarItem[];
}

/**
 * 属性栏 - 下拉列表
 */
interface PropertyBarDropdown extends PropertyBarItemBase {
  type: typeof HSFPConstants.PropertyBarType.DropdownList;
  data: {
    /** 选项列表 */
    options: DropdownOption[];
    /** 默认选中的键 */
    defaultKey: string;
    /** 标题 */
    title: string;
    /** 值变化回调 */
    onChange: (value: string) => void;
  };
}

/**
 * 属性栏 - 无选择提示
 */
interface PropertyBarNoChoice extends PropertyBarItemBase {
  type: typeof HSFPConstants.PropertyBarType.NoChoice;
  data: {
    /** 图标路径 */
    src: string;
    /** 提示文本 */
    hint: string;
    /** CSS类名 */
    className: string;
  };
}

/**
 * 属性栏数据项联合类型
 */
type PropertyBarItem =
  | PropertyBarRoot
  | PropertyBarFirstLevel
  | PropertyBarSecondLevel
  | PropertyBarDropdown
  | PropertyBarNoChoice;

/**
 * 属性栏事件数据
 */
interface PropertyBarEventData {
  /** 属性栏数据项数组 */
  data: PropertyBarItem[];
}

/**
 * 材质搜索过滤器
 */
interface MaterialSearchFilter {
  /** 场景类型 */
  sceneType: number;
}

/**
 * 目录面板配置
 */
interface CatalogPanelConfig {
  /** 自定义数据 */
  mydata: {
    /** 模型搜索过滤器 */
    modelSearchFilter: MaterialSearchFilter;
    /** 分类类型 */
    types: number;
  };
  /** 是否保持分类 */
  isKeepCategory: boolean;
  /** 是否不过滤 */
  notFilter: boolean;
  /** UI控制配置 */
  uiControl: {
    /** 类型 */
    type: string;
  };
  /** 是否支持企业分类 */
  supportEnterpriseCategory: boolean;
  /** 排除类型 */
  excludeType: number;
  /** 场景类型 */
  sceneType: number;
  /** 是否简化 */
  isSimplify: boolean;
  /** 是否显示搜索框 */
  isShowSearchBox: boolean;
  /** 内容数据 */
  contentData: unknown[];
  /** 搜索框回调 */
  searchBoxFunc: (params: unknown) => Promise<unknown>;
  /** 文件夹树列表 */
  folderTreeList: unknown[];
  /** 是否显示文件夹 */
  showFolder: boolean;
}

/**
 * 材质属性操作回调
 */
interface MaterialPropertyCallbacks {
  /** 混合模式单选框选中回调 */
  blendRadioOnCheck: (value: unknown) => void;
  /** 壁纸点击回调 */
  wallpaperOnClick: () => Promise<void>;
  /** 颜色模式点击回调 */
  colorModeOnClick: () => void;
  /** 颜色值变化回调 */
  colorOnValueChange: (color: unknown) => void;
}

/**
 * 面材质属性参数
 */
interface FaceMaterialPropertyParams {
  /** 实体对象 */
  entity: HSCore.Entity;
  /** 材质对象 */
  material: HSCore.Material.Material;
  /** 二级节点ID */
  secondNodeId: string;
  /** 属性参数 */
  propertyParam: {
    /** 材质操作回调 */
    material: MaterialPropertyCallbacks;
  };
}

/**
 * 插件初始化参数
 */
interface PluginInitParams {
  /** 处理器实例 */
  handler: MaterialReplaceHandler;
  /** 目录插件实例 */
  catalogPlugin: CatalogPlugin;
  /** 右侧属性栏插件实例 */
  rightPropertyBarPlugin: RightPropertyBarPlugin;
}

/**
 * 材质替换处理器接口
 */
interface MaterialReplaceHandler {
  /** 获取选中的网格名称 */
  getSelectMeshName(): string;
  /** 设置选中的网格名称 */
  setSelectMeshName(meshName: string): void;
  /** 获取内容部件ID列表 */
  getContentPartIds(): string[];
  /** 获取内容部件数据 */
  getContentPartsData(): ContentPartData[];
  /** 切换选中的部件 */
  changeSelectPart(partId: string): void;
  /** 获取材质列表 */
  getMaterialList(params: unknown): Promise<unknown[]>;
  /** 获取当前材质列表 */
  getCurrMaterialList(): unknown[];
  /** 获取文件夹树列表 */
  getFolderTreeList(): unknown[];
}

/**
 * 目录插件接口
 */
interface CatalogPlugin {
  /** 关闭独立面板 */
  closeIndependent(): void;
  /** 打开独立面板 */
  openIndependentPanel(config: CatalogPanelConfig, id: string): void;
}

/**
 * 右侧属性栏插件接口
 */
interface RightPropertyBarPlugin {
  /** 属性栏填充信号 */
  signalPopulatePropertyBar: HSCore.Util.Signal<PropertyBarEventData>;
}

/**
 * 内容部件材质编辑插件类
 * 负责管理材质的UV调整、替换和属性栏UI渲染
 */
declare class ContentPartMaterialEditorPlugin {
  /** 缩放锁定状态 */
  private lock: boolean;

  /** 材质替换处理器 */
  private handler: MaterialReplaceHandler;

  /** 命令管理器 */
  private cmdMgr: CommandManager;

  /** 当前操作的实体 */
  private entity: HSCore.Entity;

  /** 目录插件引用 */
  private catalogPlugin: CatalogPlugin;

  /** 右侧属性栏插件引用 */
  private rightPropertyBarPlugin: RightPropertyBarPlugin;

  /** 信号钩子 */
  private signalHook: HSCore.Util.SignalHook;

  /** 当前执行的命令 */
  private cmd: unknown;

  /**
   * 构造函数
   * @param params 初始化参数
   */
  constructor(params: PluginInitParams);

  /**
   * 初始化插件
   * @param entity 要操作的实体对象
   */
  init(entity: HSCore.Entity): void;

  /**
   * 属性栏填充回调 (V2版本)
   * @param event 属性栏事件数据
   */
  private onPopulateRightPropertyBarV2(event: PropertyBarEventData): void;

  /**
   * 获取部件属性下拉项
   * @returns 下拉列表属性项
   */
  private getPartPropertyItems(): PropertyBarDropdown;

  /**
   * 设置无选择状态的UI项
   * @param items 属性项数组
   */
  private setNoChoiceItems(items: PropertyBarItem[]): void;

  /**
   * 创建材质编辑命令
   */
  createEditMaterialCmd: () => void;

  /**
   * 创建材质编辑命令的内部实现
   */
  private createEditMaterialCmdFunc(): void;

  /**
   * 结束材质编辑命令
   */
  private endEditMaterialCmd(): void;

  /**
   * 切换缩放锁定状态
   */
  toggleLock(): void;

  /**
   * 构建缩放数据
   * @param message 包含缩放数据的消息
   * @param meshName 网格名称
   * @returns 处理后的消息
   */
  buildScaleData: (message: ChangeUVMessage, meshName: string) => ChangeUVMessage;

  /**
   * 构建缩放数据的内部实现
   * @param message 包含缩放数据的消息
   * @param meshName 网格名称
   * @returns 处理后的消息
   */
  private buildScaleDataFunc(
    message: ChangeUVMessage,
    meshName: string
  ): ChangeUVMessage;

  /**
   * 重置所有UV参数到指定值
   * @param uvData UV变换数据
   * @param meshName 网格名称
   */
  resetAll(uvData: MaterialUVData, meshName: string): void;

  /**
   * 初始化属性栏尺寸卡片项 (V2版本)
   * @param meshName 网格名称
   * @returns 属性项数组
   */
  private initPropertyBarSizeCardItemsV2(meshName: string): PropertyBarItem[];
}

/**
 * 默认导出工厂函数
 * @returns 内容部件材质编辑插件类
 */
export default function (): typeof ContentPartMaterialEditorPlugin;