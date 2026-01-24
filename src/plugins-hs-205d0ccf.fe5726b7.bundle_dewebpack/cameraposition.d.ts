/**
 * CameraPosition 组件类型定义
 * 用于管理和操作 3D 场景中的相机位置和视角
 */

import { PureComponent } from 'react';

/**
 * 相机快照信息
 */
export interface CameraSnapshot {
  /** 快照唯一标识符 */
  id: string;
  /** 快照缩略图 URL */
  thumbnail: string;
  /** 视图类型 */
  type: HSApp.View.ViewModeEnum;
  /** 相机对象 */
  camera: unknown;
  /** 相机名称 */
  name: string;
  /** 渲染类型 */
  renderType?: string;
  /** 原始渲染 UI 配置 */
  oriRenderUI?: unknown;
}

/**
 * 智能相机数据
 */
export interface IntelligenceCamera {
  /** 相机对象 */
  camera: unknown;
  /** 房间类型显示名称 */
  roomTypeDisplayName: string;
  /** 缩略图 URL */
  thumbnail: string;
}

/**
 * 标签页数据
 */
export interface TabData {
  /** 标签值 */
  value: string;
  /** 标签显示文本 */
  label: string;
}

/**
 * 组件 Props
 */
export interface CameraPositionProps {
  /** 组件可见性 */
  visible?: boolean;
  /** 框架边界信息 */
  frameBound?: unknown;
}

/**
 * 组件 State
 */
export interface CameraPositionState {
  /** 当前选中的标签页值 */
  tabValue: string;
  /** 当前相机列表 */
  currentCameras: CameraSnapshot[];
  /** 智能相机加载状态 */
  isIntelligenceLoading: boolean;
  /** 自动生成的相机列表 */
  autoCameras: IntelligenceCamera[];
}

/**
 * 相机设置选项
 */
export interface CameraSetOptions {
  /** 渲染类型 */
  renderType?: string;
  /** 原始渲染 UI 配置 */
  oriRenderUI?: unknown;
}

/**
 * 相机位置管理组件
 * 
 * 提供以下功能：
 * - 创建和保存相机视角
 * - 刷新相机快照
 * - 切换到指定相机视角
 * - 删除相机快照
 * - 修改相机名称
 * - 支持手动和智能相机两种模式
 */
export declare class CameraPosition extends PureComponent<CameraPositionProps, CameraPositionState> {
  /** 标签页配置数据 */
  tabData: TabData[];
  
  /** HSApp 应用实例 */
  app: HSApp.App;
  
  /** 是否显示标签页 */
  showTabs: boolean;

  /**
   * 更新相机列表
   * 从场景中获取所有第一人称视角的快照
   * 如果启用智能模式，同时加载智能相机
   */
  private _updateCameras(): void;

  /**
   * 创建新的相机快照
   * 基于当前视角创建并保存相机位置
   */
  private _createCamera(): void;

  /**
   * 刷新指定相机快照
   * @param cameraId - 要刷新的相机 ID
   */
  private _refreshCamera(cameraId: string): void;

  /**
   * 切换到指定相机视角
   * @param camera - 相机对象
   * @param viewType - 视图类型
   * @param options - 相机设置选项
   */
  private _setCamera(camera: unknown, viewType: string, options?: CameraSetOptions): void;

  /**
   * 删除相机快照
   * @param cameraId - 要删除的相机 ID
   */
  private _deleteCamera(cameraId: string): void;

  /**
   * 处理输入框回车事件
   * @param event - React 键盘事件
   */
  handleEnter(event: React.KeyboardEvent<HTMLInputElement>): void;

  /**
   * 修改相机快照名称
   * @param event - React 焦点事件
   * @param cameraId - 相机 ID
   */
  private _changeSnapName(event: React.FocusEvent<HTMLInputElement>, cameraId: string): void;

  componentDidUpdate(prevProps: CameraPositionProps, prevState: CameraPositionState): void;

  componentDidMount(): void;

  render(): React.ReactElement;
}

export default CameraPosition;