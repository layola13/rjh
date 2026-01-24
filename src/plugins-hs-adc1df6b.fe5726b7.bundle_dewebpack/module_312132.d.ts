/**
 * 工具栏帮助菜单配置模块
 * @module HelpMenuConfig
 */

/**
 * 菜单项点击事件处理函数类型
 */
type MenuItemClickHandler = () => void;

/**
 * 菜单项基础接口
 */
interface BaseMenuItem {
  /** 菜单项唯一标识名称 */
  name: string;
  /** 菜单项显示顺序（数值越小越靠前） */
  order: number;
}

/**
 * 按钮类型菜单项
 */
interface ButtonMenuItem extends BaseMenuItem {
  /** 菜单项类型：按钮 */
  type: 'button';
  /** 国际化标签键名 */
  label: string;
  /** 是否禁用 */
  disable?: boolean;
  /** 点击事件处理函数 */
  onclick?: MenuItemClickHandler;
}

/**
 * 分隔线类型菜单项
 */
interface DividerMenuItem extends BaseMenuItem {
  /** 菜单项类型：分隔线 */
  type: 'divider';
}

/**
 * 文件夹类型菜单项（可包含子菜单）
 */
interface FolderMenuItem extends BaseMenuItem {
  /** 菜单项类型：文件夹 */
  type: 'folder';
  /** 图标资源路径 */
  icon: string;
  /** 国际化标签键名 */
  label: string;
  /** 子菜单项列表 */
  submenu: MenuItem[];
}

/**
 * 菜单项联合类型
 */
type MenuItem = ButtonMenuItem | DividerMenuItem | FolderMenuItem;

/**
 * 工具栏帮助菜单配置数组
 */
type HelpMenuConfig = MenuItem[];

/**
 * 获取工具栏帮助菜单配置
 * @returns 返回帮助菜单的配置数组
 */
declare function getHelpMenuConfig(): HelpMenuConfig;

export default getHelpMenuConfig;

/**
 * 全局应用对象声明（外部依赖）
 */
declare global {
  const HSApp: {
    /** 应用配置 */
    Config: {
      /** 租户标识 */
      TENANT: string;
    };
    /** 合作伙伴配置 */
    PartnerConfig: {
      /** 用户中心URL */
      USERCENTER_URL: string;
    };
    /** 应用实例 */
    App: {
      /** 获取应用实例 */
      getApp(): {
        /** 插件管理器 */
        pluginManager: {
          /** 获取指定类型的插件 */
          getPlugin(pluginType: string): {
            /** 显示插件UI */
            show(tabIndex: number): void;
          };
        };
      };
    };
    /** 工具类 */
    Util: {
      /** 事件追踪工具 */
      EventTrack: {
        /** 获取事件追踪单例 */
        instance(): {
          /** 追踪事件 */
          track(eventGroup: string, eventName: string): void;
        };
      };
      /** 事件分组枚举 */
      EventGroupEnum: {
        /** 工具栏事件组 */
        Toolbar: string;
      };
    };
  };

  /** 常量定义 */
  const HSFPConstants: {
    /** 插件类型枚举 */
    PluginType: {
      /** 用户设置插件 */
      UserSetting: string;
    };
  };

  /** 资源管理器 */
  const ResourceManager: {
    /** 获取国际化字符串 */
    getString(key: string): string;
  };
}