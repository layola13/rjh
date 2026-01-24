/**
 * 左侧菜单项配置模块
 * 提供各种上下文菜单项的配置和事件处理
 */

import { ILeftMenuItem, SvgMap } from './menu-types';
import { HSCore } from './core';

/**
 * 热键配置接口
 */
interface HotkeyConfig {
  /** Windows 系统热键 */
  win: string;
  /** macOS 系统热键 */
  mac: string;
}

/**
 * 菜单项基础配置接口
 */
interface BaseMenuItem {
  /** 菜单项文本标签（i18n key） */
  label: string;
  /** 菜单项唯一标识 */
  id: string;
  /** 图标资源路径 */
  src: string;
  /** 显示顺序 */
  order: number;
  /** 支持的UI模式列表 */
  uiMode?: HSFPConstants.UIMode[];
  /** 点击后是否隐藏菜单 */
  hideAfterClick?: boolean;
  /** 热键配置 */
  hotkey?: HotkeyConfig;
  /** 是否注册热键 */
  registerHotkey?: boolean;
  /** 是否禁用 */
  disable?: boolean;
  /** 子菜单项 */
  children?: Array<BaseMenuItem | BaseMenuItem[]>;
  /** 点击事件处理函数 */
  onClick?: (event?: MouseEvent) => void;
  /** 状态更新函数 */
  stateReducer?: (state: BaseMenuItem) => BaseMenuItem;
}

/**
 * 实体操作上下文
 */
interface EntityContext {
  /** 选中的实体列表 */
  entities: HSCore.Model.Entity[];
  /** 应用实例 */
  app: HSApp.App;
  /** 查找ID（可选） */
  seekId?: string;
  /** 是否为3D模式 */
  is3D?: boolean;
}

/**
 * 对齐方式枚举（引用自常量定义）
 */
declare const HSFPConstants: {
  Align: {
    Front: string;
    Back: string;
    Left: string;
    Right: string;
    Top: string;
    Bottom: string;
    CenterFrontBack: string;
    CenterLeftRight: string;
    CenterBottomTop: string;
    AdaptFrontBack: string;
    AdaptLeftRight: string;
    AdaptBottomTop: string;
  };
  UIMode: {
    layoutDesignMode: string;
  };
  CommandType: {
    CmdContentArray: string;
    CmdContentArcArray: string;
    DistributionContents: string;
    RemoveGroup: string;
    CmdAlign: string;
  };
  PluginType: {
    MyGroup: string;
  };
};

// ==================== 导出的菜单项配置常量 ====================

/**
 * 替换菜单项配置
 */
export declare const replace: BaseMenuItem;

/**
 * 翻转菜单项配置
 */
export declare const flip: BaseMenuItem;

/**
 * 复制菜单项配置
 */
export declare const duplicate: BaseMenuItem;

/**
 * 锁定菜单项配置
 */
export declare const lock: BaseMenuItem;

/**
 * 隐藏菜单项配置
 */
export declare const hide: BaseMenuItem;

/**
 * 删除菜单项配置
 */
export declare const deleteItem: BaseMenuItem;

/**
 * 添加到收藏菜单项配置
 */
export declare const favoriteAdd: BaseMenuItem;

/**
 * 从收藏移除菜单项配置
 */
export declare const favoriteRemove: BaseMenuItem;

// ==================== 菜单项工厂函数 ====================

/**
 * 获取替换菜单项
 * @param context - 实体操作上下文
 * @returns 配置好的替换菜单项
 */
export declare function getReplaceItem(context: EntityContext): BaseMenuItem;

/**
 * 获取翻转菜单项
 * @param context - 实体操作上下文
 * @returns 配置好的翻转菜单项
 */
export declare function getFlipItem(context: EntityContext): BaseMenuItem;

/**
 * 获取复制菜单项
 * @param context - 实体操作上下文
 * @returns 配置好的复制菜单项
 */
export declare function getDuplicateItem(context: EntityContext): BaseMenuItem;

/**
 * 获取删除菜单项
 * @param context - 实体操作上下文
 * @returns 配置好的删除菜单项
 */
export declare function getDeleteItem(context: EntityContext): BaseMenuItem;

/**
 * 获取锁定/解锁菜单项（根据实体当前状态动态切换）
 * @param context - 实体操作上下文
 * @returns 配置好的锁定菜单项
 */
export declare function getLockItem(context: EntityContext): BaseMenuItem;

/**
 * 获取隐藏菜单项
 * @param context - 实体操作上下文
 * @returns 配置好的隐藏菜单项
 */
export declare function getHideItem(context: EntityContext): BaseMenuItem;

/**
 * 获取收藏菜单项（根据收藏状态动态切换添加/移除）
 * @param context - 实体操作上下文
 * @returns 配置好的收藏菜单项
 */
export declare function getFavoriteItem(context: EntityContext): BaseMenuItem;

/**
 * 获取上传组合菜单项
 * @param context - 实体操作上下文
 * @returns 配置好的上传组合菜单项
 */
export declare function getUploadGroupItem(context: EntityContext): BaseMenuItem;

/**
 * 获取阵列菜单项（包含线性阵列和弧形阵列子菜单）
 * @param context - 实体操作上下文
 * @returns 配置好的阵列菜单项
 */
export declare function getArrayItem(context: EntityContext): BaseMenuItem;

/**
 * 获取分布菜单项（水平/垂直分布）
 * @param context - 实体操作上下文
 * @returns 配置好的分布菜单项
 */
export declare function getDistributionItem(context: EntityContext): BaseMenuItem;

/**
 * 获取成组菜单项
 * @param context - 实体操作上下文
 * @returns 配置好的成组菜单项
 */
export declare function getGroupItem(context: EntityContext): BaseMenuItem;

/**
 * 获取取消成组菜单项
 * @param context - 实体操作上下文
 * @returns 配置好的取消成组菜单项
 */
export declare function getUnGroupItem(context: EntityContext): BaseMenuItem;

/**
 * 获取对齐菜单项（多级子菜单：前后左右上下对齐、居中、自适应等）
 * @param context - 实体操作上下文
 * @returns 配置好的对齐菜单项
 */
export declare function getAlignItem(context: EntityContext): BaseMenuItem;

/**
 * 获取智能布局菜单项（定制产品智能配件布局）
 * @param context - 实体操作上下文
 * @returns 配置好的智能布局菜单项
 */
export declare function getSmartLayoutItem(context: EntityContext): BaseMenuItem;

/**
 * 获取缩放菜单项
 * @param context - 实体操作上下文
 * @returns 配置好的缩放菜单项
 */
export declare function getScaleItem(context: EntityContext): BaseMenuItem;

/**
 * 导出左侧菜单项接口（从其他模块重新导出）
 */
export { ILeftMenuItem } from './menu-types';