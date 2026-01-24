/**
 * Circle2d 模块
 * 提供二维圆形实体的属性栏配置
 */

import { HSCore } from './HSCore';
import { SvgMap } from './SvgMap';

/**
 * 属性栏控件类型枚举
 */
declare enum PropertyBarControlTypeEnum {
  imageButton = 'imageButton',
  // ... 其他可能的控件类型
}

/**
 * 属性栏项配置接口
 */
interface PropertyBarItem {
  /** 唯一标识符 */
  id: string;
  /** 控件类型 */
  type: PropertyBarControlTypeEnum;
  /** 显示顺序 */
  order: number;
  /** 适用的UI模式列表 */
  uiMode: readonly string[];
  /** 图标资源路径 */
  src: string;
  /** 显示标签文本 */
  label: string;
  /** 点击事件处理函数 */
  onClick: () => void;
}

/**
 * 属性栏配置上下文接口
 */
interface PropertyBarContext {
  /** 选中的实体列表 */
  entities: readonly unknown[];
  /** 应用程序实例 */
  app: {
    /** 命令管理器 */
    cmdManager: {
      /**
       * 创建命令实例
       * @param commandType - 命令类型
       * @param args - 命令参数
       */
      createCommand(commandType: string, args: unknown[]): unknown;
      /**
       * 执行命令
       * @param command - 命令实例
       */
      execute(command: unknown): void;
    };
  };
}

/**
 * 左侧菜单插件接口
 */
interface LeftMenuPlugin {
  /** 通用属性栏项集合 */
  commonItems?: {
    /**
     * 获取删除项配置
     * @param context - 属性栏上下文
     */
    getDeleteItem(context: PropertyBarContext): PropertyBarItem;
  };
}

/**
 * Circle2d 属性栏配置模块
 * 用于配置二维圆形实体的属性栏选项
 */
export declare const Circle2d: {
  /** 模块名称 */
  readonly name: 'Circle2d';

  /**
   * 判断是否应用于给定实体列表
   * @param entities - 实体列表
   * @returns 当实体列表中包含 Circle2d 实例时返回 true
   */
  isApplied(entities: readonly unknown[]): boolean;

  /**
   * 获取属性栏项列表
   * @param context - 属性栏配置上下文
   * @returns 属性栏项配置数组
   */
  getItems(context: PropertyBarContext): PropertyBarItem[];
};

/**
 * 全局类型声明
 */
declare global {
  /** 应用程序全局对象 */
  const HSApp: {
    /** 应用程序核心 */
    App: {
      /** 获取应用程序单例 */
      getApp(): {
        /** 插件管理器 */
        pluginManager: {
          /**
           * 获取插件实例
           * @param pluginType - 插件类型
           */
          getPlugin(pluginType: string): LeftMenuPlugin | null;
        };
      };
    };
    /** 工具类集合 */
    Util: {
      /** N定制功能模型工具类 */
      NCustomizedFeatureModel: {
        /** 判断是否为N定制环境 */
        isNCustomizedEnv(): boolean;
      };
    };
  };

  /** 常量定义 */
  const HSFPConstants: {
    /** 插件类型枚举 */
    PluginType: {
      LeftMenu: string;
    };
    /** UI模式枚举 */
    UIMode: {
      layoutDesignMode: string;
    };
    /** 命令类型枚举 */
    CommandType: {
      NCustomizedFeatureModel: {
        CmdSectionAndElevationCopy: string;
      };
    };
  };

  /** 资源管理器 */
  const ResourceManager: {
    /**
     * 获取国际化字符串
     * @param key - 资源键名
     */
    getString(key: string): string;
  };
}