import { Component, ReactNode } from 'react';
import { HSCore, HSApp } from '@homestyler/core';

/**
 * 楼层数据接口
 */
export interface SlabData {
  /** 楼层对象 */
  layer: HSCore.Model.Layer;
  /** 楼层索引 */
  index: number;
  /** 楼层显示文本 */
  text: string;
}

/**
 * 命令处理器映射接口
 */
export interface CommandHandlers {
  /** 添加新楼层命令 */
  [HSFPConstants.CommandType.AddNewLayer]: (
    layerType: HSCore.Model.LayerTypeEnum,
    callback?: () => void
  ) => void;
  
  /** 插入楼层命令 */
  [HSFPConstants.CommandType.InsertLayer]: (
    direction: 'up' | 'down',
    callback?: () => void
  ) => void;
  
  /** 删除楼层命令 */
  [HSFPConstants.CommandType.DeleteLayer]: (
    layer: HSCore.Model.Layer,
    index: number
  ) => void;
  
  /** 激活楼层命令 */
  [HSFPConstants.CommandType.ActiveLayer]: (layer: HSCore.Model.Layer) => void;
  
  /** 重置楼层索引命令 */
  [HSFPConstants.CommandType.ResetLayerIndex]: (
    layer: HSCore.Model.Layer,
    prev: HSCore.Model.Layer | null,
    next: HSCore.Model.Layer | null
  ) => void;
  
  /** 重命名楼层命令 */
  [HSFPConstants.CommandType.RenameLayer]: (
    layer: HSCore.Model.Layer,
    name: string
  ) => void;
  
  /** 切换天花板显示 */
  ToggleCeiling: (visible: boolean) => void;
}

/**
 * 拖拽目标位置接口
 */
export interface DropTarget {
  /** 前一个楼层 */
  prev: HSCore.Model.Layer | null;
  /** 后一个楼层 */
  next: HSCore.Model.Layer | null;
}

/**
 * 多楼层组件属性接口
 */
export interface MultiLayerProps {
  /** 是否有地下室楼层 */
  hasBasementLayer: boolean;
  
  /** 当前激活的楼层数据 */
  activeData: SlabData;
  
  /** 所有楼层数据数组 */
  slabData: SlabData[];
  
  /** 命令处理器映射 */
  handlers: CommandHandlers;
  
  /** 是否为编辑模式 */
  editMode: boolean;
  
  /** 是否为暗黑模式 */
  darkMode: boolean;
  
  /** 是否为只读模式 */
  readonlyMode: boolean;
  
  /** 是否显示所有楼层可见性选项 */
  showAllLayersVisibility?: boolean;
  
  /** 切换楼层前的确认回调 */
  switchLayerConfirm?: (layer: HSCore.Model.Layer) => Promise<boolean>;
  
  /** 切换楼层开始回调 */
  switchLayerStart?: () => void;
  
  /** 切换楼层结束回调 */
  switchLayerEnd?: () => void;
}

/**
 * 多楼层组件状态接口
 */
export interface MultiLayerState {
  /** 是否有地下室楼层 */
  hasBasementLayer: boolean;
  
  /** 当前激活的楼层数据 */
  activeData: SlabData;
  
  /** 是否为隔离模式（单层显示） */
  isIsolate: boolean;
  
  /** 是否全部禁用 */
  allDisabled: boolean;
  
  /** 楼层菜单是否可见 */
  visibleLayer: boolean;
  
  /** 会员权益剩余次数 */
  membershipAmount?: number;
  
  /** 是否显示添加楼层菜单 */
  showAddLayer: boolean;
  
  /** 是否显示鼠标提示信息 */
  showMouseInfo: boolean;
  
  /** 是否隐藏入口 */
  hideEntrance: boolean;
}

/**
 * 菜单项接口
 */
export interface MenuItem {
  /** 菜单项键值 */
  key: string;
}

/**
 * 多楼层编辑组件类
 * 
 * 提供多楼层建筑平面图的编辑、管理和显示功能。
 * 支持添加楼层、删除楼层、切换楼层、重命名楼层等操作。
 * 包含会员权益管理和权限验证。
 */
export default class MultiLayerComponent extends Component<MultiLayerProps, MultiLayerState> {
  /** 楼层菜单React元素 */
  private layerMenu: ReactNode | undefined;
  
  /** 信号钩子管理器 */
  private signalHook: HSCore.Util.SignalHook | undefined;
  
  /** 应用实例 */
  private app: HSApp.App;
  
  /** 是否为国际版 */
  private _isGlobal: boolean;
  
  /** 原始会员权益次数 */
  private _originMembershipCount: number | undefined;
  
  /** 隐藏添加楼层菜单的定时器 */
  private hiddenAddLayerTimer: NodeJS.Timeout | undefined;
  
  /** 是否悬停在添加楼层按钮上 */
  private isHoverAddLayer: boolean;
  
  /** 登录插件实例 */
  private logInPlugin: any;
  
  /** 是否为调试模式 */
  private _debug: boolean;

  /**
   * 构造函数
   * @param props - 组件属性
   */
  constructor(props: MultiLayerProps);

  /**
   * 组件卸载时清理资源
   */
  componentWillUnmount(): void;

  /**
   * 接收新属性时更新状态
   * @param nextProps - 新的属性
   */
  componentWillReceiveProps(nextProps: MultiLayerProps): void;

  /**
   * 调试多楼层功能
   * @param amount - 会员权益次数
   * @param isGlobal - 是否为国际版
   * @param originAmount - 原始权益次数
   */
  private _debugMultiLayer(
    amount?: number,
    isGlobal?: boolean,
    originAmount?: number
  ): void;

  /**
   * 验证总楼层数是否有效
   * @param isUpward - 是否向上添加
   * @returns 是否有效
   */
  private validTotalLayerNum(isUpward: boolean): boolean;

  /**
   * 创建多楼层（处理权益扣费）
   */
  private _createMultilayer(): void;

  /**
   * 标记多楼层升级提示已显示
   * @param show - 是否显示
   */
  markMultiLayerUpgradeNoticed(show: boolean): void;

  /**
   * 显示升级弹窗
   */
  upgrade(): void;

  /**
   * 从弹窗触发升级
   */
  popoverUpgrade(): void;

  /**
   * 鼠标移入添加楼层按钮
   */
  handleAddLayerMouseEnter(): void;

  /**
   * 鼠标移出添加楼层按钮
   */
  handleAddLayerMouseLeave(): void;

  /**
   * 鼠标移入添加楼层菜单项
   */
  handleAddLayerItemMouseEnter(): void;

  /**
   * 鼠标移出添加楼层菜单项
   */
  handleAddLayerItemMouseLeave(): void;

  /**
   * 检查是否可以拖拽到目标位置
   * @param layer - 要拖拽的楼层
   * @param prev - 目标位置的前一个楼层
   * @param next - 目标位置的后一个楼层
   * @returns 是否可以拖拽
   */
  private _ableToDrop(
    layer: HSCore.Model.Layer,
    prev: HSCore.Model.Layer | null,
    next: HSCore.Model.Layer | null
  ): boolean;

  /**
   * 添加楼层
   * @param menuItem - 菜单项信息
   */
  addLayer(menuItem: MenuItem): void;

  /**
   * 选择楼层
   * @param index - 楼层索引
   */
  chooseLayer(index: number): Promise<void>;

  /**
   * 删除楼层
   * @param index - 楼层索引
   * @param event - 鼠标事件
   */
  deleteLayer(index: number, event: React.MouseEvent): void;

  /**
   * 复选框状态改变
   * @param event - 改变事件
   */
  checkBoxOnChange(event: React.ChangeEvent<HTMLInputElement>): void;

  /**
   * 设置隔离模式
   * @param isolate - 是否隔离
   */
  setIsolate(isolate: boolean): void;

  /**
   * 添加地下室楼层
   * @param createMultilayer - 是否需要扣费
   */
  addBasementLayer(createMultilayer: boolean): void;

  /**
   * 激活楼层
   * @param slabData - 楼层数据
   */
  activateLayer(slabData: SlabData): void;

  /**
   * 切换天花板显示
   * @param visible - 是否可见
   * @param clearTransaction - 是否清除事务
   */
  toggleCeiling(visible: boolean, clearTransaction?: boolean): void;

  /**
   * 重置楼层索引
   * @param layer - 楼层对象
   * @param target - 目标位置
   */
  private _resetLayerIndex(layer: HSCore.Model.Layer, target: DropTarget): void;

  /**
   * 显示超出楼层范围的提示
   */
  private _showExceededLayerRangeToast(): void;

  /**
   * 重命名楼层
   * @param layer - 楼层对象
   * @param name - 新名称
   */
  private _renameLayer(layer: HSCore.Model.Layer, name: string): void;

  /**
   * 获取会员权益状态
   * @param forceCheck - 是否强制检查
   */
  private _getMembershipStatus(forceCheck?: boolean): void;

  /**
   * 获取楼层菜单
   * @param items - 楼层项数组
   * @param activeLayer - 当前激活的楼层
   */
  getLayerMenus(items: SlabData[], activeLayer: SlabData): void;

  /**
   * 免费试用点击事件
   * @param eventName - 事件名称
   * @param modalType - 弹窗类型
   */
  private _freeTrialClick(eventName: string, modalType: string): void;

  /**
   * 获取免费试用模板
   * @param className - 附加的CSS类名
   * @returns React元素
   */
  getFreeTrailTemplate(className?: string): ReactNode;

  /**
   * 隐藏添加楼层弹窗
   */
  hiddenAddLayerPopup(): void;

  /**
   * 鼠标移入提示图标
   */
  onMouseInfoEnter(): void;

  /**
   * 鼠标移出提示图标
   */
  onMouseInfoLeave(): void;

  /**
   * 更新禁用状态
   */
  updateDisableStatus(): void;

  /**
   * 更新楼层状态
   * @param event - 信号事件
   */
  updateLayerState(event: { data: { fieldName: string; value: any } }): void;

  /**
   * 渲染组件
   */
  render(): ReactNode;
}

/**
 * 楼层方向常量
 */
export const FLOOR = 'floor';
export const BASEMENT = 'basement';
export const UP = 'up';
export const DOWN = 'down';