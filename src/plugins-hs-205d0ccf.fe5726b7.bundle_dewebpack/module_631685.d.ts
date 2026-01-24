/**
 * 房间属性插件
 * 负责处理房间类型、天花板、墙体等属性设置和编辑
 */

import { HSCore } from '635589';
import { PropertyBarControlTypeEnum } from '569899';

/**
 * 房间类型选项
 */
interface RoomTypeOption {
  /** 房间类型ID */
  id: string;
  /** 显示标签 */
  label: string;
}

/**
 * 墙体宽度配置
 */
interface WallWidthConfig {
  /** 是否显示调节按钮 */
  showTunningButtons: boolean;
  /** 验证规则 */
  rules: {
    range: {
      min: number;
      max: number;
    };
    positiveOnly: boolean;
    includeUnit: boolean;
  };
  /** 是否只读 */
  readOnly: boolean;
  /** 预设项列表 */
  items: string[];
}

/**
 * 属性栏数据变更事件
 */
interface ValueChangeEvent {
  detail: {
    /** 变更后的值 */
    value: number;
  };
}

/**
 * 属性栏项配置
 */
interface PropertyBarItem {
  /** 唯一标识 */
  id: string;
  /** 父级ID */
  parentId?: string;
  /** 控件类型 */
  type: PropertyBarControlTypeEnum | string;
  /** 排序权重 */
  order?: number;
  /** 显示标签 */
  label?: string;
  /** 图标源 */
  src?: string;
  /** 是否禁用 */
  disable?: boolean;
  /** 样式类名 */
  className?: string;
  /** 子项列表 */
  items?: PropertyBarItem[];
  /** 子项类型 */
  childrenType?: string;
  /** 数据配置 */
  data?: Record<string, unknown>;
  /** 点击事件处理器 */
  onClick?: (event?: Event) => void | boolean;
  /** 值变更处理器 */
  onValueChange?: (event: ValueChangeEvent) => void;
  /** 值验证处理器 */
  onValueValidation?: (event: ValueChangeEvent) => void;
}

/**
 * 房间类型变更参数
 */
interface RoomTypeChangeParams {
  /** 新的房间类型 */
  roomType?: string;
  /** 其他房间名称（自定义房间类型时使用） */
  otherRoom?: string;
}

/**
 * 插件初始化配置
 */
interface PluginConfig {
  /** 应用实例 */
  app: unknown;
}

/**
 * 插件映射
 */
interface PluginMap {
  [key: string]: unknown;
}

/**
 * 房间属性插件类
 * 处理房间创建、编辑、属性设置等功能
 */
declare class RoomPropertyPlugin {
  /** 应用实例 */
  private _app: unknown;
  
  /** 左侧菜单插件 */
  private _menuPlugin: unknown;
  
  /** 上下文工具插件 */
  private _contextualToolsPlugin: unknown;
  
  /** 属性栏插件 */
  private _propertyBarPlugin: unknown;
  
  /** 命令管理器 */
  private cmdMgr: unknown;
  
  /** 信号钩子 */
  private _signalHook: HSCore.Util.SignalHook;
  
  /** 墙体宽度预设值（米） */
  private WallWidthItem: number[];
  
  /** 创建墙体时的选择器 */
  private createWallselector?: JQuery;
  
  /** 当前编辑的实体列表 */
  private _entities: unknown[];

  /**
   * 构造函数
   * @param config 插件配置
   * @param plugins 插件映射表
   */
  constructor(config: PluginConfig, plugins: PluginMap);

  /**
   * 初始化插件
   * 注册事件监听器
   */
  init(): void;

  /**
   * 创建房间命令开始时的回调
   * @param event 命令事件
   */
  createRoomCommandBegin(event: unknown): void;

  /**
   * 创建房间命令结束时的回调
   * @param event 命令事件
   */
  createRoomCommandEnd(event: unknown): void;

  /**
   * 判断是否处于创建房间命令状态
   * @returns 是否在创建房间
   */
  isInCmdCreateRoom(): boolean;

  /**
   * 填充属性栏时的回调
   * @param event 事件对象
   */
  onPopulatePropertyBar(event: { data: PropertyBarItem[] }): void;

  /**
   * 清理资源
   */
  _uninit(): void;

  /**
   * 初始化最小工具栏项
   * @returns 工具栏配置
   */
  _initMinToolBarItems(): {
    className: string;
    label: string;
    items: PropertyBarItem[];
  };

  /**
   * 填充最小工具栏时的回调
   * @param event 事件对象
   */
  onPopulateMinBar(event: { data: { selector: string } }): void;

  /**
   * 获取右键菜单最小工具栏项
   * @param entities 实体列表
   * @returns 属性栏项配置
   */
  _RightMentMinBarItems(entities: unknown[]): PropertyBarItem;

  /**
   * 填充右键菜单自定义项时的回调
   * @param event 事件对象
   */
  onPopulateRightmenuCustomized(event: {
    data: {
      customizedItems: PropertyBarItem[];
      defaultItems: PropertyBarItem[];
      mousePos: { x: number; y: number };
    };
  }): void;

  /**
   * 获取创建房间时的菜单项
   * @param customizedItems 自定义项数组
   * @param defaultItems 默认项数组
   */
  _getCreationRoomitems(
    customizedItems: PropertyBarItem[],
    defaultItems: PropertyBarItem[]
  ): void;

  /**
   * 判断天花板是否与目标天花板相同
   * @param ceiling 天花板实体
   * @returns 是否相同
   */
  _isSameAsTargetCeiling(ceiling: unknown): boolean;

  /**
   * 判断两个多边形是否连接
   * @param polygon1 多边形1
   * @param polygon2 多边形2
   * @param tolerance 容差（可选）
   * @returns 是否连接
   */
  _isPolygonsConnected(
    polygon1: unknown[],
    polygon2: unknown[],
    tolerance?: number
  ): boolean;

  /**
   * 获取相邻的天花板
   * @param face 面实体
   * @param ceiling 天花板实体
   * @returns 相邻天花板列表
   */
  _getNeighbouringCeilings(face: unknown, ceiling: unknown): unknown[];

  /**
   * 更新平面天花板高度
   * @param ceilings 天花板列表
   * @param preset 预设参数
   */
  _updatePlaneCeilingHeight(ceilings: unknown[], preset: unknown): void;

  /**
   * 创建天花板
   * @param type 天花板类型
   * @param face 面实体
   * @param outline 轮廓线
   * @returns 创建的天花板实体
   */
  _createCeiling(type: string, face: unknown, outline: unknown): unknown;

  /**
   * 获取房间菜单项
   * @param customizedItems 自定义项数组
   * @param entities 实体列表
   * @param mousePos 鼠标位置
   */
  _getRoomItems(
    customizedItems: PropertyBarItem[],
    entities: unknown[],
    mousePos: { x: number; y: number }
  ): void;

  /**
   * 判断是否启用自动推荐
   * @param entity 实体
   * @returns 是否启用
   */
  enableAutoRecommend(entity: unknown): boolean;

  /**
   * 为单个房间导入样式模板
   * @param room 房间实体
   * @param style 样式代码
   * @param trackData 追踪数据
   */
  _importStylerTemplateForSingleRoom(
    room: unknown,
    style: string,
    trackData: Record<string, unknown>
  ): void;

  /**
   * 添加2D颜色模式菜单项
   * @param items 菜单项数组
   * @param face 面实体
   */
  add2DColorModeItems(items: PropertyBarItem[], face: unknown): void;

  /**
   * 获取分割空间按钮
   * @param entity 实体
   * @param order 排序值
   * @returns 按钮配置
   */
  _getDivideSpaceBtn(entity: unknown, order?: number): PropertyBarItem;

  /**
   * 获取翻转子菜单项
   * @param entity 实体
   * @returns 子菜单项列表
   */
  filpSubmenuItems(entity: unknown): PropertyBarItem[];

  /**
   * 判断是否处于创建室外空间命令状态
   * @returns 是否在创建室外空间
   */
  _isInCmdCreateOutdoorSpace(): boolean;

  /**
   * 获取当前命令的Gizmo
   * @returns Gizmo实例
   */
  _getCurrentCmdGizmo(): unknown | undefined;

  /**
   * 获取室外空间菜单项
   * @param customizedItems 自定义项数组
   * @param defaultItems 默认项数组
   */
  _getOutdoorspaceItems(
    customizedItems: PropertyBarItem[],
    defaultItems: PropertyBarItem[]
  ): void;

  /**
   * 初始化SVG视图的状态栏项
   * @param entities 实体列表
   * @returns 状态栏项数组
   */
  _initStatusBarItemsForSVGView(entities: unknown[]): PropertyBarItem[];

  /**
   * 初始化SVG视图的属性栏项
   * @param entities 实体列表
   * @returns 属性栏项数组
   */
  _initPropertyBarItemsForSVGView(entities: unknown[]): PropertyBarItem[];

  /**
   * 初始化SVG视图的属性栏V2项
   * @param items 项数组
   * @param entities 实体列表
   */
  _initPropertyBarV2ItemsForSVGView(
    items: PropertyBarItem[],
    entities: unknown[]
  ): void;

  /**
   * 初始化房间SVG视图的属性栏V2项
   * @param items 项数组
   * @param entities 实体列表
   */
  _initPropertyBarV2ItemsForRoomSVGView(
    items: PropertyBarItem[],
    entities: unknown[]
  ): void;

  /**
   * 编辑图层楼板轮廓
   */
  onEditLayerSlabsProfile(): void;

  /**
   * 初始化室外空间SVG视图的属性栏V2项
   * @param items 项数组
   * @param entities 实体列表
   */
  _initPropertyBarV2ItemsForOutdoorSVGView(
    items: PropertyBarItem[],
    entities: unknown[]
  ): void;

  /**
   * 初始化室外空间SVG视图的属性栏项
   * @param entities 实体列表
   * @returns 属性栏项数组
   */
  _initPropertyBarItemsForOutdoorSVGView(entities: unknown[]): PropertyBarItem[];

  /**
   * 编辑图层楼板轮廓（内部方法）
   */
  _onEditLayerSlabsProfile(): void;

  /**
   * 初始化房间SVG视图的属性栏项
   * @param entities 实体列表
   * @returns 属性栏项数组
   */
  _initPropertyBarItemsForRoomSVGView(entities: unknown[]): PropertyBarItem[];

  /**
   * 房间天花板状态变更处理器
   * @param checked 是否显示天花板
   */
  _onRoomCeilStatusChangeHandler(checked: boolean): void;

  /**
   * 房间类型变更处理器
   * @param roomType 房间类型ID
   * @param otherRoom 自定义房间名称
   * @param entities 实体列表
   */
  private _roomTypeChangeHandler(
    roomType: string | undefined,
    otherRoom: string | undefined,
    entities: unknown[]
  ): void;
}

/**
 * 获取房间类型选项列表
 * @param isOutdoor 是否为室外空间
 * @returns 房间类型选项数组
 */
declare function getRoomTypeOptions(isOutdoor: boolean): RoomTypeOption[];

export default RoomPropertyPlugin;