/**
 * EZHome品牌定制化插件
 * 用于自定义全局核心和插件行为
 */

import type { HSApp } from './HSApp';
import type { HSCore } from './HSCore';
import type { HSFPConstants } from './HSFPConstants';
import type { ResourceManager } from './ResourceManager';

/**
 * 插件配置选项
 */
interface PluginOptions {
  /** 插件名称 */
  name: string;
  /** 插件描述 */
  description: string;
  /** 依赖的插件类型列表 */
  dependencies: HSFPConstants.PluginType[];
}

/**
 * 应用实例接口
 */
interface AppInstance {
  /** 应用设置 */
  appSettings: AppSettings;
  /** 应用参数 */
  appParams: AppParams;
}

/**
 * 应用设置接口
 */
interface AppSettings {
  /** 默认显示长度单位 */
  defaultDisplayLengthUnit: HSCore.Util.Unit.LengthUnitTypeEnum;
  /** 默认显示长度小数位数 */
  defaultDisplayLengthDigits: number;
  /** 默认显示面积单位 */
  defaultDisplayAreaUnit: HSCore.Util.Unit.AreaUnitTypeEnum;
  /** 默认显示面积小数位数 */
  defaultDisplayAreaDigits: number;
  /** 默认全局墙体宽度（米） */
  defaultGlobalWallWidth: number;
}

/**
 * 应用参数接口
 */
interface AppParams {
  /** 语言切换开关 */
  langSwitch?: boolean;
}

/**
 * 插件激活事件上下文
 */
interface PluginActivationContext {
  /** 应用实例 */
  app: AppInstance;
}

/**
 * 插件映射表
 */
interface PluginMap {
  [HSFPConstants.PluginType.Catalog]: unknown;
  [HSFPConstants.PluginType.PageHeader]: PageHeaderPlugin;
  [HSFPConstants.PluginType.Autostyler]: AutostylerPlugin;
}

/**
 * 页面头部插件接口
 */
interface PageHeaderPlugin {
  /** 获取帮助菜单项 */
  getHelpItem(itemName: string): HelpMenuItem | null;
}

/**
 * 帮助菜单项接口
 */
interface HelpMenuItem {
  /**
   * 添加子菜单项
   * @param config 菜单项配置
   */
  add(config: MenuItemConfig): void;
}

/**
 * 菜单项配置
 */
interface MenuItemConfig {
  /** 菜单项标签文本 */
  label: string;
  /** 菜单项名称标识 */
  name: string;
  /** 菜单项类型 */
  type: 'button' | 'separator' | 'submenu';
  /** 显示顺序 */
  order: number;
  /** 点击事件处理函数 */
  onclick?: () => void;
}

/**
 * 自动样式插件接口
 */
interface AutostylerPlugin {
  // 具体方法定义根据实际API补充
}

/**
 * URL工具类接口
 */
interface UrlUtil {
  /**
   * 获取URL查询参数
   * @returns 查询参数键值对
   */
  getQueryStrings(): Record<string, string>;
  
  /**
   * 替换URL中的参数
   * @param params 要替换的参数对象
   * @returns 新的URL字符串
   */
  replaceParamsInUrl(params: Record<string, string>): string;
}

/**
 * EZHome品牌定制化插件类
 * 继承自HSApp插件基类，实现品牌特定的配置和行为定制
 */
declare class EZHomeCustomizationPlugin extends HSApp.Plugin.IPlugin {
  /**
   * 构造函数
   * 初始化插件配置和依赖关系
   */
  constructor();

  /**
   * 插件激活回调
   * 在插件被激活时调用，用于设置品牌特定的配置
   * 
   * @param context - 插件上下文，包含应用实例
   * @param pluginMap - 已加载的插件映射表
   */
  onActive(context: PluginActivationContext, pluginMap: PluginMap): void;

  /**
   * 插件停用回调
   * 在插件被停用时调用，用于清理资源
   */
  onDeactive(): void;
}

/**
 * 全局HSApp命名空间扩展
 */
declare namespace HSApp {
  /** 应用配置 */
  namespace Config {
    /** 渲染作业管理服务器地址 */
    let RENDER_JOB_MANAGEMENT_SERVER: string;
    /** 渲染强度倍数阈值 */
    let RENDER_INTENSITYMULTIPLIER_THRESHOLD: number;
    /** 渲染曝光校准启用标志 */
    let RENDER_EXPOSURE_CALIBRATION_ENABLE: boolean;
    /** 全景查看器URL */
    let PANOVIEWER_URL: string;
    /** 视频编辑器URL */
    let VIDEOEDITOR_URL: string;
    /** 全景光照混合URL */
    let PANO_LIGHTMIX_URL: string;
    /** 货币符号 */
    let CURRENCY_SYMBOL: string;
    /** 光线追踪服务URL */
    let RAYTRACE_URL: string;
  }

  /** 合作伙伴配置 */
  namespace PartnerConfig {
    /** EZHome渲染作业管理服务器 */
    const EZHOME_RENDER_JOB_MANAGEMENT_SERVER: string;
    /** EZHome渲染强度倍数阈值 */
    const EZHOME_RENDER_INTENSITYMULTIPLIER_THRESHOLD: number;
    /** EZHome渲染曝光校准启用 */
    const EZHOME_RENDER_EXPOSURE_CALIBRATION_ENABLE: boolean;
    /** EZHome全景查看器URL */
    const EZHOME_PANOVIEWER_URL: string;
    /** EZHome视频编辑器URL */
    const EZHOME_VIDEOEDITOR_URL: string;
    /** EZHome全景光照混合URL */
    const EZHOME_PANO_LIGHTMIX_URL: string;
    /** EZHome货币符号 */
    const EZHOME_CURRENCY_SYMBOL: string;
    /** EZHome光线追踪URL */
    const EZHOME_RAYTRACE_URL: string;
    /** 帮助页面语言切换开关 */
    const HELP_LANGUAGE_SWITCH: boolean;
  }

  /** 工具类集合 */
  namespace Util {
    /** URL操作工具 */
    const Url: UrlUtil;
  }

  /** 应用实例访问器 */
  namespace App {
    /**
     * 获取应用单例实例
     * @returns 应用实例
     */
    function getApp(): AppInstance;
  }

  /** 目录管理器 */
  namespace Catalog {
    namespace Manager {
      /**
       * 设置应用配置
       * 应用目录相关的配置更改
       */
      function setAppConfig(): void;
    }
  }

  /** 插件系统 */
  namespace Plugin {
    /** 插件基类 */
    abstract class IPlugin {
      /**
       * 构造插件实例
       * @param options 插件配置选项
       */
      constructor(options: PluginOptions[]);

      /**
       * 插件激活生命周期钩子
       * @param context 激活上下文
       * @param pluginMap 插件映射表
       */
      abstract onActive(context: PluginActivationContext, pluginMap: PluginMap): void;

      /**
       * 插件停用生命周期钩子
       */
      abstract onDeactive(): void;
    }

    /**
     * 注册插件到系统
     * @param pluginId 插件唯一标识符
     * @param PluginClass 插件类构造函数
     */
    function registerPlugin(
      pluginId: string,
      PluginClass: new () => IPlugin
    ): void;
  }
}

/**
 * 核心命名空间
 */
declare namespace HSCore {
  namespace Util {
    namespace Unit {
      /** 长度单位枚举 */
      enum LengthUnitTypeEnum {
        /** 毫米 */
        millimeter = 'millimeter',
        /** 厘米 */
        centimeter = 'centimeter',
        /** 米 */
        meter = 'meter',
        /** 英寸 */
        inch = 'inch',
        /** 英尺 */
        foot = 'foot'
      }

      /** 面积单位枚举 */
      enum AreaUnitTypeEnum {
        /** 平方毫米 */
        squareMillimeter = 'squareMillimeter',
        /** 平方米 */
        meter = 'meter',
        /** 平方英尺 */
        squareFoot = 'squareFoot'
      }
    }
  }
}

/**
 * 插件类型常量
 */
declare namespace HSFPConstants {
  enum PluginType {
    /** 目录插件 */
    Catalog = 'Catalog',
    /** 页面头部插件 */
    PageHeader = 'PageHeader',
    /** 自动样式插件 */
    Autostyler = 'Autostyler'
  }
}

/**
 * 资源管理器
 */
declare namespace ResourceManager {
  /**
   * 获取国际化字符串
   * @param key 资源键名
   * @returns 对应语言的字符串
   */
  function getString(key: string): string;
}

export {
  EZHomeCustomizationPlugin,
  PluginOptions,
  AppInstance,
  AppSettings,
  PluginActivationContext,
  PluginMap,
  MenuItemConfig
};