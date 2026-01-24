/**
 * 2D面操作菜单项配置模块
 * 提供2D草图面的右键菜单项和工具栏项配置
 */

import { HSCore } from './HSCore';
import { SvgMap } from './SvgMap';

/**
 * 菜单项配置接口
 */
interface MenuItemConfig {
  /** 菜单项唯一标识 */
  id?: string;
  /** 控件类型 */
  type?: PropertyBarControlTypeEnum;
  /** 显示顺序 */
  order?: number;
  /** 适用的UI模式 */
  uiMode?: HSFPConstants.UIMode[];
  /** 是否禁用 */
  disable?: boolean;
  /** 图标资源路径 */
  src?: string;
  /** 显示标签 */
  label?: string;
  /** 快捷键配置 */
  hotkey?: {
    win: string;
    mac: string;
  };
  /** 是否注册快捷键 */
  registerHotkey?: boolean;
  /** 子菜单项 */
  children?: MenuItemConfig[];
  /** 点击事件回调 */
  onClick?: (event: MouseEvent) => void;
}

/**
 * 获取菜单项参数接口
 */
interface GetItemsParams {
  /** 选中的实体列表 */
  entities: HSCore.Model.Face2d[];
  /** 应用实例 */
  app: HSApp.App;
}

/**
 * 鼠标位置接口
 */
interface MousePosition {
  position: {
    x: number;
    y: number;
  };
}

/**
 * 2D面操作配置对象
 * 提供2D草图面相关的菜单项和工具功能
 */
export declare const Face2d: {
  /** 模块名称 */
  readonly name: "Face2d";

  /**
   * 判断选中的实体是否包含2D面
   * @param entities - 实体数组
   * @returns 如果包含2D面返回true，否则返回false
   */
  isApplied(entities: unknown[]): boolean;

  /**
   * 获取2D面相关的菜单项配置
   * @param params - 参数对象
   * @param params.entities - 选中的2D面实体列表
   * @param params.app - 应用实例
   * @returns 菜单项配置数组
   * 
   * @remarks
   * 返回的菜单项包括：
   * - 删除项（继承自commonItems）
   * - 偏移区域工具
   * - 复制工具（支持Ctrl+C快捷键）
   * - 阵列工具（包含线性阵列和轴向阵列子菜单）
   */
  getItems(params: GetItemsParams): MenuItemConfig[];
};

/**
 * 属性栏控件类型枚举（外部依赖）
 */
declare enum PropertyBarControlTypeEnum {
  imageButton = "imageButton"
}

/**
 * 资源管理器（外部依赖）
 */
declare namespace ResourceManager {
  /**
   * 获取本地化字符串
   * @param key - 资源键名
   * @returns 本地化后的字符串
   */
  function getString(key: string): string;
}

/**
 * 应用核心命名空间（外部依赖）
 */
declare namespace HSApp {
  namespace App {
    /**
     * 获取应用单例
     */
    function getApp(): {
      /** 命令管理器 */
      cmdManager: {
        /**
         * 创建命令
         * @param commandType - 命令类型
         * @param args - 命令参数
         */
        createCommand(commandType: string, args: unknown[]): unknown;
        /**
         * 执行命令
         * @param command - 命令对象
         */
        execute(command: unknown): void;
      };
      /** 插件管理器 */
      pluginManager: {
        /**
         * 获取插件
         * @param pluginType - 插件类型
         */
        getPlugin(pluginType: string): {
          commonItems?: {
            /** 获取删除菜单项 */
            getDeleteItem(params: GetItemsParams): MenuItemConfig;
          };
        } | undefined;
      };
      /** 当前激活的环境ID */
      activeEnvironmentId: string;
      /**
       * 获取激活的3D视图
       */
      getActive3DView(): {
        context: {
          domElement: HTMLElement;
        };
      };
      /**
       * 判断是否为2D视图激活状态
       */
      is2DViewActive(): boolean;
    };
  }

  namespace Util {
    /** 事件分组枚举 */
    enum EventGroupEnum {
      Rightmenu = "Rightmenu"
    }

    /**
     * 事件跟踪类
     */
    class EventTrack {
      /**
       * 获取事件跟踪单例
       */
      static instance(): EventTrack;
      /**
       * 跟踪事件
       * @param group - 事件分组
       * @param event - 事件名称
       * @param data - 事件数据
       */
      track(group: EventGroupEnum, event: string, data?: Record<string, unknown>): void;
    }
  }
}

/**
 * 应用常量（外部依赖）
 */
declare namespace HSFPConstants {
  /** UI模式枚举 */
  enum UIMode {
    layoutDesignMode = "layoutDesignMode"
  }

  /** 插件类型 */
  namespace PluginType {
    const LeftMenu: string;
  }

  /** 命令类型 */
  namespace CommandType {
    namespace Sketch2d {
      const OffsetTool: string;
      const CopyFaces: string;
      const LinearArray: string;
      const AxialArray: string;
    }
  }
}