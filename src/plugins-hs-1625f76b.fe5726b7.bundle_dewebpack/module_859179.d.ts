import type React from 'react';

/**
 * 加密工具库类型定义 (crypto-js)
 */
declare namespace CryptoJS {
  namespace enc {
    interface Encoder {
      parse(data: string): WordArray;
    }
    const Utf8: Encoder;
  }

  interface WordArray {
    toString(): string;
  }

  namespace mode {
    const ECB: Mode;
  }

  namespace pad {
    const Pkcs7: Padding;
  }

  interface Mode {}
  interface Padding {}

  interface EncryptionOptions {
    mode: Mode;
    padding: Padding;
  }

  namespace AES {
    function encrypt(
      message: string,
      key: WordArray,
      options: EncryptionOptions
    ): CipherParams;
  }

  interface CipherParams {
    toString(): string;
  }
}

/**
 * 应用全局用户对象
 */
interface AdskUser {
  /** 用户唯一标识符 */
  uid: string;
  /** 是否隐藏反馈功能 */
  hideFeedback?: boolean;
}

/**
 * 资源管理器
 */
declare namespace ResourceManager {
  /**
   * 获取国际化字符串
   * @param key - 资源键名
   * @returns 国际化后的字符串
   */
  function getString(key: string): string;
}

/**
 * 全局应用命名空间
 */
declare namespace HSApp {
  /** 应用配置 */
  namespace Config {
    /** 租户标识 */
    const TENANT: string;
  }

  /** 应用主入口 */
  namespace App {
    interface Application {
      pluginManager: PluginManager;
    }

    /**
     * 获取应用实例
     */
    function getApp(): Application;
  }

  /** 插件管理器 */
  interface PluginManager {
    /**
     * 获取指定插件
     * @param pluginId - 插件标识符
     */
    getPlugin(pluginId: string): CatalogPopupPlugin;
  }

  /** 目录弹窗插件 */
  interface CatalogPopupPlugin {
    /**
     * 显示模型申请面板
     */
    showModelApplyPanel(): void;
  }

  /** 工具集合 */
  namespace Util {
    /** 事件分组枚举 */
    enum EventGroupEnum {
      Catalog = 'Catalog',
    }

    /** 事件追踪器 */
    interface EventTracker {
      /**
       * 追踪用户行为事件
       * @param group - 事件分组
       * @param action - 事件动作名称
       */
      track(group: EventGroupEnum, action: string): void;
    }

    /** 事件追踪类 */
    namespace EventTrack {
      /**
       * 获取事件追踪器单例
       */
      function instance(): EventTracker;
    }
  }
}

/**
 * 浮动按钮配置项
 */
interface FloatButtonConfig {
  /** 按钮图标类名 */
  icon: string;
  /** 鼠标悬停时的图标类名 */
  hoverIcon: string;
  /** 按钮显示文本 */
  text: string;
  /**
   * 点击事件回调函数
   */
  onClick: () => void;
}

/**
 * 浮动切换按钮组数据
 */
interface FloatToggleButtonData {
  /** 主按钮图标 */
  icon: string;
  /** 按钮组配置列表 */
  groupData: FloatButtonConfig[];
}

/**
 * 浮动切换按钮组件属性
 */
interface FloatToggleButtonProps {
  /** 按钮数据配置 */
  data: FloatToggleButtonData;
}

/**
 * 浮动按钮组件构造函数参数
 */
interface FloatButtonComponentProps {
  /** 是否显示申请入口，默认为 true */
  showApplyEntry?: boolean;
  /** 问卷调查类型 */
  surveyType?: 'autoStyler' | string;
}

/**
 * 浮动按钮React组件类
 * 提供模型申请和满意度调查的快捷入口
 */
declare class FloatButtonComponent extends React.Component<FloatButtonComponentProps> {
  /**
   * 浮动切换按钮数据配置
   * @private
   */
  private _floatToggleButtonData: FloatToggleButtonData;

  /**
   * 构造函数
   * @param props - 组件属性
   */
  constructor(props: FloatButtonComponentProps);

  /**
   * 渲染组件
   * @returns React元素或null
   */
  render(): React.ReactElement<FloatToggleButtonProps> | null;
}

/**
 * 浮动切换按钮UI组件
 */
declare const FloatToggleButton: React.ComponentType<FloatToggleButtonProps>;

declare global {
  /** 全局用户对象 */
  const adskUser: AdskUser;

  /** 全局应用对象 */
  const HSApp: typeof HSApp;

  /** 资源管理器 */
  const ResourceManager: typeof ResourceManager;

  /** 加密库 */
  const CryptoJS: typeof CryptoJS;

  interface Window {
    /**
     * 打开新窗口
     * @param url - 目标URL
     * @param target - 窗口目标
     * @param features - 窗口特性配置
     */
    open(url: string, target: string, features: string): Window | null;
  }
}

export default FloatButtonComponent;