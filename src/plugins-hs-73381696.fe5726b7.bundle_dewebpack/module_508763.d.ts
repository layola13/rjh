/**
 * 网格内容和定制产品的右键菜单配置模块
 * 提供网格内容(MeshContent)和定制产品(TPZZ)的上下文菜单项
 */

import type { HSCore } from '@/types/hscore';
import type { HSApp } from '@/types/hsapp';
import type { PropertyBarControlTypeEnum } from '@/types/enums';

/**
 * 菜单项配置接口
 */
export interface MenuItemConfig {
  /** 菜单项唯一标识 */
  id: string;
  /** 菜单项显示标签 */
  label: string;
  /** 菜单项排序权重 */
  order: number;
  /** 菜单项图标SVG路径 */
  src: string;
  /** 适用的UI模式列表 */
  uiMode?: number[];
  /** 控件类型 */
  type?: PropertyBarControlTypeEnum;
  /** 是否禁用 */
  disable?: boolean;
  /** 点击事件处理函数 */
  onClick?: () => void;
  /** 获取权益数量（用于显示徽章） */
  getBenefitAmount?: () => number | undefined;
  /** 显示营销弹窗 */
  showMarketModal?: () => void;
}

/**
 * 菜单上下文参数
 */
export interface MenuContext {
  /** 选中的实体列表 */
  entities: HSCore.Model.Entity[];
  /** 是否为3D模式 */
  is3D: boolean;
  /** 应用实例 */
  app: HSApp.App;
}

/**
 * 菜单配置对象接口
 */
export interface MenuConfig {
  /** 菜单配置名称 */
  name: string;
  
  /**
   * 判断菜单是否适用于当前选中实体
   * @param entities - 选中的实体列表
   * @returns 是否适用
   */
  isApplied(entities: HSCore.Model.Entity[]): boolean;
  
  /**
   * 获取菜单项列表
   * @param context - 菜单上下文
   * @returns 菜单项配置数组
   */
  getItems(context: MenuContext): MenuItemConfig[];
}

/**
 * 网格内容菜单配置
 * 用于MeshContent类型实体的右键菜单
 */
export declare const meshContent: MenuConfig;

/**
 * 定制产品菜单配置（天蓬装装）
 * 用于定制化产品实体的右键菜单
 */
export declare const tpzz: MenuConfig;