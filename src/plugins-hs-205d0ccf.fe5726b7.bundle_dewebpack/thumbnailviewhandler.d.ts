/**
 * ThumbnailViewHandler - 缩略图视图处理器
 * 
 * 负责管理缩略图视图的生命周期、布局、交互和状态管理。
 * 提供2D/3D视图切换、单房间模式、立面图退出等功能。
 */

import type React from 'react';
import type { HSApp } from './app-types';
import type { HSCore } from './core-types';
import type { ThumbnailView } from './components/ThumbnailView';

/**
 * 缩略图视图尺寸信息
 */
export interface ThumbnailSize {
  width: number;
  height: number;
  top: number;
  left: number;
  right: number;
  bottom: number;
}

/**
 * 缩略图视图位置信息
 */
export interface ThumbnailPosition {
  left?: number;
  top?: number;
  width?: number;
  height?: number;
  visibility?: 'visible' | 'hidden';
  display?: string;
  zIndex?: number;
  isModal?: boolean;
  minzIndex?: number;
  maxzIndex?: number;
}

/**
 * 缩放事件参数
 */
export interface ZoomEventParams {
  width: number;
  height: number;
  padding: number;
}

/**
 * 布局约束事件参数
 */
export interface ConstraintEventParams {
  max?: boolean;
  min?: boolean;
}

/**
 * z-index配置选项
 */
export interface ZIndexOptions {
  minzIndex?: number;
  maxzIndex?: number;
}

/**
 * 视图信息
 */
export interface ViewInfo {
  isFrom2D: boolean;
  oldView3DMode: string;
}

/**
 * 立面视图模式数据
 */
export interface ElevationViewModeData {
  getLastViewInfo(): ViewInfo | undefined;
}

/**
 * 缩略图视图属性配置
 */
export interface ThumbnailViewProps {
  /** 处理器实例 */
  handler: ThumbnailViewHandler;
  /** 是否显示退出立面图按钮 */
  showExitElevationBtn: boolean;
  /** 是否显示单房间模式按钮 */
  showSingleRoomModeBtn: boolean;
  /** 是否为单房间模式 */
  isSingleRoomMode: boolean;
  /** 切换屏幕提示文本 */
  switchScreenTooltip: string;
  /** 是否可见 */
  visible: boolean;
  /** 是否为简化模式 */
  simple: boolean;
  /** 点击模态框回调 */
  onClickModal: (event?: MouseEvent) => void;
  /** 拖拽开始回调 */
  onDragStart: () => void;
  /** 拖拽结束回调 */
  onDragEnd: (event: MouseEvent, position: unknown) => void;
  /** 缩放开始回调 */
  onZoomStart: () => void;
  /** 缩放中回调 */
  onZooming: (params: ZoomEventParams) => void;
  /** 缩放结束回调 */
  onZoomEnd: () => void;
  /** 切换显示/隐藏回调 */
  onToggle: (isExpanded: boolean, trackEvent?: boolean) => void;
  /** 切换视图回调 */
  onSwitchView: () => void;
  /** 切换单房间模式回调 */
  onToggleSingleRoomMode: () => void;
  /** 退出立面图回调 */
  onExitElevation: () => void;
  /** 切换3D视图回调 */
  onSwitch3DView: (viewMode: string) => void;
}

/**
 * 房间信息
 */
export interface RoomInfo {
  floors: unknown[];
}

/**
 * 实体对象（包含房间信息）
 */
export interface EntityWithRooms {
  roomInfos: RoomInfo[];
}

/**
 * 辅助2D视图配置选项
 */
export interface Aux2DViewOptions {
  /** 是否可以创建实体 */
  canCreateEntity: (entity: unknown) => boolean;
  /** 是否为单房间选择模式 */
  isSingleRoomSelectMode: boolean;
  /** 是否可以进入单房间模式 */
  canEnterSingleRoomMode: (entity: EntityWithRooms) => boolean;
  /** 覆盖视图设置 */
  overrideViewSettings: {
    face: {
      useMixpaint: boolean;
      isSelected: (entity: EntityWithRooms) => boolean;
      style: {
        getStyle: (
          entity: EntityWithRooms,
          state: { isSelected: boolean; isHover: boolean }
        ) => { fill: string; opacity: number };
      };
    };
  };
}

/**
 * ThumbnailViewHandler 类声明
 * 
 * 管理缩略图视图的核心处理器，负责：
 * - 视图的创建、渲染和销毁
 * - 2D/3D视图的切换和同步
 * - 单房间模式的管理
 * - 布局约束和位置管理
 * - 用户交互事件处理
 */
export declare class ThumbnailViewHandler {
  /** 缩略图视图名称常量 */
  static readonly ThumbnailViewName: 'ThumbnailView';

  /** 缩略图视图组件实例 */
  thumbnailView?: ThumbnailView;

  /** 应用实例 */
  readonly app: HSApp.App;

  /** 布局管理器 */
  readonly layoutMgr: HSApp.LayoutManager;

  /** 事件追踪器 */
  readonly eventTrack: HSApp.Util.EventTrack;

  /** 缩略图视图挂载节点 */
  readonly thumbnailViewMountNode: HTMLElement;

  /** 缩略图视图属性配置 */
  thumbnailViewProps: ThumbnailViewProps;

  /** 之前的半墙显示状态（用于单房间模式切换） */
  private _prevShowHalfWall: boolean;

  /** 选择房间的辅助2D视图实例 */
  private _selectRoomAux2DView?: HSApp.View.SVG.AuxCanvas;

  /** 选择房间的辅助2D容器 */
  private _selectRoomAux2DContainer?: HTMLElement;

  /**
   * 构造函数
   * @param mountNode - 缩略图视图的挂载DOM节点
   */
  constructor(mountNode: HTMLElement);

  /**
   * 获取缩略图模态框组件实例
   */
  get thumbnailModal(): unknown | undefined;

  /**
   * 获取根编辑器容器节点
   */
  get rootEditorContainerNode(): HTMLElement | undefined;

  /**
   * 获取根容器节点
   */
  get rootContainerNode(): HTMLElement | undefined;

  /**
   * 获取缩略图根节点
   */
  get thumbnailRootNode(): HTMLElement | null;

  /**
   * 获取缩略图视图的尺寸信息
   */
  get size(): ThumbnailSize | undefined;

  /**
   * 渲染缩略图视图
   * @param callback - 渲染完成后的回调函数
   */
  render(callback?: () => void): void;

  /**
   * 获取模态框的显示/隐藏状态
   * @returns 是否显示
   */
  getToggleModalShowStatus(): boolean | undefined;

  /**
   * 切换模态框的显示/隐藏状态
   * @param show - 是否显示
   */
  toggleModalShow(show: boolean): void;

  /**
   * 激活模态框（提升层级）
   */
  activeModal(): void;

  /**
   * 取消激活模态框
   * @param position - 位置信息
   */
  deactiveModal(position: unknown): void;

  /**
   * 点击模态框事件处理
   * @param event - 鼠标事件
   */
  onClickModal(event?: MouseEvent): void;

  /**
   * 拖拽开始事件处理
   */
  onDragStart(): void;

  /**
   * 拖拽结束事件处理
   * @param event - 鼠标事件
   * @param position - 拖拽后的位置
   */
  onDragEnd(event: MouseEvent, position: unknown): void;

  /**
   * 缩放开始事件处理
   * 隐藏辅助视图以提升性能
   */
  onZoomStart(): void;

  /**
   * 缩放结束事件处理
   * 重新显示辅助视图
   */
  onZoomEnd(): void;

  /**
   * 缩放过程中的事件处理
   * 同步调整关联视图的尺寸
   * @param params - 缩放参数（宽度、高度、内边距）
   */
  onZooming(params: ZoomEventParams): void;

  /**
   * 切换展开/收起状态
   * @param isExpanded - 是否展开
   * @param trackEvent - 是否追踪事件
   */
  onToggle(isExpanded: boolean, trackEvent?: boolean): void;

  /**
   * 初始化布局管理
   * 注册视图到布局管理器并添加约束
   */
  initLayout(): void;

  /**
   * 适配2D视图到缩略图尺寸
   * @param immediately - 是否立即适配
   */
  fit2DView(immediately?: boolean): void;

  /**
   * 隐藏缩略图视图
   * @param positionOverride - 额外的位置配置
   */
  hide(positionOverride?: Partial<ThumbnailPosition>): void;

  /**
   * 显示缩略图视图
   * @param positionOverride - 额外的位置配置
   */
  show(positionOverride?: Partial<ThumbnailPosition>): void;

  /**
   * 修改z-index层级
   * @param zIndex - 新的z-index值
   * @param options - z-index范围配置
   */
  changeZIndex(zIndex: number, options?: ZIndexOptions): void;

  /**
   * 切换缩略图视图的主辅视图（2D/3D互换）
   * @param viewType - 视图类型（'2d' 或 '3d'）
   * @param callback - 切换完成后的回调
   */
  switchThumbnailView(viewType?: '2d' | '3d', callback?: () => void): void;

  /**
   * 设置单房间模式
   * @param enabled - 是否启用单房间模式
   */
  setSingleRoomMode(enabled: boolean): void;

  /**
   * 切换单房间模式
   */
  onToggleSingleRoomMode(): void;

  /**
   * 切换主辅视图（2D/3D切换）
   */
  onSwitchView(): void;

  /**
   * 退出立面图模式
   * 恢复到之前的视图状态
   */
  onExitElevation(): void;

  /**
   * 切换3D视图模式
   * @param viewMode - 目标3D视图模式
   */
  onSwitch3DView(viewMode: string): void;

  /**
   * 更新3D视图切换按钮状态
   */
  updateSwitch3DViewBtn(): void;

  /**
   * 更新退出立面图按钮的显示状态
   * @param show - 是否显示
   */
  updateShowExitElevationBtn(show: boolean): void;

  /**
   * 更新单房间模式按钮的显示状态
   * @param show - 是否显示
   */
  updateShowSingleRoomModeBtn(show: boolean): void;

  /**
   * 更新单房间模式状态
   * @param enabled - 是否启用
   */
  updateSingleRoomMode(enabled: boolean): void;

  /**
   * 更新屏幕切换提示文本
   * @param tooltip - 提示文本
   */
  updateScreenTip(tooltip: string): void;

  /**
   * 更新可见性
   * @param visible - 是否可见
   */
  updateVisibility(visible: boolean): void;

  /**
   * 更新简化模式
   * @param simple - 是否为简化模式
   */
  updateSimpleMode(simple: boolean): void;

  /**
   * 更新z-index（内部方法）
   * @param zIndex - 新的z-index值
   */
  updateZIndex(zIndex: number): void;

  /**
   * 设置选择房间的辅助2D容器
   * @param container - 容器DOM元素
   */
  setSelectRoomAux2DContainer(container: HTMLElement): void;

  /**
   * 判断是否为单房间
   * @param entity - 包含房间信息的实体
   * @returns 是否为单房间
   */
  private _isSingleRoom(entity: EntityWithRooms): boolean;

  /**
   * 创建选择房间的辅助2D视图
   * 用于单房间模式的交互可视化
   */
  createSelectRoomAux2DView(): void;

  /**
   * 销毁选择房间的辅助2D视图
   */
  destroySelectRoomAux2DView(): void;

  /**
   * 调整选择房间辅助2D视图的尺寸
   */
  resizeSelectRoomAux2DView(): void;
}