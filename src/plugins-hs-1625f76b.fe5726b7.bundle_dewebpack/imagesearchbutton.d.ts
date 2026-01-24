/**
 * 图片搜索按钮组件
 * 支持上传图片进行以图搜图功能
 */

import { RefObject } from 'react';

/**
 * 图片搜索结果接口
 */
export interface ImageSearchResult {
  /** 图片搜索URL */
  imgSearchUrl: string;
  [key: string]: unknown;
}

/**
 * 图片搜索按钮组件的属性接口
 */
export interface ImageSearchButtonProps {
  /**
   * 图片展示回调函数
   * @param result - 图片搜索结果对象
   */
  showPicture: (result: ImageSearchResult) => void;

  /**
   * 是否为重新上传按钮模式
   * @default false
   */
  isReUpLoadButton?: boolean;

  /**
   * 按钮类型
   * - 0: 默认样式（带Tooltip）
   * - 1: Spark样式
   * @default 0
   */
  type?: 0 | 1;
}

/**
 * 模态框配置接口
 */
interface ModalConfig {
  /** 模态框标题 */
  title: string;
  /** 模态框内容 */
  content: React.ReactNode;
  /** 确认按钮回调 */
  onOk: () => void;
  /** 确认按钮文本 */
  okButtonContent: string;
  /** 点击确认按钮后关闭 */
  closeByOkButton: boolean;
  /** 禁用取消按钮 */
  disableCancelButton: boolean;
  /** 复选框配置 */
  checkbox?: {
    /** 复选框文本 */
    checkboxText: string;
    /** 复选框回调 */
    callback: () => void;
  };
  /** 自定义类名 */
  className?: string;
}

/**
 * 用户追踪日志接口
 */
interface UserTrackLogger {
  /**
   * 推送追踪事件
   * @param event - 事件名称
   * @param data - 事件数据
   * @param options - 额外选项
   */
  push(event: string, data: Record<string, unknown>, options: Record<string, unknown>): void;
}

/**
 * 事件管理器接口
 */
interface EventManager {
  /**
   * 处理搜索图片文件
   * @param files - 文件列表
   * @returns 返回图片搜索结果的Promise
   */
  handleSearchPictureFile(files: FileList): Promise<ImageSearchResult> | null;
}

/**
 * 应用实例接口
 */
interface App {
  /** 用户追踪日志器 */
  userTrackLogger: UserTrackLogger;
}

/**
 * HSApp全局对象接口
 */
declare global {
  const ResourceManager: {
    getString(key: string): string;
  };

  const HSApp: {
    Catalog: {
      EventManager: new () => EventManager;
    };
    App: {
      getApp(): App;
    };
  };
}

/**
 * 模态框静态方法接口
 */
interface ModalStatic {
  /**
   * 显示基础模态框
   * @param config - 模态框配置
   */
  basic(config: ModalConfig): void;
}

/**
 * 图标视图组件属性
 */
interface IconfontViewProps {
  /** 图标类型 */
  showType: string;
  /** 自定义样式 */
  customStyle?: React.CSSProperties;
  /** 自定义类名 */
  customClass?: string;
  /** 悬停颜色 */
  hoverColor?: string;
  /** 图标点击回调 */
  iconOnclick?: () => void;
}

/**
 * Tooltip组件属性
 */
interface TooltipProps {
  /** 弹出位置 */
  placement: 'top' | 'bottom' | 'left' | 'right';
  /** 提示文本 */
  title: string;
  /** 触发方式 */
  trigger: 'hover' | 'click' | 'focus';
  /** 颜色主题 */
  color: 'dark' | 'light';
  /** 获取弹出容器 */
  getPopupContainer?: (element: HTMLElement) => HTMLElement;
  /** 自定义类名 */
  overlayClassName?: string;
  /** 子元素 */
  children: React.ReactNode;
}

/**
 * 外部依赖声明
 */
declare module '*/Modal' {
  export const Modal: ModalStatic;
}

declare module '*/IconfontView' {
  export const IconfontView: React.FC<IconfontViewProps>;
}

declare module '*/Tooltip' {
  export const Tooltip: React.FC<TooltipProps>;
}

/**
 * 图片搜索按钮组件
 * 
 * @description
 * 提供图片上传并进行以图搜图的功能按钮组件。
 * 支持首次使用提示模态框、重新上传模式和不同的视觉样式。
 * 
 * @example
 *