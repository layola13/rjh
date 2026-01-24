/**
 * SparkPic (灵图) 环境处理器
 * 负责管理 AI Styler 功能的生命周期、相机控制和环境切换
 */

import type { HSApp } from './HSApp';
import type { HSCore } from './HSCore';
import type { SparkPicEnv } from './SparkPicEnv';
import type { AppContainer } from './AppContainer';
import type { LogTriggerType } from './LogTriggerType';

/**
 * 插件类型枚举
 */
declare enum PluginType {
  Toolbar = 'Toolbar',
  SparkPicImage = 'SparkPicImage',
  Persistence = 'Persistence'
}

/**
 * 环境类型枚举
 */
declare enum Environment {
  Default = 'Default',
  SparkPicEnv = 'SparkPicEnv'
}

/**
 * 日志分组类型
 */
declare enum LogGroupTypes {
  SparkPic = 'SparkPic'
}

/**
 * 工具栏插件接口
 */
interface ToolbarPlugin {
  /**
   * 添加工具栏项
   * @param item - 工具栏项配置
   * @param parentId - 父级ID
   * @param toolbarId - 工具栏ID
   */
  addItem(item: ToolbarItem, parentId: string, toolbarId: string): void;
}

/**
 * 工具栏项配置
 */
interface ToolbarItem {
  /** 排序优先级 */
  order: number;
  /** 类型 */
  type: 'button';
  /** 显示标签 */
  label: string;
  /** 名称标识 */
  name: string;
  /** 点击回调 */
  onclick: () => void;
}

/**
 * SparkPic 图像插件接口
 */
interface SparkPicImagePlugin {
  // 根据实际需求补充
}

/**
 * 持久化插件接口
 */
interface PersistencePlugin {
  /**
   * 自动保存
   * @param enable - 是否启用
   */
  autoSave(enable: boolean): void;
}

/**
 * 插件依赖映射
 */
interface PluginDependencies {
  [PluginType.Toolbar]: ToolbarPlugin;
  [PluginType.SparkPicImage]: SparkPicImagePlugin;
  [PluginType.Persistence]?: PersistencePlugin;
}

/**
 * 相机数据结构
 */
interface CameraData {
  x: number;
  y: number;
  z: number;
  type: HSApp.View.ViewModeEnum;
  // 其他相机属性...
}

/**
 * 相机实例接口
 */
interface Camera {
  /** 相机类型 */
  type: HSApp.View.ViewModeEnum;
  /** 字段变更信号 */
  signalFieldChanged: HSCore.Util.Signal<CameraFieldChangedEvent>;
  /** 实体引用 */
  entity?: {
    dirty(): void;
  };
  /**
   * 导出相机数据
   * @returns 相机数据数组
   */
  dump(): [CameraData];
  /**
   * 获取 T3D 相机实例
   */
  getT3dCamera(): T3dCamera;
}

/**
 * T3D 相机接口
 */
interface T3dCamera {
  /** 是否启用垂直倾斜校正 */
  mEnableVerticalTiltCorrection?: boolean;
  /**
   * 设置垂直倾斜校正
   * @param enable - 是否启用
   */
  setEnableVerticalTiltCorrection(enable: boolean): void;
}

/**
 * 3D 视图接口
 */
interface View3D {
  /** 相机实例 */
  camera?: Camera;
}

/**
 * 相机字段变更事件
 */
interface CameraFieldChangedEvent {
  data: {
    /** 变更的字段名 */
    fieldName: 'x' | 'y' | 'z' | string;
    // 其他字段...
  };
}

/**
 * 用户追踪日志配置
 */
interface UserTrackLogConfig {
  /** 描述信息 */
  description: string;
  /** 日志分组 */
  group: LogGroupTypes;
}

/**
 * 日志触发选项
 */
interface LogTriggerOptions {
  /** 触发类型 */
  triggerType: LogTriggerType;
}

/**
 * SparkPic 环境处理器类
 * 管理 AI Styler 功能的初始化、启动、退出及相机状态同步
 */
export declare class Handler {
  /** 应用实例 */
  private _app: HSApp.App;
  
  /** 前一个环境标识 */
  private _prevEnv?: Environment;
  
  /** React 应用容器引用 */
  private _appRef?: React.RefObject<AppContainer>;
  
  /** 信号钩子管理器 */
  private _signalHook: HSCore.Util.SignalHook;
  
  /** 相机刷新信号 */
  public cameraRefreshSignal: HSCore.Util.Signal<CameraFieldChangedEvent>;
  
  /** 工具栏插件 */
  private _toolbarPlugin?: ToolbarPlugin;
  
  /** SparkPic 图像插件 */
  private _sparkPicImagePlugin?: SparkPicImagePlugin;
  
  /** 定时器 ID（用于防抖） */
  private timeId?: number;
  
  /** 相机数据缓存 */
  private cameraCache?: CameraData;
  
  /** 当前相机实例 */
  public camera?: Camera;
  
  /** 倾斜校正信号 */
  public tiltCorrectionSignal: HSCore.Util.Signal<boolean>;

  constructor();

  /**
   * 初始化处理器
   * @param dependencies - 插件依赖映射
   */
  init(dependencies: PluginDependencies): void;

  /**
   * 相机刷新回调（内部方法）
   * @param event - 相机字段变更事件
   */
  private _cameraRefresh(event: CameraFieldChangedEvent): void;

  /**
   * 更新 T3D 相机倾斜校正状态
   * @param enable - 是否启用倾斜校正
   */
  updateT3dCameraTiltCorrection(enable: boolean): void;

  /**
   * 启动 SparkPic 环境
   * 激活环境、注册相机监听、触发用户追踪日志
   */
  start(): void;

  /**
   * 退出 SparkPic 环境
   * 恢复相机状态、取消监听、返回前一个环境
   */
  quitEnv(): void;

  /**
   * 注入工具栏按钮（仅限 fp 租户）
   * @private
   */
  private _injectToolbarFp(): void;

  /**
   * 停用时的清理操作
   * 卸载 React 组件
   */
  onDeactive(): void;

  /**
   * 更新房间类型（防抖触发）
   */
  updateRoomType(): void;

  /**
   * 获取相机刷新信号
   * @returns 刷新信号实例
   */
  getRefreshSignal(): HSCore.Util.Signal<CameraFieldChangedEvent>;

  /**
   * 获取倾斜校正信号
   * @returns 倾斜校正信号实例
   */
  getTiltCorrectionSignal(): HSCore.Util.Signal<boolean>;

  /**
   * 缓存相机数据
   * @param camera - 待缓存的相机实例
   */
  cacheCameraData(camera: Camera): void;

  /**
   * 恢复相机数据到缓存状态
   */
  recoverCameraData(): void;

  /**
   * 相机字段变更监听器
   * @param event - 字段变更事件
   */
  private onCameraFieldChanged(event: CameraFieldChangedEvent): void;
}