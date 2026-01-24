/**
 * 用户追踪日志监听器配置模块
 * 用于监听和记录键盘快捷键操作及相机视图切换的用户行为
 */

import type { Signal } from './signal-types';
import type { KeyboardManager } from './keyboard-manager';
import type { HotkeyManager } from './hotkey-manager';

/**
 * 键盘事件数据
 */
interface KeyboardEventData {
  /** 按键代码（如 'KeyW', 'KeyS'） */
  code: string;
  /** 键码数值 */
  keyCode: number;
  /** 是否按下Ctrl键 */
  ctrlKey: boolean;
  /** 是否按下Shift键 */
  shiftKey: boolean;
  /** 是否按下Alt键 */
  altKey: boolean;
  /** 是否按下Meta键（Mac的Command键或Windows键） */
  metaKey: boolean;
}

/**
 * 快捷键事件数据
 */
interface HotkeyEventData {
  /** 快捷键标识符（如 'meta+z', 'esc'） */
  identifier?: string;
}

/**
 * 点击率统计数据
 */
interface ClicksRatioData {
  /** 标识ID */
  id: string | number;
  /** 描述名称 */
  name: string;
}

/**
 * 用户追踪日志的自定义信息
 */
interface CustomizedTrackInfo {
  /** 键码 */
  keyCode?: number;
  /** 快捷键名称 */
  shortCutName?: string;
  /** 日志分组类型 */
  group?: string;
  /** 操作类型 */
  type?: string;
}

/**
 * 用户追踪日志记录
 */
interface UserTrackLog {
  /** 自定义追踪信息 */
  customizedInfo?: CustomizedTrackInfo;
}

/**
 * 日志数据参数
 */
interface LogDataParams {
  /** 日志描述 */
  description: string;
  /** 快捷键名称 */
  shortCutName?: string;
  /** 键码 */
  keyCode?: number;
  /** 活动分区（事件分组枚举） */
  activeSection?: string;
  /** 点击率统计 */
  clicksRatio?: ClicksRatioData;
  /** 日志分组类型 */
  group?: string;
  /** 操作类型（如 'mainView'） */
  type?: string;
  /** 视图模式 */
  viewMode?: number;
  /** 视图模式名称 */
  viewModeName?: string;
}

/**
 * 应用管理器接口
 */
interface AppManager {
  /** 键盘管理器 */
  keyboardManager: KeyboardManager;
  /** 快捷键管理器 */
  hotkey: HotkeyManager;
  /** 命令管理器 */
  cmdManager: {
    /** 当前执行的命令 */
    current?: {
      /** 命令类型 */
      type: string;
    };
  };
  /** 选择管理器 */
  selectionManager: {
    /** 获取当前选中的元素列表 */
    selected(): unknown[];
  };
  /** 用户追踪日志记录器 */
  userTrackLogger: {
    /** 获取最后一条追踪日志 */
    getLastTrackLog(): UserTrackLog | undefined;
  };
  /** 获取旧视图模式 */
  getOldViewMode: number;
  /** 判断当前是否为2D视图激活状态 */
  is2DViewActive(): boolean;
}

/**
 * 键盘管理器接口
 */
interface KeyboardManager {
  /** 按键按下信号 */
  signalKeyDown: Signal<KeyboardEventData>;
}

/**
 * 快捷键分组信息
 */
interface HotkeyLogGroup {
  /** 描述 */
  description?: string;
  /** 分组类型 */
  group?: string;
}

/**
 * 快捷键管理器接口
 */
interface HotkeyManager {
  /** 快捷键处理信号 */
  hotkeyHandleSignal: Signal<HotkeyEventData>;
  /** 根据快捷键获取日志分组信息 */
  getLogGroupByHotkey(identifier: string): HotkeyLogGroup | undefined;
}

/**
 * 监听器事件数据
 */
interface ListenerEventData<T> {
  /** 事件携带的数据 */
  data: T;
}

/**
 * 监听器配置对象
 */
interface ListenerConfig<T> {
  /**
   * 获取监听信号的方法
   * @param app 应用管理器实例
   * @returns 要监听的信号对象
   */
  getListenSignal(app: AppManager): Signal<T>;

  /**
   * 事件监听处理函数
   * @param event 监听到的事件数据
   * @returns 日志数据数组或undefined
   */
  listen(event: ListenerEventData<T>): unknown[] | undefined;
}

/**
 * WASD相机控制键映射
 * 87: W键 - 相机前进
 * 83: S键 - 相机后退
 * 65: A键 - 相机左移
 * 68: D键 - 相机右移
 * 81: Q键 - 相机上移
 * 69: E键 - 相机下移
 */
declare const WASD_CAMERA_CONTROLS: Record<number, string>;

/**
 * 方向键相机控制映射
 * 37: 左箭头 - 相机左移
 * 38: 上箭头 - 相机前进
 * 39: 右箭头 - 相机右移
 * 40: 下箭头 - 相机后退
 */
declare const ARROW_CAMERA_CONTROLS: Record<number, string>;

/**
 * 数字键视图模式切换映射
 * 49: 1键 - 平面视图
 * 50: 2键 - RCP视图
 * 51: 3键 - 轨道视图
 * 52: 4键 - 第一人称视图
 * 53: 5键 - 立面视图
 */
declare const VIEW_MODE_SHORTCUTS: Record<number, number>;

/**
 * 创建日志数据
 * @param eventType 事件类型（如 'hotkey.Command'）
 * @param params 日志参数
 * @param flag 可选标志参数
 * @returns 日志数据对象
 */
declare function createLogData(
  eventType: string,
  params: LogDataParams,
  flag?: boolean
): unknown;

/**
 * 用户行为追踪监听器配置列表
 * 包含键盘按键监听器和快捷键处理监听器
 */
declare const listenerConfigs: [
  ListenerConfig<KeyboardEventData>,
  ListenerConfig<HotkeyEventData>
];

export default listenerConfigs;

export type {
  ListenerConfig,
  ListenerEventData,
  KeyboardEventData,
  HotkeyEventData,
  LogDataParams,
  ClicksRatioData,
  UserTrackLog,
  CustomizedTrackInfo,
  AppManager,
  KeyboardManager,
  HotkeyManager,
  HotkeyLogGroup
};