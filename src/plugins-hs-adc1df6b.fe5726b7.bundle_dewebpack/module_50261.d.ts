/**
 * Orbit View Plugin - 相机视角切换插件
 * 提供第一人称视角、正交视角等多种相机模式切换功能
 */

import { HSApp } from 'hsw-core';
import { HSCore } from 'hsw-core';
import { HSFPConstants } from 'hsw-constants';

// ==================== 类型定义 ====================

/**
 * 相机类型枚举
 */
type CameraType = HSCore.Model.CameraTypeEnum;

/**
 * 相机对象接口
 */
interface ICamera {
  /** 相机唯一标识 */
  id: string;
  /** 相机类型 */
  type: CameraType;
  /** 相机位置 */
  position?: [number, number, number];
  /** 相机朝向 */
  rotation?: [number, number, number];
}

/**
 * 插件依赖项映射
 */
interface IPluginDependencies {
  [HSFPConstants.PluginType.ContextualTools]?: IContextualToolsPlugin;
  [HSFPConstants.PluginType.ResizeWidget]?: IResizeWidgetPlugin;
  'hsw.plugin.orbitview.orbitviewpopup.Plugin'?: IOrbitViewPopupPlugin;
  'hsw.plugin.cameraposition.Plugin'?: ICameraPositionPlugin;
  'hsw.plugin.render.Plugin'?: IRenderPlugin;
}

/**
 * 上下文工具插件接口
 */
interface IContextualToolsPlugin {
  /** 状态栏填充信号 */
  signalPopulateStatusBar: HSCore.Util.Signal;
}

/**
 * 调整尺寸组件插件接口
 */
interface IResizeWidgetPlugin {
  /** 获取视口尺寸 */
  getSize(): { width: number; height: number };
}

/**
 * 轨道视图弹窗插件接口
 */
interface IOrbitViewPopupPlugin {
  /** 是否固定显示 */
  isPin(): boolean;
  /** 切换显示状态 */
  toggle(bounds: IElementBounds, camera: ICamera | null): void;
}

/**
 * 相机位置插件接口
 */
interface ICameraPositionPlugin {
  /** 是否正在显示 */
  isShown(): boolean;
  /** 显示弹窗 */
  show(source: string): void;
  /** 隐藏弹窗 */
  hide(): void;
}

/**
 * 渲染插件接口
 */
interface IRenderPlugin {
  /** 渲染相关方法（具体方法待补充） */
  [key: string]: unknown;
}

/**
 * 元素边界信息
 */
interface IElementBounds {
  /** 左边距 */
  left: number;
  /** 顶边距 */
  top: number;
  /** 宽度 */
  width: number;
  /** 高度 */
  height: number;
}

/**
 * 状态栏项配置
 */
interface IStatusBarItem {
  /** 组件唯一标识 */
  id: string;
  /** 组件类型 */
  type: PropertyBarControlTypeEnum;
  /** 组件数据 */
  data: ICameraSwitchWidgetData;
  /** 排序顺序 */
  order: number;
}

/**
 * 相机切换组件数据
 */
interface ICameraSwitchWidgetData {
  /** 当前选中索引 */
  selectedIndex: number;
  /** 按钮配置列表 */
  btns: ICameraButtonConfig[];
}

/**
 * 相机按钮配置
 */
interface ICameraButtonConfig {
  /** 按钮ID */
  id: string;
  /** 提示文本 */
  tooltip: string;
  /** CSS类名 */
  className: string;
  /** 相机位置按钮配置 */
  cameraposition?: IIconButtonConfig;
  /** 设置按钮配置 */
  setting?: IIconButtonConfig | null;
  /** 居中适配按钮配置 */
  fitcenter?: IIconButtonConfig;
  /** 视图切换配置 */
  view?: IIconButtonConfig;
}

/**
 * 图标按钮通用配置
 */
interface IIconButtonConfig {
  /** 按钮ID */
  id: string;
  /** 图标类型 */
  imgShowType: string;
  /** 普通状态颜色 */
  imgNormalColor: string;
  /** 悬停状态颜色 */
  imgHoverColor: string;
  /** 点击状态颜色 */
  imgClickColor: string;
  /** 提示文本 */
  tooltip: string;
  /** CSS类名 */
  className: string;
  /** 是否固定显示 */
  isPin?: boolean;
  /** 点击事件处理器 */
  onclick: (event: MouseEvent) => boolean | void;
  /** 是否显示底部三角箭头 */
  hasBottomTriangle?: boolean;
  /** 信号对象 */
  signal?: HSCore.Util.Signal;
  /** 保持点击状态 */
  keepClickStatus?: boolean;
  /** 保持悬停状态 */
  keepHoverStatus?: boolean;
  /** 提示框CSS类名 */
  tooltipClassName?: string;
  /** 提示框颜色主题 */
  tooltipColor?: string;
  /** CSS类 */
  class?: string;
}

/**
 * 状态栏填充事件数据
 */
interface IPopulateStatusBarEventData {
  /** 事件数据 */
  data: {
    /** 当前视图 */
    view: IView | null;
    /** 右侧项容器 */
    rightItems: IItemCollection;
  };
}

/**
 * 视图接口
 */
interface IView {
  /** 判断是否为2D视图 */
  is2DView(): boolean;
  /** 适配相机 */
  fitCamera?(options: { keepPitch: boolean }): void;
  /** 设置视图框 */
  setViewBox?(x: number, y: number, width: number, height: number): void;
}

/**
 * 项集合接口
 */
interface IItemCollection {
  /** 在指定位置插入集合 */
  xInsertCollection(index: number, items: IStatusBarItem[]): void;
}

/**
 * 视图切换菜单项
 */
interface IViewSwitchMenuItem {
  /** 菜单标签 */
  label: string;
  /** 点击回调 */
  onClick: () => void;
}

/**
 * 房间信息
 */
interface IRoomInfo {
  /** 房间对象 */
  room: IRoom | null;
  /** 房间中心点 */
  point: [number, number, number];
}

/**
 * 房间对象接口
 */
interface IRoom {
  /** 房间ID */
  id: string;
  /** 其他房间属性 */
  [key: string]: unknown;
}

/**
 * 几何体数据
 */
interface IGeometry {
  /** 地板顶点数组 */
  floor?: Array<[number, number]>;
  /** 其他几何属性 */
  [key: string]: unknown;
}

/**
 * 用户行为追踪参数
 */
interface IUserTrackParams {
  /** 活动区域 */
  activeSection: string;
  /** 活动区域名称 */
  activeSectionName: string;
  /** 操作描述 */
  description: string;
}

// ==================== 插件主类 ====================

/**
 * 轨道视图插件
 * 负责管理不同相机视角的切换（第一人称、正交视图等）
 */
declare class OrbitViewPlugin extends HSApp.Plugin.IPlugin {
  /** 轨道视图弹窗信号 */
  signalOrbitViewPopup: HSCore.Util.Signal;
  
  /** 相机位置弹窗信号 */
  signalCameraPositionPopup: HSCore.Util.Signal;
  
  /** 上下文工具插件引用 */
  contextualToolsPlugin?: IContextualToolsPlugin;

  constructor();

  /**
   * 插件激活时调用
   * @param context - 插件上下文
   * @param dependencies - 依赖插件映射
   */
  onActive(context: { app: HSApp.Application }, dependencies: IPluginDependencies): void;

  /**
   * 插件停用时调用
   */
  onDeactive(): void;

  /**
   * 获取当前相机类型
   * @returns 当前相机类型枚举值
   */
  getCurrentCameraType(): CameraType | undefined;

  /**
   * 更新3D模式工具栏
   */
  update3DModeToolbar(): void;

  /**
   * 处理居中适配按钮点击
   */
  onFitCenterClick(): void;
}

// ==================== 处理器对象 ====================

/**
 * 插件核心业务处理器
 */
declare const Handler: {
  /** 是否不再显示实时提示 */
  _doNotShowLivehint: boolean;
  
  /** 当前相机类型 */
  currentCameraType: CameraType | undefined;
  
  /** 命令管理器 */
  cmdMgr: HSApp.CommandManager;
  
  /** 应用实例 */
  app: HSApp.Application;
  
  /** 依赖插件 */
  dependencies: IPluginDependencies;
  
  /** 是否显示视图切换弹窗 */
  isShowViewSwitchPopup: boolean;
  
  /** 是否已显示相机设置弹窗 */
  _hasShowCameraSettingsPopup: boolean;
  
  /** 轨道视图弹窗信号 */
  signalOrbitViewPopup: HSCore.Util.Signal;
  
  /** 相机位置弹窗信号 */
  signalCameraPositionPopup: HSCore.Util.Signal;
  
  /** 相机视图切换弹窗信号 */
  signalCameraViewSwitchPopup: HSCore.Util.Signal;

  /**
   * 初始化处理器
   * @param app - 应用实例
   * @param dependencies - 插件依赖
   * @param orbitViewSignal - 轨道视图信号
   * @param cameraPositionSignal - 相机位置信号
   */
  init(
    app: HSApp.Application,
    dependencies: IPluginDependencies,
    orbitViewSignal: HSCore.Util.Signal,
    cameraPositionSignal: HSCore.Util.Signal
  ): void;

  /**
   * 填充状态栏时的回调
   * @param event - 状态栏事件数据
   */
  onPopulateStatusBar(event: IPopulateStatusBarEventData): void;

  /**
   * 初始化状态栏项
   * @returns 状态栏项配置数组
   */
  initStatusBarItems(): IStatusBarItem[];

  /**
   * 添加相机视图切换功能
   * @param items - 状态栏项数组
   */
  _addCameraViewSwitch(items: IStatusBarItem[]): void;

  /**
   * 隐藏所有弹窗
   * @param event - 可选事件对象
   */
  _hidePopup(event?: Event): void;

  /**
   * 文档点击时隐藏弹窗
   * @param event - 鼠标事件
   */
  _documentClickedHidePopup(event: MouseEvent): void;

  /**
   * 处理居中适配点击
   */
  onFitCenterClick(): void;

  /**
   * 启动命令
   * @param commandType - 命令类型
   * @param params - 命令参数
   * @returns 执行的命令实例
   */
  _launchCmd(commandType: string, params: unknown): HSApp.Command;

  /**
   * 根据类型获取相机
   * @param cameraType - 相机类型
   * @returns 相机对象或null
   */
  getCameraByType(cameraType: CameraType): ICamera | null;

  /**
   * 相机适配屏幕
   */
  cameraFitScreen(): void;

  /**
   * 将相机设置到最大房间
   */
  setCameraToLargestRoom(): void;

  /**
   * 适配视图框到房间
   * @param room - 房间对象
   */
  fitViewBoxToRoom(room: IRoom): void;

  /**
   * 更新3D模式工具栏
   * @param cameraType - 可选的相机类型
   */
  update3DModeToolbar(cameraType?: CameraType): void;
};

// ==================== UI工具对象 ====================

/**
 * UI相关工具方法
 */
declare const UI: {
  /**
   * 初始化UI
   */
  init(): void;

  /**
   * 聚焦到画布
   */
  focusCanvas(): void;

  /**
   * 显示实时提示
   */
  showLivehint(): void;

  /**
   * 隐藏实时提示
   */
  hideLivehint(): void;
};

// ==================== 模块导出 ====================

/**
 * 插件命名空间
 */
export declare namespace OrbitViewPluginNamespace {
  export { Handler };
  export { UI };
}

/**
 * 插件类导出
 */
export { OrbitViewPlugin };

/**
 * 插件注册ID
 */
export const PLUGIN_ID: 'hsw.plugin.orbitview.Plugin';